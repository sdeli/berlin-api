#!/bin/bash

# Variables
CONTAINER_NAME="berlin-api-db-1"     # The name of the PostgreSQL container
DB_USER="sandor"                     # PostgreSQL username
DB_NAME="berlin"                     # PostgreSQL database name
BACKUP_DIR="./assets/db"             # Local directory where backup will be stored
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")   # Timestamp for the backup filename
BACKUP_FILE="berlin_$TIMESTAMP.sql"  # Backup filename with .sql extension

# Create the local backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Run pg_dump in the container to create a plain text SQL backup
docker exec $CONTAINER_NAME pg_dump -U $DB_USER -F p -b -v -f "/tmp/$BACKUP_FILE" $DB_NAME

# Copy the backup file from the container to the local machine
docker cp $CONTAINER_NAME:/tmp/$BACKUP_FILE $BACKUP_DIR/$BACKUP_FILE

# Remove the backup file from the container to keep it clean
docker exec $CONTAINER_NAME rm "/tmp/$BACKUP_FILE"

# Notify the user of success
echo "Backup successful! Saved to $BACKUP_DIR/$BACKUP_FILE"
