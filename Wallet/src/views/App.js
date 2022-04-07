import React from "react";
import ReactTable from "react-table";
import FuzzySearch from "fuzzy-search";
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import { withLocalize, Translate } from "react-localize-redux";
import {
  Container,
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

import PageTitle from "../components/common/PageTitle";
import ConfirmDialog from "../components/common/ConfirmDialog";

import ErrorDialog from "../components/common/ErrorDialog";
import * as constants from '../constants';
import IconFactory from '../utils/IconFactory';

import {Loader} from "../components/loader";
const abi = require('erc-20-abi');
 
class AddContract extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      error: undefined,
    }
    this.initialValues = {name: '', address:"", abi: "", chain:"3"};
    this.formik = React.createRef();
    this.validationSchema =  this.validationSchema.bind(this);
    this.validateAddress =  this.validateAddress.bind(this);
    this.validateABI =  this.validateABI.bind(this);
	  this.onSubmit = this.onSubmit.bind(this);	

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
    this.findFirstError('addForm', (fieldName) => {
      return Boolean(errors[fieldName])
    })
  }

  
  validateAddress(value){
		const {web3} = window;
		const formik = this.formik.current;
		if(!value)return true;
    try {
       web3.utils.isAddress(value);
    }catch(error){
      return false;
    }
   
	
		
		
		try {
      const erc20 =  new web3.eth.Contract(abi, value);		
      erc20.methods.name().call( function (error, result){
            if(result){
                formik.setFieldValue("name", result, true);	
            }
            return true;
        
      });
    	return true;	
			
		}catch(error){
			return true;
		}	
   }

  validateABI(value){
  	const {web3} = window;
	if(!value)return true;
	try {

      JSON.parse(value);

  		return true;
	}catch(error){
		return false;
	}
							
  }


  validationSchema = function (values) {

  return Yup.object().shape({
    address: Yup.string()
	     .required(this.props.translate("yup-required", {name: this.props.translate("add-address")}))
 		 .test({
			  name: 'address',
			  exclusive: false,
			  message: this.props.translate("yup-format", {name: this.props.translate("add-address")}),
			  test: this.validateAddress
					
     }),
 	   name: Yup.string()
	     .min(3, this.props.translate("yup-min", {name: this.props.translate("add-name"), char:3}))
	     .required(this.props.translate("yup-required", {name: this.props.translate("add-name")})),
   	  abi: Yup.string()
	     .required(this.props.translate("yup-required", {name: this.props.translate("add-abi")}))
 		 .test({
			  name: 'abi',
			  exclusive: false,
			  message: this.props.translate("yup-format", {name: this.props.translate("add-abi")}),
			  test: this.validateABI
					
     }),  
			   
   
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
  const FIRST_ERROR = 0
  return validationError.inner.reduce((errors, error) => {
      
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}

  touchAll(setTouched, errors) {
    setTouched({
		name: true,
        privateKey: true,
        
       
      }
    )
    this.validateForm(errors)
  }

  onSubmit(values, actions){

	const {web3} = window;
  this.setState({submit: true, error:undefined});
   values.uid = this.props.app.uid;
   values.chain = parseInt(values.chain);
	web3.contract_add(values, function (error, result){
		if(error){
					this.setState({submit: false, error:error});
		}else {
			this.setState({submit: false});
			this.formik.current.resetForm();
			this.props.loadData();
		}
		
	}.bind(this));
	
	return true;
	
	// window.web3.login(values.userName, values.password);
  
 }




  render(){

    return (
       <Formik
              initialValues={this.initialValues}
              validate={this.validate(this.validationSchema)}
              onSubmit={this.onSubmit}
 			  innerRef={this.formik}>
			
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
                  setTouched
                }) => (
  <Form onSubmit={handleSubmit} noValidate name='addForm'>
				 	<Card small>
          {/* Files & Dropdowns */}
          <CardHeader className="border-bottom">
            <h6 className="m-0"><Translate id="add-title"/></h6>
          </CardHeader>
		  <CardBody>
	 
	      
			  <Row>
           <Col lg="10" md="12" style={{"maxWidth": 400}}>
			  <FormGroup>
                <label htmlFor="address"><Translate id="add-address"/></label>
                <FormInput type="text"
	                     name="address"
	                     id="address"
	                     placeholder={this.props.translate("add-address")}
	                     autoComplete="given-name"
	                     valid={!errors.address}
	                     invalid={touched.address && !!errors.address}
	                     autoFocus={true}
	                     required
	                     onChange={ (e)=> {handleChange(e); this.validateAddress(e.target.value) } }
	                     onBlur={handleBlur}
	                     value={values.address}
						 style={{"maxWidth": 500}} 
						 disabled={this.state.submit}
                     />
 
        			<FormFeedback>{errors.address}</FormFeedback>

              </FormGroup>
	  		</Col>
	 		<Col style={{"maxWidth": 300}} sm="12">
			  <FormGroup>
                <label htmlFor="name"><Translate id="add-name"/></label>
                <FormInput type="text"
	                     name="name"
	                     id="name"
	                     placeholder={this.props.translate("add-name")}
	                     autoComplete="given-name"
	                     valid={!errors.name}
	                     invalid={touched.name && !!errors.name}
	                     autoFocus={true}
	                     required
	                     onChange={handleChange}
	                     onBlur={handleBlur}
	                     value={values.name}
						 disabled={this.state.submit}
                     />
        			<FormFeedback>{errors.name}</FormFeedback>
              </FormGroup>
	  		</Col>
         <Col style={{"maxWidth": 300}} sm="12">
            <FormGroup>
                    <label htmlFor="chain"><Translate id="add-chain"/></label>
                    <FormSelect type="text"
                          name="chain"
                          autoFocus={true}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.chain}
                         disabled={false}
                    >
                    {Object.keys(this.props.networks).sort().map((chain, index) => {
				            return       <option value={chain}>{this.props.translate("network-"+chain )}</option>

                  
                              })}
                   
                         
                      </FormSelect>

                  </FormGroup>
            </Col>      
			 
			
			
			 </Row>
  <Row>
<Col className="form-group">
                        <label htmlFor="abi"><Translate id="add-abi"/></label>
                        <FormTextarea
                          style={{ minHeight: "300px" }}
                           name="abi"
                                id="abi"
                                placeholder={this.props.translate("add-abi")}
                                autoComplete="given-name"
                                valid={!errors.abi}
                                invalid={errors.abi && !!errors.abi}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.abi}
                                disabled={this.state.submit}
                        />
                         <FormFeedback>{errors.abi}</FormFeedback>
                      </Col>
 </Row>
			
			
 	
		</CardBody>
		<CardFooter>
		<div className="red" >{this.state.error?<Translate id={'error-'+this.state.error.code}/>:(null)}</div>
				 <Button
                className="btn btn-primary"
                type="submit"
				disabled={this.state.submit}
              >
                 <Translate id="add"/>
              </Button>
		</CardFooter>
        </Card>
		</Form>
		 )}

     </Formik>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
 	  this.uid =  this.props.match.params.uid;
    this.state = {
      pageSizeOptions: [5, 10, 15, 20, 25, 30],
      pageSize: 10,
	    devapp: undefined,
 	    deleteDialogOpen: false,
	    submit: false,
      addError: undefined,
      error: undefined,
      tableData: [],
      redirect: undefined
    };
	this.initialValues = {name:"", apiKey:""};
    this.formik = React.createRef();
	this.validationSchema =  this.validationSchema.bind(this);

	this.onSubmit = this.onSubmit.bind(this);	
	
	this.props.addTranslation(require("../translations/app.json"));
	this.props.addTranslation(require("../translations/yup.json"));
    

   

    this.getStatusClass = this.getStatusClass.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleFilterSearch = this.handleFilterSearch.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
 	this.handleDeleteClose= this.handleDeleteClose.bind(this);
 	this.handleErrorClose= this.handleErrorClose.bind(this);
  }

  componentWillMount(){

    this.loadData();
       
  }
  loadData(){
	  window.web3.app({uid:this.uid}, function (error, result){

        if(result){
             const tableData = result.contracts;
             this.setState({...this.state,app:result, tableData});
             this.formik.current.setFieldValue("name", result.name);
             this.formik.current.setFieldValue("apiKey", result.apiKey);

            this.searcher = new FuzzySearch(tableData, ["name", "status"], {
                    caseSensitive: false
          });
        }
      }.bind(this))
  }
  

 

  /**
   * Returns the appropriate status class for the `Status` column.
   */
  getStatusClass(status) {
    const statusMap = {
      Cancelled: "danger",
      Complete: "success",
      Pending: "warning"
    };

    return `text-${statusMap[status]}`;
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
  handleFilterSearch(e) {

    const tableData = this.searcher.search(e.target.value);
    this.setState({
      ...this.state,
      tableData
    });
  }

 

  /**
   * Mock method for deleting transactions.
   */
  handleItemDelete(row) {

	  this.setState({
      deleteDialogOpen: true,
 	  devapp: row
    });
	
  }



handleDeleteClose(result) {
		if(result){
			this.setState({
     		 deleteDialogOpen: false
   		 });
			const {web3} = window;
			web3.token_delete({address:this.state.devapp.original.address}, function (error, result){
				if(error){
					this.setState({error, devapp:undefined});
				}else {
          this.props.delete_(this.state.devapp.original.address);
            this.setState({...this.state,tableData:this.props.devappStore.list});
					//var tableData = this.state.tableData.filter((item) => item.address !== this.state.devapp.original.address);  //ES6
					this.setState({devapp:undefined});
				}
			}.bind(this));
		}else {
			 this.setState({
     		 deleteDialogOpen: false, devapp:undefined
   		 });
		}
	 


	
  }

handleErrorClose() {
		this.setState({
     		 error: undefined
		});
	 	
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
    this.findFirstError('addForm', (fieldName) => {
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
       .min(5, this.props.translate("yup-min", {name: this.props.translate("add-name"), char:5}))
	 	   .max(50, this.props.translate("yup-max", {name: this.props.translate("add-name"), char:55}))
		
	   
   
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
		address: true,
        
       
      }
    )
    this.validateForm(errors)
  }

  onSubmit(values, actions){

	const {web3} = window;
  this.setState({submit: true, addError:undefined});

	web3.app_add(values, function (error, result){
		if(error){
					this.setState({submit: false, addError:error});
		}else {
			this.setState({submit: false});
			this.props.add(result);
			this.formik.current.resetForm();
		
		}
		
	}.bind(this));

	return true;
	
	// window.web3.login(values.userName, values.password);
  
}





 


 

  render() {
      if(this.state.redirect)return <Redirect to={this.state.redirect}/>	
    const { pageSize, pageSizeOptions } = this.state;
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
        Header: <Translate id='column-name'/>,
        accessor: "name",
        style: {'justify-content':'left'},
		    headerStyle: {'text-align':'left'},
        minWidth: 120,
		    maxWidth: 300,
 		
        
      },
 	    {
        Header: "Address",
        accessor: "address",
         style: {'justify-content':'left'},
		    headerStyle: {'text-align':'left'},
         minWidth: 50,
		    maxWidth: 400
		
      },
       {
        Header: "Network",
        accessor: "networkId",
         style: {'justify-content':'left'},
		    headerStyle: {'text-align':'left'},
         minWidth: 50,
        maxWidth: 200,

         Cell: row => (
	          <Translate id={"network-"+row.original.chain} />
         
        )
       
		
      },
      {
        Header: "Actions",
        accessor: "actions",
        sortable: false,
  		style: {'justify-content':'left'},
		headerStyle: {'text-align':'left'},
        Cell: row => (
	
          <ButtonGroup size="sm" className="d-table ">
           
            <Button theme="white" onClick={() => this.handleItemDelete(row)}>
              <i className="material-icons">delete</i>
            </Button>
          </ButtonGroup>
        )
      }
    ];

    return (
      <Container fluid className="main-content-container px-4 pb-4">
	  <ConfirmDialog isOpen={this.state.deleteDialogOpen} toggle={this.handleDeleteClose} centered={true} title={<Translate id="delete-title"/>} text={<Translate id="delete-text" data={{name: this.state.devapp?this.state.devapp.original.symbol:null}}/>}/>
      <ErrorDialog isOpen={this.state.error} toggle={this.handleErrorClose} centered={true} title={<Translate id="error"/>} error={this.state.error?this.state.error.code:0}/>
        <Row noGutters className="page-header py-4">
          <PageTitle title={<Translate id="app-title"/>} subtitle={<Translate id="developers"/>} className="text-sm-left mb-3" />
        
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
                  status,
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
          {/* Files & Dropdowns */}
          <CardHeader className="border-bottom">
            <h6 className="m-0"><Translate id="add-title"/></h6>
          </CardHeader>
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
        <Col style={{"maxWidth": 300}} sm="12">
            <FormGroup>
                    <label htmlFor="apiKey"><Translate id="apiKey"/></label>
                    <FormInput type="text"
                          name="apiKey"
                          id="apiKey"
                          placeholder={this.props.translate("apiKey")}
                          autoComplete="given-name"
                                                 
                          autoFocus={true}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.apiKey}
                disabled={true}
                        />

                  </FormGroup>
            </Col>    
            <Col style={{"maxWidth": 300}} sm="12">
            <FormGroup>
                    <label htmlFor="status"><Translate id="status"/></label>
                    <FormSelect type="text"
                          name="status"
                          autoFocus={true}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.status}
                         disabled={false}
                    >
                        <option value="0">{this.props.translate("app-status-0")}</option>
                          <option value="1">{this.props.translate("app-status-1")}</option>
                      </FormSelect>

                  </FormGroup>
            </Col>      

			
			 </Row>
			
			
 	
		</CardBody>
		<CardFooter>
		<div className="red" >{this.state.addError?<Translate id={'error-'+this.state.addError.code}/>:(null)}</div>
				 <Button
                className="btn btn-primary"
                type="submit"
				disabled={this.state.submit}
              >
                 <Translate id="add"/>
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
        <Card className="p-0">
          <CardHeader className="p-0">
  
            <Container fluid className="file-manager__filters border-bottom">
              
              <Row>
                {/* Filters :: Page Size */}
                <Col className="file-manager__filters__rows d-flex" md="6">
                  <span>Show</span>
                  <FormSelect
                    size="sm"
                    value={this.state.pageSize}
                    onChange={this.handlePageSizeChange}
                  >
                    {pageSizeOptions.map((size, idx) => (
                      <option key={idx} value={size}>
                        {size} rows
                      </option>
                    ))}
                  </FormSelect>
                </Col>

                {/* Filters :: Search */}
                <Col className="file-manager__filters__search d-flex" md="6">
                  <InputGroup seamless size="sm" className="ml-auto">
                    <InputGroupAddon type="prepend">
                      <InputGroupText>
                        <i className="material-icons">search</i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <FormInput onChange={this.handleFilterSearch} />
                  </InputGroup>
                </Col>
              </Row>
            </Container>
          </CardHeader>
          <CardBody className="p-0">
            <div className="">
              <ReactTable
                columns={tableColumns}
                data={tableData}
                pageSize={pageSize}
                showPageSizeOptions={false}
                resizable={false}
               getTdProps={(state, rowInfo, column) => {
                return {  onDoubleClick: (e, t) => { this.setState({redirect: "/contract/"+ rowInfo.original.address})}}
               }}

              />
            </div>          
		
          </CardBody>
        </Card>
		</Col>
        </Row>
		  <Row className="py-4">
	 	<Col>
                      <AddContract translate={this.props.translate} 	loadData={this.loadData.bind(this)} app={this.state.app} networks={networks}/>
		
		</Col>
        </Row>
      </Container>
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
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(App));

