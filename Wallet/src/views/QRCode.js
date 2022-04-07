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

import { Formik } from 'formik';
import * as Yup from 'yup'
var utils = require('web3-utils');





class QRCode extends React.Component {
  constructor(props) {
	 super(props);

	this.props.addTranslation(require("../translations/qrcode.json"));

      
     this.qrcode =  this.props.appStore.qrcode;
	if(!this.qrcode){
			this.state = {redirect: "/"};
	}else {
		this.state = {redirect: undefined};
	}
	 
  }

  

	

  

	

  render() {
	if(this.state.redirect)	return <Redirect to={this.state.redirect}/>	
	const src =  'data:image/jpeg;base64,'+ this.qrcode.img; 
  
 return ( <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title={<Translate id={"qrcode-"+ this.qrcode.type + "-title"}/>} subtitle={<Translate id="qrcode"/>} className="text-sm-left mb-3" />
        
        </Row>
        {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
            <CardBody className="py-2 pb-3">
			<Row className="">
			<Col className="center" >
			<h6><Translate id={"qrcode-"+ this.qrcode.type + "-description"}/></h6>
			</Col>
              </Row>
			<Row className="">
			<Col className="center" >
            <img  id='base64image'
       		src={src} />
			</Col>
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
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(QRCode));

