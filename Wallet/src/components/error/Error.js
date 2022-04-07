import React from "react";
import { Container, Button, Row, Col } from "shards-react";
import { withLocalize, Translate } from "react-localize-redux";
import PropTypes from "prop-types";



class Error extends React.Component {
    constructor(props) {
        super(props);
		this.callback = props.callback;
	
        this.state = {
       		secondsRemaining: props.secondsRemaining
         }
    }



componentDidMount(){
	if(this.callback)
		this.interval = window.setInterval(this.next.bind(this), 1000);


}
componentWillUnmount(){
	if(this.interval){
		clearInterval(this.interval);
	}
}

next() {
	var  secondsRemaining = this.state.secondsRemaining-1; 
    this.setState({secondsRemaining });
	if(secondsRemaining==0){
		clearInterval(this.interval);
		if(this.callback)this.callback();	
	}
  return true;
}






render() { 
	return (
	<Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h2> {this.props.code}</h2>
        <h3><Translate id={"error-title-"+ this.props.code}/></h3>
        <p><Translate id={"error-"+ this.props.code}/></p>
		{this.callback && 
        	<Button pill onClick={this.callback}>&larr; <Translate id="button-go-back"/></Button>
		}
		{this.callback && 
		<Row noGutters className="h-100">
			    <Col lg="3" md="5" className="auth-form mt-sm-2 my-auto">
		<p><Translate id="remaining-message" data={{s: this.state.secondsRemaining}}/></p>
		</Col>
		</Row>
		}
      </div>
	 
    </div>
  </Container>
	
	
	)}

}




Error.propTypes = {
	code: PropTypes.number,
	secondsRemaining: PropTypes.number,
	callback: PropTypes.func
}

Error.defaultProps = {
	code: 500,
	secondsRemaining: 10,
}
export default withLocalize(Error);
