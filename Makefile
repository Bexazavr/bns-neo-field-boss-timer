# Variables
NPM = npm
NPM_RUN = $(NPM) run
NPM_INSTALL = $(NPM) install

# Targets

# Install dependencies
install:
	@echo "Installing dependencies..."
	$(NPM_INSTALL)

# Start development server
start:
	@echo "Starting development server..."
	$(NPM_RUN) start

# Build the project
build:
	@echo "Building the project..."
	$(NPM_RUN) build

# Clean node_modules and npm cache
clean:
	@echo "Cleaning node_modules and npm cache..."
	rm -rf node_modules
	$(NPM) cache clean --force

# Run linter (ESLint)
lint:
	@echo "Running linter..."
	$(NPM_RUN) lint

# Run tests
test:
	@echo "Running tests..."
	$(NPM_RUN) test

# Format code (Prettier)
format:
	@echo "Formatting code..."
	$(NPM_RUN) format

# Show available commands
help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make start      - Start development server"
	@echo "  make build      - Build the project"
	@echo "  make clean      - Clean node_modules and npm cache"
	@echo "  make lint       - Run linter"
	@echo "  make test       - Run tests"
	@echo "  make format     - Format code"
	@echo "  make help       - Show this help"

# Default target
.DEFAULT_GOAL := help