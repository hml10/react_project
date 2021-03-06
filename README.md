# 基于 React 脚手架的管理项目--->运行项目 yarn start

## 一、 初始化脚手架和 antd day_1

1. 进入 https://ant.design/docs/react/introduce-cn andt 网址 进入在 create-react-app 中使用（高级配置）

2. 引入 react-app-rewired 并修改 package.json 启动配置，然后在项目根目录创建一个 config-overrides.js 用于修改默认配置

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

## 三、 完成登录页面 + redux day_3

1. 完成登录跳转至 admin 管理页面

2. 编写最不喜欢的 redux 环境 下载 yarn add redux react-redux redux-thunk redux-devtools-extension

3. localStorage 保存用户的信息读取出来交给 redux

4. 给 login 和 admin 加权限的校验 (登录了进入 admin 没有登陆 就重定向到 login 页面) (阻止网页直接输入跳转等。。。)

5. 简单退出登录功能(用来看效果 之后会删掉)

6. 使用 antd 中 Layout 组件实现首页左侧、头部静态布局的基本样式

7. js 控制网页全屏切换 第三方库 https://github.com/sindresorhus/screenfull.js

8. 组件展示用户名 + 组件退出登录 退出时弹出确认、取消 模态框 Modal

## 四、 实时天气 + 左侧菜单导航 day_4

1. 实现首页头部 实时、年月日 https://github.com/iamkun/dayjs 实时、天气 jsonp 请求 https://github.com/webmodules/jsonp

2. 左侧菜单区域使用 antd 导航菜单 Menu 组件实现静态页面布局

3. 创建 menu 配置菜单项 将其遍历显示 默认选中首页

4. 完善首页静态页面展示 开始搭建 admin 的所有子路由 (推荐：路径的层级和菜单对应 路由名字和菜单的 key 对应)

5. 绑定所遍历生成的菜单 实现点击时显示所对应区域

6. withRouter 获取非路由组件 api 完善刷新后还是默认选中菜单和选中展开的菜单

7. 暴力解决登录后也能默认选中的 bug (antd 了解 defaultSelectedKeys 和 selectedKeys 的区别坑)

## 五、更新头部文字 + 实现请求数据后的商品分类管理 day_5

1. 点击左侧导航更新头部的文字 (使用 redux 存入点击收到的数据 再读取出来显示)

2. 实现商品分类管理 antd Card 卡片组件(<Button type="link">按钮</Button>模拟 a 标签做跳转)

3. 引入 antd table 表格组件 通过遍历 拿到后台实时数据展现在表格内

4. 使用异步 action 把商品分类数据存入 redux 取出

5. 实现请求添加分类 Modal 对话框 (让新添加的数据到第一页显示+优化)

## 六、修改分类 + 商品管理 day_6

1. 复用一个 Modal 组件实现请求添加分类和请求修改分类

2. 商品管理静态布局 Card + 头部 select(input 中 allowClear 抖动坑) 实现商品分类静态表格 table

3. 商品管理发送请求 请求后台数据并展示(视频 8 下午 02)

4. 输入名称和描述搜索商品 + 解决部分 bug

5. 点击(添加商品、修改商品)和(商品详情)注册路由

## 七、商品管理详情、修改、添加 + 图片上传 + 富文本编辑器 day_7

1. Table 组件加载中的效果---loading={true}

2. 商品详情静态页面、商品详情展示---从 redux 中读取商品分类的名字展示--商品图片--商品详情--->商品上架和下架

3. 添加商品静态布局 antd 组件 Card+form 表单

4. 引入图片上传 Upload 组件、完成图片上传和删除图片、富文本编辑器(Wysiwyg)库 --- https://github.com/jpuri/react-draft-wysiwyg

5. 发送 ajax 请求，完成添加商品

## 八、商品修改 + 角色、用户管理 + ECharts + 首页 day_8

1. 商品修改页面--判断是添加还是修改--数据回显

2. 初始化角色管理静态页面--实现新增角色功能--设置权限的树形菜单

3. 完成角色授权

4. 初始化用户管理静态页面---添加用户功能 [暂未完善功能、用户管理修改和删除操作]

5. 设置角色管理的权限--限制登陆时只能看到设置权限后、勾选的菜单

6. 使用 ECharts 完成图片图标功能，推荐库 https://github.com/hustcc/echarts-for-react

7. 完善商品首页---项目基本完成---如有其他 bug 请联系 qq：2665076656 [切换角色后的小 bug，我牛顿不管]
