dev:
	docker compose --profile dev up

dev-detached:
	docker compose --profile dev up -d

prod:
	docker compose --profile prod up --build

prod-detached:
	docker compose --profile prod up -d --build

down:
	docker compose --profile dev --profile prod down
