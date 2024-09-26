#!/bin/sh

# Wait for MySQL to become available
until mysql -h $HOST_MYSQL -u $USER_MYSQL -p $PASSWORD_MYSQL -e "exit"; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

# Import data if needed (replace with your actual import command)
mysql -h $HOST_MYSQL -u $USER_MYSQL -p $PASSWORD_MYSQL $DATABASE_MYSQL < /docker-entrypoint-initdb.d/init-data.sql

>&2 echo "MySQL is up - executing command"
