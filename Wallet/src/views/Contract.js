import React from "react";
import ReactTable from "react-table";

import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import { withLocalize, Translate } from "react-localize-redux";
import {
  Container,
  Alert,
  Row,
  Col,
  ButtonGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormTextarea,
  Form,
  FormGroup,
  FormInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback
} from "shards-react";

import { Formik } from 'formik';
import * as Yup from 'yup'
import Message from "../components/common/Message";
import PageTitle from "../components/common/PageTitle";
import ConfirmDialog from "../components/common/ConfirmDialog";

import ErrorDialog from "../components/common/ErrorDialog";
import * as constants from '../constants';
import IconFactory from '../utils/IconFactory';

import {Loader} from "../components/loader";
const abi = require('erc-20-abi');
 



class Contract extends React.Component {
  constructor(props) {
    super(props);
 	  this.address =  this.props.match.params.address;
    this.state = {
      pageSizeOptions: [5, 10, 15, 20, 25, 30],
      pageSize: 10,
	    contract: undefined,
 	    deleteDialogOpen: false,
	    submit: false,
      error: undefined,
      tableData: [],
      redirect: undefined,
    };
	this.initialValues = {name:"     ", address:"", chain:""};
    this.formik = React.createRef();
	this.validationSchema =  this.validationSchema.bind(this);

	this.onSubmit = this.onSubmit.bind(this);	
	
	this.props.addTranslation(require("../translations/contract.json"));
	this.props.addTranslation(require("../translations/yup.json"));
    

   

    this.getStatusClass = this.getStatusClass.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
 	this.handleDeleteClose= this.handleDeleteClose.bind(this);
  }

  componentWillMount(){

    this.loadData();
       
  }
  loadData(){
	  window.web3.contract({address:this.address}, function (error, result){

        if(result){
             const tableData = result.methods;
             this.setState({...this.state,contract:result, tableData});
             this.formik.current.setFieldValue("name", result.name, true);
             this.formik.current.setFieldValue("address", result.address);
             this.formik.current.setFieldValue("chain", this.props.translate("network-"+result.chain));
          
        }else {
          this.setState({redirect: "/error/"+error.code})
        }
      }.bind(this))
  }
  

 

  /**
   * Returns the appropriate chain class for the `Status` column.
   */
  getStatusClass(chain) {
    const chainMap = {
      Cancelled: "danger",
      Complete: "success",
      Pending: "warning"
    };

    return `text-${chainMap[chain]}`;
  }

  /**
   * Handles the page size change event.
   */
  handlePageSizeChange(e) {
    this.setState({
      ...this.state,
      pageSize: e.target.value
    });
  }

  /**
   * Handles the global search.
   */
  
 





handleDeleteClose(result) {
		if(result){
			this.setState({
     		 deleteDialogOpen: false
   		 });
			const {web3} = window;
			web3.contract_delete({address:this.state.contract.address}, function (error, result){
				if(error){
					this.setState({error: error});
				}else {
  
					this.cancel();
				}
			}.bind(this));
		}else {
			 this.setState({
     		 deleteDialogOpen: false, devapp:undefined
   		 });
		}
	 


	
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
    this.findFirstError('contractForm', (fieldName) => {
      return Boolean(errors[fieldName])
    })
  }

  
  validateAddress(value){
  	const {web3} = window;
	if(!value)return true;
	try {
  		return web3.utils.isAddress(value);
	}catch(error){
		return false;
	}
	return true;
							
  }



   
  validationSchema = function (values) {

  return Yup.object().shape({
 	 
   	   
    name: Yup.string()
       .min(5, this.props.translate("yup-min", {name: this.props.translate("name"), char:5}))
	 	   .max(50, this.props.translate("yup-max", {name: this.props.translate("name"), char:55}))
		
	   
   
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
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
      
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}

  touchAll(setTouched, errors) {
    setTouched({
		name: false,
        
       
      }
    )
    this.validateForm(errors)
  }

  onSubmit(values, actions){

	const {web3} = window;
  this.setState({submit: true});
  values.methods = this.state.tableData;
	web3.contract_edit(values, function (error, result){
		if(error){
					this.setState({submit: false, error});
		}else {
      this.setState({redirect: "/app/"+this.state.contract.uid});
      
		
		}
		
	}.bind(this));

	return true;
	
	// window.web3.login(values.userName, values.password);
  
}


onChangePayment(row, value){
  var tableData = this.state.tableData;
  
  tableData[row.index].payment =  parseInt(value);    
  this.setState({tableData});
}

cancel(){
  this.setState({redirect: "/app/"+this.state.contract.uid})
}
 

delete(){
  this.setState({deleteDialogOpen: true})
}


 

  render() {
      if(this.state.redirect)return <Redirect to={this.state.redirect}/>	
    const { pageSize, pageSizeOptions, error } = this.state;
    if(this.props.devappStore.initialization)return (<Loader/>)
    const tableData = this.state.tableData;
    const networks = this.props.networkStore.list;
    const tableColumns = [
      {
        Header: "#",
        accessor: "id",
        maxWidth: 60,
        className: "text-center",
		Cell: row =>
          <React.Fragment>{row.index+1}</React.Fragment>
      },
	  
      {
        Header: <Translate id='column-signature'/>,
        accessor: "signature",
        style: {'justify-content':'left'},
		    headerStyle: {'text-align':'left'},
        minWidth: 120,
		    maxWidth: 300,
 		
        
      },
 	    {
        Header: <Translate id='column-ids'/>,
        accessor: "ids",
         style: {'justify-content':'left'},
		    headerStyle: {'text-align':'left'},
         minWidth: 50,
		    maxWidth: 120
		
      },
      {
        Header: <Translate id='column-stateMutability'/>,
        accessor: "stateMutability",
         style: {'justify-content':'left'},
		    headerStyle: {'text-align':'left'},
         minWidth: 50,
		    maxWidth: 150
		
      },
       {
        Header: <Translate id='column-payment'/>,
        accessor: "payment",
         style: {'justify-content':'left'},
		    headerStyle: {'text-align':'left'},
       
         Cell: row => (
             <FormSelect type="text"
                          name="payment"
                          autoFocus={true}
                          required
                          value={row.original.payment}
                          style={{"maxWidth": 150}}
                         disabled={false}
                         onChange = {e => {this.onChangePayment(row, e.target.value)}}

                         
                    >
                  <option value="0">{this.props.translate("payment-crypto")}</option>
                  <option value="1">{this.props.translate("payment-fiat")}</option>

                    </FormSelect>

		    )
      },
      
     
    ];

    return (<React.Fragment>
      {error && <Message error={error} theme="danger"/>}
      <Container fluid className="main-content-container px-4 pb-4">


	  <ConfirmDialog isOpen={this.state.deleteDialogOpen} toggle={this.handleDeleteClose} centered={true} title={<Translate id="delete-title"/>} text={<Translate id="delete-text" data={{name: this.state.contract?this.state.contract.name:null}}/>}/>
        <Row noGutters className="page-header py-4">
          <PageTitle title={<Translate id="contract-title"/>} subtitle={<Translate id="developers"/>} className="text-sm-left mb-3" />
        
        </Row>
        <Row className="py-4">
	 	<Col>
 		 <Formik
              initialValues={this.initialValues}
              validate={this.validate(this.validationSchema)}
              onSubmit={this.onSubmit}
 			  innerRef={this.formik}>
			
            {({
                  values,
                  errors,
                  touched,
                  chain,
                  dirty,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  isValid,
                  handleReset,
                  setTouched
                }) => (
  <Form onSubmit={handleSubmit} noValidate name='addForm'>
				 	<Card small>
        
         
		  <CardBody>
	 
	      
			  <Row>
			
      <Col style={{"maxWidth": 300}} sm="12">
            <FormGroup>
                    <label htmlFor="name"><Translate id="name"/></label>
                    <FormInput type="text"
                          name="name"
                          id="name"
                          placeholder={this.props.translate("name")}
                          autoComplete="given-name"
                          valid={!errors.name}
                          invalid={!!errors.name}
                          
                          autoFocus={true}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                disabled={false}
                        />
      <FormFeedback>{errors.name}</FormFeedback>
                  </FormGroup>
            </Col>
        <Col style={{"maxWidth": 350}} sm="12">
            <FormGroup>
                    <label htmlFor="address"><Translate id="address"/></label>
                    <FormInput type="text"
                          name="address"
                          id="address"
                          placeholder={this.props.translate("address")}
                          autoComplete="given-name"
                                                 
                          autoFocus={true}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address}
                disabled={true}
                        />

                  </FormGroup>
            </Col>    
            <Col style={{"maxWidth": 300}} sm="12">
            <FormGroup>
                    <label htmlFor="chain"><Translate id="chain"/></label>
                    <FormInput type="text"
                          name="chain"
                          id="chain"
                          placeholder={this.props.translate("chain")}
                          autoComplete="given-name"
                                                 
                          autoFocus={true}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.chain}
                disabled={true}
                        />

                  </FormGroup>
            </Col>      

			
			 </Row>
			
			
 	
		</CardBody>
		<CardFooter>
		
				 <Button
                className="btn btn-primary"
                type="submit"
				disabled={this.state.submit}
              >
                 <Translate id="save"/>
              </Button>
              <Button
                className="btn btn-danger"
                type="button"
                onClick={this.delete.bind(this)}
				disabled={this.state.submit}
              >  <Translate id="delete"/></Button>
               <Button
                className="btn btn-warning"
                type="button"
                onClick={this.cancel.bind(this)}
				disabled={this.state.submit}
              >
      
                 <Translate id="cancel"/>
              </Button>
		</CardFooter>
        </Card>
		</Form>
		 )}

     </Formik>
		
		</Col>
        </Row>
 		<Row >
	 <Col>
        <Card small className="p-0">
             <CardHeader className="">
                           <h6 className="m-0"><Translate id="methods-subtitle"/></h6>
                          </CardHeader>
          <CardHeader className="p-0">

           
          </CardHeader>
          <CardBody className="p-0">
            <div className="">
              <ReactTable
                columns={tableColumns}
                data={tableData}
                pageSize={pageSize}
                showPageSizeOptions={false}
                resizable={false}
             

              />
            </div>
          
		
          </CardBody>
        </Card>
		</Col>
        </Row>
		
      </Container></React.Fragment>
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
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Contract));

