const gen = require(`./generate`)
const program = require('commander')

program
  .version('0.0.1')
  .option('-i, --swagger-file <value>', `path or URL to swagger file`)
  .option('-c, --class-name [value]', `Name the one generated class. Defaults to GeneratedAPI`)
  .option('-o, --output [value]', `output file path. Defaults to the class name`)
  .parse(process.argv);

gen(program.swaggerFile, program.className || "GeneratedAPI")
