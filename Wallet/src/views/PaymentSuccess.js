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
  Form,
  FormGroup,
  FormInput,
  CardBody,
  FormFeedback
} from "shards-react";
import Collapse from "@material-ui/core/Collapse";
import Moment from "react-moment";
import PageTitle from "../components/common/PageTitle";
import * as constants from '../constants';
import {Loader} from "../components/loader";

import { withLocalize, Translate } from "react-localize-redux";







var bindEvent =  function(element, eventName, eventHandler) {
	 if (element.addEventListener){
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
}



class PaymentSuccess extends React.Component {
  constructor(props) {
	 super(props);
	this.state = {
    saving: false,
		payment: undefined,
		error: undefined,
    more: false,
    redirect: undefined
  }
  


	
  this.reload = this.reload.bind(this);
     this.id =  parseInt(this.props.match.params.id);
    this.props.addTranslation(require("../translations/payment.json"));
 
  }

  

	componentDidMount(){
    this.reload();
    this.interval = setInterval(this.reload , 1000);
        
  }
  componentWillUnmount(){
    if(this.interval){
      clearInterval( this.interval);
    }
  }

   more(){
      this.setState({more: !this.state.more})
   }
	

   reload(){
     	try {
      const {mydappwallet} = window;
      mydappwallet.payment({id:this.id},  function(error, result){
          if(result && !result.status){
              if(window.opener){
                  window.close();
              }
          }
          this.setState({error: error, payment: result});
        
      
        }.bind(this))
      } catch (error) {
      	this.setState({error: error});
   	  }
   }

    setError(error){
	   this.setState({error});
   }

	




 

  

 

  
	
	
	

  
	

  render() {

   const {transaction, error, saving, redirect}  = this.state;
	

   return (<Loader/>);

	  


     
	 
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
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(PaymentSuccess));

