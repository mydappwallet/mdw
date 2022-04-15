/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
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
import React from "react";

import Theme from "Theme";

import { connect } from "react-redux";
import { withLocalize } from "react-localize-redux";

import globalTranslations from "translations/global.json";

import Spinner from "components/layout/Spinner";

const alertsTranslations = require("translations/alerts.json");
const errorsTranslations = require("translations/errors.json");
const MyDappWalletManager = require("mydappwallet");

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    const defaultLanguage = "en";
    // eslint-disable-next-line no-unused-vars
    const onMissingTranslation = ({ translationId, languageCode }) => translationId;
    this.state = { loading: true };
    // eslint-disable-next-line react/prop-types
    this.props.initialize({
      languages: [
        { name: "English", code: "en" },
        { name: "Polish", code: "pl" },
      ],
      translation: globalTranslations,
      options: {
        renderToStaticMarkup: false,
        renderInnerHtml: true,
        defaultLanguage,
        showMissingTranslationMsg: false,
        onMissingTranslation,
      },
    });
    this.props.addTranslation(alertsTranslations);
    this.props.addTranslation(errorsTranslations);
    window.app = this;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  componentDidMount() {
    window.mydappwallet = new MyDappWalletManager(
      /* "https://api.mydappwallet.com",  */
      "http://localhost",
      "Rczx3k42DgnBcN4A92EA",
      {
        withCredentials: false,
        apiKey: "Rczx3k42DgnBcN4A92EA",
        redirect: (to) => {
          window.open(to);
        },
      },
      (_error, result) => {
        this.setState({ loading: false });
        if (result) {
          //    this.props.init();
        } else {
          //    this.props.loadingStop();
        }
        // eslint-disable-next-line prettier/prettier
      // eslint-disable-next-line no-extra-bind
      }
    );
  }

  render() {
    if (this.state.loading) return <Spinner />;
    return <Theme />;
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({});

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(App));
