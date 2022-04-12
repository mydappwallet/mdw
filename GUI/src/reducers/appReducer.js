import ActionTypes from "constants/ActionTypes";

const initialState = { error: undefined, info: undefined };

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.APP_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };

    case ActionTypes.APP_ERROR_CLOSE:
      return {
        ...state,
        error: undefined,
      };

    case ActionTypes.APP_INFO:
      return {
        ...state,
        info: action.payload.info,
      };

    case ActionTypes.APP_INFO_CLOSE:
      return {
        ...state,
        info: undefined,
      };

    default:
      return state;
  }
}
