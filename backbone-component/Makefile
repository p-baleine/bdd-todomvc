build: template.js backbone-component.css components
	@component build
	@cp build/build.js ../server/public/javascripts/application.js
	@cp build/build.css ../server/public/stylesheets/application.css

template.js: template.html
	# @component convert $<
	@component convert ./src/templates/*.html

components:
	@component install

clean:
	rm -fr build components template.js ./src/templates/*.js

test: build
	@./node_modules/.bin/buster test --reporter specification

autotest: build
	@./node_modules/.bin/buster autotest --reporter specification

test-server:
	@./node_modules/.bin/buster server

.PHONY: test test-server clean
