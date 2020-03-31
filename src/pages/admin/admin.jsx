import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createDeleteUserAction } from "../../redux/actions/login";

class Admin extends Component {
  logout = () => {
    // 告诉redux和local删除所保存的用户信息
    this.props.deleteUserInfo();

    // this.props.history.push("/login"); // 状态发生变化 触发redux组件重新渲染
  };

  render() {
    if (!this.props.isLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        欢迎
        {this.props.username}
        登录
        <button onClick={this.logout}>退出登录</button>
      </div>
    );
  }
}

export default connect(
  state => ({
    username: state.userInfo.user.username,
    isLogin: state.userInfo.isLogin
  }), //占位
  {
    deleteUserInfo: createDeleteUserAction
  }
)(Admin);
