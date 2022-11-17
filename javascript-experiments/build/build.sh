#!/bin/sh
rm -rf ../js_author/main.min.js
node r.js -o build.js
cat license.frag > ../js_author/main.min.js
cat main.min.js >> ../js_author/main.min.js
rm -rf main.min.js
exit 0
