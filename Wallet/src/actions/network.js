import * as constants from '../constants';
import * as app from "./app";
import * as wallet from "./wallet";
import * as asset from "./asset";
export function initStart() {
  return {
    type: constants.NETWORK_INIT_START,
    
    
  }
}

export function initSuccess(list) {
  return {
    type: constants.NETWORK_INIT_SUCCESS,
    payload: {
      list
    }
    
  }
}


export function initFailed(error) {
  return {
    type: constants.NETWORK_INIT_FAILED,
  	payload: {
      error
    }
    
    
  }
}

export function init(callback) {
  return (dispatch, getState) => {
      dispatch(initStart());
      try {
     	window.web3.network_list(function (error, result){
		if(error){
			   	dispatch(initFailed( error));
		}else {
			dispatch(initSuccess(result));
			if(result[1]){
				fetch('https://ethgasstation.info/api/ethgasAPI.json')
						.then(response => response.json())
						.then(data => {
							let gasPrice = {
								fast: data.fast/10,
								average: data.average/10,
								slow: data.safeLow/10
							};
							dispatch(gasPriceSuccess(1, gasPrice) );
								
						});
						
			 fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,JPY,EUR')
                .then(response => response.json())
                .then(data => {
					dispatch(exchangeRatesSuccess(1, data) );
			  });			
						
			}
		

		}
		callback(error, result);
	  })
	 
			
		
		
      } catch (error) {
      	dispatch(initFailed( error));
 		callback(error);
   	  }
   };

}

export function gasPriceSuccess(id, gasPrice) {
  return {
    type: constants.NETWORK_GAS_PRICE_INIT_SUCCESS,
  	payload: {
      id, gasPrice
    }
    
    
  }
}

export function exchangeRatesSuccess(id, exchangeRates) {
  return {
    type: constants.NETWORK_EXCHANGE_RATES_INIT_SUCCESS,
  	payload: {
      id, exchangeRates
    }
    
    
  }
}

export function changeNetwork(chainId){
	return (dispatch, getState) => {
		const {web3} = window;
		web3.network_change({chainId: chainId}, function (error, result) {
			if(error){
				dispatch(app.error(error));
			}else {
				dispatch(changeNetworkSuccess());
				dispatch(wallet.reloadBalance());
				dispatch(asset.init());
			}
		});
	}
}

export function changeNetworkSuccess() {
  return {
    type: constants.NETWORK_CHANGE_SUCCESS
  
    
    
  }
}




