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
import Moment from "react-moment";
import PageTitle from "../../components/common/PageTitle";
import * as constants from '../../constants';


import {Loader} from "../../components/loader";

import { withLocalize, Translate } from "react-localize-redux";
import EthSendTransaction from './EthSendTransaction';
import RegisterAccount from './RegisterAccount';
import ChangeEmail from './ChangeEmail';
import ContractInteraction from './ContractInteraction';
import ActionConfirm from '../../components/common/ActionConfirm';





class Transaction extends React.Component {
  constructor(props) {
	 super(props);
	this.state = {
		transaction: undefined,
		error: undefined,
		
	}
 	  this.uid =  this.props.match.params.uid;

	this.formik = React.createRef();
	this.code = React.createRef();
	this.props.addTranslation(require("../../translations/transaction.json"));
  this.interval = undefined; 
  }

	componentDidMount(){
    this.reload();
     
  }
  componentWillUnmount(){
    if(this.interval){
      clearInterval( this.interval);
    }
  }
	

   reload(){
     	try {
        console.log('reload');
          const {web3} = window;
      web3.transaction({uid:this.props.match.params.uid},  function(error, result){
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
                web3.eth.getTransactionReceipt(transactionHash,
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

	

	

  render() {

   const {transaction, error, redirect}  = this.state;

	 if(redirect)return <Redirect to={redirect}/>
   if(!error && !transaction)return (<Loader/>)
   const {web3} = window;
  const networks = this.props.networkStore.list;
 return ( <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title={<Translate id="transaction-title"/>} subtitle={<Translate id="wallet"/>} className="text-sm-left mb-3" />
        
        </Row>
        {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Overview</h6>
          </CardHeader>
          <CardBody className="py-0 pb-3">
              {transaction.error && 
                 <Row className="border-bottom">
               
                    <Col className="px-4 py-2 col-12 red">[<Translate id={"error-" + transaction.error.code}/>]</Col>
         
                </Row>
              }
                <Row className="border-bottom">
                <Col className="px-4 py-2 col-lg-3 col-sm-4 col-4"><Translate id="id"/></Col>
                  <Col className="px-4 py-2 col-lg-9 col-sm-8 col-8">{transaction.id}</Col>
         
                </Row>
         
              
            
                <Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-sm-4 col-4"><Translate id="type"/></Col>
                  <Col className="px-4 py-2 col-lg-9 col-sm-8 col-8"><Translate id={"transaction-type-" + transaction.type}/></Col>
                </Row> 
                
                   <Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-sm-4 col-4"><Translate id="status"/></Col>
                  <Col className="px-4 py-1 col-lg-9 col-sm-8 col-8">
                     		     {transaction.status===0 && <Button aria-checked="false"  className="btn-outline-primary" style={{'padding': '.375rem .75rem', 'cursor': 'default'}}><Translate id="transaction-status-0"/></Button>}
                             {transaction.status===1 && <Button aria-checked="false"  className="btn-outline-primary" style={{'padding': '.375rem .75rem', 'cursor': 'default'}}><Translate id="transaction-status-1"/></Button>}
                             {transaction.status===2 && <Button aria-checked="false" className="btn-outline-danger" style={{'padding': '.375rem .75rem',  'cursor': 'default'}}><Translate id="transaction-status-2"/></Button>}
                             {transaction.status===3 && <Button aria-checked="false" className="btn-outline-danger" style={{'padding': '.375rem .75rem',  'cursor': 'default'}}><Translate id="transaction-status-3"/></Button>}
                             {transaction.status===4 && <Button aria-checked="false" className="btn-outline-info" style={{'padding': '.375rem .75rem',  'cursor': 'default'}}><Translate id="transaction-status-4"/></Button>}
                    
                    
                    </Col>
                </Row>    
                <Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="timestamp"/></Col>
                  <Col className="px-4 py-2 col-lg-9 col-sm-8 col-12">    <Moment format={constants.DATE_AND_TIME_FORMAT}>{transaction.createDate*1000}</Moment></Col>
                </Row>
                 {transaction.expirationDate && 
                  <Row className="border-bottom">
                    <Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="expirationDate"/></Col>
                    <Col className="px-4 py-2 col-lg-9 col-sm-8 col-12">    <Moment format={constants.DATE_AND_TIME_FORMAT}>{transaction.expirationDate*1000}</Moment></Col>
                  </Row>   
                }
                   {transaction.status===0 &&  <ActionConfirm transaction={transaction} reload={this.reload.bind(this)}/>}   
                 {transaction.type===10 && <RegisterAccount transaction={transaction} reload={this.reload.bind(this)}/> }
                 {transaction.type===20 && <ChangeEmail transaction={transaction} reload={this.reload.bind(this)}/> }
              {transaction.type===50 && <EthSendTransaction transaction={transaction} reload={this.reload.bind(this)}/> }   
              {transaction.type===60 && <ContractInteraction transaction={transaction} reload={this.reload.bind(this)}/> }   
                
                 
              

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
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Transaction));

