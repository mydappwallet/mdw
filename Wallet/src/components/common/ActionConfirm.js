/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { connect } from 'react-redux';
import { withLocalize, Translate } from "react-localize-redux";
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
  Modal,
  ModalHeader,
  ModalBody,
  Button,
	FormFeedback
} from "shards-react";

import { Formik } from 'formik';
import * as Yup from 'yup'


const initialValues = {
  code: ""
  
  
};


class ActionConfirm extends React.Component {
  constructor(props) {
	 super(props);
  
   this.state = {
		saving: false,
		result: undefined,
		redirect: undefined
	}

  this.onSubmit = this.onSubmit.bind(this);
  this.onSubmited = this.onSubmited.bind(this);
	this.formik = React.createRef();
	this.code = React.createRef();

   
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

    const transaction = this.props.transaction;
	 try {
     	const {web3} = window;
		web3.confirm({uid: transaction.uid, code:values.code},  function(error, result){
			
				if(error){
					switch(error){
					 default:
						 this.setState({saving: false});
						 this.formik.current.errors['code'] = error.message;
					
			  		}
				}else {
						if(window.opener){
					  		window.opener.postMessage({"id":0,"jsonrpc":"2.0", target: 'mydappshop-inpage', event: 'mydappshop-transaction', result:result, error:error}, "*");
							window.close();
						}
				}
			
			   this.props.reload();
 			// this.formik.current.values['code'] = '';
		
			 
	
			// this.setState({saving: false, result: result, redirect: "/processing/"+ _this.uid});  
			
			
			
			
	    }.bind(this))
      } catch (error) {
       this.setState({saving: false, error: error});
		
   	  }
	return true;

  
	}
	
	reject(){
		const transaction = this.props.transaction;
		try {
			const {web3} = window;
			web3.reject({uid: transaction.uid},  function(error, result){
				if(error){
					this.props.setError(error);
					switch(error){
					 default:
						 this.setState({saving: false, error: error});
						 this.formik.current.errors['code'] = error.message;
					
			  		}
				}
				 this.props.reload();
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

 const {saving, error, result, redirect}  = this.state;
 const transaction = this.props.transaction;

	 return (   <Row className="border-bottom">
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
                </Row>  
	
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
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(ActionConfirm));

