const { Transform } = require("node:stream");
const fs = require("fs/promises");
const { log } = require("node:console");
class Encrypt extends Transform {
  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; ++i) {
      chunk[i] = chunk[i] * 2;
    }
    callback(null, chunk);
  }
}

(async () => {
  const readFile = await fs.open("read.txt", "r");

  const writeFile = await fs.open("write.txt", "w");

  const readStream = readFile.createReadStream();
  const writeStream = writeFile.createWriteStream();

  const encrypt = new Encrypt();

  readStream.pipe(encrypt).pipe(writeStream);
})();
