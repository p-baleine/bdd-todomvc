server: index.js
	@node .

test:
	@./node_modules/.bin/mocha \
	--require should \
	--reporter spec \
	--ui bdd

autotest:
	@./node_modules/.bin/mocha \
	--watch \
	--growl \
	--require should \
	--reporter spec \
	--ui bdd

.PHONY: server test autotest
