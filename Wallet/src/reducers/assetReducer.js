import * as constants from '../constants';


const initialState = {
 initialization: false,
 error: undefined,
 list: [],


  

};

export function assetReducer(state = initialState, action) {
  switch (action.type) {
   
 
 case constants.ASSET_INIT_START:

      return {
        ...state,
        initialization: true,
		error: undefined
      };

    case constants.ASSET_INIT_SUCCESS:

      return {
        ...state,
       initialization: false,
	   list: action.payload.list
     };

  case constants.ASSET_INIT_FAILED:

      return {
        ...state,
       initialization: false,
	   error: action.payload.error
     };

 case constants.ASSET_ADD:
      let {list} = state;
	  list.push(action.payload.asset);
      return {
        ...state, list

     };

case constants.ASSET_DELETE:
     list = state.list;
	  list = list.filter((item) => item.address !== action.payload.address);
	 
      return {
        ...state, list

     };
  case constants.ASSET_CLEAN:

      return {
        ...state,
        list: []
     };       
 



  
    

 

    default:
      return state;
  }
}


