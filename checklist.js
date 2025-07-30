const fs = require("fs");
const path = require("path");
const glob = require("glob");
const archiver = require("archiver");

////// check zip
const folderToZip = path.join("./", "dist");
const outputZipFile = path.join("./", "dist.zip");

const output = fs.createWriteStream(outputZipFile);
const archive = archiver("zip", {
  zlib: { level: 9 }, // Mức độ nén, từ 1 (nhanh) đến 9 (nén tốt nhất)
});

const _passLog = (mess) => {
  console.log(`\x1b[32m ✔ ${mess}\x1b[0m`);
};

const _failLog = (mess) => {
  console.log(`\x1b[31m ✘ ${mess}\x1b[0m`);
};

output.on("close", function() {
  const fileSizeInBytes = fs.statSync(outputZipFile).size;
  const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(4);

  if (fileSizeInMB < 1.5) {
    _passLog(`Dung lượng zip passed: ${fileSizeInMB} MB`);
  } else {
    _failLog(`Dung lượng zip failed: ${fileSizeInMB} MB`);
  }
  fs.unlinkSync(outputZipFile);
});
archive.on("error", function(err) {
  throw err;
});
archive.pipe(output);
archive.directory(folderToZip, false);
archive.finalize();

////// check ảnh

function checkLargeFiles(folderPath, sizeThresholdKB) {
  const largeFiles = [];
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    if (fs.statSync(filePath).isFile()) {
      const fileSizeInBytes = fs.statSync(filePath).size;
      const fileSizeInKB = fileSizeInBytes / 1024;

      if (fileSizeInKB > sizeThresholdKB) {
        largeFiles.push({
          file: filePath,
          sizeKB: fileSizeInKB.toFixed(2),
        });
      }
    } else if (fs.statSync(filePath).isDirectory()) {
      largeFiles.push(...checkLargeFiles(filePath, sizeThresholdKB));
    }
  });

  return largeFiles;
}

const folderToCheck = path.join("./src/assets", "images");
const sizeThresholdKB = 70;

const largeFiles = checkLargeFiles(folderToCheck, sizeThresholdKB);

if (largeFiles.length > 0) {
  _failLog("Vẫn còn những ảnh dung lượng quá lớn");
  largeFiles.forEach((file) => {
    console.log(`\x1b[31m   ${file.file} - ${file.sizeKB} KB\x1b[0m `);
  });
} else {
  _passLog("Dung lượng ảnh passed");
}

/// kiểm tra package json
const packageJsonContent = fs.readFileSync("package.json", "utf8");
if (packageJsonContent.includes("eruda")) {
  _failLog("Chưa xoá lib eruda trong package.json");
}

const lines = packageJsonContent.split("\n");
const linesWithCaret = lines.filter((line) => line.includes("^"));

if (linesWithCaret.length > 0) {
  _failLog("Chưa set hết version cố định trong package.json");
  linesWithCaret.forEach((line, index) => {
    console.log(`\x1b[31m   ${index + 1}: ${line}\x1b[0m`);
  });
}

/// remove console.log

const data_babel = `module.exports = {
  presets: [
    [
      "vnmf",
      {
        framework: "preact",
        ts: true,
      },
    ],
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "@vnmfify/core",
        libraryDirectory: "",
        style: true,
      },
      "@vnmfify/core",
    ],
    [
      "import",
      {
        libraryName: "@vnmfify/icons",
        libraryDirectory: "",
        camel2DashComponentName: false,
        style: () => "@vnmfify/icons/style",
      },
      "@vnmfify/icons",
    ],
    ["transform-remove-console"],
  ],
};
`;

try {
  fs.writeFileSync("babel.config.js", data_babel, "utf8");
  _passLog("Đã remove console.log");
} catch (err) {
  _failLog("Xảy ra lỗi khi remove console.log");
  console.log(err);
}

/// check lib ko dùng
const packageJson = require("./package.json");
const allDependencies = {
  ...packageJson.dependencies,
};
const unusedDependencies = {};

const srcFolder = "./src";
function checkIfUsed(libName) {
  const pattern = path.join(srcFolder, "**/*.tsx"); // Kiểm tra tất cả các file .tsx trong thư mục src
  const files = glob.sync(pattern);

  for (const file of files) {
    const fileContent = fs.readFileSync(file, "utf-8");

    // Kiểm tra xem thư viện có được `require` hoặc `import` trong file này không
    if (fileContent.includes(`${libName}`)) {
      return true;
    }
  }
  return false;
}

// Duyệt qua tất cả dependencies và kiểm tra xem chúng có được sử dụng không
Object.keys(allDependencies).forEach((libName) => {
  if (
    !libName.includes("@vnxjs") &&
    !libName.includes("babel") &&
    !libName.includes("preact")
  ) {
    const used = checkIfUsed(libName);
    if (!used) {
      unusedDependencies[libName] = allDependencies[libName];
    }
  }
});

// In ra các thư viện không được sử dụng
if (Object.keys(unusedDependencies).length > 0) {
  _failLog("Các thư viện sau ko được import trong project");
  Object.keys(unusedDependencies).forEach((lib, index) => {
    console.log(
      `\x1b[31m   ${index + 1}:     ${lib}: ${unusedDependencies[lib]}\x1b[0m`
    );
  });
} else {
  console.log("All dependencies are used in the project.");
}
