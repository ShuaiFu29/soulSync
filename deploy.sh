#!/bin/bash

# SoulSync 自动打包和部署脚本
# 作者: Claude Code
# 描述: 自动构建项目并部署到nginx

set -e  # 遇到错误时退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目配置
PROJECT_NAME="SoulSync"
PROJECT_DIR="/home/soulSync"
NGINX_CONF="$PROJECT_DIR/nginx.conf"
DIST_DIR="$PROJECT_DIR/dist"
BACKUP_DIR="$PROJECT_DIR/backup"
LOG_FILE="$PROJECT_DIR/deploy.log"

# 函数：打印带颜色的消息
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}[$(date '+%Y-%m-%d %H:%M:%S')] $message${NC}"
}

# 函数：记录日志
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# 函数：检查命令是否存在
check_command() {
    if ! command -v $1 &> /dev/null; then
        print_message $RED "错误: $1 命令未找到，请先安装 $1"
        exit 1
    fi
}

# 函数：备份现有的dist目录
backup_dist() {
    if [ -d "$DIST_DIR" ]; then
        print_message $YELLOW "备份现有的dist目录..."
        local backup_name="dist_backup_$(date +%Y%m%d_%H%M%S)"
        mkdir -p "$BACKUP_DIR"
        cp -r "$DIST_DIR" "$BACKUP_DIR/$backup_name"
        print_message $GREEN "备份完成: $BACKUP_DIR/$backup_name"
        log_message "已备份到: $BACKUP_DIR/$backup_name"
    fi
}

# 函数：清理旧的备份文件（保留最近5个）
clean_old_backups() {
    if [ -d "$BACKUP_DIR" ]; then
        local backup_count=$(ls -1 "$BACKUP_DIR" | grep "dist_backup_" | wc -l)
        if [ $backup_count -gt 5 ]; then
            print_message $YELLOW "清理旧的备份文件..."
            cd "$BACKUP_DIR"
            ls -t | grep "dist_backup_" | tail -n +6 | xargs -r rm -rf
            print_message $GREEN "清理完成，保留最近5个备份"
        fi
    fi
}

# 函数：构建项目
build_project() {
    print_message $BLUE "开始构建项目..."
    
    # 切换到项目目录
    cd "$PROJECT_DIR"
    
    # 检查package.json是否存在
    if [ ! -f "package.json" ]; then
        print_message $RED "错误: package.json 未找到"
        exit 1
    fi
    
    # 安装依赖（如果node_modules不存在）
    if [ ! -d "node_modules" ]; then
        print_message $YELLOW "安装项目依赖..."
        npm install
    fi
    
    # 运行构建
    print_message $BLUE "执行构建命令..."
    npm run build
    
    # 检查构建是否成功
    if [ ! -d "$DIST_DIR" ]; then
        print_message $RED "错误: 构建失败，dist目录未生成"
        exit 1
    fi
    
    print_message $GREEN "项目构建成功！"
    log_message "项目构建成功"
}

# 函数：重启nginx
restart_nginx() {
    print_message $BLUE "重启nginx服务..."
    
    # 检查nginx配置文件
    if [ ! -f "$NGINX_CONF" ]; then
        print_message $RED "错误: nginx配置文件未找到: $NGINX_CONF"
        exit 1
    fi
    
    # 测试nginx配置
    print_message $YELLOW "测试nginx配置..."
    if nginx -t -c "$NGINX_CONF"; then
        print_message $GREEN "nginx配置测试通过"
    else
        print_message $RED "错误: nginx配置测试失败"
        exit 1
    fi
    
    # 重启nginx
    if pgrep nginx > /dev/null; then
        print_message $YELLOW "停止现有nginx进程..."
        sudo pkill nginx
        sleep 2
    fi
    
    print_message $BLUE "启动nginx..."
    sudo nginx -c "$NGINX_CONF"
    
    # 检查nginx是否启动成功
    if pgrep nginx > /dev/null; then
        print_message $GREEN "nginx启动成功！"
        log_message "nginx启动成功"
    else
        print_message $RED "错误: nginx启动失败"
        exit 1
    fi
}

# 函数：显示部署信息
show_deployment_info() {
    print_message $GREEN "==================== 部署完成 ===================="
    print_message $BLUE "项目名称: $PROJECT_NAME"
    print_message $BLUE "项目目录: $PROJECT_DIR"
    print_message $BLUE "网站地址: http://121.43.109.134:855"
    print_message $BLUE "部署时间: $(date '+%Y-%m-%d %H:%M:%S')"
    print_message $BLUE "日志文件: $LOG_FILE"
    print_message $GREEN "=================================================="
}

# 主函数
main() {
    print_message $GREEN "==================== 开始部署 $PROJECT_NAME ===================="
    log_message "开始部署 $PROJECT_NAME"
    
    # 检查必要的命令
    check_command node
    check_command npm
    check_command nginx
    
    # 备份现有文件
    backup_dist
    
    # 构建项目
    build_project
    
    # 重启nginx
    restart_nginx
    
    # 清理旧备份
    clean_old_backups
    
    # 显示部署信息
    show_deployment_info
    
    log_message "部署完成"
}

# 捕获错误和中断信号
trap 'print_message $RED "部署过程中发生错误，请检查日志: $LOG_FILE"; log_message "部署失败"; exit 1' ERR
trap 'print_message $YELLOW "部署被中断"; log_message "部署被中断"; exit 1' INT

# 如果脚本带有参数，显示帮助信息
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "SoulSync 自动部署脚本"
    echo ""
    echo "用法: ./deploy.sh [选项]"
    echo ""
    echo "选项:"
    echo "  -h, --help     显示此帮助信息"
    echo "  --skip-backup  跳过备份步骤"
    echo "  --build-only   仅构建，不重启nginx"
    echo ""
    echo "示例:"
    echo "  ./deploy.sh                # 完整部署"
    echo "  ./deploy.sh --build-only   # 仅构建项目"
    echo "  ./deploy.sh --skip-backup  # 跳过备份直接部署"
    exit 0
fi

# 处理命令行参数
SKIP_BACKUP=false
BUILD_ONLY=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --skip-backup)
            SKIP_BACKUP=true
            shift
            ;;
        --build-only)
            BUILD_ONLY=true
            shift
            ;;
        *)
            print_message $RED "未知参数: $1"
            print_message $YELLOW "使用 --help 查看帮助信息"
            exit 1
            ;;
    esac
done

# 根据参数执行不同的操作
if [ "$BUILD_ONLY" = true ]; then
    print_message $GREEN "==================== 仅构建模式 ===================="
    check_command node
    check_command npm
    if [ "$SKIP_BACKUP" = false ]; then
        backup_dist
    fi
    build_project
    clean_old_backups
    print_message $GREEN "构建完成！"
else
    if [ "$SKIP_BACKUP" = true ]; then
        print_message $YELLOW "跳过备份步骤"
        check_command node
        check_command npm
        check_command nginx
        build_project
        restart_nginx
        clean_old_backups
        show_deployment_info
    else
        # 执行完整部署
        main
    fi
fi