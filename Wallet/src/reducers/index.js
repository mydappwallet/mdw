import {combineReducers} from 'redux';
import {appReducer} from  './appReducer'
import {networkReducer} from  './networkReducer'
import {walletReducer} from  './walletReducer'
import {devappReducer} from  './devappReducer'
import {confirmReducer} from  './confirmReducer'
import {  localizeReducer } from "react-localize-redux";
const rootReducer = combineReducers({
	localize: localizeReducer,
	appStore: appReducer,
	networkStore: networkReducer,
	walletStore: walletReducer,
	devappStore: devappReducer,
	confirmStore: confirmReducer
   
});

export default rootReducer;
