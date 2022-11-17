import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

import './Frame.css'

class Frame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: uuidv4()
    };
  }

  componentDidUpdate(prevProps, prevState) {
    setTimeout(() => { this.renderFrame(); }, 0);
  }

  componentDidMount() {
    setTimeout(this.renderFrame, 0);
  }

  componentWillUnmount() {}

  renderFrame = () => {
    const frame = ReactDOM.findDOMNode(this);

    const myIFrame = frame.contentWindow ||
      frame.contentDocument.document ||
      frame.contentDocument;

    myIFrame.document.open();
    myIFrame.document.write(this.props.body);
    myIFrame.document.close();
  };

  render() {
    return <iframe className="if_cnt" onLoad={this.renderFrame} title={this.state.uuid} />;
  }
}

export default Frame;
