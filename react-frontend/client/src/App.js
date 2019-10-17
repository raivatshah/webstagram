import React, { Component } from "react";
import MainWindow from "./MainWindow";
import MyFooter from "./component/myFooter";

import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Content
          style={{ margin: "50px", height: "100%", overflow: "initial" }}
        >
          <MainWindow />
        </Content>
        <Footer
          style={{
            padding: "0px",
            position: "sticky",
            bottom: "0"
          }}
        >
          <MyFooter />
        </Footer>
      </Layout>
    );
  }
}

export default App;
