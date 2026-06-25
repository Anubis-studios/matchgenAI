terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.45"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

variable "hcloud_token" { sensitive = true }
variable "cloudflare_api_token" { sensitive = true }
variable "cloudflare_zone_id" {}
variable "domain" { default = "matchgen.ai" }
variable "ssh_public_key" {}
variable "server_type" { default = "cx23" }

provider "hcloud" { token = var.hcloud_token }
provider "cloudflare" { api_token = var.cloudflare_api_token }

resource "hcloud_ssh_key" "default" {
  name       = "matchgen-deploy-key"
  public_key = var.ssh_public_key
}

resource "hcloud_firewall" "matchgen" {
  name = "matchgen-firewall"
  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "22"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "80"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "443"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
}

resource "hcloud_server" "matchgen" {
  name         = "matchgen-ai"
  server_type  = var.server_type
  image        = "ubuntu-22.04"
  location     = "nbg1"
  ssh_keys     = [hcloud_ssh_key.default.id]
  firewall_ids = [hcloud_firewall.matchgen.id]

  labels = {
    app     = "matchgen"
    version = "v2.2"
    env     = "production"
  }

  user_data = <<-EOF
    #!/bin/bash
    set -e
    apt-get update && apt-get upgrade -y
    curl -fsSL https://get.docker.com | sh
    usermod -aG docker ubuntu
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    apt-get install -y git curl htop ncdu ufw fail2ban
    ufw --force enable
    ufw default deny incoming
    ufw default allow outgoing
    ufw allow ssh
    ufw allow http
    ufw allow https
    mkdir -p /opt/matchgen-ai
    chown -R ubuntu:ubuntu /opt/matchgen-ai
    fallocate -l 4G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
    cat >> /etc/sysctl.conf << 'SYSEOF'
    net.core.somaxconn = 65535
    net.ipv4.tcp_max_syn_backlog = 65535
    net.ipv4.ip_local_port_range = 1024 65535
    vm.swappiness = 10
    vm.vfs_cache_pressure = 50
    SYSEOF
    sysctl -p
    echo "Setup complete!"
  EOF
}

resource "hcloud_volume" "data" {
  name      = "matchgen-data"
  size      = 20
  server_id = hcloud_server.matchgen.id
  format    = "ext4"
}

resource "cloudflare_record" "root" {
  zone_id = var.cloudflare_zone_id
  name    = "@"
  type    = "A"
  value   = hcloud_server.matchgen.ipv4_address
  proxied = true
}

resource "cloudflare_record" "www" {
  zone_id = var.cloudflare_zone_id
  name    = "www"
  type    = "CNAME"
  value   = var.domain
  proxied = true
}

resource "cloudflare_record" "api" {
  zone_id = var.cloudflare_zone_id
  name    = "api"
  type    = "A"
  value   = hcloud_server.matchgen.ipv4_address
  proxied = true
}

output "server_ip" { value = hcloud_server.matchgen.ipv4_address }
output "domain" { value = var.domain }
output "ssh_command" { value = "ssh root@${hcloud_server.matchgen.ipv4_address}" }
