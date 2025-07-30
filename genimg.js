/**
 * @flow
 */
const path = require("path");
const fs = require("fs");
// const chalk = require('chalk')
const argv = require("yargs-parser")(process.argv.slice(1));

String.prototype.format = function() {
  let a = this;
  for (let k in arguments) {
    a = a.replace(("{" + k + "}").toRegex("g"), arguments[k]);
  }
  return a;
};

String.prototype.toRegex = function(option = "i") {
  let regexStr = this.replace(/[\.\*\+\?\^\$\{\}\(\)\|\[\]\\]/g, "\\$&");
  regexStr = regexStr.replace(/\s/g, "\\s?");
  // console.log("regex: {0}".format(regexStr));
  return new RegExp(regexStr, option);
};
const getFileName = (file) => {
  var fileNameMatch = file.match(/^(.+)\.[^\.]+$/);
  console.log("fileNameMatch: ", fileNameMatch);
  return fileNameMatch && fileNameMatch[1].replace(/[\s-\+]+/g, "_");
};

// console.log(argv);
const folder = argv._[1];
console.log("folder", folder);
var match = folder.match(/^(.+\/([^\/]+))\/?$/);
console.log("====>", match);

var output = match && "{0}/{1}.tsx".format(match[1], match[2]);
output = argv.output || argv.o || output;
console.log("output: ", output);
let outputMatch = output.match(/^(?:(.*)\/)?([^\/]+)$/);
console.log("outputMatch", outputMatch);
let outputName = outputMatch[2];
let outputPath = outputMatch[1] || ".";
// console.log(`${chalk.green('Output: ')}`, outputPath)
let requirePath = path.relative(outputPath, folder);
let template = `{0}
export type ImagesType = {
  {1}
};
const images = {
  {2}
};
export default images;`;

fs.readdir(folder, (err, files) => {
  if (err) {
    return console.error(err);
  }
  var import_code = [];

  var type_code = [];
  var variable_code = [];
  files.forEach((file) => {
    if (file.match(/@\dx\.(png|jpg)/)) return;
    var fileName = getFileName(file);

    if (fileName) {
      import_code.push(
        `import {0} from "{1}/{2}";`.format(fileName, requirePath, file)
      );

      type_code.push(`{0}: string;`.format(fileName));
      variable_code.push(`{0},`.format(fileName));
      // console.log(strCode)
      //   import ic_cinema from "../assets/images/ic_cinema.svg";
    }
  });

  let code = template.format(
    import_code.join("\n"),
    type_code.join("\n  "),
    variable_code.join("\n  ")
  );
  // console.log(code)
  fs.writeFileSync(output, code);
});
