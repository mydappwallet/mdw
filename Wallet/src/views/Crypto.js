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
} from "shards-react";

import PageTitle from "../components/common/PageTitle";



import {Loader} from "../components/loader";
import { withLocalize, Translate } from "react-localize-redux";
import {Web3} from "./cryptos";





class Crypto extends React.Component {
  constructor(props) {
	 super(props);
	this.state = {
	  redirect: undefined,
    name: this.props.match.params.name,
    CryptoComponent: undefined
	}
  
 
	
  this.props.addTranslation(require("../translations/crypto.json"));
  this.props.addTranslation(require("../translations/yup.json"));

  }

	componentDidMount(){
       this.createCryptoComponent();
     
    
  
     
  }

 	componentDidUpdate(){
     const name =  this.props.match.params.name;
     if(name!==this.state.name){
             this.createCryptoComponent();
         
     }
    
  
     
  }
  componentWillUnmount(){
    if(this.interval){
      clearInterval( this.interval);
    }

  }
	
  createCryptoComponent(){

      if(!this.props.appStore.cryptoItems[this.props.match.params.name]){
          this.setState({redirect: '/error/404'});
     }else {
       this.crypto = this.props.appStore.cryptoItems[this.props.match.params.name];
        var component = undefined;
    switch(this.crypto.type){
      case 'web3':
        component = React.createElement(this.props.match.params.name, {}, <Web3 name={this.props.match.params.name}/>)
        break;
        default:
          this.setState({redirect: '/error/404'});
          return;
    }
    this.setState({name: this.props.match.params.name, CryptoComponent: component})
     }


    
  }
  

	

	

  render() {

   const {transaction, error, redirect}  = this.state;
  const crypto = this.crypto;
	 if(redirect)return <Redirect to={redirect}/>
   if(!crypto)return <Loader/>
   const {web3} = window;
  const networks = this.props.networkStore.list;
 return ( <Container fluid className="main-content-container px-4 mx-auto mt-4">

        <Row noGutters className="page-header py-4">
          <PageTitle title={<Translate id={crypto.title}/>} subtitle={<Translate id="wallet"/>} className="text-sm-left mb-3" />
        
        </Row>
        {/* Default Light Table */}
    <Row>
      <Col>
        
           {this.state.CryptoComponent}
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
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Crypto));

