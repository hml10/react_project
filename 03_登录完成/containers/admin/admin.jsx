import React, { Component } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "./header/header";
import "./css/admin.less";

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  render() {
    if (!this.props.isLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout className="admin-wrap">
        <Sider>Sider</Sider>
        <Layout>
          <Header />
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    isLogin: state.userInfo.isLogin
  }), //占位
  {}
)(Admin);
