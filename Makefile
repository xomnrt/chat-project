install:
	npm i

build: install
	rm -rf frontend/build
	npm run build

.PHONY: build install
