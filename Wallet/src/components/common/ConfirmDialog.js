import React, { Component } from 'react';

import { Container, Row, Col, Modal,ModalHeader,ModalBody, ModalFooter, Button  } from "shards-react";
import { withLocalize, Translate } from "react-localize-redux";

class ConfirmDialog extends Component {
 	constructor(props) {
			super(props);
	}
	render(){
		return (
			 <Modal open={this.props.isOpen} toggle={this.props.toggle} {...this.props}>
			  <ModalHeader>{this.props.title}</ModalHeader>
         	 <ModalBody>👋 {this.props.text}</ModalBody>
			<ModalFooter>
					  <Button
			                className="btn btn-primary"
			                type="button"
							onClick={()=>{this.props.toggle(true)}}
			              >
			                 <Translate id="Yes"/>
			              </Button>
					  <Button
			                className="btn btn-warning"
			                type="button"
							onClick={()=>{this.props.toggle()}}
			              >
			                 <Translate id="No"/>
			              </Button>
					 
					</ModalFooter>
			 </Modal>
			
		)
	}
	
}


export default withLocalize(ConfirmDialog);
