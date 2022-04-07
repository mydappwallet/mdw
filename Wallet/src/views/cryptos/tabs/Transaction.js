/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
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

import * as constants from '../../../constants';

import { withLocalize, Translate } from "react-localize-redux";
import * as app from "../../../actions/app";
import { Formik } from 'formik';
import * as Yup from 'yup'
var utils = require('web3-utils');

const initialValues = {
  code: ""
  
  
};






class Transaction extends React.Component {
  constructor(props) {
	 super(props);
	this.state = {
    transaction: undefined,
    saving: false,
		result: undefined,
		error: undefined,
		more: false
  }
  	
    
  	//this.reload = this.reload.bind(this);
   this.onSubmit = this.onSubmit.bind(this);
  this.reject = this.reject.bind(this);
	this.formik = React.createRef();
	this.code = React.createRef();
  this.interval = undefined; 
  }

  

  componentDidMount(){
	this.props.transaction(this.props.uid, function(error, result){
		
	});
        
  }
  componentWillUnmount(){
    if(this.interval){
      clearInterval( this.interval);
    }
  }

   more(){
      this.setState({more: !this.state.more})
   }
	
	/*
   reload(){
     	try {
    const {mydappwallet} = window;
      mydappwallet.transaction({uid:this.props.uid},  function(error, result){
 		
        if(error){
            this.setState({error: error});
        }
        else {
		 if(this.state.transaction && this.state.transaction.status!==result.status && result.status===4){
			alert('info');
			this.props.info({code:1000, message: "Transaction processed success"});	
		 }
          this.setState({transaction: result});
          if(result.status!==1 &&  this.interval){
            clearInterval(this.interval); 
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
*/

	
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


	 try {
    const {mydappwallet} = window;
		this.setState({saving:true});
		mydappwallet.confirm({uid: this.props.uid, code:values.code},  function(error, result){
			
		if(error){
			switch(error.code){
        	 case 4300:
          		this.formik.current.errors['code'] = this.props.translate('error-4300');
           		this.formik.current.values['code'] = '';
          
          		break;
	    	 default:
  	   		    this.setState({saving: false});
				this.props.error(error);
		  	 }
		}
		
		this.props.transaction(this.props.uid, function(error, result){
			if(error){
					this.props.error(error);
			}
			this.setState({saving: false});
			
					
		}.bind(this));
	
			
	    }.bind(this))
      } catch (error) {
 			this.props.error(error);
      	 this.setState({saving: false});
		
   	  }
	return true;

  
	}
	
 reject(){
	try {
	  const {mydappwallet} = window;
	  this.setState({saving:true});
	  mydappwallet.reject({uid: this.props.uid, id: this.id},  function(error, result){
		 if(error){
			switch(error.code){
	            case 4500:
    	         this.props.activateTab(2);
        	     break;
			    default:
   			    this.formik.current.errors['code'] = error.message;
					
            }
            this.props.error(error);
		  }
		  this.props.transaction(this.props.uid, function(error, result){
			 if(error){
			   this.props.error(error);
			 }
			 this.setState({saving: false});
		   }.bind(this));
		}.bind(this));
		
	} catch (error) {
 		this.props.error(error);
      	 this.setState({saving: false});
  
			
	}
	return true;

  
}
	

	

  render() {

   const {error, saving}  = this.state;
   const transaction = this.props.appStore.transactions[this.props.uid];
 if(!transaction)return (null);



    const network = this.props.appStore.cryptoItems[transaction.network];
 return (         <Container fluid className="px-4 pb-4">
    <Row>
      <Col>

              {transaction.error && 
                 <Row className="border-bottom">
               
                    <Col className="px-4 py-2 col-12 red">[<Translate id={"error-" + transaction.error.code}/>]</Col>
         
                </Row>
              }
			 
			  
				<Row className="border-bottom">
								<Col className="px-4 py-2 col-lg-3 col-sm-4 col-4"><Translate id="type"/></Col>
								<Col className="px-4 py-2 col-lg-9 col-sm-8 col-8"><Translate id={"transaction-type-" + transaction.type} data={network}/></Col>
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
        
			  {transaction.value &&  
				<Row className="border-bottom">
					<Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="amount"/></Col>
					<Col className="px-4 col-lg-9 col-sm-8 col-12"><h4>{utils.fromWei(transaction.value.toString())} {network.symbol}</h4></Col>
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
                    <Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="gasLimit"/></Col>
                    <Col className="px-4 py-2 col-lg-9 col-sm-8 col-12">{ transaction.gasLimit} </Col>
                  </Row>
				    <Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="timestamp"/></Col>
                  <Col className="px-4 py-2 col-lg-9 col-sm-8 col-12">    <Moment format={constants.DATE_AND_TIME_FORMAT}>{transaction.createDate*1000}</Moment></Col>
                </Row>
                 <Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="uid"/></Col>
                  <Col className="px-4 py-2 col-lg-9 col-sm-8 col-12">{transaction.uid}</Col>
                </Row>
 				<Row className="border-bottom">
                  <Col className="px-4 py-2 col-lg-3 col-sm-4 col-12"><Translate id="hash"/></Col>
                  <Col className="px-4 py-2 col-lg-9 col-sm-8 col-12"><a href={ network.scan+transaction.transactionHash} target="_blank">{transaction.transactionHash}</a></Col>
                </Row>
   </Collapse>
				  <Row>
                  <Col className="px-4 py-2 col-12">  <a href="#" onClick={()=>{ this.more()}}><Translate id={this.state.more?"see-less":"see-more"}/> {this.state.more?<i className="material-icons">&#xe5d8;</i>:<i className="material-icons">&#xe5db;</i>}</a></Col>
                </Row>   

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
	   transaction: (uid, callback) => dispatch(app.transaction(uid, callback)),
	   info: (info) => dispatch(app.info(info)),
       infoClose: () => dispatch(app.infoClose()),
       error: (err) => dispatch(app.error(err)),
       errorClose: () => dispatch(app.errorClose()),
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Transaction));

