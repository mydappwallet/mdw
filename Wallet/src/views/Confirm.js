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

const initialValues = {
  code: ""
  
  
};


var bindEvent =  function(element, eventName, eventHandler) {
	 if (element.addEventListener){
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
}



class Confirm extends React.Component {
  constructor(props) {
	 super(props);
	this.state = {
    transaction: undefined,
    saving: false,
		result: undefined,
		error: undefined,
		more: false
  }
  


	
     this.uid =  this.props.match.params.uid;
     this.id =  parseInt(this.props.match.params.id);
   this.onSubmit = this.onSubmit.bind(this);
  this.onSubmited = this.onSubmited.bind(this);
	this.formik = React.createRef();
	this.code = React.createRef();
	this.props.addTranslation(require("../translations/confirm.json"));
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
          if(result.status===1 &&  !this.interval){

            var check = () => {
              if(this.state.transaction){
                  const transactionHash = this.state.transaction.response.result;
                this.props.appStore.cryptoItems[result.network].web3.eth.getTransactionReceipt(transactionHash,
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

	
 findFirstError (formName, hasError) {
	    const form = document.forms[formName]
	    for (let i = 0; i < form.length; i++) {
	      if (hasError(form[i].name)) {
	        form[i].focus()
	        break
	      }
	    }
	  }

  validateForm (errors) {
    this.findFirstError('confirmForm', (fieldName) => {
      return Boolean(errors[fieldName])
    })
  }

  validationSchema = function (values) {
		console.log(JSON.stringify(values));
	  return Yup.object().shape({
	    code: Yup.number().typeError('Code must be a number betwen 100000 to 999999!').required('Code is required!')
				.min(100000, `Code must be a number betwen 100000 to 999999!`)
				.max(999999, `Code must be a number betwen 100000 to 999999!`)
	     
	   
	  })
}

  validate = (getValidationSchema) => {
	  return (values) => {
	    const validationSchema = getValidationSchema(values)
	    try {
	      validationSchema.validateSync(values, { abortEarly: false })
	      return {}
	    } catch (error) {
	      return this.getErrorsFromValidationError(error)
	    }
	  }
	}

  getErrorsFromValidationError = (validationError) => {
	  const FIRST_ERROR = 0
	  return validationError.inner.reduce((errors, error) => {
	      
	    return {
	      ...errors,
	      [error.path]: error.errors[FIRST_ERROR],
	    }
	  }, {})
	}

  touchAll(setTouched, errors) {
    setTouched({
        code: true
               
      }
    )
    this.validateForm(errors)
  }

  onSubmit(values, actions){

    const transaction = this.state.transaction;
	 try {
    const {mydappwallet} = window;
		mydappwallet.confirm({uid: transaction.uid, code:values.code, id: this.id},  function(error, result){
			
				if(error){
					switch(error.code){
             case 4400:
              if(window.opener){
					        window.close();
              return;
						}
					 default:
						 this.setState({saving: false});
						 this.formik.current.errors['code'] = error.message;
					
			  		}
				}else {
						if(window.opener){
              window.close();
              return;
						}
				}
			
			   this.reload();
 			// this.formik.current.values['code'] = '';
		
			 
	
			// this.setState({saving: false, result: result, redirect: "/processing/"+ _this.uid});  
			
			
			
			
	    }.bind(this))
      } catch (error) {
      
       this.setState({saving: false, error: error});
		
   	  }
	return true;

  
	}
	
	reject(){
    const transaction = this.state.transaction;
		try {
			const {mydappwallet} = window;
			mydappwallet.reject({uid: transaction.uid, id: this.id},  function(error, result){
				if(error){
					switch(error.code){
            case 4500:
              if(window.opener){
					        window.close();
              return;
						}
					 default:
						 this.setState({saving: false});
						 this.formik.current.errors['code'] = error.message;
					
			  		}
				}
				 this.reload();
			}.bind(this))
		} catch (error) {
		this.setState({saving: false, error: error});
			
		}
	return true;

  
	}
	onSubmited(error, transaction){

		if(error) {
			this.setState({ error });
			return;
		}
		if(transaction.error){
	
			this.formik.current.errors['code'] = transaction.error.message;
		}
		this.setState({ transaction});

		  
				

	}	

	

  render() {

   const {transaction, error, saving}  = this.state;



   if(!error && !transaction)return (<Loader/>)
    const network = transaction.network;
 return ( <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title={<Translate id="confirm-title"/>} subtitle={<Translate id="wallet"/>} className="text-sm-left mb-3" />
        
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
                {transaction.status===0 &&  <Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="action"/></Col>
                  <Col className="px-4 py-1 col-lg-12 col-sm-8 col-12" style={{'maxWidth': 300}}>

         
 <Formik
              initialValues={initialValues}
              validate={this.validate(this.validationSchema)}
              onSubmit={this.onSubmit}
			  innerRef={this.formik}
              render={
                ({
                  values,
                  errors,
                  touched,
                  status,
                  dirty,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  isValid,
                  handleReset,
                  setTouched
                }) => (
	        <Form onSubmit={handleSubmit} noValidate name='confirmForm'>

   <Row><Col>
	              <FormGroup>
	                <label htmlFor="code">  <Translate id="code-label" data={{codeId: transaction?transaction.codeId:0}}/> </label>
	                <FormInput type="text"
	                     name="code"
	                     id="code"
	                     placeholder={this.props.translate("code-placeHolder", {attempts: transaction?transaction.attempts:0})}
	                     autoComplete="given-name"
	                     valid={!errors.code}
	                     invalid={touched.code && !!errors.code}
	                     autofocus={true}
	                     required
	                     onChange={handleChange}
	                     onBlur={handleBlur}
	                     value={values.code}
						 disable={saving }
					  	 innerRef={this.code}
                     />
        			<FormFeedback>{errors.code}</FormFeedback>
	              </FormGroup>
</Col>


		    </Row>      
       
	             
 					
				         <FormGroup>
	              <Row style={{marginTop: 5}}>
				
<Col className="col-6" >
	              <Button
	                pill
 	                className="btn-danger right"
	                type="button"
					style={{"width": 100, "textAlign": "center"}}
					disable={saving }
					onClick={() => {this.reject()}}
	              >
	                Reject
	              </Button>
</Col>
<Col className="col-6 center">
	              <Button
	                pill
	             
	                className="d-table mx-auto left"
					style={{"width": 100, "textAlign": "center"}}
   					theme="accent"
	                type="submit"
					disable={saving}
	              >
	                Confirm
	              </Button>
</Col>


		    </Row>
			  {this.state.error &&  <Row><Col>	<div className="red" style={{"text-align": "center", "marginBottom":10}} ><Translate id={'error-'+this.state.error.code}/></div></Col></Row>}
        </FormGroup>

</Form>
  )} />


            </Col>
                </Row>  } 
               
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
				  <Row>
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
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Confirm));

