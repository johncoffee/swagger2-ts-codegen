# Swagger Typescript Codegen

A hard fork of `swagger-js-codegen` made for typescript only.

# Installation

`npm install`
and
`typings install`


# Usage

Command line, using default class- and method templates:

`node bin/index.js -i swagger.json`
or
`node bin/index.js -i swagger.json -c MyApi -o ./build`

To use it programatically, copy the `src` folder into your codebase so you can modify the templates or generator to fit your needs. See the examples...


# Development tips

I found it super useful to `npm link` this module, while improving the default templates.


## Stuff

This codebase attempts to follow semver

This codebase attempts to follow the http://standardjs.com/ coding style
