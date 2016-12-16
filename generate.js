const fs = require('fs')
const CodeGen = require('./lib/codegen').CodeGen
const http = require('http');

let swaggerFile = 'swagger.json';
let className = "GeneratedAPI"

function main(swaggerFile, className, out) {
  let swagger = JSON.parse(fs.readFileSync(swaggerFile, 'UTF-8'))

  let tsSourceCode = CodeGen.getTypescriptCode({
    className: className,
    swagger: swagger
  })

  let outFile = out ? out : `./${className}.ts`
  fs.writeFileSync(outFile, tsSourceCode)
}

// run the function if called with node gen.js
if (require.main === module) {
  main(swaggerFile, className, `${className}.ts`)
}

module.exports = main
