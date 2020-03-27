import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./css/login.less";
import logo from "./imgs/logo.png";

const { Item } = Form;

export default class Login extends Component {
  // 表单提交的回调
  onFinish = values => {
    console.log("接收到的表单数据: ", values);
  };
  render() {
    return (
      <div className="login">
        {/* login 上部分 */}
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>商品管理系统</h1>
        </div>
        {/* login 下部分 */}
        <div className="login-content">
          <h2>登录</h2>
          <Form 
          className="login-form" 
          onFinish={this.onFinish}>
            <Item name='username'>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="账号"
              />
            </Item>

            <Item name='password'>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Item>

            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    );
  }
}
