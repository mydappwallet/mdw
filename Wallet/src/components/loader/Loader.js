import React from "react";
import { Default} from 'react-spinners-css';
import { Container, Row, Col } from "shards-react";




const Loader = () => (
  <Container fluid className="main-content-container h-100 px-4">
    	    <Row noGutters className="h-100">
	   
       <Default color="#006fe6" size={200} className="mx-auto my-auto"/>

	    </Row>
    
    </Container>
);


export default Loader;
