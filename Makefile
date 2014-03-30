
test:
	./node_modules/karma/bin/karma start

lint: 
	jshint ./src
	jshint ./test

.PHONY: lint test
