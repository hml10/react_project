import React, { Component } from "react"; //引入react核心库
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqDeletePicture } from "../../../../ajax/index";

// getBase64将图片转为base64编码格式
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false, //控制是否展示预览窗
    previewImage: "", //预览谁(值可以为：url 或 base64)

    // 所有已经上传完毕的文件列表---模拟的一个数据
    fileList: [
      // {
      //   uid: "-1", //图片的唯一标识
      //   name: "image.png", //图片的新名字---经过服务器改名之后的图片名字，在服务器端是唯一的
      //   status: "done", //文件状态(done代表文件已经上传完毕)
      //   // 服务器返回的图片地址
      //   url:
      //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      // },
    ],
  };

  //根据fileList生成一个由新的图片名所组成的数组
  getImgsNameArr = () => {
    let arr = [];
    this.state.fileList.forEach((imgObj) => {
      arr.push(imgObj.name);
    });
    return arr;
  };

  setFileList = (imgNameArr) => {
    let arr = [];
    imgNameArr.forEach((imgName, index) => {
      arr.push({
        uid: index,
        name: imgName,
        status: "done",
        url: "/upload/" + imgName,
      });
    });
    this.setState({ fileList: arr });
  };

  // 关闭预览按钮的回调
  handleCancel = () => this.setState({ previewVisible: false });

  // 点击预览按钮的回调
  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  // 图片状态发生改变的回调(一个图片要上传，要经历很多次自生状态的改变)
  handleChange = async ({ file, fileList }) => {
    // console.log("@@@", file.status); //上传中、上传中、上传成功
    if (file.status === "done") {
      // console.log(file);
      if (file.response.status === 0) {
        message.success("图片上传成功");
        const { name, url } = file.response.data;
        fileList[fileList.length - 1].name = name;
        fileList[fileList.length - 1].url = url;
      }
    }
    // 删除图片
    if (file.status === "removed") {
      // console.log("点击删除", file.name);
      // 发送ajax请求，告诉服务器删除图片---根据图片名删除图片
      let result = await reqDeletePicture(file.name);
      const { status, msg } = result;
      if (status === 0) {
        message.success("删除图片成功");
      } else {
        message.error(msg);
      }
    }
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload" //图片上传给哪个服务器
          name="image" //发到后台的文件参数名
          listType="picture-card" //照片墙视图
          fileList={fileList} //配置要展示上传完的图片
          onPreview={this.handlePreview} //点击小眼睛的回调
          onChange={this.handleChange} //关闭预览的回调
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
