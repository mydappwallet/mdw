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

import Message from "../components/common/Message";
import { Default} from 'react-spinners-css';
import { Link, Redirect } from "react-router-dom";
import { withLocalize, Translate } from "react-localize-redux";
import { Formik } from 'formik';
import * as Yup from 'yup'

import * as app from './../actions/app';


const initialValues = {
  email: "konrad@mydappwallet.com",
  accept: false
  
};

class Register extends React.Component {
  constructor(props) {
	 super(props);
 	
  	  this.onSubmit = this.onSubmit.bind(this);
  	  this.onSubmited = this.onSubmited.bind(this);
	  this.validationSchema =  this.validationSchema.bind(this);
	  this.handleAccept =   this.handleAccept.bind(this);
	  this.state = {error: undefined,info: undefined, result: undefined, redirect: undefined, submit: false };
	  this.formik = React.createRef();
	  this.props.addTranslation(require("../translations/register.json"));
	  this.props.addTranslation(require("../translations/yup.json"));

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
	 	email: Yup.string().required(this.props.translate("yup-required", {name: this.props.translate("email")})).email(this.props.translate("yup-email")),
	  	accept: Yup.bool().oneOf([true], this.props.translate("yup-terms-and-condition"))

	   
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
        email: false,
        accept: false
       
      }
    )
    this.validateForm(errors)
  }

  onSubmit(values, actions){

	this.props.errorClose();
	this.props.infoClose();
	this.setState({submit: true});
	app.register(values, this.onSubmited);
	//web3.gateway.register(values.email, this.onSubmited);
	return true;

  
	}
	onSubmited(error, result){
	
		if(error){
			switch(error.code) {
				case 3200:
					this.formik.current.errors['email'] = error.message;
					break;
				default: 	
					this.props.error(error);
			}
			this.setState({submit: false});
	
		}else {	
			this.setState({redirect: '/'});
		}

			
		
	
	}	
handleAccept(){
	this.formik.current.setFieldValue('accept', !this.formik.current.values.accept);
	this.formik.current.setTouched({'accept':true});
	
}	

render() {
	const {mydappwallet} = window;
	if(this.state.redirect)return <Redirect to={this.state.redirect}/>		
		if(mydappwallet.user)return (<Redirect to="/" />);

		
	 return (<React.Fragment>
		<Container fluid className="main-content-container h-100 px-4">
	 
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
	              <Translate id="register-title"/>
	            </h5>
	
	            {/* Form Fields */}
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

	        <Form onSubmit={handleSubmit} noValidate name='registerForm'>
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
					     readOnly={this.state.submit} 
	                     required
	                     onChange={handleChange}
	                     onBlur={handleBlur}
	                     value={values.email}
                     />
        			<FormFeedback>{errors.email}</FormFeedback>
      			</FormGroup>
				<FormGroup>
	
	                <FormCheckbox
  						id="accept"
 						valid={touched.accept  && !errors.accept}
                        invalid={touched.accept && !!errors.accept}
                    	onChange={this.handleAccept}
						onBlur={handleBlur}
						checked={values.accept}
						disabled={this.state.submit} 
  				>
	                  I agree with the <a href="#" onClick>Terms & Conditions</a>.
	                </FormCheckbox>
					<FormFeedback>{errors.accept}</FormFeedback>
				
	              </FormGroup>
				<div className="red" style={{"text-align": "center", "marginBottom":10}} >{this.state.error?<Translate id={'error-'+this.state.error.code}/>:(null)}</div>
				
	              <Button
	                pill
	                theme="accent"
	                className="d-table mx-auto"
					type="submit"
				    disabled={this.state.submit} 
	              >
		
	                <Translate id="create-account"/>
	              </Button>
			   		{this.state.submit && <Default color="#006fe6" size={50} className="d-table mx-auto"/> }
	
	
		   
</Form>
	
  )} />
	          </CardBody>
	
	          {/* Social Icons */}
	          <CardFooter>

	

	            <ul className="auth-form__social-icons d-table mx-auto">
	              <li>
	                <a href="#">
	                  <i className="fab fa-facebook-f" />
	                </a>
	              </li>
	              <li>
	                <a href="#">
	                  <i className="fab fa-twitter" />
	                </a>
	              </li>
	              <li>
	                <a href="#">
	                  <i className="fab fa-github" />
	                </a>
	              </li>
	              <li>
	                <a href="#">
	                  <i className="fab fa-google-plus-g" />
	                </a>
	              </li>
	            </ul>
	          </CardFooter>
	        </Card>
	
	        {/* Meta Details */}
	        <div className="auth-form__meta d-flex mt-4">
	          <Link to="/forgot-password">Forgot your password?</Link>
	          <Link to="/login" className="ml-auto">
	            Sign In?
	          </Link>
	        </div>
	      </Col>
	    </Row>
	  </Container>
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
	infoClose: () => dispatch(app.infoClose()),
   	errorClose: () => dispatch(app.errorClose()),
   	error: (error) => dispatch(app.error(error)),
  
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Register));

