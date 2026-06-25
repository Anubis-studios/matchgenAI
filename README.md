# MatchGen AI v2.2

**Zero-cost, self-hosted AI dating app.**

- **Monthly cost:** $4.49 (server only)
- **AI:** Self-hosted via Ollama (phi4-mini, llama3.2, qwen2.5)
- **Backend:** FastAPI + PostgreSQL + Redis
- **Frontend:** React 18 + Vite + Tailwind + MUI
- **Deploy:** Terraform + Docker + one-command script

## Quick Start

```bash
# 1. Configure
cp infrastructure/terraform/terraform.tfvars.example infrastructure/terraform/terraform.tfvars
# Edit with your tokens

# 2. Provision
cd infrastructure/terraform
terraform apply -auto-approve

# 3. Deploy
scp -r . root@YOUR_SERVER_IP:/opt/matchgen-ai
ssh root@YOUR_SERVER_IP "cd /opt/matchgen-ai && ./deploy.sh prod"
```

## Features

- Real-time WebSocket chat
- AI bio generation & chat starters (local LLM, zero API cost)
- AI-powered matching
- Voice intros
- Stories & Events
- Tiered subscriptions
- Admin dashboard
- SSL + CDN + DDoS protection

## License

MIT - All components are open source.
