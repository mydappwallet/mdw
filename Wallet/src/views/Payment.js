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

var utils = require('web3-utils');





var bindEvent =  function(element, eventName, eventHandler) {
	 if (element.addEventListener){
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
}



class Payment extends React.Component {
  constructor(props) {
	 super(props);
	this.state = {
    transaction: undefined,
    saving: false,
		result: undefined,
		error: undefined,
    more: false,
    redirect: undefined
  }
  


	
     this.uid =  this.props.match.params.uid;
     this.id =  parseInt(this.props.match.params.id);
    this.props.addTranslation(require("../translations/payment.json"));
    this.pay = this.pay.bind(this);
 
  }

  

	componentDidMount(){
    this.reload();
        
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
      mydappwallet.transaction({uid:this.props.match.params.uid},  function(error, result){
         if(error){
            this.setState({error: error});
        }
        else {
          this.setState({transaction: result});
          console.log("Transaction Status: " + result.status);
          if(result.status===1 &&  !this.interval){

            var check = () => {
              console.log('check');
              if(this.state.transaction){
                  const transactionHash = this.state.transaction.response.result;
                mydappwallet.eth.getTransactionReceipt(transactionHash,
                  function(error, result) {
                       if (!error && result) {
                         
                          this.reload();

                       }
                  }.bind(this));
              }
            };
            check = check.bind(this);
            this.interval = setInterval(check, 1000);
          }else {
                   
            if(this.interval){
                console.log('clearInterval');
                  clearInterval(this.interval); 
            }
              
          }
        }
      
        }.bind(this))
      } catch (error) {
      	this.setState({error: error});
   	  }
   }

    setError(error){
	   this.setState({error});
   }

	




 

  

 

  
	
	
	

  pay(payment){
    try {
         const {mydappwallet} = window;
       				 this.setState({saving: true});
		mydappwallet.pay({id: payment.id},  function(error, result){
      if(result){
        window.location = result.redirectUrl;
        	
      }
			
			
			
	    }.bind(this))
      } catch (error) {
      
       this.setState({saving: false, error: error});
		
   	  }
	return true;

  }
	

  render() {

   const {transaction, error, saving, redirect}  = this.state;
   const pay = this.pay;
   if(redirect)return <Redirect to={redirect}/>	


   if(!error && !transaction)return (<Loader/>)
    const network = transaction.network;
 return ( <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title={<Translate id="payment-title"/>} subtitle={<Translate id="wallet"/>} className="text-sm-left mb-3" />
        
        </Row>
        {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
            <CardBody className="py-0 pb-3">
              {transaction.error && 
                 <Row className="border-bottom">
               
                    <Col className="px-4 py-2 col-12 red">[<Translate id={"error-" + transaction.error.code}/>]</Col>
         
                </Row>
              }
			   {transaction.app && 
                   <Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="recipient"/></Col>
                  <Col className="px-4 py-2 col-lg-9 col-sm-8 col-12">{transaction.app}</Col>
                </Row>
              }
			  
				<Row className="border-bottom">
								<Col className="px-4 py-2 col-lg-3 col-sm-4 col-4"><Translate id="type"/></Col>
								<Col className="px-4 py-2 col-lg-9 col-sm-8 col-8"><Translate id={"transaction-type-" + transaction.type}/></Col>
								</Row> 



			  {transaction.value &&  
				<Row className="border-bottom">
					<Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="amount"/></Col>
					<Col className="px-4 py-2 col-lg-9 col-sm-8 col-12"><h4>{utils.fromWei(transaction.value.toString())} {network.symbol}</h4></Col>
					</Row>
  			  }
			  { transaction.from &&  
				<Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="from"/></Col>
                  <Col className="px-4 py-2 col-lg-9 col-sm-8 col-12"><Translate id={transaction.from}/></Col>
				</Row>   
              }
			  { transaction.to &&
				<Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="to"/></Col>
                  <Col className="px-4 py-2 col-lg-9 col-sm-8 col-12"><Translate id={transaction.to}/></Col>
                </Row>           
			  }
         			  <Row className="border-bottom">
                    <Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="gasPrice"/></Col>
                    <Col className="px-4 py-2 col-lg-9 col-sm-8 col-12">{utils.fromWei(transaction.gasPrice.toString())} {network.symbol} ({utils.fromWei(transaction.gasPrice.toString(), 'Gwei')} Gwei)</Col>
                  </Row>                         
                {transaction.status===0 &&  
                              <React.Fragment>
              <Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-md-3 col-sm-4 col-12"><Translate id="payment-method"/></Col>
                <Col className="px-4 py-1 col-lg-8 col-md-8 col-sm-8 col-12" >
                   <div className="payment col-lg-6 col-md-6 col-sm-10 col-12" onClick={()=>{  this.setState({redirect:'/confirm/'+this.uid + "/" + this.id})}}>
                    <div className="icon"><img className="identicon__eth-logo" src={require("../images/eth_logo.svg")}  alt=""/></div>
                    <div className="data">
                     <div className="type"><Translate id='payment-method-0'/></div>
                     <div className="value">{utils.fromWei(transaction.value.toString())} {network.symbol}</div>
                    </div>
			            </div>
        

 {transaction.payments &&  transaction.payments.map(function(payment){
                      return (  
               <React.Fragment>
                     
                 
                            <div className="payment  mt-1 col-lg-6 col-md-6 col-sm-10 col-12" onClick={()=>{pay(payment)}}>
                              <div className="icon"><img className="identicon__eth-logo" src={payment.ico}  alt=""/></div>
                              <div className="data">
                               <div className="type"><Translate id={'payment-method-' + payment.type}/></div>
                                <div className="value">{payment.amount} {payment.currency}</div>
                               </div>
                            </div>
                      
                            </React.Fragment>
                        )
              }

                  )}
  
         
                       </Col>
                  </Row>
             

               
         
 


       
                      </React.Fragment>} 
                                   
               
   				<Collapse in={this.state.more}>
          <Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="uid"/></Col>
                  <Col className="px-4 py-2 col-lg-9 col-sm-8 col-12">{transaction.uid}</Col>
                </Row>
                   <Row className="border-bottom">
                    <Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="gasLimit"/></Col>
                    <Col className="px-4 py-2 col-lg-9 col-sm-8 col-12">{ transaction.gasLimit} </Col>
                  </Row>
				    <Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="timestamp"/></Col>
                  <Col className="px-4 py-2 col-lg-9 col-sm-8 col-12">    <Moment format={constants.DATE_AND_TIME_FORMAT}>{transaction.createDate*1000}</Moment></Col>
                </Row>
   </Collapse>
				  <Row >
                  <Col className="px-4 py-2 col-12">  <a href="#" onClick={()=>{ this.more()}}><Translate id={this.state.more?"see-less":"see-more"}/> {this.state.more?<i className="material-icons">&#xe5d8;</i>:<i className="material-icons">&#xe5db;</i>}</a></Col>
                </Row>   
               
               
                
                 
              

          </CardBody>
        </Card>
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
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Payment));

