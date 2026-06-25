#!/bin/bash
set -euo pipefail

ENV=${1:-prod}
COMMAND=${2:-all}
DOMAIN="${DOMAIN:-matchgen.ai}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${GREEN}✓${NC} $1"; }
log_warn() { echo -e "${YELLOW}⚠${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }
log_step() { echo -e "${BLUE}→${NC} $1"; }

check_deps() {
    log_step "Checking dependencies..."
    local deps=("docker" "docker-compose" "git")
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null; then
            log_error "$dep is required"
            exit 1
        fi
    done
    log_info "All dependencies found"
}

check_docker() {
    log_step "Checking Docker..."
    if ! docker info &> /dev/null; then
        log_error "Docker not running"
        exit 1
    fi
    log_info "Docker is running"
}

check_ram() {
    log_step "Checking RAM..."
    local total_ram=$(free -m | awk '/^Mem:/{print $2}')
    log_info "Total RAM: ${total_ram}MB"
    if [ "$total_ram" -lt 1800 ]; then
        log_warn "Very low RAM. Use AI_MODEL=qwen2.5:0.5b or gemma3:1b"
    elif [ "$total_ram" -lt 3500 ]; then
        log_info "2GB RAM detected. Recommended: AI_MODEL=qwen2.5:1.5b"
    else
        log_info "4GB+ RAM detected. Recommended: AI_MODEL=phi4-mini or llama3.2:3b"
    fi
}

load_env() {
    log_step "Loading environment..."
    if [ -f ".env.${ENV}" ]; then
        export $(grep -v '^#' ".env.${ENV}" | xargs)
        log_info "Loaded .env.${ENV}"
    elif [ -f ".env" ]; then
        export $(grep -v '^#' ".env" | xargs)
        log_info "Loaded .env"
    else
        log_warn "Creating .env template..."
        cat > .env << 'ENVEOF'
DB_PASSWORD=$(openssl rand -hex 16)
SECRET_KEY=$(openssl rand -hex 32)
DOMAIN=matchgen.ai
AI_MODEL=phi4-mini
OLLAMA_MEMORY_LIMIT=3G
OLLAMA_MEMORY_RESERVATION=2G
ENVEOF
        log_warn "Created .env. Please edit AI_MODEL for your RAM!"
        exit 1
    fi
}

build() {
    log_step "Building images..."
    export COMPOSE_BAKE=true
    docker-compose build --parallel
    log_info "Build complete"
}

migrate() {
    log_step "Running migrations..."
    docker-compose run --rm app alembic upgrade head
    log_info "Migrations complete"
}

deploy() {
    log_step "Starting services..."
    docker-compose up -d --remove-orphans
    log_step "Waiting for health checks..."
    local retries=30
    local count=0
    while [ $count -lt $retries ]; do
        if curl -sf http://localhost:8000/health &> /dev/null; then
            log_info "Backend healthy!"
            break
        fi
        count=$((count + 1))
        echo -n "."
        sleep 2
    done
    if [ $count -eq $retries ]; then
        log_warn "Health check timeout. Check: docker logs matchgen-api"
    fi
}

status() {
    log_step "Service status:"
    docker-compose ps
    echo ""
    docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"
}

backup() {
    log_step "Creating backup..."
    mkdir -p backups
    docker-compose exec -T db pg_dump -U matchgen matchgen > "backups/manual-$(date +%Y%m%d-%H%M%S).sql"
    log_info "Backup saved"
}

update() {
    log_step "Updating..."
    git pull origin main
    build
    migrate
    deploy
    log_info "Update complete!"
}

webhook() {
    log_step "Webhook deploy..."
    git pull origin main
    load_env
    build
    migrate
    deploy
}

monitor() {
    log_step "Health check:"
    curl -s http://localhost:8000/health | jq . 2>/dev/null || curl -s http://localhost:8000/health
    echo ""
    echo "Disk: $(df -h / | tail -1)"
    echo "RAM: $(free -h | grep 'Mem:')"
    docker ps --format "table {{.Names}}\t{{.Status}}"
}

main() {
    echo ""
    echo "🚀 MatchGen AI v2.2 - Self-Hosted Stack"
    echo "========================================"
    echo "Env: $ENV | Command: $COMMAND"
    echo ""
    case "$COMMAND" in
        check) check_deps; check_docker; check_ram ;;
        build) check_deps; check_docker; load_env; build ;;
        migrate) load_env; migrate ;;
        deploy) check_deps; check_docker; check_ram; load_env; build; migrate; deploy ;;
        status) status ;;
        backup) load_env; backup ;;
        update) check_deps; check_docker; load_env; update ;;
        webhook) webhook ;;
        monitor) monitor ;;
        *) check_deps; check_docker; check_ram; load_env; build; migrate; deploy; monitor ;;
    esac
    echo ""
    log_info "Done! 🎉"
    echo ""
    echo "📊 Services:"
    echo "  App:      http://localhost:8000"
    echo "  Frontend: http://localhost:3000"
    echo "  Domain:   https://${DOMAIN}"
}

main "$@"
