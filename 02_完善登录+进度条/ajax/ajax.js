import axios from "axios";
import qs from "querystring";
import NProgress from "nprogress"; // 引入进度条
import { message } from "antd";
import "nprogress/nprogress.css";

axios.defaults.timeout = 2000; // 超时时间
axios.defaults.baseURL = "http://localhost:3000"; // 请求的基本路径

//使用axios请求拦截器
axios.interceptors.request.use(config => {
  NProgress.start(); //进度条开始走
  const { method, data } = config; //获取请求方式、参数
  if (method.toLowerCase() === "post" && data instanceof Object) {
    //JSON.stringify是用于将一个对象转为JSON字符串
    //qs.stringify是用于将一个对象转为urlencoded编码的字符串
    config.data = qs.stringify(data);
  }
  return config;
});

// 使用axios响应拦截器
axios.interceptors.response.use(
  //响应成功的回调--状态为2开头
  response => {
    NProgress.done(); // 进度条停止
    return response.data;
  },
  //响应失败的回调--1.服务器返回的状态码非2开头 2.服务器根本就没有任何响应。
  error => {
    NProgress.done(); // 进度条停止
    let errmsg = "未知错误，请联系管理员！"; // 定义一个错误信息

    if (error.message.indexOf("401") !== -1) {
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
