/**
=========================================================
* Soft UI Dashboard PRO React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard PRO React layouts
import Default from "layouts/default";
import SignIn from "layouts/pages/sign-in";
import SignUp from "layouts/pages/sign-up";
import SignUp2 from "layouts/pages/sign-up2";
import ResetBasic from "layouts/pages/reset-password";
import LockBasic from "layouts/pages/lock";
import VerificationBasic from "layouts/pages/2-step-verification";
import Error from "layouts/pages/error";

// Soft UI Dashboard PRO React icons
import Shop from "components/Icons/Shop";
import Document from "components/Icons/Document";

const routes = [
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <Shop size="12px" />,
    collapse: [
      {
        name: "Default",
        key: "default",
        route: "/dashboards/default",
        component: Default,
        authorize: ["authenticated"],
      },
    ],
  },
  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Authentication",
    key: "authentication",
    icon: <Document size="12px" />,
    collapse: [
      {
        name: "Sign In",
        key: "sign-in",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/authentication/sign-in",
            component: SignIn,
          },
        ],
      },
      {
        name: "Sign Up",
        key: "sign-up",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/authentication/sign-up",
            component: SignUp,
          },
        ],
      },
      {
        name: "Sign Up",
        key: "sign-up2",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/register2/:refId",
            component: SignUp2,
          },
        ],
      },
      {
        name: "Reset Password",
        key: "reset-password",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/authentication/reset-password/basic",
            component: ResetBasic,
          },
        ],
      },
      {
        name: "Lock",
        key: "lock",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/authentication/lock/basic",
            component: LockBasic,
          },
        ],
      },
      {
        name: "2-Step Verification",
        key: "2-step-verification",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/authentication/verification/basic",
            component: VerificationBasic,
          },
        ],
      },
      {
        name: "Error",
        key: "error",
        collapse: [
          {
            name: "Error",
            key: "error",
            route: "/error/:code",
            component: Error,
          },
        ],
      },
    ],
  },
];

export default routes;
