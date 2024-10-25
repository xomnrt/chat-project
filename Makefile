install:
	npm ci

build: install
	rm -rf frontend/dist
	npm run build

local-build:
	npm run local-build

.PHONY: build install local-build
