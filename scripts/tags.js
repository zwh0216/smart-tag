const { exec } = require('child_process')
const { outputLog } = require('./utils')
const { getFileVersion } = require('./fileInfo')

/**
 * 获取包含当前所打tag的所有tag号
 * @param {string} version 当前所打tag的前置版本
 * @returns {string}
 */
const getAllTags = (version) => {
  return new Promise((resolve, reject) => {
    exec(`git tag -l ${version}.*`, (err, stdout) => {
      if (err) {
        outputLog('请检查package.json的version', err)
        reject(err)
      }

      resolve(stdout ?? '')
    })
  })
}

/**
 * 获取当前所打tag的最大小版本
 * @param {string} version 当前所打tag的前置版本
 * @returns {number} 返回最新的tag小版本
 */
const getNewSubVersion = async (version) => {
  // 获取当前大版本的所有tag
  const tagStr = await getAllTags(version)
  // 如果为搜索到，表示还没有
  if (!tagStr) return 0

  // 计算当前已创建的最大小版本号，并+1
  let maxNumber = 0
  const list = tagStr?.split('\n')
  for (const tag of list) {
    if (!tag) continue
    const numberList = tag?.split('.')
    const number = numberList?.pop()
    if (tagNum > number) {
      maxNumber = tagNum
    }
  }
  return maxNumber + 1
}

/**
 * 获取最新的tag号
 * @param {string} version 版本
 * @param {string} subVersion 小版本
 * @returns 最新的tag号
 */
const getNewTag = async (needSubVersion) => {
  /**
   * 根据从package.json中获取的大版本号，在git中检索其最大的小版本号。
   * 例如：我们在package.json中找到的大版本号是1.0.0
   * 我们通过检索得到1.0.0.0、1.0.0.1、1.0.0.2等tag号，我们通过计算可以得出当前最大的小版本号为2
  */
  const { version } = await getFileVersion({ needSubVersion })
  const subVersion = await getNewSubVersion(version)
  // const subVersion = parseInt(maxSubVersion) + 1
  return version + '.' + subVersion
}

/**
 * 创建本地tag
 * @param {string} tag 需要打tag的版本号
 */
const gitTag = async (tag, comment) => {
  return new Promise((resolve, reject) => {
    const cmd = `git tag -a ${tag} -m "${comment ?? tag}"`
    exec(cmd, (error, stdout) => {
      if (error) {
        outputLog('创建本地tag失败', error)
        reject(error)
      }
      resolve(stdout ?? '')
    })
  })
}

/** 获取远程仓库名称 */
const getRemoteName = async () => {
  return new Promise((resolve, reject) => {
    const cmd = 'git remote'
    exec(cmd, (err, stdout) => {
      if (err) {
        outputLog('获取远程仓库名称失败', err)
        reject(err)
      }
      resolve(stdout ?? 'origin')
    })
  })
}

/** 推送tag到远程仓库  */
const pushTag = async (tag) => {
  let remoteName = await getRemoteName()
  remoteName = remoteName?.replace('\n', '')
  return new Promise((resolve, reject) => {
    const cmd = `git push ${remoteName} ${tag}`
    exec(cmd, (error, stdout) => {
      if (error) {
        outputLog('推送tag到远程仓库异常', error)
        reject(error)
      }

      outputLog('已提交新tag', `${tag} comment: `)
      resolve(stdout ?? '')
    })
  })
}

module.exports = {
  getAllTags,
  getMaxSubVersion,
  getNewTag,
  gitTag,
  pushTag,
  getRemoteName
}
