import fs from "fs";
import path from "path";

const clearImage = (filePath: string) => {
  filePath = path.join(__dirname, "..", filePath); // bu dosyanın içindeki dosyaya gitmek için
  fs.unlink(filePath, (err) => console.log(err));
};

export default clearImage;
