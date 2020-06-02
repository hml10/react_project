import React, { Component } from "react";
import { Button, Card, Form, Input, Select, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { createSaveCategoryAsyncAction } from "../../../../redux/actions/category";
import { reqAddProduct } from "../../../../ajax";
import PictureWall from "./picture_wall";
import RichText from "./rich_text";

const { Item } = Form;
const { Option } = Select;

class Add_update extends Component {
  // 组件挂载后
  componentDidMount() {
    const { categoryList, saveCategory } = this.props;
    if (categoryList.length === 0) {
      saveCategory();
    }
  }

  onFinish = async (values) => {
    values.imgs = this.refs.pictureWall.getImgsNameArr(); //找照片墙组件获取图片数组
    values.detail = this.refs.richText.getRichText(); //找富文本组件获取商品详情
    // console.log(values);
    let result = await reqAddProduct(values);
    const { status, msg } = result;
    if (status === 0) {
      message.success("商品添加成功");
      this.props.history.push("/admin/prod_about/product"); //添加成功后重新跳转页面
    } else {
      message.error(msg);
    }
  };

  render() {
    return (
      <Card
        title={
          <div>
            <Button onClick={this.props.history.goBack} type="link">
              <ArrowLeftOutlined />
              返回
            </Button>
            <span>添加商品</span>
          </div>
        }
      >
        <Form onFinish={this.onFinish}>
          <Item
            name="name"
            label="商品名称"
            wrapperCol={{ span: 10 }}
            rules={[{ required: true, message: "商品名称必填" }]}
          >
            <Input placeholder="输入商品名称" type="text" />
          </Item>

          <Item
            name="desc"
            label="商品描述"
            wrapperCol={{ span: 10 }}
            rules={[{ required: true, message: "商品描述必填" }]}
          >
            <Input placeholder="输入商品描述" type="text" />
          </Item>

          <Item
            name="price"
            label="商品价格"
            wrapperCol={{ span: 10 }}
            rules={[{ required: true, message: "商品价格必填" }]}
          >
            <Input
              prefix="￥"
              addonAfter="元"
              placeholder="输入商品价格"
              type="number"
            />
          </Item>

          <Item
            name="categoryId"
            label="商品分类"
            wrapperCol={{ span: 10 }}
            rules={[{ required: true, message: "必须选择一个分类" }]}
          >
            <Select defaultValue="">
              <Option value="">请选择商品分类：</Option>
              {this.props.categoryList.map((categoryObj, index) => {
                return (
                  <Option key={index} value={categoryObj._id}>
                    {categoryObj.name}
                  </Option>
                );
              })}
            </Select>
          </Item>

          <Item
            label="商品图片"
            wrapperCol={{ span: 10 }}
            style={{ marginLeft: "12px" }}
          >
            <PictureWall ref="pictureWall" />
          </Item>

          <Item
            // name="productDetail" //报错：如果在使用表单可以使用name，没有使用表单验证，请删除掉
            label="商品详情"
            wrapperCol={{ span: 16 }}
            style={{ marginLeft: "12px" }}
          >
            <RichText ref="richText" />
          </Item>

          <Item style={{ marginLeft: "12px" }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default connect(
  (state) => ({ categoryList: state.categoryList }), //传递状态
  {
    saveCategory: createSaveCategoryAsyncAction,
  } //传递操作状态的方法
)(Add_update);
