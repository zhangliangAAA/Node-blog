nginx 反向代理：
1、安装
2、在 /usr/local/etc/nginx/nginx.conf 改变配置
配置说明：

location / {  
 proxy_pass http://localhost:8001;
} #将/ 路径转发到 http://localhost:8001 静态服务器上

location /api/ {
proxy_pass http://localhost:8888;
proxy_set_header Host \$host;
} #将/api/ 路径转发到 http://localhost:8888 本地 node 务器上，并带上 header 头
