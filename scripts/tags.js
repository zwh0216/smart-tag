const { exec } = require('child_process')
const getAllTags = (version) => {
  return new Promise((resolve, reject) => {
    exec(`git tag -l ${version}.*`, (err, stdout) => {
      if (err) {
        reject(err)
      }

      if (stdout) {
        resolve(stdout)
      }
    })
  })
}

module.exports = {
  getAllTags
}
