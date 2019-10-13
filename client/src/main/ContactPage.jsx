import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, Input, Button } from "antd";
const InputGroup = Input.Group;

class ContactPage extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onBack: PropTypes.func,
    urlProcessed: PropTypes.bool
  };

  constructor() {
    super();
    this.state = {
      checked: false,
      email: "",
      mobile: ""
    };
  }

  componentDidMount() {
    this._loadEmail();
    this._loadMobile();
  }

  _saveEmail(email) {
    localStorage.setItem("email", email);
  }

  _loadEmail() {
    const email = localStorage.getItem("email");
    if (email) {
      this.setState({ email });
    }
  }

  handleEmailBlur(event) {
    this._saveEmail(event.target.value);
  }

  _saveMobile(mobile) {
    localStorage.setItem("mobile", mobile);
  }

  _loadMobile() {
    const mobile = localStorage.getItem("mobile");
    if (mobile) {
      this.setState({ mobile });
    }
  }

  handleMobileBlur(event) {
    this._saveMobile(event.target.value);
  }

  onChange = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      checked: e.target.checked
    });
  };

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleMobileChange(event) {
    this.setState({
      mobile: event.target.value
    });
  }

  handleChange = value => {
    this.setState({
      dataSource:
        !value || value.indexOf("@") >= 0
          ? []
          : [`${value}@gmail.com`, `${value}@yahoo.com`, `${value}@hotmail.com`]
    });
  };

  handleSubmit() {
    if (this.props.onSubmit) {
      if (this.state.checked) {
        const { email, mobile } = this.state;
        this.props.onSubmit({ email, mobile });
      } else {
        this.props.onSubmit({ email: "", mobile: "" });
      }
    }
  }

  handleBack() {
    if (this.props.onBack) {
      if (this.state.checked) {
        const { email, mobile } = this.state;
        this.props.onBack({ email, mobile });
      } else {
        this.props.onBack({ email: "", mobile: "" });
      }
    }
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: "20px" }}>
          <Checkbox style={{ marginBottom: "20px" }} onChange={this.onChange}>
            Include a contact page for my website
          </Checkbox>
          <InputGroup compact>
            <Input
              style={{ width: "60%" }}
              type="email"
              placeholder="Email"
              value={this.state.email}
              disabled={!this.state.checked}
              onBlur={this.handleEmailBlur.bind(this)}
              onChange={this.handleEmailChange.bind(this)}
            />
            <Input
              style={{ width: "40%" }}
              placeholder="Mobile"
              disabled={!this.state.checked}
              value={this.state.mobile}
              onBlur={this.handleMobileBlur.bind(this)}
              onChange={this.handleMobileChange.bind(this)}
            />
          </InputGroup>
        </div>

        <div className="comment-field-button">
          <Button
            key="back"
            type="primary"
            onClick={this.handleBack.bind(this)}
            style={{ marginRight: "30px", marginBottom: "10px" }}
          >
            Go Back
          </Button>
          <Button
            key="submit"
            type="primary"
            onClick={this.handleSubmit.bind(this)}
          >
            Next Step
          </Button>
        </div>
      </div>
    );
  }
}

export default ContactPage;
