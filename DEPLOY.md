# SoulSync 部署脚本使用说明

## 脚本概述

项目提供了两个部署脚本：
- `deploy.sh` - 完整的部署脚本，包含备份、构建、部署等功能
- `quick-deploy.sh` - 快速部署脚本，适用于开发环境

## 使用方法

### 1. 完整部署脚本 (deploy.sh)

#### 基本用法
```bash
# 完整部署（推荐）
./deploy.sh

# 或者使用 npm 脚本
npm run deploy
```

#### 高级选项
```bash
# 仅构建项目，不重启nginx
./deploy.sh --build-only
npm run deploy:build

# 跳过备份直接部署
./deploy.sh --skip-backup

# 查看帮助信息
./deploy.sh --help
```

### 2. 快速部署脚本 (quick-deploy.sh)

```bash
# 快速部署
./quick-deploy.sh

# 或者使用 npm 脚本
npm run deploy:quick
```

## 脚本功能

### deploy.sh 功能
- ✅ 自动备份现有的 dist 目录
- ✅ 清理旧的备份文件（保留最近5个）
- ✅ 构建项目 (npm run build)
- ✅ 测试 nginx 配置
- ✅ 重启 nginx 服务
- ✅ 详细的日志记录
- ✅ 错误处理和回滚机制
- ✅ 部署完成后的信息展示

### quick-deploy.sh 功能
- ✅ 快速构建项目
- ✅ 重启 nginx 服务
- ✅ 简化的输出信息

## 目录结构

```
/home/soulSync/
├── deploy.sh           # 完整部署脚本
├── quick-deploy.sh     # 快速部署脚本
├── nginx.conf          # nginx 配置文件
├── dist/               # 构建输出目录
├── backup/             # 备份目录
├── deploy.log          # 部署日志文件
└── package.json        # 项目配置文件
```

## 配置信息

- **项目目录**: `/home/soulSync`
- **部署目录**: `/home/soulSync/dist`
- **nginx 配置**: `/home/soulSync/nginx.conf`
- **访问地址**: `http://121.43.109.134:855`
- **日志文件**: `/home/soulSync/deploy.log`

## 注意事项

1. **权限要求**: 脚本需要 sudo 权限来重启 nginx
2. **环境要求**: 需要安装 Node.js, npm 和 nginx
3. **备份策略**: 自动保留最近5个备份，超过的会被清理
4. **错误处理**: 脚本会在遇到错误时自动停止并显示错误信息

## 故障排除

### 常见问题

1. **权限不足**
   ```bash
   sudo chown -R $USER:$USER /home/soulSync
   ```

2. **端口被占用**
   ```bash
   sudo netstat -tlnp | grep 855
   sudo kill -9 <PID>
   ```

3. **nginx 配置错误**
   ```bash
   nginx -t -c /home/soulSync/nginx.conf
   ```

4. **构建失败**
   ```bash
   npm install
   npm run build
   ```

### 查看日志
```bash
# 查看部署日志
cat /home/soulSync/deploy.log

# 查看 nginx 错误日志
sudo tail -f /var/log/nginx/error.log
```

## 更新脚本

如果需要修改脚本，请确保：
1. 保持脚本的可执行权限
2. 测试修改后的脚本
3. 更新相关文档

## 联系方式

如有问题请检查：
1. 日志文件：`/home/soulSync/deploy.log`
2. nginx 日志：`/var/log/nginx/error.log`
3. 项目构建日志：控制台输出