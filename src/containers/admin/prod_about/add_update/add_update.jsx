import React, { Component } from "react";
import { Button } from "antd";

export default class Add_update extends Component {
  render() {
    return (
      <div>
        Add_update 添加和修改
        <Button onClick={this.props.history.goBack}>返回</Button>
      </div>
    );
  }
}
