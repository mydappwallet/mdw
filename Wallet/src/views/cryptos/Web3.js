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
  Nav, NavItem, NavLink
} from "shards-react";
import Moment from "react-moment";
import PageTitle from "../../components/common/PageTitle";
import * as constants from '../../constants';


import {Loader} from "../../components/loader";
import {Web3Send, Web3Receive, Transaction, History, Web3Buy, Books, Web3Assets} from "./tabs";
import { withLocalize, Translate } from "react-localize-redux";
import * as app from "../../actions/app";





class Web3 extends React.Component {
  constructor(props) {
   super(props);
   this.name =  this.props.name;
   this.crypto = this.props.appStore.cryptoItems[this.name]; 
	 this.state = {
    loading: true,
    tab: 6,
    uid: undefined
    }
    this.activateTab = this.activateTab.bind(this); 	 

	this.formik = React.createRef();
	this.props.addTranslation(require("../../translations/transaction.json"));
  this.confirm = this.confirm.bind(this); 

  }

	componentDidMount(){

    if(!this.crypto.asset){
      this.props.assets(this.name, function(error, result){
	
        if(this.props.appStore.addressBook[this.crypto.type]===undefined){
          this.props.addressBook(this.crypto.type, function(error, result){
             this.setState({loading:false});
          }.bind(this));
        } else {
            this.setState({loading:false});
        } 


      }.bind(this));
    }else  if(this.props.appStore.addressBook[this.crypto.type]===undefined){
          this.props.addressBook(this.crypto.type, function(error, result){
             this.setState({loading:false});
          }.bind(this));
        }else {
             this.setState({loading:false});
    }   


    
  }
  componentWillUnmount(){
    if(this.interval){
      clearInterval( this.interval);
    }
        this.props.errorClose();
        this.props.infoClose();
  }
	

   

  activateTab(tab){
    this.props.errorClose();
    this.props.infoClose();
  	 this.setState({tab});
	 if(this.state.uid && tab!=3)
		 this.setState({uid:undefined});
  }
  confirm(uid){
    this.setState({uid, tab:3});
  }

	

  render() {

   const {transaction, error, redirect, loading}  = this.state;
   if(loading )return <Loader/>
   return (
             <Card small className="mb-4">
    <CardHeader className="border-bottom py-0" >           
    <Nav className="tab">
      <NavItem>
        <NavLink active={this.state.tab===0} href="#" onClick={() => {this.activateTab(0)}}>
          History
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink  active={this.state.tab===1} href="#" onClick={() => {this.activateTab(1)}}>Receive</NavLink>
      </NavItem>
      <NavItem>
        <NavLink  active={this.state.tab===2} href="#" onClick={() => {this.activateTab(2)}}>Send</NavLink>
      </NavItem>
      {this.state.uid && 
      <NavItem>
        <NavLink  active={this.state.tab===3} href="#" onClick={() => {this.activateTab(3)}}>Transaction</NavLink>
      </NavItem>
      }
 	 <NavItem>
        <NavLink  active={this.state.tab===4} href="#" onClick={() => {this.activateTab(4)}}>Buy</NavLink>
      </NavItem>
      <NavItem>
        <NavLink  active={this.state.tab===5} href="#" onClick={() => {this.activateTab(5)}}>Books</NavLink>
      </NavItem>
 		<NavItem>
        <NavLink  active={this.state.tab===6} href="#" onClick={() => {this.activateTab(6)}}>Assets</NavLink>
      </NavItem>
     
    </Nav>
    </CardHeader>
      
          <CardBody className="py-0 pb-3">
            {this.state.tab===0 && 
                          <History name={this.name}/>
            }
            {this.state.tab===1 && 
               <Web3Receive name={this.name}/>
            }
            {this.state.tab===2 && 
            <Web3Send name={this.name} confirm={this.confirm} />
            }
            {this.state.tab===3 && 
            <Transaction uid={this.state.uid} activateTab={this.activateTab}/>
            }
	        <Web3Buy name={this.name} display={this.state.tab===4}/>
	        
			{this.state.tab===5 && 
            <Books name={this.name} />
            }
			{this.state.tab===6 && 
            <Web3Assets name={this.name} />
            }
          </CardBody>


           </Card>
     
     
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
         assets: (network, callback) => dispatch(app.assets(network, callback)),
         addressBook: (type, callback) => dispatch(app.addressBook(type, callback)),
         errorClose: () => dispatch(app.errorClose()),
 	     infoClose: () => dispatch(app.infoClose()),

   
  
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Web3));

