install:
	npm ci

build: install
	rm -rf frontend/dist
	npm run build

local-build:
	npm run build

.PHONY: build install local-build
