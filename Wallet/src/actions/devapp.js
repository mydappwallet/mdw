import * as constants from '../constants';
import * as app from "./app";

export function initStart() {
  return {
    type: constants.DEVAPP_INIT_START,
    
    
  }
}

export function initSuccess(list) {
  return {
    type: constants.DEVAPP_INIT_SUCCESS,
    payload: {
      list
    }
    
  }
}


export function initFailed(error) {
  return {
    type: constants.DEVAPP_INIT_FAILED,
  	payload: {
      error
    }
    
    
  }
}

export function init(callback) {
  return (dispatch, getState) => {
      dispatch(initStart());
      try {
     	window.web3.app_list(function (error, result){
		if(error){
			   	dispatch(initFailed( error));
		}else {
				dispatch(initSuccess(result));
		}
		if(callback)callback(error, result);
	  })
	 
			
		
		
      } catch (error) {
      	dispatch(initFailed( error));
 		callback(error);
   	  }
   };

}


export function addSuccess(app) {
  return {
    type: constants.DEVAPP_ADD,
  	payload: {
      app
    }
    
    
  }
}


export function failed(error) {
  return {
    type: constants.DEVAPP_FAILED,
  	payload: {
      error
    }
    
    
  }
}


export function add(app, callback) {
  return (dispatch, getState) => {
    const {web3} = window;
    web3.app_add(app, function (error, result){
           
      if(result){
        dispatch(addSuccess(result));
      }else {
        dispatch(failed(error));
      }
      if(callback)callback(error, result);
      

    });
   
   };

}


export function delete_(address) {
  return {
    type: constants.DEVAPP_DELETE,
  	payload: {
      address
    }
    
    
  }
}

export function clean() {
  return {
    type: constants.DEVAPP_CLEAN,
  	    
    
  }
}





