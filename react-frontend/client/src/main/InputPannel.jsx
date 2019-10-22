import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "antd";

class InputPannel extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    urlProcessed: PropTypes.bool
  };

  constructor() {
    super();
    this.state = {
      url: "",
      urlProcessed: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.urlProcessed !== state.urlProcessed) {
      return { urlProcessed: props.urlProcessed };
    }
    return null;
  }

  componentDidMount() {
    this._loadUrl();
    this.textarea.focus();
  }

  _saveUrl(url) {
    localStorage.setItem("url", url);
  }

  _loadUrl() {
    const url = localStorage.getItem("url");
    if (url) {
      this.setState({ url });
    }
  }

  handleUrlBlur(event) {
    this._saveUrl(event.target.value);
  }

  handleUrlChange(event) {
    this.setState({
      url: event.target.value
    });
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      const { url } = this.state;
      this.props.onSubmit({ url });
    }
  }

  render() {
    if (this.props.urlProcessed) {
      return (
        <div>
          <h3>{this.state.url}</h3>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <span>Instagram Username:</span>
            <Input
              style={{ marginTop: "10px", marginBottom: "20px" }}
              ref={textarea => (this.textarea = textarea)}
              value={this.state.url}
              onBlur={this.handleUrlBlur.bind(this)}
              onChange={this.handleUrlChange.bind(this)}
            />
          </div>
          <div className="comment-field-button">
            <Button
              key="submit"
              type="primary"
              onClick={this.handleSubmit.bind(this)}
            >
              Fetch my Instagram page
            </Button>
          </div>
        </div>
      );
    }
  }
}

export default InputPannel;
