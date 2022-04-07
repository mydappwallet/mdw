/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import {
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  InputGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu, 
  DropdownItem,
  NavLink,
  Form,
  FormFeedback,
   FormInput,
  Collapse,
  InputGroupAddon,
  InputGroupText
} from "shards-react";
import getSymbolFromCurrency from 'currency-symbol-map';
import NumberFormat from 'react-number-format';
import { Formik } from 'formik';
import * as Yup from 'yup'
import IconFactory from '../../../utils/IconFactory';
import { withLocalize, Translate } from "react-localize-redux";
import * as constants from '../../../constants';
import Autosuggest from 'react-autosuggest';
import QRScanner from '../../../components/common/QRScanner';
import * as app from "../../../actions/app";
const utils = require('web3-utils');
const abi = require('erc-20-abi');
/*
 const languages = [
  {
    name: 'C',
    address: '1972'
  },
  {
    name: 'Elm',
    address: '2012'
  },
];
*/




class Web3Send extends React.Component {
  constructor(props) {
    super(props);
    this.name =  this.props.name;
    this.crypto = this.props.appStore.cryptoItems[this.name];   
    this.state = {
      assetDropDown: false,
      asset: this.crypto,
      to: '0x7a0fBbE65F4E1e57543B572b75de9e8865Ae1f88',
      suggestions: [],
      max: false,
      advancedOptions: false,
      qrscanShow: false

    
      
    }
    	this.initialValues = {to: '0x7a0fBbE65F4E1e57543B572b75de9e8865Ae1f88', gasPrice: 0, gasLimit: 30000, amount: '0.00000000', balance: 0,fiat:'USD', fiatAmount: '0.00' };
    

    this.formik = React.createRef();
    this.code = React.createRef();
    this.interval = undefined;
    this.getSuggestions = this.getSuggestions.bind(this);
    this.validate = this.validate.bind(this); 
    this.validationSchema =  this.validationSchema.bind(this);
    this.validateAmount = this.validateAmount.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmited = this.onSubmited.bind(this);
  }
	componentDidMount(){
    this.handleGasPrice();
     
  }
  componentWillUnmount(){
    if(this.interval){
      clearInterval( this.interval);
    }
  }

   onChange = (event, { newValue }) => {
    this.setState({
      to: newValue
    });
    this.formik.current.setFieldValue("to", newValue, true);
  };



  qrscanClick(){
    this.setState({qrscanShow: !this.state.qrscanShow});
  }
getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0? [] : this.props.appStore.addressBook[this.crypto.type].filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
getSuggestionValue = suggestion => suggestion.address;

// Use your imagination to render suggestions.
renderSuggestion = suggestion => (
  <div>
    {suggestion.name + " - " + suggestion.address}
  </div>
);

renderInputComponent = inputProps => (
     			<InputGroup className="mb-3">
<FormInput {...inputProps}/>
 <InputGroupAddon type="append" onClick={() => { inputProps.qrscanClick()}}>
        <InputGroupText>
          <div><i className="material-icons">qr_code_2</i>
            {this.state.qrscanShow && <QRScanner handleScan={this.handleScan}/>}
          </div>
        </InputGroupText>
      </InputGroupAddon>
  <FormFeedback>{inputProps.errors.to}</FormFeedback>
</InputGroup>

   
);

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

   handleScan = (data) => {
     if(data){
       if(data.startsWith('ethereum:'))
        data = data.substring(9);
      this.formik.current.setFieldValue("to", data, true);
          this.setState({qrscanShow: false, to:data});
     }else {
        this.setState({qrscanShow: false});
     }


   }
	
toggleAssetDropDown() {
    const newState = { ...this.state };
    newState["assetDropDown"] = !this.state["assetDropDown"];
    this.setState(newState);
  }

  handleAssetSelect(asset){
	
	
	try {
   
    const from = window.mydappwallet.wallet['web3'];
    
    const {web3} = this.crypto;
      
      this.handleGasPrice();
      if(asset.address){
      
      const erc20 =  new web3.eth.Contract(abi, asset.address);
          erc20.methods.balanceOf(from).call(  function (error, result){
            if(result){
              asset.balance = result;
      
          }else {
                    asset.balance = 0;
             
          }
          this.setState({asset});
    
            this.formik.current.validateForm();
          }.bind(this));
      

          
        
      }else {
         this.state.asset = asset;	
       this.forceUpdate();
      }
	}catch(e){
    alert(e.message);
		this.setState({balance: 0});
		this.formik.current.validateForm();			
	}
	
	
				
		

	return true;
	
	
  }
handleMaxAmount() {
	if(!this.state.max){
      let amount = 0;
      let decimals =constants.ETHER ;
      if(this.state.asset.address){

        amount = this.state.asset.balance;
        if(this.state.asset.decimals>0){
          decimals = "1" + "0".repeat(this.state.asset.decimals); 
 
        }

      }else {
        amount = this.state.asset.balance - (this.formik.current.values.gasPrice*constants.GWEI*this.formik.current.values.gasLimit);
      }
			amount = amount>0?amount/decimals:0;
		this.formik.current.setFieldValue('amount', amount);	
		this.handleAmountChange(amount);
	}else {
		this.formik.current.setFieldValue('amount', 0);
	}
	this.setState({
     		 max: !this.state.max
		});
		
		
	
		
}

  handleAmountChange(amount) {
   const exchangeRates = this.crypto.exchangeRates;
	if(exchangeRates && exchangeRates[this.formik.current.values.fiat]){
		const fiatAmount = amount*exchangeRates[this.formik.current.values.fiat];
		this.formik.current.setFieldValue('fiatAmount', fiatAmount);
	}
	
	if(this.state.max){
		this.setState({
     		 max: false
		});
		

	}
}

handleFiatAmountChange(fiatAmount) {
   const exchangeRates = this.crypto.exchangeRates;
	if(exchangeRates && exchangeRates[this.formik.current.values.fiat]){
		const amount = fiatAmount/exchangeRates[this.formik.current.values.fiat];
		this.formik.current.setFieldValue('amount', amount);
	}
	
	if(this.state.max){
		this.setState({
     		 max: false
		});
		

	}
}

handleGasPrice(id = 'average') {

	
  	 let gasPrice = this.crypto.gasPrice;
	
 	 const gasLimit = this.state.asset.address?constants.DEFAULT_GAS_LIMIT_TOKEN:constants.DEFAULT_GAS_LIMIT;
	 this.formik.current.setFieldValue('gasLimit', gasLimit);
	 if(gasPrice){
			
		this.formik.current.setFieldValue('gasPrice', gasPrice[id]);
		if(this.state.max){
			let amount = this.formik.current.values.balance- (gasPrice[id]*constants.GWEI*gasLimit);
			this.formik.current.setFieldValue('amount', amount>0?amount/constants.ETHER:0);
		}	

	 }else {
		
    const {web3} = this.crypto;
		web3.eth.getGasPrice(function (error, result){
			if(result){
	
				gasPrice = parseInt(web3.utils.fromWei(result, "gwei"));
				  if(this.formik.current)this.formik.current.setFieldValue("gasPrice", gasPrice);
				  else this.initialValues.gasPrice = gasPrice;
				
				if(this.state.max){
					let amount = this.formik.current.values.balance - (gasPrice*constants.GWEI*gasLimit);
					  if(this.formik.current)this.formik.current.setFieldValue('amount', amount>0?amount/constants.ETHER:0);
					  else   this.initialValues.amount = amount;
				}	
		
			}
		}.bind(this));
	 }
	

	 	
  }

calculateMax(){
	
}

handleGasLimitChange(limit) {
	if(this.state.max){
		let amount = this.formik.current.values.balance - (this.formik.current.values.gasPrice*constants.GWEI*limit);
		this.formik.current.setFieldValue('amount', amount>0?amount/constants.ETHER:0);	
		

	}
}

handleGasPriceChange(gasPrice) {
	if(this.state.max){
		let amount = this.formik.current.values.balance - (gasPrice*constants.GWEI*this.formik.current.values.gasLimit);
		this.formik.current.setFieldValue('amount', amount>0?amount/constants.ETHER:0);	
		

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
    this.findFirstError('addForm', (fieldName) => {
      return Boolean(errors[fieldName])
    })
  }

  
  validateAddress(value){
    if(!value)return true;
    
    return utils.isAddress(value);
							
  }
  validateAmount(value){
	if(value===0)return true;
		const formik = this.formik.current;
    let limit;
    let decimals = constants.ETHER;
    if(this.state.asset.address){
         decimals = "1" + "0".repeat(this.state.asset.decimals);  
         limit=this.state.asset.balance;
    }else {
		    const gas = (formik.values.gasPrice*constants.GWEI*formik.values.gasLimit);
			 limit = this.state.asset.balance - gas;
    }

				return (value*decimals) <= limit;
  }
  validationSchema = function (values) {

    return Yup.object().shape({
        to: Yup.string()
          .required(this.props.translate("yup-required", {name: this.props.translate("to")}))
        .test({
          name: 'to',
          exclusive: true,
          message: this.props.translate("yup-format", {name: this.props.translate("to")}),
          test: this.validateAddress

        }),
         amount: Yup.number().typeError(this.props.translate("yup-moreThen", {name: this.props.translate("amount"), value: 0 })).moreThan(0, this.props.translate("yup-moreThen", {name: this.props.translate("amount"), value: 0 }))
			.test({
      		name: 'lessThan',
      		exclusive: false,
      		params: { },
      		message: this.props.translate("yup-insufficient-funds"),
      		test: this.validateAmount
        }),
        gasPrice: Yup.number().typeError(this.props.translate("yup-moreThen", {name: this.props.translate("gasPrice"), value: 0 })).moreThan(0, this.props.translate("yup-moreThen", {name: this.props.translate("gasPrice"), value: 0 })),
        gasLimit: Yup.number().typeError(this.props.translate("yup-minNumber", {name: this.props.translate("gasLimit"), value: 20999 })).min(21000, this.props.translate("yup-minNumber", {name: this.props.translate("gasLimit"), value: 21000 }))
        
    
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
		fromList: true,
        to: true,
		amount: false
       
      }
    )
    this.validateForm(errors)
  }

  onSubmit(values, actions){
  
	try {
	const {web3} = this.crypto;
	this.setState({submit: true, error:undefined});
	
	const gasPrice = web3.utils.toWei(values.gasPrice+'','gwei');
	const gasLimit = values.gasLimit;
	const from = window.mydappwallet.wallet.web3;											
	
	if(this.state.asset.address) {

    		const amount = Math.pow(10,this.state.asset.decimals)*values.amount+"";
		const erc20 =  new web3.eth.Contract(abi, this.state.asset.address);		
		erc20.methods.transfer(values.to,  amount).send({from:from, gasPrice: gasPrice , gas: gasLimit}, this.onSubmited);	
	}else {
		const amount = constants.ETHER*values.amount+"";
    	let transaction = {from:from, to: values.to, value: amount,gasPrice: gasPrice , gas: gasLimit };
	//let transaction = {from:values.from, to: values.to, value: '10000000000',gasPrice: 1000000000 , gas: 30000 };
		web3.eth.sendTransaction(transaction, this.onSubmited);

    
	}
    }catch(e){
      this.setState({submit: false});
       this.props.error({code:500});
	}
	return true;
	
	
  
}

onSubmited(error, result){
	      this.setState({submit: false});
	if(error){
	    this.props.error(error);
	}else {
		this.props.confirm(result.uid)
	}
}


	
	

    render() {
	   
   if(this.state.redirect)return <Redirect to={this.state.redirect}/>	
      const assets = this.crypto.assets?this.crypto.assets:{};

      const {exchangeRates, gasPrice} = this.crypto;
         const gasLimit = 21000;
  const { to, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
   
	

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        
	 
      

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
    {JSON.stringify(errors)};
				<Row>
			 <Col xl="10" lg="8" md ="12" sm="12">
			  <FormGroup>
                <label htmlFor="asset"><Translate id="from"/>	&nbsp;</label>
     			<InputGroup className="mb-3">
				<Dropdown open={this.state.assetDropDown} toggle={this.toggleAssetDropDown.bind(this)} group>
						
        <DropdownToggle tag={NavLink} style={{"padding": 0}}>
	<div className="asset">
				<div className="icon"> {this.state.asset.address?IconFactory.generateMediumIdenticon(this.state.asset.address):<img className="identicon__eth-logo" src={require("../../../images/eth_logo.svg")}  alt=""/>}</div>
				<div className="data">
				<div className="symbol">{this.state.asset.symbol}</div>
				<div className="value"><Translate id="balance"/> {(this.state.asset.balance/constants.ETHER).toFixed(10).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')} ETH</div>
			</div>
			<div className="caret"><i className="material-icons">keyboard_arrow_down</i></div>
			</div>
		</DropdownToggle>
		
        <DropdownMenu>
		<DropdownItem onClick={() => {this.handleAssetSelect(this.crypto)}}>	<div className="asset">
			   <div className="icon"> <img className="identicon__eth-logo" src={require("../../../images/eth_logo.svg")}  alt=""/></div>
				<div className="data">
			   	<div className="symbol">{this.crypto.symbol}</div>
			   	
				</div>
			</div>
</DropdownItem>
		{Array.from({length: assets.length}, (_, index) => index).map((item) => {
			   return <DropdownItem  onClick={() => {this.handleAssetSelect(assets[item])}}>	<div className="asset">
			   <div className="icon"> {IconFactory.generateMediumIdenticon(assets[item].address)}</div>
				<div className="data">
			   	<div className="symbol">{assets[item].symbol}</div>
			   	<div className="address">{assets[item].address.substring(0,6)}...{assets[item].address.substring(assets[item].address.length-4)}</div>
				</div>
			</div>
</DropdownItem>
		})}
        </DropdownMenu>
      </Dropdown>
	
				</InputGroup>
              </FormGroup>

	  		</Col>
        </Row> 	
        <Row>
			  
				 <Col style={{maxWidth: 450}}>
			  <FormGroup>
         <label htmlFor="to"><Translate id="to"/></label>

               
             <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          type: "text",
          name: "to",
          id: "to",
          valid:!errors.to,
          invalid: touched.to && !!errors.to,
          autoFocus:true,
          onChange: this.onChange,
          onBlur:handleBlur,
         disabled:this.state.submit,
          value: to,
          errors:errors,
          qrscanClick: this.qrscanClick.bind(this)
        }}
        renderInputComponent={this.renderInputComponent}
      />  
     

                </FormGroup>

	  		</Col>
			
			
			 </Row>
       <Row>
          	<Col style={{maxWidth: 450}}>
			  <FormGroup>
                <label htmlFor="amount"><Translate id="amount"/>	&nbsp;
<div class="send-v2__amount-max">
 					<Button outline theme="info" className={["send-v2__amount-max__button", "mb-2", "mr-1", this.state.max?"checked":null]} type="button" onClick={ ()=>{this.handleMaxAmount() }}>Maks.</Button>
  				
				</div>
</label>
				

     			<InputGroup className="mb-3">
				<div  className={'amount-input'+ (!errors.amount?" is-valid":(touched.amount && !!errors.amount)?" is-invalid":"")}>
					<div className="amount-input__inputs">
					<div className="amount-input__input-container">
				 <NumberFormat  className='amount-input__input' 
					                     name="amount"
					                     id="amount"
					                    autoFocus={true}
					                     required
 									     
				 						 onChange={ (e)=> { e.target.value = e.target.value.substring(0, e.target.value.length-this.state.asset.symbol.length ); this.handleAmountChange(e.target.value);handleChange(e)}}
					                     onBlur={handleBlur}
					                     value={values.amount}
										 disabled={this.state.submit}
										///style={{ width: this.getValueWidth(values.amount) }} 
										suffix={' ' + this.state.asset.symbol}
										//prefix={' ' + this.state.asset.symbol}
																					
				                     />
				</div>
				<div class="currency-input__conversion-component">
				
				{(!exchangeRates || !exchangeRates[values.fiat]) && this.props.translate('no-conversion-rate') } 
				{exchangeRates && exchangeRates[values.fiat] && 
					 <NumberFormat  className='amount-input__input' 
					                     name="fiatAmount"
					                     id="fiatAmount"
					                    autoFocus={true}
					                     required
 									     
				 						 onChange={ (e)=> { e.target.value = e.target.value.substring(2, e.target.value.length ); this.handleFiatAmountChange(e.target.value);handleChange(e)}}
					                     onBlur={handleBlur}
					                     value={values.fiatAmount}
										 disabled={this.state.submit}
							 			 //suffix={' ' + this.state.asset.symbol}
										prefix={ getSymbolFromCurrency(values.fiat) + ' ' }
																					
				                     />
				} 
				</div>
				</div>
				</div>
				<FormFeedback>{errors.amount}</FormFeedback>
				</InputGroup>
              </FormGroup>

	  		</Col>

       </Row>
       	<Row>
            	<Col >
         <NavLink to="#" onClick={()=>{this.setState({advancedOptions: !this.state.advancedOptions})}}>{!this.state.advancedOptions?"Advanced Options":"Hide advanced Options"} </NavLink>
         </Col>
         </Row>
    <Collapse open={!this.state.advancedOptions}>

        
			<Row>
         
			<Col style={{maxWidth: 300}}>
		 	<FormGroup>
				<div class="gas-price-button-group">
					<button aria-checked="false" className={values.gasPrice===gasPrice.slow?"button-group__button button-group__button--active": "button-group__button"} onClick={()=> { this.handleGasPrice('slow')}}>
						<div>
							<div class="gas-price-button-group__label">Slow</div>
							<div class="gas-price-button-group__primary-currency">{((gasPrice.slow*gasLimit)/constants.GWEI).toFixed(5).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')} {crypto.symbol}</div>
							{exchangeRates && <div class="gas-price-button-group__secondary-currency">{getSymbolFromCurrency('USD')} {(((gasPrice.slow*gasLimit)/constants.GWEI)*exchangeRates['USD']).toFixed(2)} </div> }
						</div>
					</button>
					<button aria-checked="true" className={values.gasPrice===gasPrice.average?"button-group__button button-group__button--active": "button-group__button"} onClick={()=> { this.handleGasPrice('average')}}>
						<div>
							<div class="gas-price-button-group__label">Average</div>
							<div class="gas-price-button-group__primary-currency">{((gasPrice.average*gasLimit)/constants.GWEI).toFixed(5).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')} {crypto.symbol} ETH</div>
							{exchangeRates && <div class="gas-price-button-group__secondary-currency">{getSymbolFromCurrency('USD')} {(((gasPrice.average*gasLimit)/constants.GWEI)*exchangeRates['USD']).toFixed(2)} </div> }
						</div>
					</button>
					<button aria-checked="false" className={values.gasPrice===gasPrice.fast?"button-group__button button-group__button--active": "button-group__button"}  onClick={()=> { this.handleGasPrice('fast')}}>
						<div>
							<div class="gas-price-button-group__label">Fast</div>
							<div class="gas-price-button-group__primary-currency">{((gasPrice.fast*gasLimit)/constants.GWEI).toFixed(5).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')} {crypto.symbol}</div>
							{exchangeRates && <div class="gas-price-button-group__secondary-currency">{getSymbolFromCurrency('USD')} {(((gasPrice.fast*gasLimit)/constants.GWEI)*exchangeRates['USD']).toFixed(2)} </div> }
						</div>
					</button>
				</div>
				</FormGroup>
			</Col>
			</Row>

		    </Collapse>
     <Collapse open={this.state.advancedOptions}>


        
         
    <Row>
    
	 		<Col style={{maxWidth: 450}}>
			  <FormGroup>
                <label htmlFor="gasPrice"><Translate id="gasPrice"/></label>
               				
                           <NumberFormat 
					                     name="gasPrice"
					                     id="gasPrice"
					                    autoFocus={true}
					                     required
	                      onChange={ (e)=> {handleChange(e); this.handleGasPriceChange(e.target.value); }}
					                     onBlur={handleBlur}
					                     value={values.gasPrice}
										 disabled={this.state.submit}
                     className={"form-control".concat(" ").concat((!!errors.gasPrice)?"is-invalid":"is-valid") }
																					
				                     />     
					
        			<FormFeedback>{errors.gasPrice}</FormFeedback>
              </FormGroup>
	  		</Col>
			    </Row>
          <Row>
		<Col style={{maxWidth: 450}}>
			  <FormGroup>
                <label htmlFor="gasLimit"><Translate id="gasLimit"/></label>
                <NumberFormat 
					                     name="gasLimit"
					                     id="gasLimit"
					                    autoFocus={true}
					                     required
				 					 						onChange={ (e)=> {handleChange(e); this.handleGasLimitChange(e.target.value); }}
					                     onBlur={handleBlur}
					                     value={values.gasLimit}
										 disabled={this.state.submit}
                     className={"form-control".concat(" ").concat((!!errors.gasLimit)?"is-invalid":"is-valid") }
																					
				                     />

             
					<FormFeedback>{errors.gasLimit}</FormFeedback>
              </FormGroup>
	  		</Col>
			
			</Row>
    </Collapse>

       <div className="red" >{this.state.error?<Translate id={'error-'+this.state.error.code}/>:(null)}</div>
		 
				 <Button
                className="btn btn-primary"
                type="submit"
				disabled={this.state.submit}
              >
                 <Translate id="send"/>
              </Button>

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
    error: (err) => dispatch(app.error(err)),
    errorClose: () => dispatch(app.errorClose()),
   
   

   
  
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Web3Send));

