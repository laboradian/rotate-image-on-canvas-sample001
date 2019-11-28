
ENV := development

all: html js css img

html: index.html
js: main.js
css: main.css
img: images

index.html: src/index.html
	cp -p src/index.html dist/index.html

main.js: src/js/main.js
	@if [ "$(ENV)" = "development" ]; then \
	  uglifyjs src/js/main.js -c -m \
	    -o dist/js/main.js --source-map "root='..',url=main.js.map"; \
	else \
	  uglifyjs src/js/main.js -c -m \
	    -o dist/js/main.js; \
	fi

main.css: src/scss/main.scss
	@if [ "$(ENV)" = "development" ]; then \
	  sass src/scss/main.scss dist/css/main.css --style compressed; \
	else \
	  sass src/scss/main.scss dist/css/main.css --style compressed \
	     --sourcemap=none; \
	fi

images: src/img/*
	cp src/img/icon.png dist/img/icon.png
	cp src/img/rotate-image-on-canvas2.png dist/img/rotate-image-on-canvas2.png

clean:
	rm -f dist/js/main.js
	rm -f dist/js/main.js.map
	rm -f dist/css/main.css
	rm -f dist/css/main.css.map
	rm -f dist/img/icon.png
	rm -f dist/img/rotate-image-on-canvas2.png
