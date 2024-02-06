const fs = require("fs");
const path = require("path");

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath); // bu dosyanın içindeki dosyaya gitmek için
  fs.unlink(filePath, (err) => console.log(err));
};

module.exports = clearImage;
