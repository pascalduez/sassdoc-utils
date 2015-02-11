PATH := $(PWD)/node_modules/.bin:$(PATH)

all: lint dist

esnext:
	6to5 src -d dist

dist:
	trash --force dist
	mkdir -p dist
	make esnext

# Code quality
# ============

lint:
	eslint index.js src

# Release, publish
# ================

# "patch", "minor", "major", "prepatch",
# "preminor", "premajor", "prerelease"
VERS ?= "patch"
TAG  ?= "latest"

release: all
	npm version $(VERS) -m "Release %s"
	npm publish --tag $(TAG)
	git push --follow-tags

publish: dist
	npm publish --tag $(TAG)

# Tools
# =====

rebuild:
	rm -rf node_modules
	npm install


.PHONY: dist
.SILENT: dist
