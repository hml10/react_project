import React, { Component } from "react";
import { connect } from "react-redux";

class Admin extends Component {
  render() {
    return <div>欢迎{this.props.username}登录</div>;
  }
}

export default connect(
  state => ({ username: state.userInfo.user.username }), //占位
  {}
)(Admin);
