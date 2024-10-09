install:
	npm i

build: install
	rm -rf frontend/dist
	npm run build

.PHONY: build install
