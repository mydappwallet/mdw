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
import getSymbolFromCurrency from 'currency-symbol-map'


import QRCode from "react-qr-code";

import { withLocalize, Translate } from "react-localize-redux";






class Web3Receive extends React.Component {
  constructor(props) {
   super(props);
   this.name =  this.props.name;
   this.crypto = this.props.appStore.cryptoItems[this.name]; 
	 this.state = {

	  }
 	 


  }

	componentDidMount(){

   


    
  }
  componentWillUnmount(){
   
  }
	

   

	activateTab(tab){
   this.setState({tab});
  }

	

  render() {

   const {transaction, error, redirect, loading}  = this.state;

   return (
         <Container fluid className="px-4 pb-4">
	<Row className="pt-4">
			 <Col  className="receive_qr_col">
         <FormGroup>
         <QRCode value={window.mydappwallet.wallet.web3} size={150} />
         </FormGroup>
             </Col>
             			 <Col >
         <FormGroup><label className="mb-2 highlight"> Wallet balance:</label>
        <p className="mb-0 bold">{this.crypto.balanceFormatted} {this.crypto.symbol}</p>
        <p className="mb-3">{getSymbolFromCurrency(this.props.appStore.settings["default.currency"])}{this.crypto.balanceInFiat[this.props.appStore.settings["default.currency"]]?this.crypto.balanceInFiat[this.props.appStore.settings["default.currency"]]:"0.00"}</p>
        <label className="mb-2 highlight"> Wallet address:</label>
        <p className="mb-2 bold">{window.mydappwallet.wallet.web3}</p>
        </FormGroup>
                   </Col>
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
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Web3Receive));

