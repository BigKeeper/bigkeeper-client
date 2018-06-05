var CommandLine = {
  post: function (command, completion) {
    var spawn = require('child_process').spawn
    let shellEnv = require('shell-env')
    var ls = spawn(command.name, command.params, { env: shellEnv.sync() })

    var success = 'true'

    ls.stdout.on('data', (data) => {
      completion(CommandLine.parseData(data))
    })
    ls.stderr.on('data', (data) => {
      console.log(data.toString())
      if (data.toString().indexOf('error: ') === -1) {
        completion(CommandLine.parseData(data))
      } else {
        success = 'false'
        this.$alert(CommandLine.parseStderr(data), 'Error', {
          confirmButtonText: 'Confirm'
        })
      }
    })
    ls.on('close', (code) => {
      console.log('code: ' + code)
      completion(success)
    })
  },
  parseData: function (data) {
    var str = data.toString()
    if (str.match(/\[\d+;\d+;\d+m/) !== null) {
      str = str.replace(/\[\d+;\d+;\d+m/, '')
      str = str.replace(/\[\d+m/, '')
      str = str.substr(1, str.length - 3)
    }
    return str
  },
  parseStderr: function (stderr) {
    var str = stderr.toString()

    str = str.substr(str.indexOf('error: '))

    if (str.match(/\[\d+;\d+;\d+m/) !== null) {
      str = str.replace(/\[\d+;\d+;\d+m/, '')
      str = str.replace(/\[\d+m/, '')
    }
    return str
  },
  get: function (command, completion) {
    const { exec } = require('child_process')
    let shellEnv = require('shell-env')
    exec(command, { env: shellEnv.sync() }, (error, stdout, stderr) => {
      if (error) {
        this.$alert(CommandLine.parseStderr(error), 'Error', {
          confirmButtonText: 'Confirm'
        })
        completion(null)
        return
      }
      if (stderr) {
        let stderrMessage = CommandLine.parseStderr(stderr)
        this.$alert(stderrMessage, 'Error', {
          confirmButtonText: 'Confirm'
        })
        completion(null)
        return
      }
      // console.log(stdout)
      console.log(CommandLine.parseData(stdout))
      completion(JSON.parse(CommandLine.parseData(stdout)))
    })
  }
}

module.exports = CommandLine
