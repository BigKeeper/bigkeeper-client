var CommandLine = {
  post: function (command, completion) {
    var spawn = require('child_process').spawn
    var ls = spawn(command.name, command.params)
    ls.stdout.on('data', (data) => {
      completion(CommandLine.message(data))
    })
    ls.stderr.on('data', (data) => {
      this.$alert(CommandLine.errorMessage(data), 'Error', {
        confirmButtonText: 'Confirm'
      })
    })
    ls.on('close', (code) => {
      completion(null)
    })
  },
  message: function (data) {
    var str = data.toString()
    str = str.substring(str.indexOf('m'))
    str = str.substr(1, str.indexOf('[') - 1)

    return str
  },
  errorMessage: function (error) {
    var str = error.toString()
    str = str.substring(str.indexOf('error: '))
    str = str.substring(str.indexOf('m'))
    str = str.substr(1, str.indexOf('[') - 1)

    return str
  },
  get: function (command, completion) {
    const { exec } = require('child_process')
    exec(command, (error, stdout, stderr) => {
      if (error) {
        let errorMessage = CommandLine.errorMessage(error)
        this.$alert(errorMessage, 'Error', {
          confirmButtonText: 'Confirm'
        })
        completion(null)
        return
      }
      if (stderr) {
        let errorMessage = CommandLine.errorMessage(stderr)
        this.$alert(errorMessage, 'Error', {
          confirmButtonText: 'Confirm'
        })
        completion(null)
        return
      }
      completion(JSON.parse(stdout))
    })
  }
}

module.exports = CommandLine
