/* 
	稍等注释
*/

import { SAVE_USER_INFO, DELE_USER_INFO } from "../action_types";

// localStorage保存用户的信息读取出来交给redux
let _user; //先定义一个user 如果用户私自改了就执行 catch
let _token = localStorage.getItem("token");

try {
  _user = JSON.parse(localStorage.getItem("user"));
  if (_user === null) _user = {};
} catch (error) {
  _user = {};
}

// 初始化状态
let initState = {
  user: _user || {}, // 如果有_user就用，没有就{}
  token: _token || "",
  // 判断用户是否登录 且同时存在才通过
  isLogin: JSON.stringify(_user) !== "{}" && _token ? true : false //空对象取布尔值为true user不能为空对象
};

export default function(preState = initState, action) {
  //从action中获取type、data
  const { type, data } = action;
  //提前准备好一个newState用于返回
  let newState;
  switch (type) {
    // 登进
    case SAVE_USER_INFO:
      newState = { ...data, isLogin: true };
      return newState;

    // 登出
    case DELE_USER_INFO:
      newState = { user: {}, token: "", isLogin: false };
      return newState;
    default:
      return preState;
  }
}
