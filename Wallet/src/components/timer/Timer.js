import React from "react";

import { Container, Row, Col } from "shards-react";
import PropTypes from "prop-types";








class Timer extends React.Component {
    constructor(props) {
        super(props);
		this.callback = props.callback;
	
        this.state = {
       		secondsRemaining: props.secondsRemaining
         }
    }



componentDidMount(){
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
	<Container fluid className="main-content-container h-100 px-4">


   	<Row noGutters className="h-100">
	     <Col lg="3" md="5" className="auth-form mx-auto my-auto">
	{this.state.secondsRemaining} seconds remaining
		</Col>
	 </Row>
    
    </Container>
	
	
	)}

}


Timer.propTypes = {
	secondsRemaining: PropTypes.number,
	callback: PropTypes.func
}

Timer.defaultProps = {
	secondsRemaining: 10,
	callback: () => {alert('stop')}
}

export default Timer;
