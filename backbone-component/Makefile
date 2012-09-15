build: template.js backbone-component.css components
	@component build

template.js: template.html
	# @component convert $<
	@component convert ./src/templates/*.js

components:
	@component install

clean:
	rm -fr build components template.js

test: build
	@./node_modules/.bin/buster test --reporter specification

autotest: build
	@./node_modules/.bin/buster autotest --reporter specification

test-server:
	@./node_modules/.bin/buster server

.PHONY: test test-server clean
