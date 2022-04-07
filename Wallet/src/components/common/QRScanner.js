import React from "react";
import PropTypes from "prop-types";
import { withLocalize, Translate } from "react-localize-redux";
import {
  Container,
  Alert,
 
} from "shards-react";

import QrReader from 'react-qr-reader'


const bindEvent =  function(element, eventName, eventHandler) {
	 if (element.addEventListener){
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
}

const unbindEvent =  function(element, eventName, eventHandler) {
	 if (element.removeEventListener){
                element.removeEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.detachEvent('on' + eventName, eventHandler);
            }
}

class QRScanner extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = { error:false }

  }
  componentDidMount(){
    bindEvent(window,"mousedown", this.mouseDown.bind(this))
  }
  componentWillUnmount(){
        unbindEvent(window,"mousedown", this.mouseDown.bind(this))
  }
  mouseDown(){
           this.props.handleScan();
  }
  
   handleScan = data => {
    if (data) {
       this.props.handleScan(data);
    }
  }
  handleError = err => {
    this.setState({error:true})
  }
  
  render () {
    if(this.state.error)return (
      <div className="qrscan_window_error">
        Camera is not supported
      </div>
    )
    return (
       <div className="qrscan_window">
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: 200 }}
        />
      </div>
    )
  }
}

QRScanner.propTypes = {
  /**
   * The page title.
   */
  handleScan: PropTypes.func,
 
};

export default QRScanner;
