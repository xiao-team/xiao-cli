const inquirer = require('inquirer')
// 动画效果
const ora = require('ora')
// 字体加颜色
const chalk = require('chalk')
// 显示提示图标
const symbols = require('log-symbols')
// 命令行操作
var shell = require('shelljs')
const dependenceShell = {
  npm: ' && npm i',
  cnpm: ' && npm i',
  'npm of taobao': ' && npm install --registry=https://registry.npm.taobao.org',
}
var installModules = function (name) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'ifInstall',
        message: '是否现在安装所需依赖?',
        default: true,
      },
    ])
    .then(answers => {
      if (answers.ifInstall) {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'installWay',
              message: '选择安装依赖的途径',
              choices: ['npm', 'cnpm', 'npm of taobao', 'quit'],
            },
          ])
          .then(ans => {
            if (ans.installWay !== 'quit') {
              let spinner = ora('安装中...')
              spinner.start()
              // 命令行操作安装依赖
              shell.exec(
                'cd ' + name + dependenceShell[ans.installWay],
                function (err, stdout, stderr) {
                  if (err) {
                    spinner.fail()
                    console.log(symbols.error, chalk.red(err))
                  } else {
                    spinner.succeed()
                    console.log(
                      symbols.success,
                      chalk.green('项目依赖安装成功!')
                    )
                  }
                }
              )
            }
          })
      } else {
        console.log(
          symbols.success,
          chalk.green('请进入' + name + '文件夹自行安装依赖')
        )
      }
    })
}

module.exports = installModules
