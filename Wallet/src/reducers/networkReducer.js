import * as constants from '../constants';


const initialState = {
 initialization: false,
 error: undefined,
 gasPrice: {},
 exchangeRates: {},

};

export function networkReducer(state = initialState, action) {
  switch (action.type) {
   
 
 case constants.NETWORK_INIT_START:

      return {
        ...state,
        initialization: true,
		error: undefined
      };

    case constants.NETWORK_INIT_SUCCESS:

      return {
        ...state,
       initialization: false,
	   list: action.payload.list
     };

  case constants.NETWORK_INIT_FAILED:

      return {
        ...state,
       initialization: false,
	   error: action.payload.error
     };
  case constants.NETWORK_CHANGE_SUCCESS:

      return {
        ...state,
     
     };
  case constants.NETWORK_GAS_PRICE_INIT_SUCCESS:
	var gasPrice = state.gasPrice;
	gasPrice[action.payload.id] = action.payload.gasPrice
	 return {
        ...state, gasPrice
     
     };

case constants.NETWORK_EXCHANGE_RATES_INIT_SUCCESS:
	var exchangeRates = state.exchangeRates;
	exchangeRates[action.payload.id] = action.payload.exchangeRates
	 return {
        ...state, exchangeRates
     
     };

 

    default:
      return state;
  }
}


