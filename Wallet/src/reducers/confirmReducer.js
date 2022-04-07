import * as constants from '../constants';


const initialState = {
 loading: {},
 confirming: {},
 transaction: {},
 error: {}

};

export function confirmReducer(state = initialState, action) {
  switch (action.type) {
   
 
    case constants.CONFIRM_LOAD_START:

	  var {loading, transaction, error} = state;
	  loading[action.payload.uid] = true;
	  transaction[action.payload.uid] = undefined;
	  error[action.payload.uid] = undefined;
      return {
        ...state,
        loading,
		transaction,
		error,
      };

    case constants.CONFIRM_LOAD_SUCCESS:

	  var {loading, transaction} = state;
	  loading[action.payload.uid] = false;
	  transaction[action.payload.uid] = action.payload.transaction;
	
      return {
        ...state,
        loading,
		transaction
      };

   case constants.CONFIRM_LOAD_ERROR:
	  var {loading, error} = state;
 	  loading[action.payload.uid] = false;
	  error[action.payload.uid] = action.payload.error;
      return {
        ...state,
           loading,
		  error
      };

 case constants.CONFIRM_START:

	  var {confirming, error} = state;
	  confirming[action.payload.uid] = true;
	  error[action.payload.uid] = undefined;
      return {
        ...state,
        confirming,
		error,
      };

 case constants.CONFIRM_SUCCESS:

	  var {confirming, transaction} = state;
	  confirming[action.payload.uid] = false;
	  transaction[action.payload.uid] = action.payload.transaction;
	
      return {
        ...state,
        confirming,
		transaction
      };

 case constants.CONFIRM_ERROR:
      var {confirming, error} = state;
 	  confirming[action.payload.uid] = false;
	  error[action.payload.uid] = action.payload.error;
      return {
        ...state,
           confirming,
		  error
      };

 

 

    default:
      return state;
  }
}


