const fs = require('fs')

const getFileVersion = ({ needSubVersion = false }) => {
  return new Promise((resolve, reject) => {
    // 获取当前执行命令的终端所处路径
    const execPath = process.cwd()

    // 读取package.json文件
    fs.readFile(`${execPath}/package.json`, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      }
      // 读取成功，解析json文件，获取version属性
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
