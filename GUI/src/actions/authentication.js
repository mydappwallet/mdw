/* eslint-disable no-param-reassign */
import ActionTypes from "constants/ActionTypes";

export function signIn(values, callback) {
  const { mydappwallet } = window;
  if (!values.remember) values.remember = false;
  mydappwallet.login(values, callback);
  return {
    type: ActionTypes.APP_SIGN_IN,
  };
}

export function signOut(callback) {
  const { mydappwallet } = window;
  mydappwallet.logout(callback);
  return {
    type: ActionTypes.APP_SIGN_OUT,
  };
}

export function signUp(values, callback) {
  const { mydappwallet } = window;
  mydappwallet.register(values, callback);
  return {
    type: ActionTypes.APP_SIGN_UP,
  };
}

export function refLink(values, callback) {
  const { mydappwallet } = window;
  mydappwallet.reflink(values, callback);
  return {
    type: ActionTypes.APP_REFLINK,
  };
}
