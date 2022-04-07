import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Alert } from "shards-react";
import { withLocalize, Translate } from "react-localize-redux";
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";
import HeaderNavbar from "../components/layout/HeaderNavbar/HeaderNavbar";

import Message from "../components/common/Message";
import getHeaderNavbarItems from "../data/header-nav-items";

const DefaultLayout = ({ children, noNavbar, noFooter, error, info }) =>  (
  <React.Fragment>


  <Container fluid>
    <Row>
      <MainSidebar />

      <Col
        className="main-content p-0"
        lg={{ size: 10, offset: 2 }}
        md={{ size: 9, offset: 3 }}
        sm="12"
        tag="main"
      >
 	 	
        {!noNavbar && <HeaderNavbar items={getHeaderNavbarItems()} />}
        {error && <Message error={error} theme="danger"/>}   
        {info && <Message info={info} theme="info"/>}   
		
        {children}
        {!noFooter && <MainFooter />}
      </Col>
    </Row>
  </Container>
  </React.Fragment>
);


DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,
 
 error: PropTypes.object,

  info: PropTypes.object
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false,
  error: false,
  info: false,
};


export default withLocalize(DefaultLayout);


