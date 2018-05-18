var CommandLine = {
  post: function (command, completion) {
    var spawn = require('child_process').spawn
    var ls = spawn(command.name, command.params)
    ls.stdout.on('data', (data) => {
      // this.$message('这是一条消息提示')
      console.log(data.toString())
      this.$alert(data.toString(), 'Error', {
        confirmButtonText: 'Confirm'
      })
    })

    ls.stderr.on('data', (data) => {
      // this.$message('这是一条消息提示')
      console.log(data.toString())
      this.$alert(data.toString(), 'Error', {
        confirmButtonText: 'Confirm'
      })
    })

    ls.on('close', (code) => {
      // this.$message('这是一条消息提示')
      console.log(code.toString())
      this.$alert(code.toString(), 'Error', {
        confirmButtonText: 'Confirm'
      })
    })
  },
  message: function (error) {
    var str = error.toString()
    str = str.substring(str.indexOf('error: '))
    str = str.substring(str.indexOf('m'))
    str = str.substr(1, str.indexOf('.') + 1)

    return str
  },
  get: function (command, completion) {
    const { exec } = require('child_process')
    exec(command, (error, stdout, stderr) => {
      if (error) {
        let message = CommandLine.message(error)
        this.$alert(message, 'Error', {
          confirmButtonText: 'Confirm'
        })
        completion(null)
        return
      }
      if (stderr) {
        let message = CommandLine.message(stderr)
        this.$alert(message, 'Error', {
          confirmButtonText: 'Confirm'
        })
        completion(null)
        return
      }
      console.log(stdout)
      completion(JSON.parse(stdout))
    })
  }
}

module.exports = CommandLine
