/* 
	稍等注释
*/

import { SAVE_USER_INFO } from "../action_types";

// localStorage保存用户的信息读取出来交给redux
let _user; //先定义一个user 如果用户私自改了就执行 catch
let _token = localStorage.getItem("token");

try {
  _user = JSON.parse(localStorage.getItem("user"));
} catch (error) {
  _user = {};
}

// 初始化状态
let initState = {
  user: _user || {}, // 如果有_user就用，没有就{}
  token: _token || ""
};
export default function(preState = initState, action) {
  //从action中获取type、data
  const { type, data } = action;
  //提前准备好一个newState用于返回
  let newState;
  switch (type) {
    case SAVE_USER_INFO:
      newState = { ...data };
      return newState;
    default:
      return preState;
  }
}
