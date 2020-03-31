import { SAVE_USER_INFO } from "../action_types";

//创建一个保存用户的action
export const createSaveUserAction = userObj => {
  // 向localStorage 中存入用户信息 包含user：{} token
  const { user, token } = userObj;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  return { type: SAVE_USER_INFO, data: userObj };
};
