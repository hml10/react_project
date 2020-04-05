import React, { Component } from "react";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { createSaveTitleAction } from "../../../redux/actions/title";
import menus from "../../../config/menu_config";
import logo from "../../../static/img/logo.png";
import "./css/left_nav.less";

const { SubMenu, Item } = Menu;

class LeftNav extends Component {
  // 根据路径计算title
  getTitleByPath = () => {
    const { pathname } = this.props.location; //拿到路径
    const currentKey = pathname.split("/").reverse()[0]; //拿到路径最后一个单词
    let title = ""; // 定义一个空title
    menus.forEach((menusObj) => {
      if (menusObj.children instanceof Array) {
        //判断有没有孩子
        let result = menusObj.children.find((children) => {
          //查找孩子的key
          return children.key === currentKey;
        });
        if (result) title = result.title;
      } else {
        if (menusObj.key === currentKey) title = menusObj.title;
      }
    });
    this.props.saveTitle(title);
  };

  componentDidMount() {
    if (!this.props.title) this.getTitleByPath(); // 根据路径读取title
  }

  // 根据菜单默认文件生成菜单
  createMenu = (menuArr) => {
    return menuArr.map((menuObj) => {
      if (!menuObj.children) {
        return (
          <Item
            onClick={() => {
              // console.log(menuObj.title); //点击时遍历得到所点击的菜单
              this.props.saveTitle(menuObj.title); //存入redux
            }}
            key={menuObj.key}
          >
            <Link to={menuObj.path}>
              <menuObj.icon />
              <span>{menuObj.title}</span>
            </Link>
          </Item>
        );
      } else {
        return (
          <SubMenu
            key={menuObj.key}
            title={
              <span>
                <menuObj.icon />
                <span>{menuObj.title}</span>
              </span>
            }
          >
            {this.createMenu(menuObj.children)} {/* // 递归遍历 */}
          </SubMenu>
        );
      }
    });
  };

  render() {
    // console.log(this.props.location.pathname); //拿取非路由组件
    const currentPath = this.props.location.pathname.split("/"); //拿取非路由组件得到的数组
    const selectedKey = currentPath.reverse()[0]; //刷新后还是默认选中菜单
    // console.log(selectedKey);
    return (
      <div>
        <header className="nav-top">
          <img src={logo} alt="首页_logo" />
          <h2>商品管理系统</h2>
        </header>

        <div>
          <Menu
            defaultSelectedKeys={[selectedKey]} // 默认选中的菜单项 key 数组 (和selectedKeys区别)
            defaultOpenKeys={currentPath} // 初始展开的 SubMenu 菜单项 key 数组
            mode="inline" // 菜单打开的类型
            theme="dark" // 主题颜色
          >
            {this.createMenu(menus)} {/* 创建菜单 */}
          </Menu>
        </div>
      </div>
    );
  }
}

// withRouter 是个函数 可以加工组件 能让非路由组件拥有路由组件的api
export default connect(
  (state) => ({ title: state.title }), //传递状态
  { saveTitle: createSaveTitleAction } //传递操作状态的方法
)(withRouter(LeftNav));
