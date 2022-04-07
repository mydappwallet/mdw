/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { Link, Redirect } from "react-router-dom";
import history from "../utils/history";
import { withLocalize, Translate } from "react-localize-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Button,
  ListGroup,
  ListGroupItem,
  Form,
  FormInput,
  FormGroup,
	FormCheckbox,
 
FormFeedback

} from "shards-react";
import Message from "../components/common/Message";
import * as app from "./../actions/app";




const initialValues = {
  username: "Konrad",
  password: "Laura2020!",
  
};



class Login extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
        redirect: undefined

     }
      this.onSubmit = this.onSubmit.bind(this);
      this.onSubmited = this.onSubmited.bind(this);
	 this.validationSchema =  this.validationSchema.bind(this);
	this.state = {error: undefined, result: undefined }
	this.props.addTranslation(require("../translations/login.json"));
	this.props.addTranslation(require("../translations/yup.json"));
	this.formik = React.createRef();
   
  }

componentWillUnmount(){
		const {mydappwallet} = window;
				mydappwallet.resetInfo();
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
    this.findFirstError('loginForm', (fieldName) => {
      return Boolean(errors[fieldName])
    })
  }

  validationSchema = function (values) {
	
  return Yup.object().shape({
   	    username: Yup.string()
	     .min(3, this.props.translate("yup-min", {name: this.props.translate("username"), char:3}))
	     .required(this.props.translate("yup-required", {name: this.props.translate("username")})),
	    password: Yup.string().required(this.props.translate("yup-required", {name: this.props.translate("password")}))
  			.min(8, this.props.translate("yup-min", {name: this.props.translate("password"), char:8})),
   
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
	const {web3} = window;
	this.props.login(values, this.onSubmited.bind(this));
	return true;
	
	// window.web3.login(values.username, values.password);
  
}

onSubmited(error, result){
      this.setState({error:error, result: result});
      if(this.props.location && this.props.location.pathname==='/login') this.setState({redirect: '/'});
  
}


  render() {
    if(this.state.redirect)return <Redirect to={this.state.redirect}/>	

	
	//	if(web3.eth.accounts.wallet[0])return (<Redirect to="/" />);
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
              alt="Shards Dashboards - Login Template"
            />

            {/* Title */}
            <h5 className="auth-form__title text-center mb-4">
              <Translate id="login-title"/>
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
	 
	        <Form onSubmit={handleSubmit} noValidate name='loginForm'>
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
	                     required
	                     onChange={handleChange}
	                     onBlur={handleBlur}
	                     value={values.username}
                     />
        			<FormFeedback>{errors.username}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <label htmlFor="password"><Translate id="password"/></label>
                    <FormInput  name="password"
                        id="password"
                        placeholder={this.props.translate("password")}
   						autoComplete="new-password"
                        valid={!errors.password}
                        invalid={touched.password && !!errors.password}
                        autoFocus={true}
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password} 
						type="password"
					/>
        			<FormFeedback>{errors.password}</FormFeedback>
              </FormGroup>
              <FormGroup>
   				<FormCheckbox
  						id="remember"
 						valid={!errors.remember}
                        invalid={touched.remember && !!errors.remember}
                        onChange={handleChange}
                        onBlur={handleBlur}
  						>
	                  <Translate id="remember-me"/>
	                </FormCheckbox>
					<FormFeedback>{errors.remember}</FormFeedback>
               </FormGroup>
			<div className="red" style={{"text-align": "center", "marginBottom":10}} >{this.state.error?<Translate id={'error-'+this.state.error.code}/>:(null)}</div>
              <Button
                pill
                theme="accent"
                className="d-table mx-auto"
                type="submit"
              >
                 <Translate id="access-account"/>
              </Button>
           	
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
          <Link to="/register" className="ml-auto">
            Create a new account?
          </Link>
        </div>
      </Col>
    </Row>
  </Container> </React.Fragment>);
  }
}


const mapStateToProps = (state) => {
  return { 
    ...state
  }
  
};

const mapDispatchToProps = (dispatch) => {
  return {
  login: (username,password, remember, callback ) => dispatch(app.login(username,password, remember, callback))

   
  
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Login));



