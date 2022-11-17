#!/bin/bash

echo "Cleaning up old index.js file..."
rm -rf scripts/index*.js
echo -e "Done!\n\n"

echo "Running r.js optimizer..."
node r.js -o build.js
echo -e "Done!\n\n"

echo "Minifying JS code using uglifyjs..."
uglifyjs scripts/index.js -o scripts/index.js
echo -e "Done!\n"

exit 0
