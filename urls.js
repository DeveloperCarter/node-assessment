const axios = require("axios");
const process = require("process");
const fs = require("fs");
const readline = require("readline");

const urls = [];

async function processLineByLine(callback) {
  try {
    let file = process.argv[2];
    const fileStream = fs.createReadStream(file);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (let line of rl) {
      urls.push(line);
      console.log("File read");
    }
  } catch (err) {
    console.log(err);
  }
}
async function readArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    fileName = arr[i];
    console.log(fileName);
    let html = await axios.get(arr[i]);
    fs.writeFile(
      `${fileName}.txt`,
      "New file with html response",
      function (err) {
        if (err) throw err;
        console.log("file not read correctly");
      }
    );
    console.log("File created successfully");
  }
}

async function readArray() {
  try {
    await processLineByLine();
    for await (i of urls) {
      const fileName = i.slice(7);
      let html = await axios.get(i);
      await fs.writeFile(
        `./${fileName}.txt`,
        html.data,
        { flag: "wx" },
        function (err) {
          if (err) throw err;
          console.log("file not read correctly");
        }
      );
      console.log("successfully created and wrote to file");
    }
  } catch (err) {
    console.error(err);
  }
}
readArray();
