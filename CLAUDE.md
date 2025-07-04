# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Go project (based on the repository name "go2"). The project structure and development workflow will be established as the codebase grows.

## Getting Started

Since this is a new repository, you'll need to initialize it with:

```bash
go mod init go2
```

## Development Workflow

### Common Commands

Development commands will be added here as the project structure is established. Common Go commands include:

- `go build` - Build the application
- `go run .` - Run the application
- `go test ./...` - Run all tests
- `go fmt ./...` - Format code
- `go vet ./...` - Run static analysis
- `go mod tidy` - Clean up dependencies

### Project Structure

Standard Go project structure will be established:

```
go2/
├── cmd/           # Application entrypoints
├── internal/      # Private application code
├── pkg/           # Public library code
├── api/           # API definitions
├── web/           # Web assets
├── scripts/       # Build and deployment scripts
├── test/          # Test data and utilities
├── docs/          # Documentation
├── go.mod         # Go module definition
└── go.sum         # Go module checksums
```

## Architecture Notes

- Follow standard Go project layout conventions
- Use `internal/` for private packages that shouldn't be imported by external projects
- Use `pkg/` for public packages that can be imported by other projects
- Keep main application logic in `cmd/` directory

## Development Guidelines

- Follow Go naming conventions and formatting standards
- Write tests for all packages using Go's built-in testing framework
- Use Go modules for dependency management
- Follow semantic versioning for releases