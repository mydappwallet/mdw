/* eslint-disable react/no-unused-state */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/sort-comp */
/* eslint-disable no-plusplus */
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
import { Link } from "react-router-dom";

import * as Yup from "yup";
import { withLocalize, Translate } from "react-localize-redux";
import { Formik, Form } from "formik";
import yupTranslations from "translations/yup.json";
import authenticationTranslations from "translations/authentication.json";
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SuiBox from "components/sui/SuiBox";
import SuiTypography from "components/sui/SuiTypography";
import SuiInput from "components/sui/SuiInput";
import SuiButton from "components/sui/SuiButton";

// Authentication layout components
import BasicLayout from "layouts/pages/components/BasicLayout";
import Alert from "layouts/pages/components/Alert";
import Socials from "layouts/pages/components/Socials";
import Separator from "layouts/pages/components/Separator";

import * as authentication from "actions/authentication";
import * as app from "actions/app";
// Images
import curved9 from "assets/images/curved-images/curved9.jpg";

const initialValues = {
  username: "Konrad",
  password: "Laura2020!",
};

// eslint-disable-next-line react/prefer-stateless-function
class SignIn extends Component {
  static findFirstError(formName, hasError) {
    const form = document.forms[formName];
    for (let i = 0; i < form.length; i++) {
      if (hasError(form[i].name)) {
        form[i].focus();
        break;
      }
    }
  }

  validateForm(errors) {
    this.findFirstError("loginForm", (fieldName) => Boolean(errors[fieldName]));
  }

  validationSchema(values) {
    return Yup.object().shape({
      username: Yup.string()
        .min(
          3,
          this.props.translate("yup-min", { name: this.props.translate("username"), char: 3 })
        )
        .required(this.props.translate("yup-required", { name: this.props.translate("username") })),
      password: Yup.string()
        .required(this.props.translate("yup-required", { name: this.props.translate("password") }))
        .min(
          8,
          this.props.translate("yup-min", { name: this.props.translate("password"), char: 8 })
        ),
    });
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

  touchAll(setTouched, errors) {
    setTouched({
      username: true,
      password: true,
    });
    this.validateForm(errors);
  }

  onSubmit(values, actions) {
    authentication.signIn(values, this.onSubmited.bind(this));
    return true;

    // window.web3.login(values.username, values.password);
  }

  onSubmited(error, result) {
    this.setState({ error, result });
    if (result) {
      window.app.forceUpdate();
      this.setState({ redirect: this.props.location.pathname });
    }
  }

  constructor(props) {
    super(props);
    this.validationSchema = this.validationSchema.bind(this);
    this.props.addTranslation(authenticationTranslations);
    this.props.addTranslation(yupTranslations);
    this.formik = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmited = this.onSubmited.bind(this);
  }

  render() {
    const { appStore } = this.props;
    return (
      <BasicLayout
        title={this.props.translate("authentication.title")}
        description={this.props.translate("authentication.signin.subtitle")}
        image={curved9}
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
              {/* Form Fields */}
              <Form onSubmit={handleSubmit} noValidate name="loginForm">
                <SuiBox p={3} mb={1} textAlign="center">
                  <SuiTypography variant="h5" fontWeight="medium">
                    <Translate id="authentication.signin" />!
                  </SuiTypography>
                </SuiBox>
                <SuiBox mb={2}>
                  <Socials />
                </SuiBox>
                <SuiBox p={3}>
                  <Alert alert={appStore.info} color="info" onClick={this.props.infoClose} />
                  <Alert alert={appStore.error} color="primary" onClick={this.props.errorClose} />
                  <SuiBox component="form" role="form">
                    <SuiBox mb={2}>
                      <SuiInput
                        name="username"
                        type="email"
                        placeholder="Email"
                        error={!!errors.username}
                        helperText={errors.username}
                        onChange={handleChange}
                        value={initialValues.username}
                      />
                    </SuiBox>
                    <SuiBox mb={2}>
                      <SuiInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        error={!!errors.password}
                        helperText={errors.password}
                        onChange={handleChange}
                        value={initialValues.password}
                      />
                    </SuiBox>
                    <SuiBox display="flex" alignItems="center">
                      <Switch />
                      <SuiTypography
                        variant="button"
                        fontWeight="regular"
                        sx={{ cursor: "pointer", userSelect: "none" }}
                      >
                        &nbsp;&nbsp;
                        <Translate id="authentication.rememberme" />
                      </SuiTypography>
                    </SuiBox>
                    <SuiBox mt={4} mb={1}>
                      <SuiButton
                        variant="gradient"
                        color="info"
                        fullWidth
                        onClick={() => {
                          this.formik.current.submitForm();
                        }}
                      >
                        <Translate id="authentication.signin" />
                      </SuiButton>
                    </SuiBox>
                    <Separator />
                    <SuiBox mt={1} mb={3}>
                      <SuiButton
                        component={Link}
                        to="/authentication/sign-up"
                        variant="gradient"
                        color="dark"
                        fullWidth
                      >
                        <Translate id="authentication.signup" />
                      </SuiButton>
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
  signIn: (values, callback) => dispatch(authentication.signIn(values, callback)),
  infoClose: () => dispatch(app.infoClose()),
  errorClose: () => dispatch(app.errorClose()),
});

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(SignIn));
