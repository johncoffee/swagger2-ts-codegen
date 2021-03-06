var fs = require('fs')
var CodeGen = require('../lib/codegen').CodeGen
var http = require('http');
var path = require('path');

function generate (swaggerFile, className, outFile) {
  className = className || "GeneratedAPI"
  swaggerFile = swaggerFile || "swagger.json"
  outFile = outFile || path.join(__dirname, className + '.ts')

  var swagger = JSON.parse(fs.readFileSync(swaggerFile, 'UTF-8'))

  var tsSourceCode = CodeGen.getTypescriptCode({
    className: className,
    swagger: swagger,
    templates: path.join(__dirname, "/templates/")
  })

  fs.writeFileSync(outFile, tsSourceCode)
}

module.exports = generate
