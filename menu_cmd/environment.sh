# Project commands. Each function with a `## description` comment directly above it becomes a menu command.
# Functions without it are helpers and are ignored. (info/warn/error and color variables come from ./menu.)

## Start development environment
dev() {
    docker compose --profile dev up
}

## Start development environment in background
dev_detached() {
    docker compose --profile dev up -d
}

## Start production environment (build)
prod() {
    docker compose --profile prod up --build
}

## Start production environment in background (build)
prod_detached() {
    docker compose --profile prod up -d --build
}

## Stop containers
down() {
    docker compose --profile dev --profile prod down
}
