import React, { Component } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import LeftNav from "./left_nav/left_nav";
import Header from "./header/header";
import "./css/admin.less";

import Home from "../../components/home/home";
import User from "./user/user";
import Role from "./role/role";
import Category from "./prod_about/category/category";
import Product from "./prod_about/product/product";
import Bar from "./charts/bar/bar";
import Line from "./charts/line/line";
import Pic from "./charts/pie/pie";

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  render() {
    if (!this.props.isLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout className="admin-wrap">
        <Sider>
          <LeftNav />
        </Sider>

        <Layout>
          <Header />
          <Content className="admin-content">
            <Switch>
              <Route path="/admin/home" component={Home} />
              <Route path="/admin/user" component={User} />
              <Route path="/admin/role" component={Role} />
              <Route path="/admin/prod_about/category" component={Category} />
              <Route path="/admin/prod_about/product" component={Product} />
              <Route path="/admin/charts/bar" component={Bar} />
              <Route path="/admin/charts/line" component={Line} />
              <Route path="/admin/charts/pie" component={Pic} />
              <Redirect to="/admin/home" />
            </Switch>
          </Content>
          <Footer className="admin-footer">
            推荐使用谷歌浏览器访问，获取最佳体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  (state) => ({
    isLogin: state.userInfo.isLogin,
  }), //占位
  {}
)(Admin);
