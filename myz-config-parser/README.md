# myz-config-parser

[![Build Status](https://travis-ci.org/myuzu-net/myz-config-parser.svg?branch=master)](https://travis-ci.org/myuzu-net/myz-config-parser)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/1qptb432evmkrrol?svg=true)](https://ci.appveyor.com/project/valera-rozuvan/myz-config-parser)
[![Coverage Status](https://coveralls.io/repos/github/myuzu-net/myz-config-parser/badge.svg)](https://coveralls.io/github/myuzu-net/myz-config-parser)

myuzu config parser

## Description

1. This module will create a JS object from a number of configuration files.
The object will describe fully all aspects of a myuzu site.
2. This module expects one parameter - a string which holds the full path
of the main myuzu configuration file. The path should be absolute.
3. This module will parse any additional configuration files (as specified in
the main configuration file).
4. All configuration files should be valid JSON files.
5. The module will return a promise. If all configuration files are parsed
successfully, the promise will be resolved. If at least one configuration
file is malformed, the promise will be rejected.
6. The returned promise (in the case of success) will carry a JS object with
all myuzu site configuration properties.
7. In case of parse error, the error will contain information as to what went
wrong during parsing.
8. On consecutive calls, the module will be able to provide hashed
configuration object. If requested, it can re-parse already parsed JSON
configuration files and update the in-memory JS configuration object.
