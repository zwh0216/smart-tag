const { getFileVersion } = require('./getFileInfo')
const { getAllTags } = require('./tags')

const autoTag = async () => {
  const version = await getFileVersion()
  const tagList = await getAllTags(version)
  console.log('tagList ->', tagList);
}

module.exports = {
  autoTag
}