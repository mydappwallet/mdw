/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  FormInput,
  FormCheckbox,
  Button,
	FormFeedback
} from "shards-react";
import history from "../utils/history";
import { Default} from 'react-spinners-css';

import { Link, Redirect } from "react-router-dom";
import { withLocalize, Translate } from "react-localize-redux";
import { Formik } from 'formik';
import * as Yup from 'yup'
import {Loader} from "./../components/loader";
import * as app from './../actions/app';


class ChangeAuthenticator2 extends React.Component {
  constructor(props) {
	 super(props);
 	
  		  this.state = {redirect: undefined };
	


  }
  componentDidMount(){
	
		app.refLink({refId: 	this.props.match.params.refId}, function(error, result){
		
			if(error){
				this.setState({redirect: "/error/"+error.code})
				
			}else {
				this.props.qrcode(result.qrcode);
			}
		}.bind(this))
	
  }

	

  
	

  render() {
	if(this.state.redirect)return <Redirect to={this.state.redirect}/>	
	 if(this.props.appStore.qrcode)return (<Redirect to="/qrcode" />);
	return (<Loader/>)
}
}

const mapStateToProps = (state) => {
  return { 
    ...state
  }
  
};

const mapDispatchToProps = (dispatch) => {
  return {
	  	qrcode: (code) => dispatch(app.qrcode(code)),
		
   
  
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(ChangeAuthenticator2));

