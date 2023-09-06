const { exec } = require('child_process')

/**
 * 获取包含当前所打tag的所有tag号
 * @param {string} version 当前所打tag的前置版本
 * @returns {string}
 */
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

/**
 * 获取当前所打tag的最大小版本
 * @param {string} version 当前所打tag的前置版本
 * @returns {number} 返回最新的tag小版本
 */
const getMaxSubVersion = async (version) => {
  const tagStr = await getAllTags(version)
  const list = tagStr?.split('\n')
  let maxNumber = 0
  for (const tag of list) {
    if (!tag) continue
    const tagNumList = tag?.split('.')
    const tagNum = tagNumList?.pop()
    if (tagNum > maxNumber) {
      maxNumber = tagNum
    }
  }
  return maxNumber
}

const getNewTag = (version) => {}

const gitTag = (version) => {}

module.exports = {
  getAllTags,
  getMaxSubVersion,
  getNewTag,
  gitTag
}
