import React from "react";
import ReactTable from "react-table";
import FuzzySearch from "fuzzy-search";
import Moment from "react-moment";
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
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
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

class EditAccountModal extends React.Component {
	 constructor(props) {
		super(props);
		 this.state = { error: undefined};
		this.initialValues = {name:''};
			this.formik = React.createRef();
		this.onSubmit = this.onSubmit.bind(this);
		this.validationSchema =  this.validationSchema.bind(this);	
	}
	
	showModal(){
		this.setState({error:undefined});
		this.formik.current.setFieldValue('name', this.props.account.original.name);
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
    this.findFirstError('editForm', (fieldName) => {
      return Boolean(errors[fieldName])
    })
  }

  validationSchema = function (values) {

  return Yup.object().shape({
   	    name: Yup.string()
	     .min(3, this.props.translate("yup-min", {name: this.props.translate("edit-name"), char:3}))
	     .required(this.props.translate("yup-required", {name: this.props.translate("edit-name")})),
	   
   
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
        
       
      }
    )
    this.validateForm(errors)
  }

  onSubmit(values, actions){
	const {web3} = window;
	web3.wallet_edit({wallet: this.props.account.original.address, name:values.name}, function (error, result){
		if(error){
			this.setState({error});
		}else {
			this.props.account.original.name = values.name;
			this.props.toggle();
		}
	}.bind(this));
	
	return true;
	
	// window.web3.login(values.userName, values.password);
  
}
	

render(){
		return (
			 <Modal open={this.props.isOpen} {...this.props} showModal={this.showModal.bind(this)}>
				
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

				 
	 
	        <Form onSubmit={handleSubmit} noValidate name='editForm'>
		  <ModalHeader><Translate id="edit-title"/></ModalHeader>
	         	 <ModalBody>   {/* Form Fields */}
				  <FormGroup>
                <label htmlFor="name"><Translate id="edit-name"/></label>
                <FormInput type="text"
	                     name="name"
	                     id="name"
	                     placeholder={this.props.translate("edit-name")}
	                     autoComplete="given-name"
	                     valid={!errors.name}
	                     invalid={touched.name && !!errors.name}
	                     autoFocus={true}
	                     required
	                     onChange={handleChange}
	                     onBlur={handleBlur}
	                     value={values.name}
                     />
        			<FormFeedback>{errors.name}</FormFeedback>
              </FormGroup>
		</ModalBody>
		<ModalFooter>
		<div className="red" style={{"text-align": "center", "marginBottom":10}} >{this.state.error?<Translate id={'error-'+this.state.error.code}/>:(null)}</div>
		  <Button
                className="btn btn-warning"
                type="button"
				onClick={()=>{this.props.toggle()}}
              >
                 <Translate id="cancel"/>
              </Button>
		  <Button
                className="btn btn-primary"
                type="submit"
              >
                 <Translate id="save"/>
              </Button>
		</ModalFooter>
	  </Form>
		 )}

     </Formik>
			
			 </Modal>
			
		)
	}
}


class AddAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      error: undefined,
    }
    this.initialValues = {name: ''};
    this.formik = React.createRef();
    this.validationSchema =  this.validationSchema.bind(this);
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

  

  validationSchema = function (values) {

  return Yup.object().shape({
 	   name: Yup.string()
	     .min(3, this.props.translate("yup-min", {name: this.props.translate("add-name"), char:3}))
	     .required(this.props.translate("yup-required", {name: this.props.translate("add-name")})),
   	   
			   
   
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
	web3.wallet_add(values, function (error, result){
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
            <h6 className="m-0">Add Account</h6>
          </CardHeader>
		  <CardBody>
	 
	      
			  <Row>
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


class ImportAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      error: undefined,
      jsonFile: undefined
    }
    this.initialValues = {name: '', password:'', privateKey:'', type:"2"};
    this.formik = React.createRef();
    this.validationSchema =  this.validationSchema.bind(this);
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

  validatePrivateKey(value){
  	const {web3} = window;
	if(!value)return true;
	try {
  		web3.eth.accounts.privateKeyToAccount(value);
	}catch(error){
		return false;
	}
	return true;
							
  }

  

  validationSchema = function (values) {

  return Yup.object().shape({
 	   name: Yup.string()
	     .min(3, this.props.translate("yup-min", {name: this.props.translate("import-name"), char:3}))
       .required(this.props.translate("yup-required", {name: this.props.translate("import-name")})),
      privateKey: Yup.string().when('type', {
         is: (type) => type === "1",  then: Yup.string().required(this.props.translate("yup-required", {name: this.props.translate("import-privateKey")})).test({
			   name: 'privateKey',
			   exclusive: true,
			   message: this.props.translate("yup-private-key"),
			   test: this.validatePrivateKey
        })
      }),
      password: Yup.string().when('type', {
        is: (type) => type === "2",  then: Yup.string().required(this.props.translate("yup-required", {name: this.props.translate("import-password")}))
      }),  
      jsonFile: Yup.string().when('type', {
        is: (type) => type === "2",  then: Yup.string().test({
          name: 'jsonFile',
          exclusive: true,
          message: this.props.translate("yup-required", {name: this.props.translate("import-json")}),
          test: (value) => { return this.state.jsonFile?true:false}
        })
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
    jsonFile:true
        
       
      }
    )
    this.validateForm(errors)
  }

  onSubmit(values, actions){

    const _this =  this;
    if(values.type==="1"){
       window.web3.wallet_add(values, _this.onSubmited.bind(this));

    }else {
       let reader = new FileReader();
       reader.onloadend = () => {
          var keystoreArray = undefined;
          try {
          keystoreArray  = JSON.parse(reader.result);
          }catch(e){
            _this.setState({"error": {code: 501000, message: e.message}} );
            return;
          }
          try {
             const account = window.web3.eth.accounts. decrypt(keystoreArray, values.password);
             const privateKey = account.privateKey;
             window.web3.gateway.wallet_add(values.name, privateKey, _this.onSubmited.bind(_this));

          }catch(e){
            if(e.message.includes("possibly wrong password")){
                   _this.setState({"error": {code: 501200, message: e.message}} );
                   return;
            }
             _this.setState({"error": e });

          }
        }
        reader.onerror = function(event) {
           _this.setState({"error": {code: 501100, message: "Failed to read file!\n\n" + reader.erro}});
           reader.abort(); // (...does this do anything useful in an onerror handler?)
        };
       reader.readAsText(this.state.jsonFile);

    }
 
	return true;

  
 }
 onSubmited(error, result){
	if(error){
					this.setState({submit: false, error:error});
		}else {
			this.setState({submit: false, error:undefined, jsonFile: undefined});
			this.formik.current.resetForm();
			this.props.loadData();
		}
 }

 handleFileUpload = (event) => {
    
  
   let jsonFile = event.target.files[0];
   this.setState({jsonFile: jsonFile});
   this.formik.current.validateField("jsonFile");
   
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
            <h6 className="m-0">Import Account</h6>
          </CardHeader>
		  <CardBody>
	 
	      
			  <Row>
	 		<Col style={{"maxWidth": 300}} sm="12">
			  <FormGroup>
                <label htmlFor="name"><Translate id="import-name"/></label>
                <FormInput type="text"
	                     name="name"
	                     id="name"
	                     placeholder={this.props.translate("import-name")}
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
			 



			
			 </Row>
 <Row>
	 		<Col style={{"maxWidth": 300}} sm="12">
			  <FormGroup>
                <label htmlFor="type"><Translate id="import-type"/></label>
                <FormSelect
	                     name="type"
	                     id="type"
	                   
	                    
	                  
	                     autoFocus={true}
	                     required
	                     onChange={handleChange}
	                     onBlur={handleBlur}
	                     value={values.type}
						           disabled={this.state.submit}
                     >
                        <option value="1">{this.props.translate("type-1")}</option>
                        <option value="2">{this.props.translate("type-2")}</option>
                      </FormSelect>
        	      </FormGroup>
	  		</Col>
		 </Row>
     {values.type==="1" && <React.Fragment>
      
         <Row>
	 		<Col style={{"maxWidth": 300}} sm="12">
			  <FormGroup>
                <label htmlFor="privateKey"><Translate id="import-privateKey"/></label>
                <FormInput type="text"
	                     name="privateKey"
	                     id="privateKey"
	                     placeholder={this.props.translate("import-privateKey")}
	                     autoComplete="given-name"
	                     valid={!errors.privateKey}
	                     invalid={touched.privateKey && !!errors.privateKey}
	                     autoFocus={true}
	                     required
	                     onChange={handleChange}
	                     onBlur={handleBlur}
	                     value={values.privateKey}
						 disabled={this.state.submit}
                     />
        			<FormFeedback>{errors.privateKey}</FormFeedback>
              </FormGroup>
	  		</Col>
			 
			
			
			 </Row>
       </React.Fragment>
      }
   {values.type==="2" && <React.Fragment>
         <Row>
	 		<Col style={{"maxWidth": 300}} sm="12">
			  <FormGroup>
                <label htmlFor="password"><Translate id="import-password"/></label>
                <FormInput type="text"
	                     name="password"
	                     id="password"
	                     placeholder={this.props.translate("import-password")}
	                     autoComplete="given-name"
	                     valid={!errors.password}
	                     invalid={touched.password && !!errors.password}
	                     autoFocus={true}
	                     required
	                     onChange={handleChange}
	                     onBlur={handleBlur}
	                     value={values.password}
						 disabled={this.state.submit}
                     />
        			<FormFeedback>{errors.password}</FormFeedback>
              </FormGroup>
	  		</Col>
			 
			
			
			 </Row>

       	  <Row>
	 		<Col style={{"maxWidth": 300}}  sm="12">
			  <FormGroup>
             
          <label htmlFor="jsonFile"><Translate id="import-json"/></label>
             <div className="custom-file">
                <FormInput  type="file"
	                     name="jsonFile"
	                     id="jsonFile"
	                     placeholder={this.props.translate("import-json")}
	                     autoComplete="given-name"
	                     valid={!errors.jsonFile}
	                     invalid={touched.jsonFile && !!errors.jsonFile}
	                     autoFocus={true}
	                     required
	                     onChange={this.handleFileUpload}
	                     onBlur={handleBlur}
	                     value={values.jsonFile}
             disabled={this.state.submit}
             className="custom-file-input"
           />
           
       <label className="custom-file-label" htmlFor="jsonFile">
      {this.state.jsonFile?this.state.jsonFile.name:"Choose file..."}
    </label>
    <FormFeedback>{errors.jsonFile}</FormFeedback>
  </div>
                    
        			
              </FormGroup>
	  		</Col>

			
			
			 </Row>
      </React.Fragment> 
  }
 	
		</CardBody>
		<CardFooter>
		<div className="red" >{this.state.error?this.state.error.code?<Translate id={'error-'+this.state.error.code}/>:this.state.error.message:(null)}</div>
				 <Button
                className="btn btn-primary"
                type="submit"
				disabled={this.state.submit}
              >
                 <Translate id="import"/>
              </Button>
		</CardFooter>
        </Card>
		</Form>
		 )}

     </Formik>
    )
  }
}
 
class Accounts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSizeOptions: [5, 10, 15, 20, 25, 30],
      pageSize: 10,
      tableData: [],
  	  account: undefined,
 	    editDialogOpen: false,
	    deleteDialogOpen: false,
	    error: undefined
    };
	

	
	this.props.addTranslation(require("../translations/accounts.json"));
	this.props.addTranslation(require("../translations/yup.json"));
    this.searcher = null;

    this.getStatusClass = this.getStatusClass.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleFilterSearch = this.handleFilterSearch.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);
	this.handleEditClose= this.handleEditClose.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
 	this.handleDeleteClose= this.handleDeleteClose.bind(this);
 	this.handleErrorClose= this.handleErrorClose.bind(this);
  }

  componentWillMount() {
	
	 this.loadData();
	
 
    
  }
  loadData(){
	const {web3} = window;

	var tableData =  [];
	for(var i=0; i<web3.eth.accounts.wallet.length; i++){
		tableData.push(web3.eth.accounts.wallet[i]);
  }
	// Initialize the fuzzy searcher.
	this.searcher = new FuzzySearch(tableData, ["name", "address"], {
      				caseSensitive: false
    });
	this.setState({...this.state,tableData});
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
    this.setState({
      ...this.state,
      tableData: this.searcher.search(e.target.value)
    });
  }

  /**
   * Mock method for editing transactions.
   */
  handleItemEdit(row) {
 	 this.setState({
      editDialogOpen: true,
	  account: row
    });
  }

  /**
   * Mock method for deleting transactions.
   */
  handleItemDelete(row) {

	  this.setState({
      deleteDialogOpen: true,
 	  account: row
    });
	
  }

handleEditClose() {

	  this.setState({
      editDialogOpen: false
    });


	
  }

handleDeleteClose(result) {
		if(result){
			this.setState({
     		 deleteDialogOpen: false
   		 });
			const {web3} = window;
			web3.wallet_delete({wallet: this.state.account.original.address}, function (error, result){
				if(error){
					this.setState({error, account:undefined});
				}else {
				  this.loadData();
				}
			}.bind(this));
		}else {
			 this.setState({
     		 deleteDialogOpen: false, account:undefined
   		 });
		}
	 


	
  }

handleErrorClose() {
		this.setState({
     		 error: undefined
		});
	 	
  }

	

 


 

  render() {
    const { tableData, pageSize, pageSizeOptions } = this.state;
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
        Header:  <Translate id='column-name'/>,
        accessor: "name",
        className: "text-left",
		style: {'justify-content':'left'},
        minWidth: 90,
        
      },
      {
        Header: <Translate id='column-address'/>,
        accessor: "address",
        className: "text-center",
        minWidth: 80
 		
        
      },
 	  {
        Header: "Actions",
        accessor: "actions",
        maxWidth: 300,
        minWidth: 180,
        sortable: false,
        Cell: row => (
	
          <ButtonGroup size="sm" className="d-table mx-auto">
            <Button theme="white" onClick={() => this.handleItemEdit(row)}>
              <i className="material-icons">edit</i>
			            </Button>
           
            <Button theme="white" onClick={() => this.handleItemDelete(row)}>
              <i className="material-icons">delete</i>
            </Button>
          </ButtonGroup>
        )
      }
    ];

    return (
      <Container fluid className="main-content-container px-4 pb-4">
	  <EditAccountModal isOpen={this.state.editDialogOpen} centered={true} toggle={this.handleEditClose} account={this.state.account} translate={this.props.translate}/>
	  <ConfirmDialog isOpen={this.state.deleteDialogOpen} toggle={this.handleDeleteClose} centered={true} title={<Translate id="delete-title"/>} text={<Translate id="delete-text" data={{name: this.state.account?this.state.account.original.name:null}}/>}/>
      <ErrorDialog isOpen={this.state.error} toggle={this.handleErrorClose} centered={true} title={<Translate id="error"/>} error={this.state.error?this.state.error.code:0}/>
        <Row noGutters className="page-header py-4">
          <PageTitle title={<Translate id="accounts-title"/>} subtitle={<Translate id="wallet"/>} className="text-sm-left mb-3" />
        
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
              />
            </div>
		
          </CardBody>
        </Card>
		</Col>
        </Row>
		<Row className="py-4">
	 	<Col>
                      <AddAccount translate={this.props.translate} 	loadData={this.loadData.bind(this)}/>
		
		</Col>
        </Row>
    	<Row className="py-4">
	 	<Col>
                      <ImportAccount translate={this.props.translate} 	loadData={this.loadData.bind(this)}/>
		
		</Col>
        </Row>    
      </Container>
    );
  }
}
export default withLocalize(Accounts);

