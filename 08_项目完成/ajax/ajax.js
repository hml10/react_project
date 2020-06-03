import axios from "axios";
import qs from "querystring";
import NProgress from "nprogress"; // 引入进度条
import { message } from "antd";
import { AJAX_BASE_URL, AJAX_TIMEOUT } from "../config/index";
import "nprogress/nprogress.css";
import store from "../redux/store";
import { createDeleteUserAction } from "../redux/actions/login";
import { createSaveTitleAction } from "../redux/actions/title";

axios.defaults.timeout = AJAX_TIMEOUT; // 超时时间
axios.defaults.baseURL = AJAX_BASE_URL; // 请求的基本路径

//使用axios请求拦截器
axios.interceptors.request.use((config) => {
  NProgress.start(); //进度条开始走
  const { method, data } = config; //获取请求方式、参数
  if (method.toLowerCase() === "post" && data instanceof Object) {
    //JSON.stringify是用于将一个对象转为JSON字符串
    //qs.stringify是用于将一个对象转为urlencoded编码的字符串
    config.data = qs.stringify(data);
  }
  // 从redux中获取token
  const { token } = store.getState().userInfo;
  if (token) {
    // console.log("@@", token);
    // console.log(config);
    config.headers.Authorization = "atguigu_" + token;
    // console.log(config);
  }
  return config;
});

// 使用axios响应拦截器
axios.interceptors.response.use(
  //响应成功的回调--状态为2开头
  (response) => {
    NProgress.done(); // 进度条停止
    return response.data;
  },
  //响应失败的回调--1.服务器返回的状态码非2开头 2.服务器根本就没有任何响应。
  (error) => {
    NProgress.done(); // 进度条停止
    let errmsg = "未知错误，请联系管理员！"; // 定义一个错误信息

    if (error.message.indexOf("401") !== -1) {
      // 通知redux删除该用户的所有信息 从而触发当前页面的判断 从而跳转到登录页面
      store.dispatch(createDeleteUserAction());
      store.dispatch(createSaveTitleAction(""));
      errmsg = "请求未授权！";
    } else if (error.message.indexOf("Network Error") !== -1) {
      errmsg = "网咯不稳定，请检查网咯！";
    } else if (error.message.indexOf("timeout") !== -1) {
      errmsg = "连接已超时！";
    }
    message.error(errmsg, 2); // 第二个参数延时2秒
    return new Promise(() => {});
  }
);

export default axios;
