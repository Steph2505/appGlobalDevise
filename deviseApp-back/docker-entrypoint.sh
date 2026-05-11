#!/bin/sh
set -e


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
