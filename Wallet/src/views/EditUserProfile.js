import React from "react";
import TagsInput from "react-tagsinput";
import {
  Alert,
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardFooter,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormInput,
  FormSelect,
  FormCheckbox,
  FormTextarea,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback
} from "shards-react";
import {Redirect } from "react-router-dom";

import { Formik } from 'formik';
import * as Yup from 'yup'
import { connect } from 'react-redux';
import { withLocalize, Translate } from "react-localize-redux";
import countries from 'i18n-iso-countries';
import {Loader} from "../components/loader";
import FormSectionTitle from "../components/edit-user-profile/FormSectionTitle";
import * as app from './../actions/app';
import libphonenumber from 'google-libphonenumber';
const PhoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
require('yup-password')(Yup);
 
const IPFS_URL = '/dnsaddr/ipfs.infura.io/tcp/5001/https';




class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);
    
    
	  this.initialValues = {name:''};
		this.formik = React.createRef();

    countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
    this.state = {
      initialValues: undefined,
      error:  undefined,
      submit: false,
      redirect: undefined,
      countries: countries.getNames('en', { select: 'official' })
    
    };

    this.props.addTranslation(require("../translations/userProfile.json"));
	  this.props.addTranslation(require("../translations/yup.json"));
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validationSchema =  this.validationSchema.bind(this);	
    this.handleNotification =  this.handleNotification.bind(this);	

  }

  componentDidMount(){
      app.profile(function(error, result){
        if(error){
            this.setState({error: error});
        }else {

          result.oldPassword = '';
          result.newPassword = '';
          result.repeatNewPassword = '';
          this.setState({initialValues: result});
        }
     
      }.bind(this));
  }

  handleTagsChange(tags) {
    this.formik.current.setFieldValue("tags", tags);
   this.setState({ tags });
  }
  handleNotification(name) {
    this.formik.current.setFieldValue(name, !this.formik.current.values[name]);
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
    this.findFirstError('EditUserProfile', (fieldName) => {
      return Boolean(errors[fieldName])
    })
  }

  validatePhone(value){
    try {
      if(!value)return true;
      const region =  this.parent.country?this.parent.country:"PL";

      const number = PhoneUtil.parseAndKeepRawInput(value, region);
      PhoneUtil.isValidNumberForRegion(number,region);
      return true;
    }catch(e) {
      return false;
    }
    //console.log(this.parent.country);
    //return false;
  }

  validationSchema = function (values) {
  return Yup.object().shape({
   	    firstName: Yup.string().nullable().required(this.props.translate("yup-required", {name: this.props.translate("firstName")})),
        lastName: Yup.string().nullable().required(this.props.translate("yup-required", {name: this.props.translate("lastName")})),
        mobilePhone:  Yup.string().nullable().test({
      		name: 'mobilePhone',
      		exclusive: false,
      		message: this.props.translate("yup-format", {name: this.props.translate("mobilePhone")}),
      		test: this.validatePhone
        }),
        email: Yup.string().required(this.props.translate("yup-required", {name: this.props.translate("email")})).email(this.props.translate("yup-email")),
       

   
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
        name: true,
        
       
      }
    )
    this.validateForm(errors)
  }

onSubmit(values, actions){
  alert(JSON.stringify(values));
	var _this = this;
	this.setState({submit: true, error:undefined});
	app.profile_edit(values, this.onSubmited.bind(this));

	return true;
	
	// window.web3.login(values.userName, values.password);
  
}

onSubmited(error, result){
	if(error){
					this.setState({submit: false, error});
		}else {
      if(result.uid){
        this.setState({submit: false, redirect: '/transaction/'+ result.uid});
      }
			else { 
          this.setState({submit: false, initialValues: result});
          this.formik.current.resetForm();
      }
		
		
		}

}

  onUploadAvatar(error, response){
    if(error){
      this.setState({error});
    
    }else {
        this.formik.current.setFieldValue("picture", response);
    }
  }

  
  render() {

    const {initialValues, error, redirect}  = this.state;
    if(!error && !initialValues)return (<Loader/>)

    
    if(this.state.redirect)return <Redirect to={this.state.redirect}/>	
    return (
      <div>
        {error && 
  <Container fluid className="px-0">
          <Alert theme="danger" className="mb-0">
            <Translate id={'error-'+ error.code}/>
          </Alert>
      
        </Container>
        }

        <Container fluid className="main-content-container px-4">
          <Row>
            <Col className="mx-auto mt-4">
              <Card small className="edit-user-details mb-4">
    
                <CardBody className="p-0">
                 

                  {/* Form Section Title :: General */}
 		 <Formik
              initialValues={this.state.initialValues}
              validate={this.validate(this.validationSchema)}
              onSubmit={this.onSubmit}
 			  innerRef={this.formik}>
			
            {({
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


                  <Form id='EditUserProfile' className="py-4" onSubmit={handleSubmit} noValidate name='EditUserProfile' autoComplete="off">
                    <FormSectionTitle
                      title={this.props.translate('user-profile-edit-title')}
                      description={this.props.translate('user-profile-edit-desciption')}
                    />

                    <Row form className="mx-4">
                      <Col >
                        <Row form>
                          {/* First Name */}
                          <Col md="4" className="form-group">
                            <label htmlFor="firstName"><Translate id="firstName"/></label>
                            <FormInput type="text"
                                name="firstName"
                                id="firstName"
                                placeholder={this.props.translate("firstName")}
                                autoComplete="given-name"
                                valid={!errors.firstName}
                                invalid={touched.firstName && !!errors.firstName}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                disabled={this.state.submit}
                            />
        			              <FormFeedback>{errors.firstName}</FormFeedback>

                          </Col>

                          {/* Last Name */}
                          <Col md="4" className="form-group">
                            <label htmlFor="lastName"><Translate id="lastName"/></label>
                           <FormInput type="text"
                                name="lastName"
                                id="lastName"
                                placeholder={this.props.translate("lastName")}
                                autoComplete="given-name"
                                valid={!errors.lastName}
                                invalid={touched.lastName && !!errors.lastName}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                disabled={this.state.submit}
                            />
        			              <FormFeedback>{errors.lastName}</FormFeedback>
                          </Col>

                          {/* Location */}
                          <Col md="4" className="form-group">
                            <label htmlFor="country"><Translate id="country"/></label>
                            <InputGroup>
                              <InputGroupAddon type="prepend">
                                <InputGroupText>
                                  <i className="material-icons">&#xE0C8;</i>
                                </InputGroupText>
                              </InputGroupAddon>

                              <FormSelect type="text"
                                name="country"
                                id="country"
                                placeholder={this.props.translate("country")}
                                autoComplete="given-name"
                                valid={!errors.country}
                                invalid={touched.firstName && !!errors.country}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.country}
                                disabled={this.state.submit}
                            >
                               <option >{this.props.translate("select")}</option>
                              {Object.keys(this.state.countries).map((key) => { 
                                  return  <option value={key}>{this.state.countries[key]}</option>

                              })}

                              </FormSelect>
        			              <FormFeedback>{errors.country}</FormFeedback>
                            </InputGroup>
                          </Col>

                          {/* Phone Number */}
                          <Col md="4" className="form-group">
                            <label htmlFor="mobilePhone"><Translate id="mobilePhone"/></label>
                            <InputGroup>
                              <InputGroupAddon type="prepend">
                                <InputGroupText>
                                  <i className="material-icons">&#xE0CD;</i>
                                </InputGroupText>
                              </InputGroupAddon>
                                <FormInput type="text"
                                name="mobilePhone"
                                id="mobilePhone"
                                placeholder={this.props.translate("mobilePhone")}
                                autoComplete="given-name"
                                valid={!errors.mobilePhone}
                                invalid={touched.mobilePhone && !!errors.mobilePhone}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.mobilePhone}
                                disabled={this.state.submit}
                            />
        			              <FormFeedback>{errors.mobilePhone}</FormFeedback>
                            </InputGroup>
                          </Col>

                          {/* Email Address */}
                          <Col md="4" className="form-group">
                            <label htmlFor="email"><Translate id="email"/></label>
                            <InputGroup>
                              <InputGroupAddon type="prepend">
                                <InputGroupText>
                                  <i className="material-icons">&#xE0BE;</i>
                                </InputGroupText>
                              </InputGroupAddon>
                                <FormInput type="text"
                                name="email"
                                id="email"
                                placeholder={this.props.translate("email")}
                                autoComplete="given-name"
                                valid={!errors.email}
                                invalid={touched.email && !!errors.email}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                disabled={this.state.submit}
                            />
        			              <FormFeedback>{errors.email}</FormFeedback>
                            </InputGroup>
                          </Col>

                         
                        </Row>
                      </Col>

                     
                    </Row>

                    <Row form className="mx-4">
                      {/* User Bio */}
                      <Col md="6" className="form-group">
                        <label htmlFor="about"><Translate id="about"/></label>
                        <FormTextarea
                          style={{ minHeight: "87px" }}
                           name="about"
                                id="about"
                                placeholder={this.props.translate("about")}
                                autoComplete="given-name"
                                valid={!errors.about}
                                invalid={touched.about && !!errors.about}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.about}
                                disabled={this.state.submit}
                        />
                         <FormFeedback>{errors.about}</FormFeedback>
                      </Col>

                      {/* User Tags */}
                      <Col md="6" className="form-group">
                        <label htmlFor="tags"><Translate id="tags"/></label>
                        <TagsInput
         
                           id="tags"
                                placeholder={this.props.translate("tags")}
                                autoComplete="given-name"
                                valid={!errors.tags}
                                invalid={touched.tags && !!errors.tags}
                                autoFocus={true}
                                required
                                onChange={this.handleTagsChange}
                                onBlur={handleBlur}
                                value={values.tags}
                                disabled={this.state.submit}
                        />
                            <FormFeedback>{errors.tags}</FormFeedback>
                      </Col>
                    </Row>

                    <hr />

                    {/* Form Section Title :: Social Profiles */}
                    <FormSectionTitle
                      title={this.props.translate("social")}
                      description={this.props.translate("social-description")}
                    />

                    <Row form className="mx-4">
                      {/* Facebook */}
                      <Col md="4" className="form-group">
                        <label htmlFor="facebook">Facebook</label>
                        <InputGroup seamless>
                          <InputGroupAddon type="prepend">
                            <InputGroupText>
                              <i className="fab fa-facebook-f" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormInput id="facebook"
                               placeholder="Facebook"
                                autoComplete="given-name"
                                valid={!errors.facebook}
                                invalid={touched.facebook && !!errors.facebook}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.facebook}
                                disabled={this.state.submit}
                          />
                          <FormFeedback>{errors.facebook}</FormFeedback>
                        </InputGroup>
                      </Col>

                      {/* Twitter */}
                      <Col md="4" className="form-group">
                        <label htmlFor="twitter">Twitter</label>
                        <InputGroup seamless>
                          <InputGroupAddon type="prepend">
                            <InputGroupText>
                              <i className="fab fa-twitter" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormInput id="twitter" 
                                placeholder="Twitter"
                                autoComplete="given-name"
                                valid={!errors.socialTwitter}
                                invalid={touched.twitter && !!errors.twitter}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.twitter}
                                disabled={this.state.submit}
                          />
                          <FormFeedback>{errors.twitter}</FormFeedback>
                        </InputGroup>
                      </Col>

                      {/* LinkedIn */}
                      <Col md="4" className="form-group">
                        <label htmlFor="linkedIn">Linked In</label>
                        <InputGroup seamless>
                          <InputGroupAddon type="prepend">
                            <InputGroupText>
                              <i className="fab fa-linkedin" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormInput id="linkedIn" 
                          placeholder="Linked In"
                                autoComplete="given-name"
                                valid={!errors.linkedIn}
                                invalid={touched.linkedIn && !!errors.linkedIn}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.linkedIn}
                                disabled={this.state.submit}
                          />
                          <FormFeedback>{errors.linkedIn}</FormFeedback>
                        </InputGroup>
                      </Col>

                    
                    </Row>

                    <hr />

                    {/* Form Section Title :: Notifications */}
                    <FormSectionTitle
                      title={this.props.translate("notifications")}
                      description={this.props.translate("notifications-description")}
                    />

                    {/* Notifications :: Transactions */}
                    <Row form className="mx-4">
                      <Col
                        tag="label"
                        htmlFor="notificationTransaction"
                        className="col-form-label"
                      >
                       <Translate id="notificationTransaction"/>
                        <small className="text-muted form-text">
                         <Translate id="notificationTransaction-description"/>
                        </small>
                      </Col>
                      <Col className="d-flex">
                        <FormCheckbox
                          toggle
                          checked={values.notificationTransaction}
                          className="ml-auto my-auto"
                          id="notificationTransaction"
                          valid={!errors.notificationTransaction}
                          invalid={touched.notificationTransaction && !!errors.notificationTransaction}
                          autoFocus={true}
                          onChange={(e) => {
                              this.handleNotification('notificationTransaction')
                            }
                          }
                          onBlur={handleBlur}
                          disabled={this.state.submit}
                        />
                          <FormFeedback>{errors.notificationTransaction}</FormFeedback>
                      </Col>
                    </Row>

                    {/* Notifications :: New Dapps*/}
                    <Row form className="mx-4">
                      <Col
                        tag="label"
                        htmlFor="notificationNewDapps"
                        className="col-form-label"
                      >
                       <Translate id="notificationNewDapps"/>
                        <small className="text-muted form-text">
                         <Translate id="notificationNewDapps-description"/>
                        </small>
                      </Col>
                      <Col className="d-flex">
                        <FormCheckbox
                         toggle
                          checked={values.notificationNewDapps}
                          className="ml-auto my-auto"
                          id="notificationNewDapps"
                          valid={!errors.notificationNewDapps}
                          invalid={touched.notificationNewDapps && !!errors.notificationNewDapps}
                          autoFocus={true}
                          onChange={(e) => {
                              this.handleNotification('notificationNewDapps')
                            }
                          }
                          onBlur={handleBlur}
                          disabled={this.state.submit}
                        />
                          <FormFeedback>{errors.notificationNewDapps}</FormFeedback>
                      </Col>
                    </Row>

                    {/* Notifications :: Newslatter */}
                    <Row form className="mx-4">
                      <Col
                        tag="label"
                        htmlFor="notificationNews"
                        className="col-form-label"
                      >
                        <Translate id="notificationNews"/>
                        <small className="text-muted form-text">
                           <Translate id="notificationNews-description"/>
                        </small>
                      </Col>
                      <Col className="d-flex">
                        <FormCheckbox
                          toggle
                          checked={values.notificationNews}
                          className="ml-auto my-auto"
                          id="notificationNews"
                          autoComplete="given-name"
                          valid={!errors.notificationNews}
                          invalid={touched.notificationNews && !!errors.notificationNews}
                          autoFocus={true}
                          onChange={(e) => {
                              this.handleNotification('notificationNews')
                            }
                          }
                          onBlur={handleBlur}
                          disabled={this.state.submit}
                        />
                          <FormFeedback>{errors.notificationNews}</FormFeedback>
                      </Col>
                    </Row>

             		</Form>
		          )}
              </Formik>
                </CardBody>
                <CardFooter className="border-top">
                  <Button
                    size="sm"
                    theme="accent"
                    className="ml-auto d-table mr-3"
                    type="submit" form="EditUserProfile" 
                  >
                      <Translate id="save-changes"/>
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
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
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(EditUserProfile));


