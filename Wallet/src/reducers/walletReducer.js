import * as constants from '../constants';


const initialState = {
 wallet: undefined,
 balance: 0,
  

};

export function walletReducer(state = initialState, action) {
  switch (action.type) {
   
 
 case constants.WALLET_CHANGE:

      return {
        ...state,
        wallet: action.payload.wallet
	};
	
 case constants.WALLET_BALANCE_RELOAD_SUCCESS:

      return {
        ...state,
        balance: action.payload.balance
	};	

    



  
    

 

    default:
      return state;
  }
}


