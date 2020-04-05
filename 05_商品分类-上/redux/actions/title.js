import { SAVE_TITLE } from "../action_types";

//创建一个保存用户的action
export const createSaveTitleAction = (title) => ({
  type: SAVE_TITLE,
  data: title,
});
