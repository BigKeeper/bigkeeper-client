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

  get: function (command, completion) {
    const { exec } = require('child_process')
    exec(command, (error, stdout, stderr) => {
      if (error) {
        this.$alert(error, 'Error', {
          confirmButtonText: 'Confirm'
        })
        return
      }
      // console.log(stdout)
      completion(JSON.parse(stdout))
    })
  }
}

module.exports = CommandLine
