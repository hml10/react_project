import React, { Component } from "react";
import { Card, Select, Input, Button, Table, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  reqProductList,
  reqSearchProduct,
  reqChangProductStatus,
} from "../../../../ajax/index";
import { PAGE_SIZE } from "../../../../config";

const { Option } = Select;

export default class Product extends Component {
  state = {
    productList: [], //商品列表
    total: 0, //数据总数
    searchType: "productName", //搜索类型(按名称搜)
    keyWord: "", //搜索的关键字
    current: 1, //当前是第几页
    isLoading: true, //是否处于加载中
  };

  // 请求商品列表 计算多少页 展示多少条
  getProductList = async (number = 1) => {
    let result;
    // 判断是搜索还是列表
    if (this.isSearch) {
      const { searchType, keyWord } = this.state;
      result = await reqSearchProduct(searchType, keyWord, number, PAGE_SIZE);
    } else {
      result = await reqProductList(number, PAGE_SIZE);
    }

    const { status, data, msg } = result;
    if (status === 0) {
      const { list, total, pageNum } = data;
      this.setState({
        productList: list,
        total,
        current: pageNum,
        isLoading: false,
      });
    } else {
      message.error(msg);
    }
  };

  // 商品上架下架回调
  changeProductStatus = async (currentProduct) => {
    let { _id, status } = currentProduct;
    if (status === 1) status = 2;
    else status = 1;
    // 发送请求更新状态
    let result = await reqChangProductStatus(_id, status);
    if (result.status === 0) {
      message.success("操作成功");
      this.getProductList(this.state.current); //用来刷新页面，但是要传参数进去判断当前是第几页
    } else {
      message.error("result.msg");
    }

    // console.log(currentProduct);
  };

  componentDidMount() {
    this.getProductList();
  }

  render() {
    // 数据源
    const dataSource = this.state.productList;

    const columns = [
      {
        title: "商品名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
        key: "desc",
      },
      {
        title: "商品价格",
        dataIndex: "price",
        key: "price",
        align: "center",
        render: (price) => "￥" + price,
      },
      {
        title: "商品状态",
        // dataIndex: "status",
        key: "status",
        align: "center",
        render: (ProductObj) => (
          <div>
            <Button
              onClick={() => {
                this.changeProductStatus(ProductObj);
              }}
              size="small"
              type={ProductObj.status === 1 ? "danger" : "primary"}
            >
              {ProductObj.status === 1 ? "下架" : "上架"}
            </Button>
            <br />
            <span> {ProductObj.status === 1 ? "在售" : "售空"} </span>
          </div>
        ),
      },
      {
        title: "操作",
        dataIndex: "_id",
        key: "opera",
        width: "15%",
        align: "center",
        render: (id) => (
          <div>
            <Button
              onClick={() => {
                this.props.history.push(
                  `/admin/prod_about/product/detail/${id}`
                );
              }}
              size="small"
              type="link"
            >
              详情
            </Button>
            <br />
            <Button
              onClick={() => {
                this.props.history.push(
                  `/admin/prod_about/product/update/${id}`
                );
              }}
              size="small"
              type="link"
            >
              修改
            </Button>
          </div>
        ),
      },
    ];
    return (
      <Card
        // loading={true}
        title={
          <div>
            <Select
              onChange={(value) => {
                //Select 获取按照类型搜索
                this.setState({ searchType: value });
              }}
              defaultValue="productName"
            >
              <Option value="productName">按名称搜索</Option>
              <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input
              placeholder="输入关键字"
              style={{ width: "20%", margin: "0px 10px" }}
              onChange={(event) => {
                //Input 获取输入框输入的值
                this.setState({ keyWord: event.target.value });
              }}
            />
            <Button
              onClick={() => {
                this.isSearch = true;
                this.getProductList();
              }}
              type="primary"
            >
              <SearchOutlined />
              搜索
            </Button>
          </div>
        }
        extra={
          <Button
            onClick={() => {
              this.props.history.push("/admin/prod_about/product/add");
            }}
            type="primary"
          >
            添加商品
          </Button>
        }
      >
        <Table
          loading={this.state.isLoading}
          dataSource={dataSource}
          columns={columns}
          bordered
          rowKey="_id"
          pagination={{
            total: this.state.total, //数据总数
            pageSize: PAGE_SIZE, //每页展示的条数
            onChange: (number) => this.getProductList(number),
            current: this.state.current, //当前是第几页
          }}
        />
      </Card>
    );
  }
}
