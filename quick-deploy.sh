#!/bin/bash

# SoulSync 快速部署脚本
# 适用于开发环境的快速部署

set -e

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

PROJECT_DIR="/home/soulSync"
NGINX_CONF="$PROJECT_DIR/nginx.conf"

echo -e "${BLUE}🚀 SoulSync 快速部署开始...${NC}"

# 切换到项目目录
cd "$PROJECT_DIR"

# 构建项目
echo -e "${YELLOW}📦 构建项目...${NC}"
npm run build

# 重启nginx
echo -e "${YELLOW}🔄 重启nginx...${NC}"
sudo pkill nginx 2>/dev/null || true
sleep 1
sudo nginx -c "$NGINX_CONF"

echo -e "${GREEN}✅ 部署完成！${NC}"
echo -e "${BLUE}🌐 访问地址: http://121.43.109.134:855${NC}"