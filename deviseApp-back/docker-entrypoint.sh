#!/bin/sh
set -e

if [ ! -f /var/www/html/vendor/autoload.php ]; then
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

if [ ! -f /var/www/html/.env ]; then
    cp /var/www/html/.env.example /var/www/html/.env
    sed -i "s|DB_HOST=.*|DB_HOST=${DB_HOST:-db}|"                 /var/www/html/.env
    sed -i "s|DB_PORT=.*|DB_PORT=${DB_PORT:-3306}|"               /var/www/html/.env
    sed -i "s|DB_DATABASE=.*|DB_DATABASE=${DB_DATABASE:-devis_db}|" /var/www/html/.env
    sed -i "s|DB_USERNAME=.*|DB_USERNAME=${DB_USERNAME:-root}|"   /var/www/html/.env
    sed -i "s|DB_PASSWORD=.*|DB_PASSWORD=${DB_PASSWORD:-}|"       /var/www/html/.env
    sed -i "s|MAIL_MAILER=.*|MAIL_MAILER=log|"                    /var/www/html/.env
    php artisan key:generate --force
fi

FRESH=$(php -r "
try {
    \$pdo = new PDO(
        'mysql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT') . ';dbname=' . getenv('DB_DATABASE'),
        getenv('DB_USERNAME'),
        getenv('DB_PASSWORD')
    );
    \$tables = \$pdo->query('SHOW TABLES LIKE \"migrations\"')->fetchAll();
    echo count(\$tables) === 0 ? '1' : '0';
} catch (Exception \$e) {
    echo '1';
}
")

php artisan migrate --force

if [ "$FRESH" = "1" ]; then
    php artisan db:seed --force
fi

exec "$@"
