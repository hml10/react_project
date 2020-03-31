import { SAVE_USER_INFO } from "../action_types";

//创建一个保存用户的action
export const createIncrementAction = userObj => ({
  type: SAVE_USER_INFO,
  data: userObj
});
