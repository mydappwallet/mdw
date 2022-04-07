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

import * as app from './../actions/app';


class ResetPassword extends React.Component {
  constructor(props) {
	 super(props);
 	
  	  this.onSubmit = this.onSubmit.bind(this);
  	  this.onSubmited = this.onSubmited.bind(this);
	  this.validationSchema =  this.validationSchema.bind(this);
	  this.state = {error: undefined, result: undefined, redirect: undefined, submit: false };
	  this.formik = React.createRef();
	  this.props.addTranslation(require("../translations/resetPassword.json"));
	  this.props.addTranslation(require("../translations/yup.json"));
	this.initialValues = {
		refId: this.props.match.params.refId,
  		username: "username",
  		password: "12345678",
  		passwordConfirmation: "12345678",
  		email: "",
  	    attempts: 0
	};	


  }
  componentDidMount(){
	
		app.refLink({refId: 	this.initialValues.refId}, function(error, result){
		
			if(error){
				this.setState({redirect: "/error/"+error.code})
				
			}else {
				this.formik.current.setFieldValue('username', result.username);
				this.formik.current.setFieldValue('email', result.email);
				this.formik.current.setFieldValue('attempts', result.attempts);
			}
		}.bind(this))
	
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
    this.findFirstError('registerForm', (fieldName) => {
      return Boolean(errors[fieldName])
    })
  }

  validationSchema = function (values) {
	  return Yup.object().shape({
	    username: Yup.string()
	     .min(3, this.props.translate("yup-min", {name: this.props.translate("username"), char:3}))
	     .required(this.props.translate("yup-required", {name: this.props.translate("username")})),
	    password: Yup.string().required(this.props.translate("yup-required", {name: this.props.translate("new-password")}))
  			.min(8, this.props.translate("yup-min", {name: this.props.translate("password"), char:8})),
		passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], this.props.translate("yup-password")),
	 	email: Yup.string().required(this.props.translate("yup-required", {name: this.props.translate("email")})).email(this.props.translate("yup-email")),
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
        username: true,
        password: true
       
      }
    )
    this.validateForm(errors)
  }

  onSubmit(values, actions){
	this.setState({submit: true});
	app.reset_password(values, this.onSubmited);
	return true;

  
	}
	onSubmited(error, result){
		if(error){
			switch(error.code) {
				case 4300:
					this.formik.current.errors['code'] = error.message;
					this.formik.current.setFieldValue('code', "");
					this.formik.current.setFieldValue('attempts', this.formik.current.values.attempts-1);
					break;
				case 3700:
					this.props.error(error);
					this.setState({redirect: "/login"})
				default: 	
					this.setState({redirect: "/error/"+error.code})
			}
	
		}
		this.setState({submit: false, result});
			
		
	
	}	
	

  render() {
const {mydappwallet} = window;
		console.log("render");
		if(this.props.appStore.qrcode)return (<Redirect to="/qrcode" />);
		
		if(this.state.redirect)	return <Redirect to={this.state.redirect}/>	

		
		
		if(mydappwallet.user)return (<Redirect to="/" />);
	
	 return (<Container fluid className="main-content-container h-100 px-4">
	    <Row noGutters className="h-100">
	      <Col lg="3" md="5" className="auth-form mx-auto my-auto">
	        <Card>
	          <CardBody>
	            {/* Logo */}
	            <img
	              className="auth-form__logo d-table mx-auto mb-3"
	              src={require("../images/shards-dashboards-logo.svg")}
	              alt="Shards Dashboards - Register Template"
	            />
	
	            {/* Title */}
	            <h5 className="auth-form__title text-center mb-4">
	              <Translate id="reset-title"/>
	            </h5>
	
	            {/* Form Fields */}
	          	<Formik
              initialValues={this.initialValues}
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

	        <Form onSubmit={handleSubmit} noValidate name='registerForm'>
 				<FormInput
     				  id="refId"
					  name="refId"
  					  value={values.refId} 
						type="hidden"
	             
	                
	                />
	              <FormGroup>
	                <label htmlFor="username"><Translate id="username"/></label>
	                <FormInput type="text"
	                     name="username"
	                     id="username"
	                     placeholder={this.props.translate("username")}
	                     autoComplete="given-name"
	                     valid={!errors.username}
	                     invalid={touched.username && !!errors.username}
						 autoFocus={true}
						 readOnly={true} 
	                     required
	                     onChange={handleChange}
	                     onBlur={handleBlur}
	                     value={values.username}
                     />
        			<FormFeedback>{errors.username}</FormFeedback>
	              </FormGroup>
	              <FormGroup>
	                <label htmlFor="password"><Translate id="new-password"/></label>
	                <FormInput  name="password"
                        id="password"
                        placeholder={this.props.translate("new-password")}
   						autoComplete="new-password"
                        valid={!errors.password}
                        invalid={touched.password && !!errors.password}
                        autoFocus={true}
						required
					    readOnly={this.state.submit} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password} 
						type="password"
					/>
        			<FormFeedback>{errors.password}</FormFeedback>
      			</FormGroup>

	              <FormGroup>
	                <label htmlFor="passwordConfirmation"><Translate id="repeat-password"/></label>
	                <FormInput
     				  id="passwordConfirmation"
  					  placeholder={this.props.translate("repeat-password")}
	                  autoComplete="repeat-password"
	                   valid={!errors.passwordConfirmation}
                        invalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
                        autoFocus={true}
						required
					    readOnly={this.state.submit} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.passwordConfirmation} 
						type="password"
	             
	                
	                />
					<FormFeedback>{errors.passwordConfirmation}</FormFeedback>
	              </FormGroup>
 					<FormGroup>
				   <label htmlFor="email"><Translate id="email"/></label>
         			<FormInput type="text"
	                     name="email"
	                     id="email"
	                     placeholder={this.props.translate("email")}
	                     autoComplete="given-name"
	                     valid={!errors.email}
	                     invalid={touched.email && !!errors.email}
						 autoFocus={true}
					     readOnly={true} 
	                     required
	                     onChange={handleChange}
	                     onBlur={handleBlur}
	                     value={values.email}
                     />
        			<FormFeedback>{errors.email}</FormFeedback>
      			</FormGroup>
				 <FormGroup>
	                <label htmlFor="code">  <Translate id="code-label"/> </label>
	                <FormInput type="text"
	                     name="code"
	                     id="code"
	                     placeholder={this.props.translate("code-placeHolder", {attempts: values.attempts})}
	                     autoComplete="given-name"
	                     valid={!errors.code}
	                     invalid={touched.code && !!errors.code}
	                     autofocus={true}
	                     required
	                     onChange={handleChange}
	                     onBlur={handleBlur}
	                     value={values.code}
						 disable={this.state.submit }
					  	 innerRef={this.code}
                     />
        			<FormFeedback>{errors.code}</FormFeedback>
	              </FormGroup>
				
				<div className="red" style={{"text-align": "center", "marginBottom":10}} >{this.state.error?<Translate id={'error-'+this.state.error.code}/>:(null)}</div>
				{ !this.state.submit &&
	              <Button
	                pill
	                theme="accent"
	                className="d-table mx-auto"
					type="submit"
				    disabled={this.state.submit} 
	              >
		
	                <Translate id="reset-password"/>
	              </Button>
			    }
	
				{this.state.submit && <Default color="#006fe6" size={50} className="d-table mx-auto"/> }
		   
</Form>
	
  )} />
	          </CardBody>
	

	        </Card>
	
	        {/* Meta Details */}
	        <div className="auth-form__meta d-flex mt-4">
	 	          <Link to="/login" className="ml-auto">
	            Sign In?
	          </Link>
	        </div>
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
	  	error: (error) => dispatch(app.error(error))
   
  
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(ResetPassword));

