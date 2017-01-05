const fs = require('fs')
const CodeGen = require('../lib/codegen').CodeGen
const http = require('http');
const path = require('path');

function generate (swaggerFile, className, outFile) {
  className = className || "GeneratedAPI"
  swaggerFile = swaggerFile || "swagger.json"
  let swagger = JSON.parse(fs.readFileSync(swaggerFile, 'UTF-8'))
  outFile = outFile || `./${className}.ts`

  let tsSourceCode = CodeGen.getTypescriptCode({
    className: className,
    swagger: swagger,
    templates: path.join(__dirname, "/templates/")
  })

  fs.writeFileSync(outFile, tsSourceCode)
}

module.exports = generate
