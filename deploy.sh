#!/bin/bash

# Сборка проекта
echo "Building project..."
npm run build

# Создание директории для деплоя если её нет
echo "Creating deploy directory..."
mkdir -p deploy

# Копирование собранных файлов
echo "Copying build files..."
cp -r dist/* deploy/

# Создание файла конфигурации для nginx
echo "Creating nginx configuration..."
cat > deploy/nginx.conf << EOL
server {
    listen 80;
    server_name your-domain.com;  # Замените на ваш домен

    root /var/www/bns-timer;  # Путь к файлам на сервере
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Кэширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
}
EOL

echo "Deploy files are ready in the 'deploy' directory"
echo "Next steps:"
echo "1. Set up GitHub Secrets:"
echo "   - VPS_HOST: Your VPS IP or domain"
echo "   - VPS_USERNAME: Your VPS username"
echo "   - VPS_SSH_KEY: Your SSH private key"
echo "2. Push to main branch to trigger automatic deployment"