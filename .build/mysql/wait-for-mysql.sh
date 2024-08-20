#!/bin/sh

# Wait for MySQL to become available
until mysql -h $MYSQL_HOST -u $MYSQL_USER -p $MYSQL_ROOT_PASSWORD -e "exit"; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

# Import data if needed (replace with your actual import command)
mysql -h $MYSQL_HOST -u $MYSQL_USER -p $MYSQL_ROOT_PASSWORD $MYSQL_DATABASE < /docker-entrypoint-initdb.d/init-data.sql

>&2 echo "MySQL is up - executing command"
