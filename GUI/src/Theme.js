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

import { useState, useEffect } from "react";

// react-router components
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/sui/SuiBox";

// Soft UI Dashboard PRO React example components
import Sidenav from "components/layout/Sidenav";
import Configurator from "components/layout/Configurator";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";

// RTL plugins

import routes from "routes";
import SignInBasic from "layouts/pages/sign-in";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

import * as roleMatcher from "context/roleMatcher";

// Images
import brand from "assets/images/logo-ct.png";

export default function Theme() {
  // eslint-disable-next-line no-console
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const { mydappwallet } = window;
  let userRoles = [];
  const { user } = mydappwallet;
  if (user) {
    // eslint-disable-next-line no-unused-vars
    userRoles = user.roles;
  }
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        if (route.authorize && roleMatcher.rolesMatched(route.authorize, userRoles) === false) {
          return <Route exact path={route.route} component={SignInBasic} key={route.key} />;
        }

        return <Route exact path={route.route} component={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <SuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SuiBox>
  );

  return layout === "default" ? (
    <ThemeProvider theme={theme}>
      <SuiBox mx="auto" maxWidth={1170}>
        <CssBaseline />
        <Sidenav
          color={sidenavColor}
          brand={brand}
          brandName="myDAppWallet"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
        <Configurator />
        {configsButton}
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/dashboards/default" />
        </Switch>
      </SuiBox>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        {getRoutes(routes)}
        <Redirect from="*" to="/dashboards/default" />
      </Switch>
    </ThemeProvider>
  );
}
