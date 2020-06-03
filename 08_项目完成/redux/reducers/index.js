/* 
  汇总文件
*/
import loginReducer from "./login";
import titleReducer from "./title";
import categoryReducer from "./category";
import { combineReducers } from "redux";

// combineReducers 传入的那个对象 就是redux中的总状态
export default combineReducers({
  userInfo: loginReducer,
  title: titleReducer,
  categoryList: categoryReducer,
});
