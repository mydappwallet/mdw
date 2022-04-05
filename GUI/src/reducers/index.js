import { combineReducers } from "redux";
import appReducer from "reducers/appReducer";
import { localizeReducer } from "react-localize-redux";

const rootReducer = combineReducers({
  localize: localizeReducer,
  appStore: appReducer,
});

export default rootReducer;
