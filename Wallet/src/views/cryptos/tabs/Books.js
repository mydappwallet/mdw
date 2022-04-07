import React from "react";
import { connect } from 'react-redux';
import ReactTable from "react-table";
import FuzzySearch from "fuzzy-search";
import { withLocalize, Translate } from "react-localize-redux";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup,
  FormInput,
  FormFeedback
} from "shards-react";

import { Formik } from 'formik';
import * as Yup from 'yup'
import {Loader} from "../../../components/loader";

import ConfirmDialog from "../../../components/common/ConfirmDialog";

import EditBookModal from "./modals/EditBookModal";

import ErrorDialog from "../../../components/common/ErrorDialog";
import * as app from "../../../actions/app";


 
class Books extends React.Component {
  constructor(props) {
    super(props);
	this.name =  this.props.name;
    	this.crypto = this.props.appStore.cryptoItems[this.name];   
	this.props.addTranslation(require("../../../translations/books.json"));
	this.props.addTranslation(require("../../../translations/yup.json"));
	
    this.state = {
      pageSizeOptions: [5, 10, 15, 20, 25, 30],
      pageSize: 10,
      tableData: [],
	  book: undefined,
 	  editDialogOpen: false,
	  deleteDialogOpen: false,
	  submit: false,
      addError: undefined,
	  error: undefined
    };
	this.initialValues = {name: '', address:'', type: this.crypto.type};
    this.formik = React.createRef();

	this.onSubmit = this.onSubmit.bind(this);	
		

    this.searcher = null;
	this.validateAddress =  this.validateAddress.bind(this);
	this.validationSchema =  this.validationSchema.bind(this);
    this.getStatusClass = this.getStatusClass.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleFilterSearch = this.handleFilterSearch.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);
	this.handleEditClose= this.handleEditClose.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
 	this.handleDeleteClose= this.handleDeleteClose.bind(this);
 	this.handleErrorClose= this.handleErrorClose.bind(this);
  }

  componentWillMount(){
            const tableData = this.props.appStore.addressBook[this.crypto.type];
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
	  book: row
    });
  }

  /**
   * Mock method for deleting transactions.
   */
  handleItemDelete(row) {

	  this.setState({
      deleteDialogOpen: true,
 	  book: row
    });
	
  }

handleEditClose() {

		const tableData = this.props.appStore.addressBook[this.crypto.type];
		this.setState({...this.state,tableData, editDialogOpen:false})
		this.searcher = new FuzzySearch(tableData, ["name", "address"], {
        	caseSensitive: false
	  	});


	
  }

handleDeleteClose(result) {
		if(result){
			this.setState({
     		 deleteDialogOpen: false
   		 });
			
			this.props.addressBookDelete({address:this.state.book.original.address, type:this.crypto.type}, function (error, result){
				if(error){
					this.setState({error, book:undefined});
				}else {
					const tableData = this.props.appStore.addressBook[this.crypto.type];
				    this.setState({...this.state,tableData})
		 			this.searcher = new FuzzySearch(tableData, ["name", "address"], {
                    caseSensitive: false
          		});
					
           
				}
			}.bind(this));
		}else {
			 this.setState({
     		 deleteDialogOpen: false, book:undefined
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
	if(!value)return true;
	switch(this.crypto.type){
		case 'web3':
			return this.crypto.web3.utils.isAddress(value);
	}
  }
  validationSchema = function (values) {

  return Yup.object().shape({
 	   name: Yup.string()
	     .min(3, this.props.translate("yup-min", {name: this.props.translate("add-name"), char:3}))
	     .required(this.props.translate("yup-required", {name: this.props.translate("add-name")})),
   	    address: Yup.string()
	     .required(this.props.translate("yup-required", {name: this.props.translate("address")}))
		 .test({
			  name: 'address',
			  exclusive: true,
			  message: this.props.translate("yup-format", {name: this.props.translate("address")}),
			  test: this.validateAddress
					
			
})
	   
   
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
        address: true,
        
       
      }
    )
    this.validateForm(errors)
  }

  onSubmit(values, actions){
	var _this = this;
	
	this.setState({submit: true, addError:undefined});

	this.props.addressBookAdd(values, function (error, result){
		if(error){
					this.setState({submit: false, addError:error});
		}else {
		const tableData = this.props.appStore.addressBook[this.crypto.type];
		this.setState({...this.state,tableData, submit: false})
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
    const { pageSize, pageSizeOptions, tableData } = this.state;
	
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
        maxWidth: 150,
        
      },
      {
        Header: <Translate id='column-address'/>,
        accessor: "address",
        className: "text-center",

 		
        
      },
 	  {
        Header: "Actions",
        accessor: "actions",
        width:100,
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
  <Container className=" pb-4">

	  <EditBookModal isOpen={this.state.editDialogOpen} centered={true} toggle={this.handleEditClose} book={this.state.book} type={this.crypto.type}/>
	  <ConfirmDialog isOpen={this.state.deleteDialogOpen} toggle={this.handleDeleteClose} centered={true} title={<Translate id="delete-title"/>} text={<Translate id="delete-text" data={{name: this.state.book?this.state.book.original.name:null}}/>}/>
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


        
	
	 
	      
			  <Row>
	 		<Col  sm="12" md="6" lg="4">
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
			  <Col sm="12" md="10" lg="8">
			  <FormGroup>
                <label htmlFor="address"><Translate id="address"/></label>
                <FormInput type="text"
	                     name="address"
	                     id="address"
	                     placeholder={this.props.translate("address")}
	                     autoComplete="given-name"
	                     valid={!errors.address}
	                     invalid={touched.address && !!errors.address}
	                     autoFocus={true}
	                     required
	                     onChange={handleChange}
	                     onBlur={handleBlur}
	                     value={values.address}
						 disabled={this.state.submit}
                     />
 
        			<FormFeedback>{errors.address}</FormFeedback>

              </FormGroup>
	  		</Col>
			
			
			 </Row>
			
			
 	
	  <Row>
	 		<Col>
		<div className="red" >{this.state.addError?<Translate id={'error-'+this.state.addError.code}/>:(null)}</div>

				 <Button
                className="btn btn-primary"
                type="submit"
				disabled={this.state.submit}
              >
                 <Translate id="add"/>
              </Button>
		</Col>
			
			
			 </Row>
		
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
	addressBookAdd: (values, callback) => dispatch(app.addressBookAdd(values, callback)),
	addressBookDelete: (values, callback) => dispatch(app.addressBookDelete(values, callback)),


   
  
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Books));


