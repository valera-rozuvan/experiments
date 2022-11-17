# JavaScript Experiments

## Introduction

This place will exist for simple JavaScript experimenting. Cool language features, suggestions, and ideas will go here.

To see it live, visit [https://valera-rozuvan.github.io/javascript-experiments/](https://valera-rozuvan.github.io/javascript-experiments/).

## Build instructions

Make sure you have [git](https://github.com/git/git) and
[node](https://github.com/joyent/node) installed. Then follow the simple
instructions below.

    git clone git@github.com:valera-rozuvan/javascript-experiments.git
    cd javascript-experiments/build
    ./build.sh
    cd ..
    sensible-browser index.html

## Known issues

When running things locally, some browsers set certain restrictions on local
file access via JavaScript. To turn off these restrictions, you can try one
of the following (depending on your browser).

### Safari

Enable the develop menu using the preferences panel, under Advanced -> "Show develop menu in menu bar"

Then from the safari "Develop" menu, select "Disable local file restrictions", it is also worth noting safari has some odd behaviour with caches, so it is advisable to use the "Disable caches" option in the same menu; if you are editing & debugging using safari.

### Chrome

Start Chrome executable with a command line flag:

```
chrome --allow-file-access-from-files
```

On Windows, the easiest is probably to create a special shortcut which has added flag (right-click on shortcut -> properties -> target).

### Firefox

1. Go to `about:config`
2. Find `security.fileuri.strict_origin_policy` parameter
3. Set it to `false`
