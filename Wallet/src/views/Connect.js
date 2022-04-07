
import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
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
  ButtonGroup,
	FormFeedback
} from "shards-react";


import {Loader} from "../components/loader";
import {Timer} from "../components/timer";
import {Error} from "../components/error";
import { Link } from "react-router-dom";
import { withLocalize, Translate } from "react-localize-redux";


import * as confirm from './../actions/confirm';





var bindEvent =  function(element, eventName, eventHandler) {
	 if (element.addEventListener){
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
}

class Connect extends React.Component {
  constructor(props) {
	 super(props);
	this.state = {
		loading: false,
		error: undefined,
		app: undefined,
		
	}
	   this.uid =  this.props.match.params.uid;
	   this.id =  parseInt(this.props.match.params.id);
  	 
	this.props.addTranslation(require("../translations/connect.json"));
   	  bindEvent(window, 'beforeunload', this.cancel.bind(this));
  }

	componentDidMount(){


		var _this = this;
		  try {
			this.setState({loading: true});
     	const {mydappwallet} = window;
		mydappwallet.app({uid: this.uid},  function(error, result){
			 if(error){
					_this.setState({loading: false, error: error});
			 }
			 else {
				_this.setState({loading: false, app: result});
			}
		
	    })
      } catch (error) {
      	this.setState({loading: false, error: error});
   	  }
	}
	
	componentDidUpdate(){

	}
	connect(){
    const {mydappwallet} = window;
    mydappwallet.connect({uid: this.uid,id:this.id},function (error, result){
             window.close();
    }.bind(this));
		

		
  }

  cancel(){
    
      var event = {id: this.id, target: "mydappshop-inpage", event: "mydappshop-connect"};
      const {mydappwallet} = window;
      mydappwallet.event(event, {code: 410, message:'User rejected'});
      window.close();
     
  }
  
  

  

  render() {
	  const {mydappwallet} = window;
	 const {loading, error, app, redirect}  = this.state;
		const wallet = mydappwallet.wallet.web3;

	 if(redirect)return <Redirect to={redirect}/>
	 if(loading)return (<Loader/>)
	 if(error)return (<Error code={this.state.error.code}/>)
	 return (
<Container fluid className="main-content-container h-100 px-4">
	    <Row noGutters className="h-100">
	      <Col lg="3" md="5" className="connect-form mx-auto my-auto">
	        <Card>
	          <CardBody> 
				   <img
              className="auth-form__logo d-table mx-auto mb-3"
              src={require("../images/shards-dashboards-logo.svg")}
              alt="Shards Dashboards - Login Template"
            />

            {/* Title */}
            <div className="auth-form__title text-center">
                       <Translate id="connect-title" data={app}/>
            </div>
              <h5 className="center">
                       <Translate id="connect-question" data={app}/>
            </h5>
   <div className="connect__actions">
     <Row>
     <Col sm="6"  className="right">
              <ButtonGroup size="lg">
                <Button theme="white" onClick={()=> {this.connect()}}>
                  <span className="text-success">
                    <i className="material-icons">check</i>
                  </span>{" "}
                  Yes
                </Button>
                </ButtonGroup>
                </Col>
                   <Col sm="6"  className="">
                 <ButtonGroup size="lg">
                <Button theme="white" onClick={()=> {this.cancel()}}>
                  <span className="text-success">
                    <i className="material-icons">check</i>
                  </span>{" "}
                  No
                </Button>
                </ButtonGroup>
                </Col>
             </Row>   
            </div>



				
  	</CardBody> 
	     </Card>
		     </Col>
	    </Row>
	  </Container>		  

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
         load : (uid, callback) => dispatch(confirm.load(uid, callback)),
         confirm : (uid, code, callback) => dispatch(confirm.confirm(uid, code, callback))
   

   
  
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Connect));

