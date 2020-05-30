// 问题交互
const inquirer = require('inquirer')

var chooseType = function () {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'projectType',
      message: '请选择创建项目类型',
      choices: ['Vue', 'React', 'library', 'library(Typescript)'],
    },
    {
      name: 'description',
      message: '请输入项目描述',
    },
    {
      name: 'author',
      message: '请输入项目作者',
    },
  ])
}
module.exports = chooseType
