var CommandLine = {

  big: function () {
    var spawn = require('child_process').spawn
    var ls = spawn('big', ['-p', '/Users/mmoaay/Documents/eleme/LPDTeamiOS', 'feature', 'start', 'hello'])
    ls.stdout.on('data', (data) => {
      // this.$message('这是一条消息提示')
      console.log(data.toString())
      this.$message(data.toString())
    })

    ls.stderr.on('data', (data) => {
      // this.$message('这是一条消息提示')
      console.log(data.toString())
      this.$message(data.toString())
    })

    ls.on('close', (code) => {
      // this.$message('这是一条消息提示')
      console.log(code.toString())
      this.$message(code.toString())
    })
  }
}

module.exports = CommandLine
