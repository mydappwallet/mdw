import React from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
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

import { withLocalize, Translate } from "react-localize-redux";
import { Formik } from 'formik';
import * as Yup from 'yup'
import * as app from './../actions/app';


const initialValues = {
  oldPassword:  "",
  newPassword:  "",
  repeatNewPassword: "",
  }

class ChangePassword extends React.Component {
  constructor(props) {
   super(props);
   this.state = {redirect: undefined, submit: false };
   this.onSubmit = this.onSubmit.bind(this);
   this.onSubmited = this.onSubmited.bind(this);
   this.validationSchema =  this.validationSchema.bind(this);
   this.props.addTranslation(require("../translations/changePassword.json"));
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
	    oldPassword: Yup.string().required(this.props.translate("yup-required", {name: this.props.translate("old-password")})),

        newPassword: Yup.string().when('oldPassword',{
          is: (oldPassword) => {
            return oldPassword || values.newPassword.length>0 
          },
          then: Yup.string().password().nullable().min(8, this.props.translate("yup-min", {name: this.props.translate("new-password"), char:8})).minSymbols(1, this.props.translate("yup-minSymbols", {name: this.props.translate("new-password"), symbols: 1}))
        }
        

        ),
        repeatNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], this.props.translate("yup-password")),
	  	   
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
	app.change_password(values, this.onSubmited);
	return true;

  
	}
	onSubmited(error, result){
		if(error){
			this.props.error(error);
				this.setState({submit: false});
	
		}else {
			this.setState({redirect: "/"});
		}
	
			
		
	
	}	
 render(){  
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
	              alt="Shards Dashboards - Change Password Template"
	            />
	
	            {/* Title */}
	            <h5 className="auth-form__title text-center mb-4">
	              <Translate id="change-title"/>
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
	                <label htmlFor="oldPassword"> <Translate id="old-password"/></label>
	                 <FormInput
                          id="oldPassword"
                          name="oldPassword"
       					  type="password"
                                 placeholder={this.props.translate("old-password")}
                                autoComplete="new-password"
                                valid={!errors.oldPassword}
                                invalid={touched.oldPassword && !!errors.oldPassword}
                                autoFocus={true}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.oldPassword}
                                disabled={this.state.submit}
                        />
                       <FormFeedback>{errors.oldPassword}</FormFeedback>
	              </FormGroup>
	              <FormGroup>
	                <label htmlFor="newPassword"><Translate id="new-password"/></label>
	                 <FormInput
                          id="newPassword"
                           name="newPassword"
                           type="password"
                                 placeholder={this.props.translate("new-password")}
                                autoComplete="new-password"
                                valid={!errors.newPassword}
                                invalid={touched.newPassword && !!errors.newPassword}
                                autoFocus={true}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.newPassword}
                                disabled={this.state.submit}
                        />
                        <FormFeedback>{errors.newPassword}</FormFeedback>
	              </FormGroup>
 				   <FormGroup>
	                <label htmlFor="repeatNewPassword"><Translate id="repeat-password"/></label>
	                  <FormInput
                          id="repeatNewPassword"
                           name="repeatNewPassword"
						   type="password"
                                 placeholder={this.props.translate("repeat-password")}
                                autoComplete="new-password"
                                valid={!errors.repeatNewPassword}
                                invalid={touched.repeatNewPassword && !!errors.repeatNewPassword}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.repeatNewPassword}
                                disabled={this.state.submit}
                        />
                        <FormFeedback>{errors.repeatNewPassword}</FormFeedback>
	              </FormGroup>

	              <Button
	                pill
	                theme="accent"
	                className="d-table mx-auto"
	                type="submit"
	              >
	                Change Password
	              </Button>
	          </Form>
	
 				 )} />
	          </CardBody>
	        </Card>
	      </Col>
	    </Row>
	  </Container>)
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
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));
