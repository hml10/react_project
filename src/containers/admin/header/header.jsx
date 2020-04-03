import React, { Component } from "react";
import { Button, Modal } from "antd";
import { connect } from "react-redux";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import screenfull from "screenfull";
import dayjs from "dayjs";
import { reqWeatherData } from "../../../ajax/index";
import { createDeleteUserAction } from "../../../redux/actions/login";
import "./css/header.less";

const { confirm } = Modal;

class Header extends Component {
  // 定义状态，用于标识是否全屏
  state = {
    isFull: false, // 标识是否全屏
    time: dayjs().format("YYYY年 MM月 DD日 HH:mm:ss"), // 时间状态
    weatherData: {
      picture: "", // 天气图片地址
      weather: "", // 天气文字信息
      temperature: "" // 温度
    }
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

  getWeatherData = async () => {
    let result = await reqWeatherData();
    const { dayPictureUrl, weather, temperature } = result;
    this.setState({ weatherData: { dayPictureUrl, weather, temperature } });
  };

  componentDidMount() {
    // 检测全屏的变化
    screenfull.onchange(() => {
      const { isFull } = this.state;
      this.setState({ isFull: !isFull }); // 组件将要挂载 取反切换全屏状态
    });
    // 开启定时器更新时间
    this.time = setInterval(() => {
      this.setState({ time: dayjs().format("YYYY年 MM月 DD日 HH:mm:ss") });
    }, 1000);
    // 发送请求获取天气信息
    this.getWeatherData();
  }

  componentWillUnmount() {
    clearInterval(this.time); // 退出时清除时间
  }

  render() {
    const { weatherData, time } = this.state;
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
          <span className="user-show">欢迎 {this.props.username}</span>
          <Button className="button" onClick={this.logout} type="link">
            退出登录
          </Button>
        </div>

        <div className="header-bottom">
          <div className="bottom-left">
            <span>首页</span>
          </div>
          <div className="bottom-right">
            <span>{time}</span>
            <img src={weatherData.dayPictureUrl} alt="天气" />
            <span>
              {weatherData.weather} 温度: {weatherData.temperature}
            </span>
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
