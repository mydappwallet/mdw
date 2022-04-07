/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';

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
import Collapse from "@material-ui/core/Collapse";

import PageTitle from "../../components/common/PageTitle";
import * as constants from '../../constants';


import {Loader} from "../../components/loader";

import { withLocalize, Translate } from "react-localize-redux";




class ChangeEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      more: false
    };
  }
  more(){
      this.setState({more: !this.state.more})
  }
  render(){

    return (
    <React.Fragment>
    
                
                <Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-sm-3 col-12"><Translate id="new-email"/></Col>
                  <Col className="px-4 py-2 col-lg-9 col-sm-9 col-12"><Translate id={this.props.transaction.email}/></Col>
                </Row>     
                <Collapse in={this.state.more}>
                <Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-sm-3 col-12"><Translate id="uid"/></Col>
                  <Col className="px-4 py-2 col-lg-9 col-sm-9 col-12">{this.props.transaction.uid}</Col>
                </Row>
                  <Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-sm-3 col-12"><Translate id="request"/></Col>
                  <Col className="px-4 py-2 col-lg-9 col-sm-9 col-12"><Translate id={JSON.stringify(this.props.transaction)}/></Col>
                </Row>  
              
                </Collapse>                        
                <Row>
                  <Col className="px-4 py-2 col-12">  <a href="#" onClick={()=>{ this.more()}}><Translate id={this.state.more?"see-less":"see-more"}/> {this.state.more?<i className="material-icons">&#xe5d8;</i>:<i className="material-icons">&#xe5db;</i>}</a></Col>
                </Row>   
              
               
               

    </React.Fragment>
  

)
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
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(ChangeEmail));

