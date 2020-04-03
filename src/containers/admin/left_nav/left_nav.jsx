import React, { Component } from "react";
import { Menu } from "antd";

import menus from "../../../config/menu_config";
import logo from "../../../static/img/logo.png";
import "./css/left_nav.less";

const { SubMenu, Item } = Menu;

export default class LeftNav extends Component {
  createMenu = menuArr => {
    return menuArr.map(menuObj => {
      if (!menuObj.children) {
        return (
          <Item key={menuObj.key}>
            <menuObj.icon />
            <span>{menuObj.title}</span>
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
    return (
      <div>
        <header className="nav-top">
          <img src={logo} alt="首页_logo" />
          <h2>商品管理系统</h2>
        </header>

        <div>
          <Menu
            defaultSelectedKeys={["home"]} // 默认选中的菜单项 key 数组
            defaultOpenKeys={["sub1"]} // 初始展开的 SubMenu 菜单项 key 数组
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
