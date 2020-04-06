import { SAVE_CATEGORY_LIST } from "../action_types";
import { reqCategoryList } from "../../ajax";
import { message } from "antd";

//创建一个保存用户的同步 action
export const createSaveCategoryAction = (categoryList) => ({
  type: SAVE_CATEGORY_LIST,
  data: categoryList,
});

// 请求分类数据的异步 action
export const createSaveCategoryAsyncAction = () => {
  return async (disPath) => {
    // 开启异步任务(去请求分类数据)
    let result = await reqCategoryList();
    const { status, data, msg } = result;
    if (status === 0) {
      disPath(createSaveCategoryAction(data));
    } else {
      message.error(msg);
    }
  };
};
