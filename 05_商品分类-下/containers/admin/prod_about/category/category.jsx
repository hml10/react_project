import React, { Component, Fragment } from "react";
import { Card, Button, Table, Modal, Form, Input, message } from "antd";
import { connect } from "react-redux";
import { reqAddCategory } from "../../../../ajax/index";
import {
  createSaveCategoryAsyncAction,
  createSaveCategoryAction,
} from "../../../../redux/actions/category";

const { Item } = Form;

class Category extends Component {
  state = {
    visible: false, // 控制弹窗是否展示
  };

  // 调用showModal展示弹窗
  showModal = () => {
    //弹窗展示
    this.setState({ visible: true });
  };

  //确认按钮的回调
  handleOk = async () => {
    // 获取添加分类表单的值
    const { categoryName } = this.refs.categoryForm.getFieldsValue();
    if (!categoryName) {
      message.error("输入不能为空！", 0.5);
    } else {
      let result = await reqAddCategory(categoryName);
      const { status, data, msg } = result;
      if (status === 0) {
        message.success("添加分类成功！"); //添加成功
        // this.props.saveCategory(); //需要发两次网咯请求
        //通知redux在他所保存的那个分类列表中加入一个data
        this.props.saveNewCategory([...this.props.categoryList, data]); //减少一次网咯请求
        //重置表单
        this.refs.categoryForm.resetFields();
        //弹窗隐藏
        this.setState({ visible: false });
      } else {
        message.error(msg);
      }
      // 弹窗隐藏
      this.setState({ visible: false });
    }
  };

  //取消按钮的回调
  handleCancel = () => {
    //弹窗隐藏
    this.setState({ visible: false });
    //重置表单
    this.refs.categoryForm.resetFields();
  };

  componentDidMount() {
    // 使用异步action 组件挂载 通知redux保存分类数据(调用那个异步的action，它拥有发送请求的功能)
    this.props.saveCategory();
  }

  render() {
    // dataSource是一个数据源 要展示的数据 数组格式 一般从服务器请求回来
    const dataSource = this.props.categoryList;

    const columns = [
      {
        title: "分类管理", //列名
        dataIndex: "name", //查找数据源对应数据展示
        key: "name",
      },
      {
        title: "操作",
        // dataIndex: "name",
        key: "name",
        align: "center",
        width: 155,
        render: () => <Button type="link">修改分类</Button>,
      },
    ];

    return (
      <Fragment>
        <Card
          extra={
            <Button onClick={this.showModal} type="primary">
              添加分类
            </Button>
          }
        >
          <Table
            bordered //边框
            pagination={{ pageSize: 4, showQuickJumper: true }} //分页器 //是否可以快速跳转至某页
            dataSource={dataSource.reverse()} //数据源
            columns={columns} //列的配置
            rowKey="_id" //表格行key的取值 可以是字符串或一个函数
          />
        </Card>
        <Modal
          title="添加分类" //弹窗的标题
          visible={this.state.visible} //控制弹窗是否展示
          onOk={this.handleOk} //确认的回调
          onCancel={this.handleCancel} //确认的回调
          okText="确认"
          cancelText="取消"
        >
          <Form ref="categoryForm">
            <Item
              name="categoryName" // 4.0必须写才有校验
              rules={[{ required: true, message: "分类名必填" }]}
            >
              <Input placeholder="请输入分类名" autoComplete="off" />
            </Item>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(
  (state) => ({ categoryList: state.categoryList }), //传递状态
  {
    saveCategory: createSaveCategoryAsyncAction,
    saveNewCategory: createSaveCategoryAction,
  } //传递操作状态方法
)(Category);
