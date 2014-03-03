checkbower
==========

v0.2.1

Validates your bower.json file

[![Build Status](https://travis-ci.org/ruyadorno/checkbower.png?branch=master)](https://travis-ci.org/ruyadorno/checkbower)


## About

checkbower is a small [Node.js](http://nodejs.org/) module to help you verify wether a given [bower.json](https://github.com/bower/bower.json-spec) file is valid, containing at the very least a name and a [semver](http://semver.io/) valid version number.

It also runs as a small command-line tool to help you verify your bower.json file in a day-to-day basis. Ideal to integrate in a pre-commit hook.


## Setup

In order to use it as a command-line tool, install it using npm:

    npm install -g checkbower


## Usage

The command-line tool can be used to valid the `bower.json` file of the actual folder simply by running:

    checkbower

Or you can also specify a path of a bower.json file to validate:

    checkbower ./path/to/bower.json

### Programatic usage

The core functionality for bower.json file validation can also be used programatically on any node.js app:

```js
  var checkbower = require('checkbower');

  if (checkbower('path/to/bower.json')) {
    // You have a valid file
  } else {
    // The file is not valid
  }
```


## License

Released under the MIT license
