import React, { Component } from "react";
import { Button, Modal } from "antd";
import { connect } from "react-redux";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import screenfull from "screenfull";
import { createDeleteUserAction } from "../../../redux/actions/login";
import "./css/header.less";

const { confirm } = Modal;

class Header extends Component {
  // 定义状态，用于标识是否全屏
  state = {
    isFull: false
  };

  fullScreen = () => {
    screenfull.toggle(); // 全屏显示切换
  };

  logout = () => {
    confirm({
      title: "您确定要退出登录吗?", // 弹窗主标题
      // content: "若退出后，需要再次重新登录", // 弹窗的描述
      icon: <ExclamationCircleOutlined />, // 弹窗中展示的图标
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        // 确认按钮的回调
        // console.log(this); // undefined
        this.props.deleteUser();
      }
    });
  };

  componentDidMount() {
    screenfull.onchange(() => {
      const { isFull } = this.state;
      this.setState({ isFull: !isFull }); // 组件将要挂载 取反切换全屏状态
    });
  }

  render() {
    return (
      <div className="header-wrap">
        <div className="header-top">
          <Button onClick={this.fullScreen} size="small">
            {/* 切换全屏状态 */}
            {this.state.isFull ? (
              <FullscreenExitOutlined />
            ) : (
              <FullscreenOutlined />
            )}
          </Button>
          <span className="user-show">欢迎{this.props.username}</span>
          <Button onClick={this.logout} type="link">
            退出登录
          </Button>
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
            <span>小雨 温度: 0~1℃</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ username: state.userInfo.user.username }), // 传递状态
  {
    deleteUser: createDeleteUserAction
  } // 传递操作状态的方法
)(Header);
