import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { Redirect } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { createSaveUserAction } from "../../redux/actions/login";
import { reqLogin } from "../../ajax/index";

import "./css/login.less";
import logo from "../../static/img/logo.png";

const { Item } = Form;

class Login extends Component {
  // 表单提交的回调
  onFinish = async values => {
    // console.log("接收到的表单数据: ", values);
    const result = await reqLogin(values); // ajax.post("/login", values);
    // console.log("@@", result);
    const { status, data, msg } = result;
    if (status === 0) {
      message.success("登录成功!"); // 如果登录成功(用户名密码是对的)
      // 通知redux保存用户信息
      this.props.saveUserInfo(data);
      // this.props.history.replace("/admin"); // 登录成功跳转到admin
    } else {
      message.error(msg);
    }
  };
  // 密码的回调函数
  pwdValidator = (_, value = "") => {
    // console.log(value)
    const errmsg = [];
    if (!value.trim()) errmsg.push("密码必须输入");
    if (value.length < 4) errmsg.push("密码必须大于等于4位");
    if (value.length > 12) errmsg.push("密码必须小于等于12位");
    if (!/^\w+$/.test(value)) errmsg.push("密码必须是英文、数字或下划线组成");
    if (errmsg.length > 0) return Promise.reject(errmsg);
    else return Promise.resolve();
  };

  render() {
    if (this.props.isLogin) {
      return <Redirect to="/admin" />;
    }

    return (
      <div className="login">
        {/* login 上部分 */}
        <div className="login-header">
          <img src={logo} alt="登录_logo" />
          <h1>商品管理系统</h1>
        </div>
        {/* login 下部分 */}
        <div className="login-content">
          <h2>登录</h2>

          <Form className="login-form" onFinish={this.onFinish}>
            <Item
              name="username"
              rules={[
                { required: true, message: "账号必须输入" }, //必填 用户声明式校验
                { min: 4, message: "账号必须大于等于4位" },
                { max: 12, message: "账号必须小于等于12位" },
                {
                  pattern: /^\w+$/,
                  message: "账号必须是英文、数字或下划线组成"
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="账号"
                autoComplete="off"
              />
            </Item>

            <Item name="password" rules={[{ validator: this.pwdValidator }]}>
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

export default connect(
  state => ({ isLogin: state.userInfo.isLogin }), //传递状态
  { saveUserInfo: createSaveUserAction } //传递操作状态的方法
)(Login);
