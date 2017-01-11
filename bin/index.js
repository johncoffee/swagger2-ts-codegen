var gen = require('../src/generate')
var program = require('commander')

program
  .version('1.0.0')
  .option('-i, --swagger-file [value]', 'path or URL to swagger file')
  .option('-c, --class-name [value]', 'Name the one generated class. Defaults to GeneratedAPI')
  .option('-o, --output [value]', 'output file path. Defaults to the class name')
  .parse(process.argv);

gen(program.swaggerFile, program.className, program.output)
