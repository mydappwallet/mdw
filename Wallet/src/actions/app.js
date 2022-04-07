import * as constants from '../constants';

import getSidebarNavItems from "../data/sidebar-nav-items";
import getCryptoItems from "../data/crypto-items";

import * as wallet from "./wallet";
import history from "../utils/history";
import { validateYupSchema } from 'formik';
var Web3 = require('web3');


var MyDappWalletManager = require('../modules/mydappwallet');
var MyDappWalletWeb3Provider = require('../modules/mydappwallet/web3/provider');


export function loadingStart() {
  return {
    type: constants.APP_LOADING_START,
    
    
  }
}

export function loadingStop() {
  return {
    type: constants.APP_LOADING_STOP,
   
  }
}

export function error(error) {
  return {
    type: constants.APP_ERROR,
     payload: {
      error
    }
    
  }
}

export function errorClose() {
  return {
    type: constants.APP_ERROR_CLOSE
     
    
  }
}

export function info(info) {
  return {
    type: constants.APP_INFO,
     payload: {
      info
    }
    
  }
}



export function infoClose() {
	  return (dispatch, getState) => {
  		const {mydappwallet} = window;
  		mydappwallet.resetInfo();
	}
}

export function setSetting(name, value) {
  return {
    type: constants.APP_SETTING_SET,
     payload: {
      name,
	  value
    }
    
  }
}


export function initSuccess(navItems, cryptoItems, settings, exchangeRates) {
  return {
    type: constants.APP_INIT_SUCCESS,
     payload: {
      navItems,
      cryptoItems,
	  settings,
	  exchangeRates
    }
    
  }
}

export function init() {
  return (dispatch, getState) => {
      dispatch(loadingStart());
      try {
        var navItems =  getSidebarNavItems();
        var cryptoItems =  getCryptoItems();
        
         Object.entries(cryptoItems).map(([key,value],i) => {
              switch(value.type){
                case 'web3':
                  // var HttpProxyAgent = require('http-proxy-agent');
                  var provider =  new MyDappWalletWeb3Provider(value.host, window.mydappwallet);
                  // provider.httpAgent = new HttpProxyAgent("http://localhost:8888");	
                  value.web3 = 	new Web3(provider);
              
                  break;
              }
    		  value.balanceInFiat = {};
 			
          });
  		  window.mydappwallet.exchange_rates({}, function (error, result){
				if(result){
					 dispatch(initSuccess(navItems, cryptoItems, window.mydappwallet.settings, result));
							if(window.mydappwallet.user){
				     
			                Object.entries(cryptoItems).map(([key,value],i) => {
			                       dispatch(balance(key));
			                       dispatch(gasPrice(key));
			                })
			            }
				}
		  });
 		 
		     

	        
  

			

		
      } catch (err) {

		//	history.push("/error/500");
        dispatch(error( err));
     //   dispatch(loadingStop());
   	  }
   };

}


export function balanceSuccess(name, balance, balanceFormatted, balanceInFiat) {
  return {
    type: constants.APP_BALANCE_SUCCESS,
     payload: {
      name,
      balance,
	  balanceFormatted,
	  balanceInFiat
    }
    
  }
}

export function balance(name){
  return (dispatch, getState) => {
    const crypto = getState().appStore.cryptoItems[name];
     switch(crypto.type){
        case 'web3':
          crypto.web3.eth.getBalance(window.mydappwallet.wallet.web3, function(error, result ) {
              if(result){
				
				var balanceInFiat = {};
				const exchangeRates = getState().appStore.exchangeRates[crypto.symbol];
				if(exchangeRates){
					Object.entries(exchangeRates).map(([key,value],i) => {
						balanceInFiat[key] = ((result/constants.ETHER)*value).toFixed(2);
					});
				}
					
                  dispatch(balanceSuccess(name, result, (result/constants.ETHER).toFixed(10).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1'), balanceInFiat) );
              } 
          })
          break;
      }

  }

}

export function exchangeRatesSuccess(exchangeRates) {
  return {
    type: constants.APP_EXCHANGE_RATES_SUCCESS,
     payload: {
      exchangeRates
    }
    
  }
}



export function exchangeRates(callback){
  return (dispatch, getState) => {
     const {mydappwallet} = window;
      mydappwallet.exchange_rates({}, function (error, result){
        if(result){
              dispatch(exchangeRatesSuccess(result));
			  callback(error, result);
        }
   
      });

    }
     

  }





export function gasPriceSuccess(name, gasPrice) {
  return {
    type: constants.APP_GAS_PRICE_SUCCESS,
  	payload: {
      name, gasPrice
    }
    
    
  }
}


export function gasPrice(name){
  return (dispatch, getState) => {
    const crypto = getState().appStore.cryptoItems[name];
     switch(name){
        case 'mainnet':
          fetch('https://ethgasstation.info/api/ethgasAPI.json')
                .then(response => response.json())
                .then(data => {
                  let gasPrice = {
                    fast: data.fast/10,
                    average: data.average/10,
                    slow: data.safeLow/10
                  };
                  dispatch(gasPriceSuccess(name, gasPrice) );
                    
                }).catch((error) => {
					  alert('Error:', error);
					});
            			
          break;
        case 'ropsten':
           dispatch(gasPriceSuccess(name,   {"fast":101,"average":76,"slow":71}) );
        
      }

  }

}




export function assetsSuccess(network, assets) {
  return {
    type: constants.APP_ASSETS_SUCCESS,
     payload: {
      network,
      assets
    }
    
  }
}

export function assets(network, callback) {
    return (dispatch) => {

      const {mydappwallet} = window;
      mydappwallet.token_list({network}, function (error, result){
        if(result){
              dispatch(assetsSuccess(network, result));
        }
        callback(error, result);
      });

    }

}

export function assetAddSuccess(network, asset) {
  return {
    type: constants.APP_ASSET_ADD,
     payload: {
	  network,
      asset,
     
    }
    
  }
}

export function assetAdd(values, callback ) {
	 return (dispatch) => {
		 const {mydappwallet} = window;
   		 mydappwallet.token_add(values, function (error, result){
			if(result){
				 dispatch(assetAddSuccess(values.network, result));
			}
			callback(error, result);
		 });
		
	 }


 

}


export function assetDeleteSuccess(network,  address) {
  return {
    type: constants.APP_ASSET_DELETE,
     payload: {
	  network,
      address
    }
    
  }
}


export function assetDelete(values, callback ) {
	 return (dispatch, getState) => {

		 const {mydappwallet} = window;
   		 mydappwallet.token_delete(values, function (error, result){
			if(result){
					 dispatch(assetDeleteSuccess(values.network, values.address));
			}
			callback(error, result);
		 });
		
	 }


 

}



export function addressBookSuccess(type, addressBook) {
  return {
    type: constants.APP_ADDRESSBOOK_SUCCESS,
     payload: {
      type,
      addressBook
    }
    
  }
}

export function addressBook(type, callback) {
    return (dispatch) => {

      const {mydappwallet} = window;
      mydappwallet.book_list({type: type}, function (error, result){
        if(result){
              dispatch(addressBookSuccess(type, result));
        }
        callback(error, result);
      });

    }

}

export function addressBookAddSuccess(type, name, address) {
  return {
    type: constants.APP_ADDRESSBOOK_ADD,
     payload: {
	  type,
      name,
      address
    }
    
  }
}


export function addressBookAdd(values, callback ) {
	 return (dispatch) => {
		 const {mydappwallet} = window;
   		 mydappwallet.book_add(values, function (error, result){
			if(result){
				 dispatch(addressBookAddSuccess(values.type, values.name, values.address));
			}
			callback(error, result);
		 });
		
	 }


 

}

export function addressBookEditSuccess(type, name, address) {
  return {
    type: constants.APP_ADDRESSBOOK_EDIT,
     payload: {
	  type,
      name,
      address
    }
    
  }
}

export function addressBookEdit(values, callback ) {
	 return (dispatch) => {
		 const {mydappwallet} = window;
   		 mydappwallet.book_edit(values, function (error, result){
			if(result){
				 dispatch(addressBookEditSuccess(values.type, values.name, values.address));
			}
			callback(error, result);
		 });
		
	 }


 

}


export function addressBookDeleteSuccess(type,  address) {
  return {
    type: constants.APP_ADDRESSBOOK_DELETE,
     payload: {
	  type,
      address
    }
    
  }
}


export function addressBookDelete(values, callback ) {
	 return (dispatch, getState) => {

		 const {mydappwallet} = window;
   		 mydappwallet.book_delete(values, function (error, result){
			if(result){
					 dispatch(addressBookDeleteSuccess(values.type, values.address));
			}
			callback(error, result);
		 });
		
	 }


 

}







export function login(values, callback ) {
  return (dispatch, getState) => {
  const {mydappwallet} = window;
    if(!values.remember)values.remember = false;
	  mydappwallet.login(values, function (error, result){
		  	if(result) {
				dispatch(init());
             }
				callback(error, result);
			  
			
	  });
  }

}

export function logout(callback) {
  const {mydappwallet} = window;
  mydappwallet.logout(callback);

}

export function profile(callback ) {

  const {mydappwallet} = window;
   mydappwallet.profile({}, callback);

}

export function profile_edit(values, callback ) {

  const {mydappwallet} = window;
   mydappwallet.profile_edit(values, callback);

}

export function register(values, callback ) {

  const {mydappwallet} = window;
   mydappwallet.register(values, callback);

}

export function register2(values, callback ) {

  const {mydappwallet} = window;
   mydappwallet.register2(values, callback);

}


export function forgot_password(values, callback ) {

  const {mydappwallet} = window;
   mydappwallet.forgot_password(values, callback);

}

export function reset_password(values, callback ) {

  const {mydappwallet} = window;
   mydappwallet.reset_password(values, callback);

}

export function change_password(values, callback ) {

  const {mydappwallet} = window;
   mydappwallet.change_password(values, callback);

}

export function change_authenticator(values, callback ) {

  const {mydappwallet} = window;
   mydappwallet.change_authenticator(values, callback);

}

export function refLink(values, callback ) {
  const {mydappwallet} = window;
   mydappwallet.reflink(values, callback);

}







export function transactionSuccess(transaction) {
  return {
    type: constants.APP_TRANSACTION_SUCCESS,
     payload: {
  transaction
    }
    
  }
}

export function transaction(uid, callback) {

    return (dispatch) => {
      const {mydappwallet} = window;
	  var intervalId = undefined;
	   	mydappwallet.transaction({uid},  function(error, result){
			if(result){
			  if(result.status===1){
				const interval = () => {
					mydappwallet.transaction({uid},  function(error, result){
					if(result){
		    
					  if(result.status!==1){
	         			dispatch(transactionSuccess(result));
						
						if(result.status===3)dispatch(error(result.error));
						if(result.status===4)dispatch(info({code:3000, data:result}));
						clearInterval(intervalId);
					  }
						
						
					}
		   		 });
				};
      			intervalId = setInterval(interval, 1000);		
			  }	
              dispatch(transactionSuccess(result));
			
			}
			callback(error, result);
      });
    }
}

export function qrcode(qrcode) {
  return {
    type: constants.APP_QRCODE,
     payload: {
      qrcode
    }
    
  }
}









