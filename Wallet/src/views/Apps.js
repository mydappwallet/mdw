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
import * as devapp from "./../actions/devapp";
import {Loader} from "../components/loader";
const abi = require('erc-20-abi');
 
class Apps extends React.Component {
  constructor(props) {
    super(props);

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
	this.initialValues = {name:""};
    this.formik = React.createRef();
	this.validationSchema =  this.validationSchema.bind(this);

	this.onSubmit = this.onSubmit.bind(this);	
	
	this.props.addTranslation(require("../translations/apps.json"));
	this.props.addTranslation(require("../translations/yup.json"));
    

   

    this.getStatusClass = this.getStatusClass.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleFilterSearch = this.handleFilterSearch.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
 	this.handleDeleteClose= this.handleDeleteClose.bind(this);
 	this.handleErrorClose= this.handleErrorClose.bind(this);
    this.validateToken =  this.validateToken.bind(this);
  }

  componentWillMount(){
	  window.web3.app_list(function (error, result){
        if(result){
        // const tableData = JSON.parse(JSON.stringify(result));
          const tableData = result;
          this.setState({...this.state,tableData});
          this.searcher = new FuzzySearch(tableData, ["name"], {
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



   validateToken(value){
		const {web3} = window;
		const formik = this.formik.current;
		
		if(!web3.utils.isAddress(value)){
			formik.setFieldValue("symbol", "", true);	
			return;
		}
		
		
		try {
      const erc20 =  new web3.eth.Contract(abi, value);		
      erc20.methods.name().call( function (error, result){
        		if(error){
              formik.setFieldValue("name", "", true);	
					    formik.setFieldValue("symbol", "", true);	
              formik.setFieldValue("decimals", "18", false);
              return false;
            }else {
              formik.setFieldValue("name", result, true);	
              erc20.methods.symbol().call(  function (error, result){
                if(error){
        	        formik.setFieldValue("symbol", "", true);	
                  formik.setFieldValue("decimals", "18", false);
                  return false;
                }else {
                  formik.setFieldValue("symbol", result, true);	
                  erc20.methods.decimals().call(  function (error, result){
                    if(error){
                      formik.setFieldValue("decimals", "18", false);
                      return false;
                    }else {
                      formik.setFieldValue("decimals", result, false);
                      return true;
                    }
                  });

                }

              });
            }
            	
        
      });
    		
			
		}catch(error){
			formik.setFieldValue("name", "", true);	
			formik.setFieldValue("symbol", "", true);	
      formik.setFieldValue("decimals", "18", false);
			return false;
		}	
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

	
  this.setState({submit: true, addError:undefined});
  window.web3.app_add(values, this.onSubmited.bind(this));

	return true;
	
	// window.web3.login(values.userName, values.password);
  
}

onSubmited(error, result){

	if(error){
					this.setState({submit: false, addError:error});
		}else {
        let { tableData } = this.state;
      tableData.push(result);
			this.setState({tableData, submit: false});
		///	this.formik.current.resetForm();
		
		}
}





 


 

  render() {
      if(this.state.redirect)return <Redirect to={this.state.redirect}/>	
    const { pageSize, pageSizeOptions } = this.state;
    if(this.props.devappStore.initialization)return (<Loader/>)
   // const tableData = this.state.tableData;
   const tableData = this.state.tableData;

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
        Header: "Status",
        accessor: "status",
        className: "text-center",
         minWidth: 50,
		    maxWidth: 300,
		Cell: row => (
      <React.Fragment>
          {row.original.status===0 && <Button aria-checked="false"  className="btn-outline-danger" style={{'padding': '.375rem .75rem', 'cursor': 'default'}}><Translate id="app-status-0"/></Button>}
          {row.original.status===1 && <Button aria-checked="false"  className="btn-outline-success" style={{'padding': '.375rem .75rem', 'cursor': 'default'}}><Translate id="app-status-1"/></Button>}
          

         
       </React.Fragment>                               
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        minWidth: 180,
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
          <PageTitle title={<Translate id="apps-title"/>} subtitle={<Translate id="developers"/>} className="text-sm-left mb-3" />
        
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
                return {  onDoubleClick: (e, t) => { this.setState({redirect: "app/"+ rowInfo.original.uid})}}
               }}

              />
            </div>
		
          </CardBody>
        </Card>
		</Col>
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
                    <label htmlFor="name"><Translate id="add-name"/></label>
                    <FormInput type="text"
                          name="name"
                          id="name"
                          placeholder={this.props.translate("add-name")}
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
  init: (callback)=> dispatch(devapp.init(callback)),
	add: (app, callback) => dispatch(devapp.add(app,callback)),
	delete_: (address) => dispatch(devapp.delete_(address))


   
  
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Apps));

