import React from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import { withLocalize, Translate } from "react-localize-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  Button,
	FormFeedback
} from "shards-react";
import { Formik } from 'formik';
import * as Yup from 'yup'
import * as app from './../actions/app';


const initialValues = {
  email: "konrad@mydappwallet.com",
  accept: false
  }

class ForgotPassword extends React.Component {
 constructor(props) {
	 super(props);
	  this.state = {redirect: undefined, submit: false };
 	  this.onSubmit = this.onSubmit.bind(this);
  	    this.onSubmited = this.onSubmited.bind(this);
	  this.validationSchema =  this.validationSchema.bind(this);
	  this.props.addTranslation(require("../translations/yup.json"));
	  this.props.addTranslation(require("../translations/forgotPassword.json"));
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
    this.findFirstError('forgotForm', (fieldName) => {
      return Boolean(errors[fieldName])
    })
  }

  validationSchema = function (values) {
	  return Yup.object().shape({
	 	email: Yup.string().required(this.props.translate("yup-required", {name: this.props.translate("email")})).email(this.props.translate("yup-email"))

	   
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

	this.setState({submit: true});
	app.forgot_password(values, this.onSubmited);
	return true;

  
	}
	onSubmited(error, result){
	
		if(error){
			this.props.error(error);
		}else {	
			this.setState({redirect: '/login'});
		}
	this.setState({submit: false});
			
		
	
	}	

 render() {
		if(this.state.redirect)return <Redirect to={this.state.redirect}/>		
	return (
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
                     <Translate id="forgot-title"/>
            </h5>
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
            
          	        <Form onSubmit={handleSubmit} noValidate name='forgotForm'>
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
<small className="form-text text-muted text-center">
                <Translate id="forgot-info"/>
                </small>

                
              </FormGroup>
              <Button
                pill
                theme="accent"
                className="d-table mx-auto"
                type="submit"
              >
                  <Translate id="reset-password"/>
              </Button>
            </Form>
  )} />
          </CardBody>
        </Card>

        {/* Meta Details */}
        <div className="auth-form__meta d-flex mt-4">
          <Link to="/login" className="mx-auto">
                        <Translate id="back-to-login"/>
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
   	info: (info) => dispatch(app.info(info)),
   	error: (error) => dispatch(app.error(error)),
  
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));

