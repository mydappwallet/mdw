import React from "react";
import { Container, Button } from "shards-react";
import { withLocalize, Translate } from "react-localize-redux";

const Error = (props) => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
		
        <h2> {props.match.params.code?props.match.params.code:500}</h2>
        <h3><Translate id={"error-title-"+ (props.match.params.code?props.match.params.code:500)}/></h3>
        <p><Translate id={"error-"+ (props.match.params.code?props.match.params.code:500)}/></p>
        <Button pill   onClick={props.history.goBack}>&larr; <Translate id="button-go-back"/></Button>
      </div>
    </div>
  </Container>
);
export default withLocalize(Error);
