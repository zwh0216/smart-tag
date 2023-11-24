const { outputLog } = require('./utils')
const { getNewTag, gitTag, pushTag } = require('./tags')

const autoTag = async (commander) => {
  const options = commander.opts()
  const { production, saveProduction, comment } = options || {}
  if (production || saveProduction) {
    // 计算新tag号
    const tag = await getNewTag(saveProduction)

    // 本地打tag，并且推送至远程仓库
    try {
      await gitTag(tag, comment)
      await pushTag(tag)
    } catch (err) {
      outputLog(err)
    }
  }
}

module.exports = {
  autoTag
}
