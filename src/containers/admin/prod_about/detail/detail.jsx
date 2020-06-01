import React, { Component } from "react";
import { Button, Card, List, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { createSaveCategoryAsyncAction } from "../../../../redux/actions/category";

import "./css/detail.less";
import { reqProductDetailById } from "../../../../ajax/index";

const { Item } = List;

class Detail extends Component {
  state = {
    imgs: [], //商品图片
    categoryId: "", //商品分类id
    name: "", //商品名称
    desc: "", //商品描述
    price: 0, //商品价格
    detail: "", //商品详情
    isLoading: true, //是否处于加载中
  };

  // 根据分类id计算分类名
  getCategoryName = (categoryId) => {
    let result = this.props.categoryList.find((categoryObj) => {
      return categoryObj._id === categoryId;
    });
    if (result) return result.name; //判断是否有商品分类，有即返回他的分类名字
  };

  // 根据商品id获取商品详情信息
  getProductDetail = async () => {
    // 获取通过路由传递过来得商品_id
    // console.log(this.props.match.params.id);
    const { id } = this.props.match.params;
    let result = await reqProductDetailById(id);
    // console.log(result);
    const { status, data, msg } = result;
    if (status === 0) {
      const { imgs, categoryId, name, desc, price, detail } = data;
      this.setState({
        imgs,
        categoryId,
        name,
        desc,
        price,
        detail,
        isLoading: false,
      });
    } else {
      message.error(msg);
    }
    // console.log(this.props.categoryList);
  };

  componentDidMount() {
    // console.log(this.props.categoryList); // 从redux中读取商品分类数据
    const { categoryList, saveCategory } = this.props;
    if (categoryList.length === 0) {
      saveCategory();
    }
    this.getProductDetail(); //根据id查询商品详情信息
  }

  render() {
    const {
      imgs,
      categoryId,
      name,
      desc,
      price,
      detail,
      isLoading,
    } = this.state;
    return (
      <div>
        <Card
          title={
            <div>
              <Button onClick={this.props.history.goBack} type="link">
                <ArrowLeftOutlined />
                返回
              </Button>
              <span>商品详情</span>
            </div>
          }
        >
          <List loading={isLoading}>
            <Item className="product-item">
              <span className="item-title">商品名称 : </span>
              <span>{name}</span>
            </Item>
            <Item className="product-item">
              <span className="item-title">商品描述 : </span>
              <span>{desc}</span>
            </Item>
            <Item className="product-item">
              <span className="item-title">商品价格 : </span>
              <span>{"￥" + price}</span>
            </Item>
            <Item className="product-item">
              <span className="item-title">商品分类 : </span>
              <span>{this.getCategoryName(categoryId)}</span>
            </Item>
            <Item className="product-item">
              <span className="item-title">商品图片 : </span>
              {imgs.map((imgName, index) => {
                return <img key={index} src={"/upload/" + imgName} alt="pic" />;
              })}
            </Item>
            <Item className="product-item">
              <span className="item-title">商品详情 : </span>
              <span dangerouslySetInnerHTML={{ __html: detail }}></span>
            </Item>
          </List>
        </Card>
        {/* <Button onClick={this.props.history.goBack}>返回</Button> */}
      </div>
    );
  }
}

export default connect(
  (state) => ({ categoryList: state.categoryList }), //传递状态
  {
    saveCategory: createSaveCategoryAsyncAction,
  } //传递操作状态的方法
)(Detail);
