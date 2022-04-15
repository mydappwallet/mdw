/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/**
=========================================================
* Soft UI Dashboard PRO React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { Component } from "react";
import { connect } from "react-redux";
// react-router-dom components
import { Link, Redirect } from "react-router-dom";

import * as Yup from "yup";
import { withLocalize, Translate } from "react-localize-redux";
import { Formik, Form } from "formik";
import yupTranslations from "translations/yup.json";
import authenticationTranslations from "translations/authentication.json";

// @mui material components
import Card from "@mui/material/Card";
import FormHelperText from "@mui/material/FormHelperText";

// Soft UI Dashboard PRO React components
import SuiBox from "components/sui/SuiBox";
import SuiTypography from "components/sui/SuiTypography";
import SuiInput from "components/sui/SuiInput";
import SuiButton from "components/sui/SuiButton";
import SuiCheckbox from "components/sui/SuiCheckbox";

// Authentication layout components
import BasicLayout from "layouts/pages/components/BasicLayout";
import Socials from "layouts/pages/components/Socials";
import Separator from "layouts/pages/components/Separator";
import Alert from "layouts/pages/components/Alert";

// Images
import curved6 from "assets/images/curved-images/curved6.jpg";

import * as authentication from "actions/authentication";
import * as app from "actions/app";

const initialValues = {
  email: "",
  agreement: false,
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
    };
    this.validationSchema = this.validationSchema.bind(this);
    this.props.addTranslation(authenticationTranslations);
    this.props.addTranslation(yupTranslations);
    this.formik = React.createRef();
    this.handleSetAgremment = this.handleSetAgremment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmited = this.onSubmited.bind(this);
  }

  handleSetAgremment() {
    if (!this.state.submit)
      this.formik.current.setFieldValue("agreement", !this.formik.current.values.agreement);
  }

  onSubmit(values) {
    this.setState({ submit: true });
    authentication.signUp(values, this.onSubmited.bind(this));
    return true;

    // window.web3.login(values.username, values.password);
  }

  onSubmited(error, result, info) {
    // eslint-disable-next-line no-alert
    if (error) {
      switch (error.code) {
        case 3200:
          this.formik.current.errors.email = error.message;
          break;
        default:
          this.props.error(error);
      }
      this.setState({ submit: false });
    } else {
      this.props.info(info);
      this.setState({ redirect: "/" });
    }
  }

  getErrorsFromValidationError(validationError) {
    const FIRST_ERROR = 0;
    return validationError.inner.reduce(
      (errors, error) => ({
        ...errors,
        [error.path]: error.errors[FIRST_ERROR],
      }),
      {}
    );
  }

  validate(getValidationSchema) {
    return (values) => {
      const validationSchema = getValidationSchema(values);
      try {
        validationSchema.validateSync(values, { abortEarly: false });
        return {};
      } catch (error) {
        return this.getErrorsFromValidationError(error);
      }
    };
  }

  validationSchema() {
    return Yup.object().shape({
      email: Yup.string()
        .required(this.props.translate("yup-required", { name: this.props.translate("email") }))
        .email(this.props.translate("yup-email")),
      agreement: Yup.bool().oneOf([true], this.props.translate("yup-terms-and-condition")),
    });
  }

  validateForm(errors) {
    this.findFirstError("registerForm", (fieldName) => Boolean(errors[fieldName]));
  }

  touchAll(setTouched, errors) {
    setTouched({
      email: false,
      agreement: false,
    });
    this.validateForm(errors);
  }

  render() {
    const { submit, redirect } = this.state;
    const { appStore } = this.props;
    if (redirect) return <Redirect to={this.state.redirect} />;
    return (
      <BasicLayout
        title={this.props.translate("authentication.title")}
        description={this.props.translate("authentication.signup.subtitle")}
        image={curved6}
      >
        <Formik
          initialValues={initialValues}
          validate={this.validate(this.validationSchema)}
          onSubmit={this.onSubmit}
          innerRef={this.formik}
        >
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
            setTouched,
          }) => (
            <Card>
              <Form onSubmit={handleSubmit} noValidate name="registerForm">
                <SuiBox p={3} mb={1} textAlign="center">
                  <SuiTypography variant="h5" fontWeight="medium">
                    <Translate id="authentication.registerWith" />
                  </SuiTypography>
                </SuiBox>
                <SuiBox mb={2}>
                  <Socials />
                </SuiBox>
                <Separator />
                <SuiBox pt={2} pb={3} px={3}>
                  <Alert alert={appStore.error} color="primary" onClick={this.props.errorClose} />
                  <SuiBox component="form" role="form">
                    <SuiBox mb={2}>
                      <SuiInput
                        name="email"
                        type="email"
                        placeholder="Email"
                        error={!!errors.email}
                        helperText={errors.email}
                        onChange={handleChange}
                        value={values.email}
                        disabled={submit}
                      />
                    </SuiBox>
                    <SuiBox display="flex" alignItems="center">
                      <SuiCheckbox
                        checked={values.agreement}
                        onChange={this.handleSetAgremment}
                        error={!!errors.agreement}
                        disabled={submit}
                      />
                      <SuiTypography
                        variant="button"
                        fontWeight="regular"
                        onClick={this.handleSetAgremment}
                        sx={{ cursor: submit ? "default" : "pointer", userSelect: "none" }}
                      >
                        &nbsp;&nbsp;I agree the&nbsp;
                      </SuiTypography>
                      <SuiTypography
                        component="a"
                        href="#"
                        variant="button"
                        fontWeight="bold"
                        textGradient
                      >
                        Terms and Conditions
                      </SuiTypography>
                    </SuiBox>
                    {errors.agreement && (
                      <SuiBox display="flex" alignItems="center">
                        <FormHelperText error id="accountId-error">
                          {errors.agreement}
                        </FormHelperText>
                      </SuiBox>
                    )}
                    <SuiBox mt={4} mb={1}>
                      <SuiButton
                        variant="gradient"
                        color="dark"
                        fullWidth
                        disabled={submit}
                        onClick={() => {
                          this.formik.current.submitForm();
                        }}
                      >
                        sign up
                      </SuiButton>
                    </SuiBox>
                    <SuiBox mt={3} textAlign="center">
                      <SuiTypography variant="button" color="text" fontWeight="regular">
                        Already have an account?&nbsp;
                        <SuiTypography
                          component={Link}
                          to="/authentication/sign-in/basic"
                          variant="button"
                          color="dark"
                          fontWeight="bold"
                          textGradient
                          disabled={submit}
                        >
                          Sign in
                        </SuiTypography>
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                </SuiBox>
              </Form>
            </Card>
          )}
        </Formik>
      </BasicLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (values, callback) => dispatch(authentication.signUp(values, callback)),
  info: (_info) => dispatch(app.info(_info)),
  error: (_error) => dispatch(app.error(_error)),
  errorClose: () => dispatch(app.errorClose()),
});

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(SignUp));
