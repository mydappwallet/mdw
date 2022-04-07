import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, IconSidebar, Empty } from "./layouts";

import Error from "./views/Error";
import Register from "./views/Register";
import Register2 from "./views/Register2";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import QRCode from "./views/QRCode";
import Login from "./views/Login";
import Connect from "./views/Connect";
import Accounts from "./views/Accounts";
import Send from "./views/Send";
import TransactionHistory from "./views/TransactionHistory";
import Crypto from "./views/Crypto";

import {Transaction} from "./views/transaction";
import Confirm from "./views/Confirm";
import Payment from "./views/Payment";
import PaymentSuccess from "./views/PaymentSuccess";
import Apps from "./views/Apps";
import App from "./views/App";
import Contract from "./views/Contract";
// Route Views


import EditUserProfile from "./views/EditUserProfile";


import ChangePassword from "./views/ChangePassword";
import ChangeAuthenticator from "./views/ChangeAuthenticator";
import ChangeAuthenticator2 from "./views/ChangeAuthenticator2";
import Errors from "./views/Errors";


const BlankIconSidebarLayout = ({ children }) => (
  <IconSidebar noNavbar noFooter>
    {children}
  </IconSidebar>
);

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/crypto/ropsten" />
  },
  {
    path: "/error/:code",
    layout: Empty,
    component: Error
  },
 
  {
    path: "/register",
    layout: Empty,
    component: Register
  },
  {
    path: "/register2/:refId",
    layout: Empty,
    component: Register2
  },

{
    path: "/qrcode",
    layout: DefaultLayout,
    component: QRCode,
    authorize: ['authenticated']
  },
  
  {
    path: "/login",
    layout: Empty,
    component: Login
  },
  {
    path: "/forgot-password",
    layout: Empty,
    component: ForgotPassword
  },
  {
    path: "/reset-password/:refId",
    layout: Empty,
    component: ResetPassword
  },

   {
    path: "/connect/:uid/:id",
    layout: Empty,
    component: Connect,
    authorize: ['authenticated']

  },

  
   {
    path: "/crypto/:name",
    layout: DefaultLayout,
    component: Crypto,
    authorize: ['authenticated']

  },

   {
    path: "/accounts",
    layout: DefaultLayout,
    component: Accounts,
	authorize: ['authenticated']
  },
  {
    path: "/send",
    layout: DefaultLayout,
    component: Send,
	  authorize: ['authenticated']
  },
  {
    path: "/transaction/:uid",
    layout: DefaultLayout,
    component: Transaction,
    authorize: ['authenticated']

  },


  {
    path: "/confirm/:uid/:id",
    layout: Empty,
    component: Confirm,
    authorize: ['authenticated']

  },
  {
    path: "/payment/:uid/:id",
    layout: Empty,
    component: Payment,
    authorize: ['authenticated']

  },
  {
    path: "/payment-success/:id",
    layout: Empty,
    component: PaymentSuccess,
    authorize: ['authenticated']

  },
  {
    path: "/transaction-history",
    layout: DefaultLayout,
    component: TransactionHistory,
	authorize: ['authenticated']
  },
  
  {
    path: "/edit-user-profile",
    layout: DefaultLayout,
    component: EditUserProfile,
    authorize: ['authenticated']
  },
  {
    path: "/apps",
    layout: DefaultLayout,
    component: Apps,
	  authorize: ['developer']
  },
  {
    path: "/app/:uid",
    layout: DefaultLayout,
    component: App,
	  authorize: ['developer']
  },

  {
    path: "/contract/:address",
    layout: DefaultLayout,
    component: Contract,
	  authorize: ['developer']
  },

  
  {
    path: "/change-password",
    layout: DefaultLayout,
    component: ChangePassword,
    authorize: ['authenticated']
  },
  {
    path: "/change-authenticator",
    layout: DefaultLayout,
    component: ChangeAuthenticator,
    authorize: ['authenticated']
  },
  {
    path: "/change-authenticator2/:refId",
    layout: DefaultLayout,
    component: ChangeAuthenticator2,
    authorize: ['authenticated']
  },
  {
    path: "/errors",
    layout: BlankIconSidebarLayout,
    component: Errors
  },

];
