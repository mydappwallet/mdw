/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */


import ActionTypes from "constants/ActionTypes";






export function signIn(values, callback) {
  
    const { mydappwallet} = window;
    if (!values.remember) values.remember = false;
    mydappwallet.login(values, callback);
    return {
    type: ActionTypes.APP_SIGN_IN,
   
  }
}

export function signOut(callback) {
       const {mydappwallet} = window;
       mydappwallet.logout(callback);
        return {
             type: ActionTypes.APP_SIGN_OUT,
   
  }
     

}
