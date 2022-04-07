/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Nav, NavItem, NavLink,
  FormGroup
} from "shards-react";

import * as constants from '../../../constants';



import QRCode from "react-qr-code";

import { withLocalize, Translate } from "react-localize-redux";

var classNames = require('classnames');


function load()
{

}

class Web3Buy extends React.Component {
  constructor(props) {
   super(props);
   this.name =  this.props.name;
   this.crypto = this.props.appStore.cryptoItems[this.name]; 
   this.frameSrc = "/mobilum.html?cryptoCurrency=" +  this.crypto.symbol + "&walletAddress="+window.mydappwallet.wallet.web3
   this.load = this.load.bind(this);
this.resize = this.resize.bind(this);
   this.frame = React.createRef();

 window.document.addEventListener('event', function(e){

  });
}

	
	
   

	activateTab(tab){
   this.setState({tab});
  }

 
resize(event) {

	var frame = this.frame.current;
	 frame.style.height =  frame.contentWindow.document.documentElement.scrollHeight + 'px';
}
load(event){
	var frame = event.currentTarget;
	 frame.style.height =  frame.contentWindow.document.documentElement.scrollHeight + 'px';
	frame.contentWindow.addEventListener('resize', this.resize);
		//frame.contentWindow.addEventListener('scroll', this.resize);
}
  render() {


   return (
         <Container fluid className={classNames("px-4,pb-4", this.props.display?"":"hidden")} >
	<Row className="pt-4">
		
             			
	 <iframe src={this.frameSrc} ref={this.frame} width="100%" onLoad={this.load} frameBorder="0"/>     

    </Row>
         </Container>
         
     
 );

	  


     
	 
	}
}


const mapStateToProps = (state) => {
  return { 
    ...state
  }
  
};

const mapDispatchToProps = (dispatch) => {
  return {

   

   
  
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Web3Buy));

