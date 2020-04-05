import React, { Component } from "react";
import { Card, Button, Table, message } from "antd";
import { reqCategoryList } from "../../../../ajax/index";

export default class Category extends Component {
  state = {
    categoryList: [],
  };
  getCategoryList = async () => {
    const result = await reqCategoryList();
    // console.log(result); //拿到后台遍历得到的分类管理数据
    const { status, data, msg } = result;
    if (status === 0) {
      // console.log(data);
      this.setState({ categoryList: data });
    } else {
      message.error(msg);
    }
  };

  componentDidMount() {
    this.getCategoryList();
  }

  render() {
    // dataSource是一个数据源 要展示的数据 数组格式 一般从服务器请求回来
    const dataSource = this.state.categoryList;

    //#region
    // [
    //   {
    //     key: "1", //每条数据的唯一标识
    //     name: "逆天而行", //人的名字
    //     // age: 22, //人的年龄
    //     // address: "西湖区湖底公园1号", //人的家庭住址
    //   },
    //   {
    //     key: "2",
    //     name: "随风起舞",
    //   },
    // ];
    // columns是表格中的列 是table中最核心的配置 配置所有列
    // #endregion

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
        render: () => {
          return <Button type="link">修改分类</Button>;
        },
        // render: () => <Button type="link">修改分类</Button>,
      },
    ];
    return (
      <Card extra={<Button type="primary">添加</Button>}>
        {/* <button onClick={this.getCategoryList}>点击</button> */}
        <Table
          bordered //边框
          pagination={{ pageSize: 4, showQuickJumper: true }} //分页器 //是否可以快速跳转至某页
          dataSource={dataSource} //数据源
          columns={columns} //列的配置
          rowKey="_id" //表格行key的取值 可以是字符串或一个函数
        />
      </Card>
    );
  }
}
