import React, { Component } from "react";
import { Divider } from "antd";
import "../style/info.less";

class MyFooter extends Component {
  render() {
    return (
      <div className="foot">
        <p>
          <br />
        </p>
        <br />
        <br />
        <Divider
          style={{
            backgroundColor: "rgb(40, 80, 128)",
            border: "0px",
            padding: 0
          }}
        />
        <p className="sign"></p>
        <p className="sign">Developer: xxx</p>
      </div>
    );
  }
}

export default MyFooter;
