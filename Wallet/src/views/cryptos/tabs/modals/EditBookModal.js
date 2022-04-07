import React from "react";
import { connect } from 'react-redux';
import { withLocalize, Translate } from "react-localize-redux";
import {
  Button,
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
import * as app from "../../../../actions/app";

class EditBookModal extends React.Component {
	 constructor(props) {
		super(props);
 	
		 this.state = { error: undefined};
		this.initialValues = {};
			this.formik = React.createRef();
		this.onSubmit = this.onSubmit.bind(this);
		this.validationSchema =  this.validationSchema.bind(this);	
	}
	
	showModal(){
		this.setState({error:undefined});
		this.formik.current.setFieldValue('name', this.props.book.original.name);
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
	this.props.addressBookEdit({address: this.props.book.original.address, name: values.name, type:this.props.type}, function (error, result){
		if(error){
			this.setState({error});
		}else {
			this.props.book.original.name = values.name;
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


const mapStateToProps = (state) => {
  return { 
    ...state
  }
  
};

const mapDispatchToProps = (dispatch) => {
  return {
	addressBookEdit: (values, callback) => dispatch(app.addressBookEdit(values, callback)),

  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(EditBookModal));
