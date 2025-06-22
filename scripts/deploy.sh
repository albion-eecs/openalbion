#!/usr/bin/env bash
set -euo pipefail

DEPLOY_DIR="/var/www/openalbion"
SRC_DIR="$DEPLOY_DIR/source"
STATE_FILE="$DEPLOY_DIR/.env.state"

mkdir -p "$DEPLOY_DIR"

if [ ! -d "$SRC_DIR/.git" ]; then
  echo "[BOOTSTRAP] Cloning repository for the first time…"
  git clone https://github.com/albion-eecs/openalbion.git "$SRC_DIR"
  echo "LIVE=blue" > "$STATE_FILE"
  chmod +x "$SRC_DIR/scripts/deploy.sh"
fi

source "$STATE_FILE"

if [[ "$LIVE" == "blue" ]]; then
  IDLE="green"
  LIVE_PORT_WEB=3000
  IDLE_PORT_WEB=3001
  LIVE_PORT_DOCS=4000
  IDLE_PORT_DOCS=4001
else
  IDLE="blue"
  LIVE_PORT_WEB=3001
  IDLE_PORT_WEB=3000
  LIVE_PORT_DOCS=4001
  IDLE_PORT_DOCS=4000
fi

echo "[DEPLOY] Live environment: $LIVE"
echo "[DEPLOY] Deploying new release to: $IDLE"

cd "$SRC_DIR"

echo "[GIT] Pulling latest code..."
 git pull origin master

if [[ -n "${BETTER_AUTH_SECRET:-}" ]]; then
  echo "BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET" > .env
fi

COMPOSE_PROJECT_NAME="openalbion-$IDLE"
export WEB_PORT=$IDLE_PORT_WEB
export DOCS_PORT=$IDLE_PORT_DOCS

echo "[DOCKER] Building and starting containers for $IDLE..."
docker compose -p "$COMPOSE_PROJECT_NAME" up --build -d

function healthcheck() {
  local url=$1
  local retries=30
  until curl -fs "$url" >/dev/null; do
    sleep 5
    retries=$((retries-1))
    if [ $retries -le 0 ]; then
      echo "[ERROR] Health check failed for $url"
      return 1
    fi
  done
  return 0
}

echo "[HEALTH] Waiting for web service..."
healthcheck "http://localhost:$IDLE_PORT_WEB/api/health"

echo "[HEALTH] Waiting for docs service..."
healthcheck "http://localhost:$IDLE_PORT_DOCS/api/health"

NGINX_UPSTREAM="/etc/nginx/conf.d/upstreams.conf"
cat > "$NGINX_UPSTREAM" <<EOF
upstream web_backend { server 127.0.0.1:$IDLE_PORT_WEB; }
upstream docs_backend { server 127.0.0.1:$IDLE_PORT_DOCS; }
EOF

echo "[NGINX] Reloading configuration..."
sudo nginx -s reload

echo "[DEPLOY] Updating live state..."
echo "LIVE=$IDLE" > "$STATE_FILE"

OLD_COMPOSE_PROJECT="openalbion-$LIVE"

echo "[DOCKER] Removing old containers ($LIVE)..."
docker compose -p "$OLD_COMPOSE_PROJECT" down

echo "[SUCCESS] Deployment to $IDLE complete." 