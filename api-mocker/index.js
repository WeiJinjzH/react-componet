const common = require('./common.mock')
const menu = require('./menu.mock')
const user = require('./user.mock')

const proxy = {
    ...common,
    ...menu,
    ...user,
}
module.exports = proxy
