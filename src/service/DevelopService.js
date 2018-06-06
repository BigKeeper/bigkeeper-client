var DevelopService = {
  getCurrentModules: function (homePath) {
    try {
      var path = require('path')
      let file = path.normalize(homePath + '/.bigkeeper/module.cache')

      let rf = require('fs')
      let data = rf.readFileSync(file, 'utf-8')
      console.log(data)
      let json = JSON.parse(data)

      return json
    } catch (error) {
      return null
    }
  }
}

module.exports = DevelopService
