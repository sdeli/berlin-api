#!/bin/bash

SQL_FILE=$1                      
CONTAINER_NAME="berlin-api-db-1" 
DB_USER="sandor"                 
DB_NAME="berlin"                 

if [ ! -f "$SQL_FILE" ]; then
  echo "Error: SQL file not found!"
  exit 1
fi

docker cp "$SQL_FILE" $CONTAINER_NAME:/tmp/restore.sql

docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME -f "/tmp/restore.sql"

docker exec $CONTAINER_NAME rm "/tmp/restore.sql"

echo "Database restored successfully from $SQL_FILE"
