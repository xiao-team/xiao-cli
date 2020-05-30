#!/usr/bin/env node
// 处理用户输入的命令
const program = require('commander')
// 下载模板
const download = require('download-git-repo')

// node 文件模块
const fs = require('fs')

// 填充信息至文件
const handlebars = require('handlebars')
// 动画效果
const ora = require('ora')
// 字体加颜色
const chalk = require('chalk')
// 显示提示图标
const symbols = require('log-symbols')
// 命令行操作
var shell = require('shelljs')

var chooseType = require('./chooseType.js')
var installModules = require('./installModules.js')

// 不同项目的git地址
const gitAddress = {
  Vue: 'xiao-team/xiao-cli-template#vue',
  library: 'xiao-team/xiao-cli-template#library',
}
program
  .version(require('../package').version)
  .command('init <name>')
  .action(function (name) {
    chooseType().then(answers => {
      const spinner = ora('模板下载中...')
      spinner.start()
      download(gitAddress[answers.projectType], name, err => {
        if (err) {
          spinner.fail()
          console.log(symbols.error, chalk.red(err))
        } else {
          spinner.succeed()
          const fileName = `${name}/package.json`
          const meta = {
            name,
            description: answers.description,
            author: answers.author,
          }
          if (fs.existsSync(fileName)) {
            const content = fs.readFileSync(fileName).toString()
            const result = handlebars.compile(content)(meta)
            fs.writeFileSync(fileName, result)
          }
          console.log(symbols.success, chalk.green('模板下载成功!'))

          installModules(name)
        }
      })
    })
  })

program.parse(process.argv)
