const { getFileVersion } = require('./fileInfo')
const { getMaxSubVersion } = require('./tags')

const autoTag = async (commander) => {
  const options = commander.opts()
  const { production, saveProduction } = options || {}
  if (production || saveProduction) {
    const { version } = await getFileVersion({ needSubVersion: saveProduction })
    const maxSubVersion = await getMaxSubVersion(version)
    console.log('maxSubVersion ->', maxSubVersion)
  }
}

module.exports = {
  autoTag
}
