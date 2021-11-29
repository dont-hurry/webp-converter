const { count } = require("console");
const fs = require("fs");
const sharp = require("sharp");

const IGNORED_FILENAMES = [".DS_Store"];

const inputDirectory = "input-images";
const outputDirectory = "output-images";

const inputFilenameList = fs.readdirSync(inputDirectory);
const totalCount = { converted: 0, ignored: 0 };

async function main() {
  for (const inputFilename of inputFilenameList) {
    if (IGNORED_FILENAMES.includes(inputFilename)) {
      console.log(`Ignored: ${inputFilename}`);
      totalCount.ignored++;
      continue;
    }

    const inputFilepath = `${inputDirectory}/${inputFilename}`;

    const outputFilename = replaceFilenameExtension(inputFilename, ".webp");
    const outputFilepath = `${outputDirectory}/${outputFilename}`;

    try {
      await sharp(inputFilepath).webp().toFile(outputFilepath);
      console.log(`Converted: ${outputFilepath}`);
      totalCount.converted++;
    } catch (error) {
      console.error(error, `input filepath = ${inputFilepath}`);
    }
  }

  console.log(
    `converted: ${totalCount.converted}`,
    `ignored: ${totalCount.ignored}`
  );
}

function replaceFilenameExtension(filename, targetExtension) {
  const arr = filename.split(".");
  arr[arr.length - 1] = targetExtension;
  return arr.join("");
}

main();
