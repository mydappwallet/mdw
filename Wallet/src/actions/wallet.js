import * as constants from '../constants';


export function changeWallet(wallet) {
  return {
    type: constants.WALLET_CHANGE,
    payload: {
      wallet
    }
    
  }
}

export function reloadBalanceSuccess(balance) {
  return {
    type: constants.WALLET_BALANCE_RELOAD_SUCCESS,
    payload: {
      balance
    }
    
  }
}

export function reloadBalance() {
  return (dispatch, getState) => {
	const {web3} = window;
			const wallet = getState().walletStore.wallet;
			if(!wallet){
				dispatch(reloadBalanceSuccess(0));
				
			}else {
				web3.eth.getBalance(wallet.address, function(error, result ) {
				if(error){
					dispatch(reloadBalanceSuccess(0));
				}else
					dispatch(reloadBalanceSuccess(result));
				});
			
			}
		}
			
			
			
	
	
  }







