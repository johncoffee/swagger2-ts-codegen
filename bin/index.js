const gen = require(`../src/generate`)
const program = require('commander')

program
  .version('1.0.0')
  .option('-i, --swagger-file [value]', `path or URL to swagger file`)
  .option('-c, --class-name [value]', `Name the one generated class. Defaults to GeneratedAPI`)
  .option('-o, --output [value]', `output file path. Defaults to the class name`)
  .parse(process.argv);

if (program.swaggerFile) {
  gen(program.swaggerFile, program.className || "GeneratedAPI")
}
else {
  console.log("No swagger file defined! Try -h for available program arguments.")
}
