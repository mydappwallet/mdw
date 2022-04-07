import * as constants from '../constants';

const initialState = {
	loading: true,
	error: undefined,
	info: undefined,
	navItems: undefined,
	cryptoItems: undefined,
	settings: {},
	exchangeRates: {},
	transactions: {},
	qrcode: undefined,
	addressBook: {},
 	assets: {},




};

export function appReducer(state = initialState, action) {
	switch (action.type) {


		case constants.APP_LOADING_START:

			return {
				...state,
				loading: true,
			};

		case constants.APP_LOADING_STOP:

			return {
				...state,
				loading: false,
			};

		case constants.APP_INIT_SUCCESS:
			return {
				...state,
				loading: false,
				navItems: action.payload.navItems,
				cryptoItems: action.payload.cryptoItems,
				settings: action.payload.settings,
				exchangeRates: action.payload.exchangeRates,
			};

		case constants.APP_ERROR:
			return {
				...state,
				error: action.payload.error
			};



		case constants.APP_ERROR_CLOSE:

			return {
				...state,
				error: undefined
			};

		case constants.APP_INFO:

			return {
				...state,
				info: action.payload.info
			};



		case constants.APP_INFO_CLOSE:

			return {
				...state,
				info: undefined
			};
			
			case constants.APP_SETTING_SET:

			return {
				...state, settings:{ ...state.settings, [action.payload.name]: [action.payload.value]}
			};




		case constants.APP_BALANCE_SUCCESS:
			return {
				...state,
				cryptoItems: {
					...state.cryptoItems,
					[action.payload.name]: {
						...state.cryptoItems[action.payload.name],
						balance: action.payload.balance,
						balanceFormatted: action.payload.balanceFormatted,
						balanceInFiat: action.payload.balanceInFiat,
					}
				}
			}

		case constants.APP_EXCHANGE_RATES_SUCCESS:
			return {
				...state,
				exchangeRates: action.payload.exchangeRates
			}

		case constants.APP_GAS_PRICE_SUCCESS:
			return {
				...state,
				cryptoItems: {
					...state.cryptoItems,
					[action.payload.name]: {
						...state.cryptoItems[action.payload.name],
						gasPrice: action.payload.gasPrice
					}
				}
			}

		case constants.APP_ASSETS_SUCCESS:
			return {
				...state,
				cryptoItems: {
					...state.cryptoItems,
					[action.payload.network]: {
						...state.cryptoItems[action.payload.network],
						assets: action.payload.assets
					}
				}
			}
			
		case constants.APP_ASSET_ADD:
		return {
				...state,
				cryptoItems: {
					...state.cryptoItems,
					[action.payload.network]: {
						...state.cryptoItems[action.payload.network],
						assets: state.cryptoItems[action.payload.network].assets.concat(action.payload.asset)
					}
				}
			}
		 case constants.APP_ASSET_DELETE:
		return {
				...state,
				cryptoItems: {
					...state.cryptoItems,
					[action.payload.network]: {
						...state.cryptoItems[action.payload.network],
						assets: state.cryptoItems[action.payload.network].assets.filter((item) => item.address !== action.payload.address)
					}
				}
			}
		
		
		    
		
		     		

		case constants.APP_ADDRESSBOOK_SUCCESS:
			return {
				...state,
				addressBook: {
					...state.addressBook,
					[action.payload.type]: action.payload.addressBook
				}
			}
		case constants.APP_ADDRESSBOOK_ADD:
		return {
				...state,
				addressBook: {
					...state.addressBook,
					[action.payload.type]: 
							state.addressBook[action.payload.type].concat([{name: action.payload.name, address: action.payload.address}])
						
						
					
				}
			}
			
		case constants.APP_ADDRESSBOOK_EDIT:
		return {
				...state,
				
			}	
		 case constants.APP_ADDRESSBOOK_DELETE:
		
		      return {
		        ...state, addressBook: {
					...state.addressBook, [action.payload.type]: state.addressBook[action.payload.type].filter((item) => item.address !== action.payload.address)
					
				}
		
		     };			

	case constants.APP_TRANSACTION_SUCCESS:
			return {
				...state,
				transactions: {
					...state.transactions,
					[action.payload.transaction.uid]: action.payload.transaction
					
					
				}
			}

	case constants.APP_QRCODE:

			return {
				...state,
				qrcode: action.payload.qrcode
			};


		default:
			return state;
	}
}


