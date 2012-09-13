build: template.js backbone-component.css components
	@component build

template.js: template.html
	@component convert $<

components:
	@component install

clean:
	rm -fr build components template.js

test: build
	@./node_modules/.bin/buster test --reporter specification

server:
	@./node_modules/.bin/buster server

.PHONY: test server clean
