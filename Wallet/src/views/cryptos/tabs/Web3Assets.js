import React from "react";
import ReactTable from "react-table";
import FuzzySearch from "fuzzy-search";
import { connect } from 'react-redux';
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

import PageTitle from "../../../components/common/PageTitle";
import ConfirmDialog from "../../../components/common/ConfirmDialog";

import ErrorDialog from "../../../components/common/ErrorDialog";
import * as constants from '../../../constants';
import IconFactory from '../../../utils/IconFactory';
import * as app from "../../../actions/app";
import {Loader} from "../../../components/loader";
const abi = require('erc-20-abi');
 
class Web3Assets extends React.Component {
  constructor(props) {
    super(props);
	this.name =  this.props.name;
    this.state = {
      pageSizeOptions: [5, 10, 15, 20, 25, 30],
      pageSize: 10,
	    asset: undefined,
 	    deleteDialogOpen: false,
	    submit: false,
      addError: undefined,
      error: undefined,
      tableData: [],
    };
	this.initialValues = {address: '',name:"",  symbol:'', decimals: 18, network: this.name};
    this.formik = React.createRef();
	this.validationSchema =  this.validationSchema.bind(this);

	this.onSubmit = this.onSubmit.bind(this);	
	
	this.props.addTranslation(require("../../../translations/assets.json"));
	this.props.addTranslation(require("../../../translations/yup.json"));
    

   

    this.getStatusClass = this.getStatusClass.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleFilterSearch = this.handleFilterSearch.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
 	this.handleDeleteClose= this.handleDeleteClose.bind(this);
 	this.handleErrorClose= this.handleErrorClose.bind(this);
    this.validateToken =  this.validateToken.bind(this);
    this.validateAddress =  this.validateAddress.bind(this);
  }

  componentWillMount(){
	      const tableData = this.props.appStore.cryptoItems[this.name].assets;
	   this.setState({...this.state,tableData});
            this.searcher = new FuzzySearch(tableData, ["name", "address"], {
                    caseSensitive: false
          });
	
       
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
 	  asset: row
    });
	
  }



handleDeleteClose(result) {
		if(result){
			this.setState({
     		 deleteDialogOpen: false
   		 });

			this.props.assetDelete({address:this.state.asset.original.address, network: this.name}, function (error, result){
				if(error){
					this.setState({error, asset:undefined});
				}else {
    				   const tableData = this.props.appStore.cryptoItems[this.name].assets;

				       this.setState({...this.state,tableData, asset:undefined});
				            this.searcher = new FuzzySearch(tableData, ["name", "address"], {
				                    caseSensitive: false
				          });

				}
			}.bind(this));
		}else {
			 this.setState({
     		 deleteDialogOpen: false, asset:undefined
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
	const {web3} = this.props.appStore.cryptoItems[this.name];
	if(!value)return true;
	try {
  		return web3.utils.isAddress(value);
	}catch(error){
		return false;
	}
	return true;
							
  }



   validateToken(value){
		const {web3} = this.props.appStore.cryptoItems[this.name];
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
 	 
   	    address: Yup.string()
	     .required(this.props.translate("yup-required", {name: this.props.translate("add-address")}))
 		 .test({
			  name: 'address',
			  exclusive: false,
			  message: this.props.translate("yup-format", {name: this.props.translate("add-address")}),
			  test: this.validateAddress
					
     }),
    name: Yup.string()
	     .required(this.props.translate("yup-token")),
	 	symbol: Yup.string()
	     .required(this.props.translate("yup-token"))
	  	
		
	   
   
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
	this.props.assetAdd(values, function (error, result){
		if(error){
					this.setState({submit: false, addError:error});
		}else {
			this.setState({submit: false});
			  const tableData = this.props.appStore.cryptoItems[this.name].assets;
	
		      this.setState({...this.state,tableData, submit: false});
			  this.searcher = new FuzzySearch(tableData, ["name", "address"], {
				  caseSensitive: false
			  });
			this.formik.current.resetForm();
		
		}
		
	}.bind(this));

	return true;
	
	// window.web3.login(values.userName, values.password);
  
}





 


 

  render() {
    const { pageSize, pageSizeOptions } = this.state;
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
        accessor: "icon",
		style: {'justify-content':'center'},
        maxWidth: 70,
		Cell: row =>
          <React.Fragment> {IconFactory.generateMediumIdenticon(row.original.address)}</React.Fragment>
        
      },
      {
        Header: <Translate id='column-name'/>,
        accessor: "name",
        style: {'justify-content':'left'},
		    headerStyle: {'text-align':'left'},
        minWidth: 120,
		    maxWidth: 250,
 		
        
      },
 		{
        Header: <Translate id='column-symbol'/>,
        accessor: "symbol",
        style: {'justify-content':'left'},
		headerStyle: {'text-align':'left'},
        minWidth: 80,
		maxWidth: 150,
 		
        
      },
      {
        Header: <Translate id='column-address'/>,
        accessor: "address",
        style: {'justify-content':'left'},
		headerStyle: {'text-align':'left'},
        minWidth: 380,
		maxWidth: 400,
 		
        
      },
  	  {
        Header: <Translate id='column-decimals'/>,
        accessor: "decimals",
        maxWidth: 100,
 		
        
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
	  <ConfirmDialog isOpen={this.state.deleteDialogOpen} toggle={this.handleDeleteClose} centered={true} title={<Translate id="delete-title"/>} text={<Translate id="delete-text" data={{name: this.state.asset?this.state.asset.original.symbol:null}}/>}/>
      <ErrorDialog isOpen={this.state.error} toggle={this.handleErrorClose} centered={true} title={<Translate id="error"/>} error={this.state.error?this.state.error.code:0}/>
       
 		<Row >
	 <Col>
        
          
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
       
      
            <div className="">
              <ReactTable
                columns={tableColumns}
                data={tableData}
                pageSize={pageSize}
                showPageSizeOptions={false}
                resizable={false}
              />
            </div>
		


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
	
          {/* Files & Dropdowns */}
         
	<FormInput type="hidden" id="network" name="network" value={this.name}/>
	 
	      
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
	                     onChange={ (e)=> {handleChange(e); this.validateToken(e.target.value) } }
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
                          name="symbol"
                          id="symbol"
                          placeholder={this.props.translate("add-name")}
                          autoComplete="given-name"
                          valid={!errors.name}
                          invalid={!!errors.name}
                          
                          autoFocus={true}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                disabled={true}
                        />
      <FormFeedback>{errors.name}</FormFeedback>
                  </FormGroup>
            </Col>

	 		<Col style={{"maxWidth": 200}} sm="12">
			  <FormGroup>
                <label htmlFor="symbol"><Translate id="add-symbol"/></label>
                <FormInput type="text"
	                     name="symbol"
	                     id="symbol"
	                     placeholder={this.props.translate("add-symbol")}
	                     autoComplete="given-name"
	                     valid={!errors.symbol}
	                     invalid={!!errors.symbol}
	                    
	                     autoFocus={true}
	                     required
	                     onChange={handleChange}
	                     onBlur={handleBlur}
	                     value={values.symbol}
						 disabled={true}
                     />
	<FormFeedback>{errors.symbol}</FormFeedback>
              </FormGroup>
	  		</Col>
			 <Col style={{"maxWidth": 200}} sm="12">
			  <FormGroup>
                <label htmlFor="decimals"><Translate id="add-decimals"/></label>
                <FormInput type="text"
	                     name="decimals"
	                     id="decimals"
	                     placeholder="18"
	                     autoComplete="given-name"
	                     
	                    
	                     autoFocus={true}
	                     required
	                     onChange={handleChange}
	                     onBlur={handleBlur}
	                     value={values.decimals}
						 disabled={true}
                     />

              </FormGroup>
	  		</Col>
			 
			
			
			 </Row>
			
			
 	
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
	assetAdd: (values, callback) => dispatch(app.assetAdd(values, callback)),
	assetDelete: (values, callback) => dispatch(app.assetDelete(values, callback)),

   
  
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Web3Assets));

