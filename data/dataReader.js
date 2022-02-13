const fs = require('fs');

let bufferString;
let bufferStringSplit;

async function counter(pathToFile, callback) {
  fs.readFile(pathToFile, (err, data) => {
    bufferString = data.toString();
    bufferStringSplit = bufferString.split('\n');
    callback();
  });
}

function logMyNumber() {
  console.log(bufferStringSplit.length - 1);
}

const foo = async (pathToFile) => counter(pathToFile, logMyNumber);

const fileReaderSync = (pathToFile) => {
  const result = fs.readFileSync(pathToFile, 'utf8');
  return result;
};

module.exports = {
  fileReaderSync,
  foo,
};

// exports.s = async (fileDir) => {
//   let data = null;
//   try {
//     fs.readFile(fileDir, 'utf8', (err, fileData) => {
//       if (err) {
//         console.error(err);
//         throw err;
//       }
//       data = fileData;
//       // console.log(data)
//     });
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
//   console.log(data)
//   return data;
// };

// exports.module.readContent = (fileDir, callback) => {
//   fs.readFile(fileDir, 'utf8', function (err, content) {
//       if (err) return callback(err)
//       callback(null, content)
//   })
// }

// exports.readFile = async (fileDir) => {
//   console.log('mierdaca 1');

//   console.log('mierdaca 3');
// }
