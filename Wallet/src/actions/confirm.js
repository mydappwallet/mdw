import * as constants from '../constants';

export function loadStart(uid) {

  return {
    type: constants.CONFIRM_LOAD_START,
      payload: {
	  uid
     
    }
    
  }
}

export function loadSuccess(uid, transaction) {

  return {
    type: constants.CONFIRM_LOAD_SUCCESS,
     payload: {
	  uid,
      transaction
    }
    
  }
}


export function loadError(uid,error) {

  return {
    type: constants.CONFIRM_LOAD_ERROR,
     payload: {
	  uid,
      error
    }
    
  }
}

export function load(uid, callback) {

  return (dispatch, getState) => {
      dispatch(loadStart(uid));
      try {
     	const {web3} = window;
		web3.gateway.transaction(uid,  function(error, result){
			 if(error){
					 dispatch(loadError(uid, error));
			 }
			 else {
				 dispatch(loadSuccess(uid, result));
			}
			if(callback)callback(error, result);
	    })
      } catch (error) {
      	dispatch(loadError(uid, error));
	   if(callback)callback(error);
   	  }
   };
}


export function confirmStart(uid) {

  return {
    type: constants.CONFIRM_START,
      payload: {
	  uid
    }
    
  }
}

export function confirmSuccess(uid, transaction) {

  return {
    type: constants.CONFIRM_SUCCESS,
      payload: {
	  uid,
      transaction
    }
    
  }
}


export function confirmError(uid, error) {

  return {
    type: constants.CONFIRM_ERROR,
     payload: {
	  uid,
      error
    }
    
  }
}


export function confirm(uid, code, callback) {

  return (dispatch, getState) => {
      dispatch(confirmStart(uid));
      try {
     	const {web3} = window;
		web3.gateway.confirm(uid, code,  function(error, result){
			 if(error){
					 dispatch(confirmError(uid,error));
			 }
			 else {
				 dispatch(confirmSuccess(uid, result));
			}
			if(callback)callback(error, result);
	    })
      } catch (error) {
      	dispatch(confirmError(uid, error));
		if(callback)callback(error);
   	  }
   };
}


