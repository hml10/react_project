import React, { Component } from "react";
import { Button } from "antd";
import { FullscreenOutlined } from "@ant-design/icons";
import "./css/header.less";

export default class Header extends Component {
  render() {
    return (
      <div className="header-wrap">
        <div className="header-top">
          <Button size="small">
            <FullscreenOutlined />
          </Button>
          <span className="user-show">欢迎xxx</span>
          <Button type="link">退出登录</Button>
        </div>

        <div className="header-bottom">
          <div className="bottom-left">
            <span>首页</span>
          </div>
          <div className="bottom-right">
            <span>2020年4月1日 08:08:01</span>
            <img
              src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2092236593,2093311545&fm=26&gp=0.jpg"
              alt="天气"
            />
            <span>小雨 温度: 0~1°</span>
          </div>
        </div>
      </div>
    );
  }
}
