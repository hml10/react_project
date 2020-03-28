# 一个市值 13 亿的 React 项目管理

## ① 初始化脚手架和 antd

1. 进入 https://ant.design/docs/react/introduce-cn andt 网址 进入在 create-react-app 中使用（高级配置）

2. 引入 react-app-rewired 并修改 package.json 里的启动配置，然后在项目根目录创建一个 config-overrides.js 用于修改默认配置

3. 引入 babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件（原理）

4. 引入 customize-cra 中提供的 less 相关的函数 addLessLoader 来帮助加载 less 样式（处理 less 文件）

5. yarn add antd 下载安装 antd

## ② 搭建路由

1. 路由安装所需的库 yarn add react-router-dom （1.路由组件和普通组件区别？2.路由组件比一般组件身上多了些什么?）

2. 引入路由，搭建完成 login 和 admin 一级路由

## ③ login 基本静态页面

1. 实现 login 用户声明式验证和自定义密码的验证
