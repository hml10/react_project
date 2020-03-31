/* 
	稍等注释
*/

import { SAVE_USER_INFO } from "../action_types";

// 初始化状态
let initState = {
  user: {},
  token: ""
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
