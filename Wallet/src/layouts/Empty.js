import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "shards-react";
import PropTypes from "prop-types";
import Message from "../components/common/Message";


const Empty = ({ children, error, info  }) => {
	
	 
	
  return (<Container fluid>
    <Row>
      <Col className="main-content col" tag="main">
 		{error && <Message error={error} theme="danger"/>}   
        {info && <Message info={info} theme="info"/>}   
           {children}
      </Col>
    </Row>
  </Container>);
};



Empty.propTypes = {
 
 error: PropTypes.object,
 info: PropTypes.object
};

Empty.defaultProps = {
  error: false,
  info: false,
};

export default Empty;
