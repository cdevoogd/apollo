DOCKERFILE = build/Dockerfile

.DEFAULT_GOAL := apollo

.PHONY: help
help: ## Print out a help message that displays all available targets
	@echo "Available make targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: apollo
apollo: ## Build Apollo within a container. This is the default target.
	DOCKER_BUILDKIT=1 docker build  -f $(DOCKERFILE) -t apollo:latest . --target bin

.PHONY: test
test: ## Run unit tests within a container
	DOCKER_BUILDKIT=1 docker build -f $(DOCKERFILE) . --target unit-test

.PHONY: clean
clean: ## Clean up dangling docker images
	docker rmi $(shell docker images -f dangling=true -q)
