const { getFileVersion } = require('./fileInfo')
const { getMaxSubVersion, getNewTag, gitTag, pushTag } = require('./tags')

const autoTag = async (commander) => {
  const options = commander.opts()
  const { production, saveProduction, comment, test } = options || {}
  console.log('test ->', test);
  if (production || saveProduction) {
    const { version } = await getFileVersion({ needSubVersion: saveProduction })
    const maxSubVersion = await getMaxSubVersion(version)
    const newSubVersion = parseInt(maxSubVersion) + 1
    const tag = getNewTag(version, newSubVersion)
    await gitTag(tag, comment)
    await pushTag(tag)
  }
}

module.exports = {
  autoTag
}
