import * as constants from '../constants';


const initialState = {
  initialization: false,
  error: undefined,
  list: [],




};

export function devappReducer(state = initialState, action) {
  switch (action.type) {


    case constants.DEVAPP_INIT_START:

      return {
        ...state,
        initialization: true,
        error: undefined
      };

    case constants.DEVAPP_INIT_SUCCESS:

      return {
        ...state,
        initialization: false,
        list: action.payload.list
      };

    case constants.DEVAPP_INIT_FAILED:

      return {
        ...state,
        initialization: false,
        error: action.payload.error
      };

    case constants.DEVAPP_ADD:
      let { list } = state;
      list.push(action.payload.asset);
      return {
        ...state, list

      };

    case constants.DEVAPP_DELETE:
      list = state.list;
      list = list.filter((item) => item.address !== action.payload.address);

      return {
        ...state, list

      };
    case constants.DEVAPP_FAILED:

      return {
        ...state,
        error: action.payload.error
      };

    case constants.DEVAPP_CLEAN:

      return {
        ...state,
        list: []
      };









    default:
      return state;
  }
}


