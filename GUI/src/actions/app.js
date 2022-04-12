import ActionTypes from "constants/ActionTypes";

export function error(_error) {
  return {
    type: ActionTypes.APP_ERROR,
    payload: {
      error: _error,
    },
  };
}

export function errorClose() {
  return {
    type: ActionTypes.APP_ERROR_CLOSE,
  };
}

export function info(_info) {
  return {
    type: ActionTypes.APP_INFO,
    payload: {
      info: _info,
    },
  };
}

export function infoClose() {
  return () => {
    const { mydappwallet } = window;
    mydappwallet.resetInfo();
  };
}
