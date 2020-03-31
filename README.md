# 基于 React 脚手架的管理项目

## 一、 初始化脚手架和 antd day_1

1. 进入 https://ant.design/docs/react/introduce-cn andt 网址 进入在 create-react-app 中使用（高级配置）

2. 引入 react-app-rewired 并修改 package.json 里的启动配置，然后在项目根目录创建一个 config-overrides.js 用于修改默认配置

3. 引入 babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件（原理）

4. 引入 customize-cra 中提供的 less 相关的函数 addLessLoader 来帮助加载 less 样式（处理 less 文件）

5. yarn add antd 下载安装 antd

### 搭建路由

1. 路由安装所需的库 yarn add react-router-dom （1.路由组件和普通组件区别？2.路由组件比一般组件身上多了些什么?）

2. 引入路由，搭建完成 login 和 admin 一级路由

### login 基本静态页面

1. 实现 login 用户声明式验证和自定义密码的验证

## 二、 axios 发送请求和代理解决跨域问题 day_2

1. 下载 yarn add axios 包并引入 用来发送请求

2. 在 json 中加上 "proxy": "http://localhost:4000"(在3000开启一个代理服务器，拦截所有3000的请求，随后转发给4000)

3. 使用 axios 请求拦截和响应拦截器解决 接收到对象问题

4. 给 login 附带假进度条 yarn add nprogress 网址：https://github.com/rstacruz/nprogress

## 三、 继续完善登录页面+redux day_3

1. 完成登录跳转至 admin 管理页面

2. 编写最不喜欢的 redux 环境 下载 yarn add redux react-redux redux-thunk redux-devtools-extension

3. localStorage 保存用户的信息读取出来交给 redux

4. 给 login 和 admin 加权限的校验 (登录了进入 admin 没有登陆 就重定向到 login 页面) (阻止网页直接输入跳转等。。。)

5. 简单退出登录功能
