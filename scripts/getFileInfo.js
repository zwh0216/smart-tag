const fs = require('fs')

const getFileVersion = () => {
  return new Promise((resolve, reject) => {
    const execPath = process.cwd()
    fs.readFile(`${execPath}/package.json`, 'utf-8', (err, data) => {
      if(err){
        reject(err)
      }
      if(data){
        const json = JSON.parse(data)
        resolve(json.version)
      }
      resolve('')
    })
  })
}

module.exports = {
  getFileVersion
}