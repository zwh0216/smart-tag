const { getFileVersion } = require('./getFileInfo')
const { getAllTags } = require('./tags')

const autoTag = async (commander) => {
  const options = commander.opts()
  const { production } = options || {}
  const version = await getFileVersion({ needSubVersion: production })
  const tagList = await getAllTags(version)
  console.log('tagList ->', tagList)
}

module.exports = {
  autoTag
}
