import React from "react";
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';
import NumberFormat from 'react-number-format';
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup,
  FormInput,
  FormCheckbox, 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback,
NavLink
} from "shards-react";
import Jazzicon from 'react-jazzicon'
import {Loader} from "../components/loader";
import { Formik } from 'formik';
import * as Yup from 'yup';


import PageTitle from "../components/common/PageTitle";

import ErrorDialog from "../components/common/ErrorDialog";
import * as constants from '../constants';

import IconFactory from '../utils/IconFactory';
 const abi = require('erc-20-abi');
class Send extends React.Component {
  constructor(props) {
    super(props);
	 
    this.state = {
      pageSizeOptions: [5, 10, 15, 20, 25, 30],
      pageSize: 10,
      toDropDown: false,
 	  assetDropDown: false,
	  submit: false,
	  error: undefined,
	  asset: window.web3._provider.network,
	  redirect: undefined,
	  from: props.walletStore.wallet.address,
	  chainId:window.web3._provider.network.chainId,
	  max: false,
	  balance: 0
	  
    };
	

 this.toggleToDropDown = this.toggleToDropDown.bind(this);

  
	this.initialValues = {name: '', gasPrice: 0, gasLimit: 30000, amount: '0.00000000', balance: 0,fiat:'USD', fiatAmount: '0.00' , fromName: this.props.walletStore.wallet.name, from: this.props.walletStore.wallet.address };
    this.formik = React.createRef();
	this.validationSchema =  this.validationSchema.bind(this);
	this.onSubmit = this.onSubmit.bind(this);	
	
	this.props.addTranslation(require("../translations/send.json"));
	this.props.addTranslation(require("../translations/yup.json"));
    this.searcher = null;


   this.validateAmount = this.validateAmount.bind(this);
 	this.handleFromSelect= this.handleFromSelect.bind(this);
 	this.handleToSelect= this.handleToSelect.bind(this);
	this.handleContactSelect = this.handleContactSelect.bind(this);
 	this.handleErrorClose= this.handleErrorClose.bind(this);
	this.handleAssetSelect = this.handleAssetSelect.bind(this);
	this.handleGasPrice = this.handleGasPrice.bind(this);
  }

  componentDidMount(){
	const {web3} = window;
	if(!web3.user)return;
	if(this.props.bookStore.list.length===0){
		this.props.bookInit();
	}
	if(this.props.assetStore.list.length===0){
		this.props.assetInit(function(error, result){
			this.handleAssetSelect(web3._provider.network);
		}.bind(this));

	}else  { 
		this.handleAssetSelect(web3._provider.network);
	}
  }

  componentWillUnmount(){
		  
	const {web3} = window;
	web3.readInfo();
  }

  componentDidUpdate(){

	if(this.state.from!==this.props.walletStore.wallet.address){
		const newState = { ...this.state };
	    newState["from"] = this.props.walletStore.wallet.address;
   		this.setState(newState);
		this.handleAssetSelect(this.state.asset);
	} 
	if(this.state.chainId!==window.web3._provider.network.chainId){
		const newState = { ...this.state };
	    newState["chainId"] = window.web3._provider.network.chainId;
   		this.setState(newState);
		this.handleAssetSelect(this.state.asset);
		this.handleAmountChange(this.formik.current.values.amount);
		 
		
	}
	/*
	if(this.props.walletStore.balance!==this.formik.current.values.balance){
		this.handleAssetSelect(this.state.asset);
	}
	*/
	
	
}

jsNumberForAddress(address) {
  const addr = address.slice(2, 10)
  const seed = parseInt(addr, 16)
  return seed
}

 toggleToDropDown() {
    const newState = { ...this.state };
    newState["toDropDown"] = !this.state["toDropDown"];
    this.setState(newState);
  }

toggleAssetDropDown() {
    const newState = { ...this.state };
    newState["assetDropDown"] = !this.state["assetDropDown"];
    this.setState(newState);
  }
 

  /**
   * Returns the appropriate status class for the `Status` column.
   */


  /**
   * Handles the global search.
   */
  handleFromSelect(value) {
	this.formik.current.setFieldValue("from", value);
	this.handleAssetSelect(this.state.asset, value);

  }

handleToSelect(value) {

   this.formik.current.setFieldValue("to", value);

}

handleContactSelect(contact) {

   this.formik.current.setFieldValue("to", contact.address);
   this.formik.current.setFieldValue("toList", contact.name);
}

 handleAssetSelect(asset){
	
	

	this.state.asset = asset;	
 	this.forceUpdate();
	const from = this.props.walletStore.wallet.address;

	
	const {web3} = window;
		
	
	
	try {
	
		this.handleGasPrice();
		if(asset.chainId){
		
			this.formik.current.setFieldValue("balance", this.props.walletStore.balance);
			this.forceUpdate();
			this.formik.current.validateForm();
		

				
			
		}else {
				const erc20 =  new web3.eth.Contract(abi, asset.address);
				erc20.methods.balanceOf(from).call(  function (error, result){
					if(result){
						this.setState({balance: result});
						
		
				}else {
							this.setState({balance: 0});
				}
	
					this.formik.current.validateForm();
				}.bind(this));
		}
	}catch(e){
		alert(JSON.stringify(e));
		this.setState({balance: 0});
		this.formik.current.validateForm();			
	}
	
	
				
		

	return true;
	
	
  }

handleGasPrice(id = 'average') {

	
	  const network = window.web3._provider.network;
	
  	 let gasPrice = this.props.networkStore.gasPrice[network.chainId];
	
 	 const gasLimit = this.state.asset.chainId?constants.DEFAULT_GAS_LIMIT:constants.DEFAULT_GAS_LIMIT_TOKEN;
	 this.formik.current.setFieldValue('gasLimit', gasLimit);
	 if(gasPrice){
			
		this.formik.current.setFieldValue('gasPrice', gasPrice[id]);
		if(this.state.max){
			let amount = this.formik.current.values.balance- (gasPrice[id]*constants.GWEI*gasLimit);
			this.formik.current.setFieldValue('amount', amount>0?amount/constants.ETHER:0);
		}	

	 }else {
		
		const {web3} = window;
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
handleMaxAmount() {
	if(!this.state.max){
			let amount = this.formik.current.values.balance - (this.formik.current.values.gasPrice*constants.GWEI*this.formik.current.values.gasLimit);
			amount = amount>0?amount/constants.ETHER:0;
		this.formik.current.setFieldValue('amount', amount);	
		this.handleAmountChange(amount);
	}else {
		this.formik.current.setFieldValue('amount', 0);
	}
	this.setState({
     		 max: !this.state.max
		});
		
		
	
		
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

handleAmountChange(amount) {
   const exchangeRates = this.props.networkStore.exchangeRates[window.web3._provider.network.chainId];
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
   const exchangeRates = this.props.networkStore.exchangeRates[window.web3._provider.network.chainId];
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

handleFiatChange() {
	
	
	
	if(this.state.max){
		this.setState({
     		 max: false
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
	
	return web3.utils.isAddress(value);
							
  }
  validateAmount(value){
	if(value===0)return true;
		const formik = this.formik.current;
		const balance = this.state.asset.chainId?this.props.walletStore.balance:this.state.balance;
		const gas = (formik.values.gasPrice*constants.GWEI*formik.values.gasLimit);
				const limit = balance - gas;
				return (value*constants.ETHER) <= limit;
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
    		})
		
			// .lessThan(this.state.balance - values.gasPrice*constants.GWEI*values.limit, this.props.translate("yup-insufficient-funds"))
		   
   
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
       
      }
    )
    this.validateForm(errors)
  }

  onSubmit(values, actions){
	try {
	const {web3} = window;
	this.setState({submit: true, error:undefined});
	
	const gasPrice = web3.utils.toWei(values.gasPrice+'','gwei');
	const gasLimit = values.gasLimit;
	const from = this.props.walletStore.wallet.address;											
	
	if(this.state.asset.chainId) {
		const amount = constants.ETHER*values.amount+"";
		let transaction = {from:from, to: values.to, value: amount,gasPrice: gasPrice , gas: gasLimit };
	//let transaction = {from:values.from, to: values.to, value: '10000000000',gasPrice: 1000000000 , gas: 30000 };
		web3.eth.sendTransaction(transaction, this.onSubmited.bind(this));
	}else {
		const amount = Math.pow(10,this.state.asset.decimals)*values.amount+"";
		const erc20 =  new web3.eth.Contract(abi, this.state.asset.address);		
		erc20.methods.transfer(values.to,  amount).send({from:from, gasPrice: gasPrice , gas: gasLimit}, this.onSubmited.bind(this));		
	}
    }catch(e){
		this.setState({submit: false, error:"error-500"});
	}
	return true;
	
	
  
}
onSubmited(error, result){
	if(error){
					this.setState({submit: false, error});
		}else {
			this.formik.current.resetForm();
			this.setState({submit: false, redirect: '/transaction/'+ result.uid});
		}
}



 getValueWidth(value) {
    const valueString = String(value)
    const valueLength = valueString.length || 1
    const decimalPointDeficit = valueString.match(/\./u) ? -1 : 0
    return `${valueLength + decimalPointDeficit + 1}ch`
  } 



 


 

  render() {
	   
   if(this.state.redirect)return <Redirect to={this.state.redirect}/>	
if(this.props.assetStore.initialization || this.props.bookStore.initialization )return <Loader/>

   const wallet = window.web3.eth.accounts.wallet;
   const assets = this.props.assetStore.list;
   const contacts = this.props.bookStore.list;
   const network = window.web3._provider.network;
   const gasPrice = this.props.networkStore.gasPrice[network.chainId];
   const exchangeRates = this.props.networkStore.exchangeRates[network.chainId];
   const gasLimit = 21000;

   const balance = this.state.asset.chainId?this.props.walletStore.balance:this.state.balance;
//	alert(JSON.stringify(gasPrice));
	
	

    return (
      <Container fluid className="main-content-container px-4 pb-4">
	 
	 
      <ErrorDialog isOpen={this.state.error} toggle={this.handleErrorClose} centered={true} title={<Translate id="error"/>} error={this.state.error?this.state.error.code:0}/>
        <Row noGutters className="page-header py-4">
          <PageTitle title={this.props.translate("send-title")} subtitle={this.props.translate("wallet")} className="text-sm-left mb-3" />
        
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
            <h6 className="m-0"><Translate id="send-title"/></h6>
          </CardHeader>
		  <CardBody>
	 
	      
			  <Row>
	 		<Col xl="5" lg="6" md ="7" sm="7">
			  <FormGroup>
                <label htmlFor="fromName"><Translate id="from"/></label>
                <FormInput type="text"
	                     name="fromName"
	                     id="fromName"
	                     
	                     autoFocus={true}
	                     required
 	                     value={this.props.walletStore.wallet.name}
						 disabled={true}
						 style={{"maxWidth": 500}} 
									
                     />
        			<FormFeedback>{errors.fromName}</FormFeedback>
              </FormGroup>
	  		</Col>
	
		<Col xl="5" lg="6" md ="7" sm="7">
			  <FormGroup>
                <label htmlFor="from">&nbsp;</label>
                <FormInput type="text"
	                     name="from"
	                     id="from"
 						 disabled={true}
	                     value={this.props.walletStore.wallet.address}
								style={{"maxWidth": 500}}
					
                     />
              </FormGroup>
	  		</Col>
			
			</Row>
			<Row>
			  <Col xl="2" lg="3" md ="4" sm="5">
			  <FormGroup>
	
                <label htmlFor="toList"><Translate id="to"/></label>
     			<InputGroup className="mb-3">
				 <FormSelect type="text"
	                     name="toList"
	                     id="toList"
	                     
	                     autoFocus={true}
	                     required
	                     onChange={e => {handleChange(e);this.handleToSelect(e.target.value)}}
	                     onBlur={handleBlur}
	                     value={values.toList}
						 disabled={this.state.submit}
						style={{"maxWidth": 500}}
			        >
 					<option value="">Choose</option>
					{Array.from({length: wallet.length}, (_, index) => index).map((item) => {
						return  <option key={wallet[item].address} value={wallet[item].address}>{wallet[item].name}</option>
						}
					)}
				 
					    
					</FormSelect>
					<FormFeedback>{errors.toList}</FormFeedback>
               
  <Dropdown
            open={this.state.toDropDown}
            toggle={() => this.toggleToDropDown()}
            addonType="append"
          >
            <DropdownToggle caret>Contacts</DropdownToggle>
            <DropdownMenu small right>
				{Array.from({length: contacts.length}, (_, index) => index).map((item) => {
						return  <DropdownItem key={contacts[item].address} onClick={() => this.handleContactSelect(contacts[item])}> {contacts[item].name}</DropdownItem>
						}
					)}
            
            </DropdownMenu>
          </Dropdown>
		<FormFeedback>{errors.recipient}</FormFeedback>
       </InputGroup>
        	

              </FormGroup>
	  		</Col>
				 <Col xl="4" lg="8" md ="12" sm="12">
			  <FormGroup>
                <label htmlFor="to">	&nbsp;</label>
     			<InputGroup className="mb-3">
                <FormInput type="text"
	                     name="to"
	                     id="to"
	                     valid={!errors.to}
	                     invalid={touched.to && !!errors.to}
	                     autoFocus={true}
	                     required
 						 onChange={handleChange}
	                     onBlur={handleBlur}
	                     value={values.to}
						 disabled={this.state.submit}
						 style={{"maxWidth": 500}} 
									
                     />
        			<FormFeedback>{errors.to}</FormFeedback>
       		</InputGroup>
              </FormGroup>

	  		</Col>
			
			
			 </Row>
			<Row>
			 <Col xl="2" lg="8" md ="12" sm="12">
			  <FormGroup>
                <label htmlFor="to"><Translate id="asset"/>	&nbsp;</label>
     			<InputGroup className="mb-3">
				<Dropdown open={this.state.assetDropDown} toggle={this.toggleAssetDropDown.bind(this)} group>
						
        <DropdownToggle tag={NavLink} style={{"padding": 0}}>
	<div className="asset">
				<div className="icon"> {this.state.asset.address?IconFactory.generateMediumIdenticon(this.state.asset.address):<img className="identicon__eth-logo" src={require("../images/eth_logo.svg")}  alt=""/>}</div>
				<div className="data">
				<div className="symbol">{this.state.asset.symbol}</div>
				<div className="value"><Translate id="balance"/> {(balance/constants.ETHER).toFixed(10).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')} ETH</div>
			</div>
			<div className="caret"><i className="material-icons">keyboard_arrow_down</i></div>
			</div>
		</DropdownToggle>
		
        <DropdownMenu>
		<DropdownItem onClick={() => {this.handleAssetSelect(network)}}>	<div className="asset">
			   <div className="icon"> <img className="identicon__eth-logo" src={require("../images/eth_logo.svg")}  alt=""/></div>
				<div className="data">
			   	<div className="symbol">{network.symbol}</div>
			   	
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
	<Col xl="4" lg="8" md ="12" sm="12">
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
			<Col>
            <h5><Translate id="transaction-fee"/></h5>
			</Col>
</Row>
		{gasPrice && 
			<Row>
			<Col xl="2" lg="3" md ="4" sm="5">
		 	<FormGroup>
				<div class="gas-price-button-group">
					<button aria-checked="false" className={values.gasPrice===gasPrice.slow?"button-group__button button-group__button--active": "button-group__button"} onClick={()=> { this.handleGasPrice('slow')}}>
						<div>
							<div class="gas-price-button-group__label">Slow</div>
							<div class="gas-price-button-group__primary-currency">{((gasPrice.slow*gasLimit)/constants.GWEI).toFixed(5).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')} {network.symbol}</div>
							{exchangeRates && <div class="gas-price-button-group__secondary-currency">{getSymbolFromCurrency('USD')} {(((gasPrice.slow*gasLimit)/constants.GWEI)*exchangeRates['USD']).toFixed(2)} </div> }
						</div>
					</button>
					<button aria-checked="true" className={values.gasPrice===gasPrice.average?"button-group__button button-group__button--active": "button-group__button"} onClick={()=> { this.handleGasPrice('average')}}>
						<div>
							<div class="gas-price-button-group__label">Average</div>
							<div class="gas-price-button-group__primary-currency">{((gasPrice.average*gasLimit)/constants.GWEI).toFixed(5).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')} {network.symbol} ETH</div>
							{exchangeRates && <div class="gas-price-button-group__secondary-currency">{getSymbolFromCurrency('USD')} {(((gasPrice.average*gasLimit)/constants.GWEI)*exchangeRates['USD']).toFixed(2)} </div> }
						</div>
					</button>
					<button aria-checked="false" className={values.gasPrice===gasPrice.fast?"button-group__button button-group__button--active": "button-group__button"}  onClick={()=> { this.handleGasPrice('fast')}}>
						<div>
							<div class="gas-price-button-group__label">Fast</div>
							<div class="gas-price-button-group__primary-currency">{((gasPrice.fast*gasLimit)/constants.GWEI).toFixed(5).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')} {network.symbol}</div>
							{exchangeRates && <div class="gas-price-button-group__secondary-currency">{getSymbolFromCurrency('USD')} {(((gasPrice.fast*gasLimit)/constants.GWEI)*exchangeRates['USD']).toFixed(2)} </div> }
						</div>
					</button>
				</div>
				</FormGroup>
			</Col>
			</Row>
		}
			  <Row>
	 		<Col xl="2" lg="3" md ="4" sm="5">
			  <FormGroup>
                <label htmlFor="gasPrice"><Translate id="gasPrice"/></label>
               <FormInput type="number"
	                     name="gasPrice"
	                     id="gasPrice"
 						 disabled={this.state.submit}
						 valid={!errors.gasPrice}
	                     invalid={touched.gasPrice && !!errors.gasPrice}
	                     autoFocus={true}
	                     required
 						 			onChange={ (e)=> {handleChange(e); this.handleGasPriceChange(e.target.value); }}
	                     onBlur={handleBlur}
	                     value={values.gasPrice}
								style={{"maxWidth": 500}}
					
                     />
					
        			<FormFeedback>{errors.gasPrice}</FormFeedback>
              </FormGroup>
	  		</Col>
			
		<Col xl="5" lg="6" md ="7" sm="7">
			  <FormGroup>
                <label htmlFor="gasLimit"><Translate id="gasLimit"/></label>
                <FormInput type="number"
	                     name="gasLimit"
	                     id="gasLimit"
 						 disabled={this.state.submit}
						 valid={!errors.gasLimit}
	                     invalid={touched.gasLimit && !!errors.gasLimit}
	                     autoFocus={true}
	                     required
 						onChange={ (e)=> {handleChange(e); this.handleGasLimitChange(e.target.value); }}
 					    onBlur={handleBlur}
	                     value={values.gasLimit}
								style={{"maxWidth": 500}}
					
                     />
					<FormFeedback>{errors.gasLimit}</FormFeedback>
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
                 <Translate id="send"/>
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

   
  
  };
};
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Send));

