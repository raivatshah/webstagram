import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, Input, Button } from "antd";

class AboutUs extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      checked: false,
      aboutUs: ""
    };
  }

  componentDidMount() {
    this._loadInput();
    this.textarea.focus();
  }

  _saveInput(text) {
    localStorage.setItem("aboutUs", text);
  }

  _loadInput() {
    const aboutUs = localStorage.getItem("aboutUs");
    if (aboutUs) {
      this.setState({ aboutUs });
    }
  }

  handleInputBlur(event) {
    this._saveInput(event.target.value);
  }

  onChange = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      checked: e.target.checked
    });
  };

  handleInputChange(event) {
    this.setState({
      aboutUs: event.target.value
    });
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      if (this.state.checked) {
        const { aboutUs } = this.state;
        this.props.onSubmit({ aboutUs });
      } else {
        this.props.onSubmit({ aboutUs: "" });
      }
    }
  }

  render() {
    const { TextArea } = Input;
    return (
      <div>
        <p style={{ marginBottom: "20px" }}>
          <Checkbox onChange={this.onChange}>
            Include an About Us page for my website
          </Checkbox>
        </p>
        <p>
          <TextArea
            rows={4}
            ref={textarea => (this.textarea = textarea)}
            disabled={!this.state.checked}
            value={this.state.aboutUs}
            onBlur={this.handleInputBlur.bind(this)}
            onChange={this.handleInputChange.bind(this)}
          />
        </p>
        <div className="comment-field-button">
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

export default AboutUs;
