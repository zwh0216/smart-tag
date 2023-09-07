const fs = require('fs')

const getFileVersion = ({ needSubVersion = false }) => {
  return new Promise((resolve, reject) => {
    const execPath = process.cwd()
    fs.readFile(`${execPath}/package.json`, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      }
      const json = data ? JSON.parse(data) : { version: void 0, subVersion: void 0 }
      resolve({
        version: json.version,
        subVersion: needSubVersion ? json.subVersion : void 0
      })
    })
  })
}

module.exports = {
  getFileVersion
}
