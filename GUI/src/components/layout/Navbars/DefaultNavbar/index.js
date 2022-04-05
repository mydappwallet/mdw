/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
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
import { Translate, withLocalize } from "react-localize-redux";
import { connect } from "react-redux";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";

// Soft UI Dashboard PRO React components
import SuiBox from "components/sui/SuiBox";
import SuiTypography from "components/sui/SuiTypography";
import Breadcrumbs from "components/layout/Breadcrumbs";
import SuiButton from "components/sui/SuiButton";
// Soft UI Dashboard PRO React example components
import UserMenu from "components/layout/Navbars/DefaultNavbar/Menus/UserMenu";
import DeveloperMenu from "components/layout/Navbars/DefaultNavbar/Menus/DeveloperMenu";
import DefaultNavbarLink from "components/layout/Navbars/DefaultNavbar/DefaultNavbarLink";

// eslint-disable-next-line import/no-unresolved

import * as authentication from "actions/authentication";

// Custom styles for DashboardNavbar

import {
  navbarContainer,
  navbarRow,
  navbarDesktopMenu,
  navbarIconButton,
  navbarMobileMenu,
} from "components/layout/Navbars/DefaultNavbar/styles";

// Soft UI Dashboard PRO React context
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// eslint-disable-next-line react/prop-types
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line react/prop-types
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line react/prop-types
function DefaultNavbar({ routes, absolute, light, isMini, signOut }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, openConfigurator } = controller;

  const [userMenu, setUserMenu] = useState(false);
  const [developerMenu, setDeveloperMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const openUserMenu = ({ currentTarget }) => {
    setUserMenu(currentTarget);
    setDeveloperMenu(false);
  };
  const openDeveloperMenu = ({ currentTarget }) => {
    setDeveloperMenu(currentTarget);
    setUserMenu(false);
  };

  const route = useLocation().pathname.split("/").slice(1);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseUserMenu = () => setUserMenu(false);
  const handleCloseDeveloperMenu = () => setDeveloperMenu(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setUserMenu(false);
    setDeveloperMenu(false);
  };

  const handleSignOut = () => {
    signOut((_error, result) => {
      if (result) window.app.forceUpdate();
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={(theme) => navbarContainer(theme)}>
          <SuiBox
            color="inherit"
            mb={{ xs: 1, md: 0 }}
            sx={(theme) => navbarRow(theme, { isMini })}
          >
            <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
            <Icon fontSize="medium" sx={navbarDesktopMenu} onClick={handleMiniSidenav}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </SuiBox>
          {isMini ? null : (
            <SuiBox sx={(theme) => navbarRow(theme, { isMini })}>
              <DefaultNavbarLink
                name="developers"
                light={light}
                openHandler={openDeveloperMenu}
                closeHandler={handleCloseDeveloperMenu}
                open={developerMenu}
              />
              <SuiBox color={light ? "white" : "inherit"}>
                <IconButton
                  sx={navbarIconButton}
                  size="small"
                  onClick={openUserMenu}
                  onMouseMove={openUserMenu}
                >
                  <Icon
                    sx={({ palette: { dark, white } }) => ({
                      color: light ? white.main : dark.main,
                    })}
                  >
                    account_circle
                  </Icon>
                </IconButton>
                <SuiButton variant="text" onClick={handleSignOut}>
                  <SuiTypography
                    variant="button"
                    fontWeight="medium"
                    color={light ? "white" : "dark"}
                  >
                    <Translate id="navbar-signOut" />
                  </SuiTypography>
                </SuiButton>
                <IconButton
                  size="small"
                  color="inherit"
                  sx={navbarMobileMenu}
                  onClick={handleMiniSidenav}
                >
                  <Icon className={light ? "text-white" : "text-dark"}>
                    {miniSidenav ? "menu_open" : "menu"}
                  </Icon>
                </IconButton>
                <IconButton
                  size="small"
                  color="inherit"
                  sx={navbarIconButton}
                  onClick={handleConfiguratorOpen}
                >
                  <Icon>settings</Icon>
                </IconButton>
                <UserMenu anchorEl={userMenu} close={handleCloseUserMenu} />
                <DeveloperMenu anchorEl={developerMenu} close={handleCloseDeveloperMenu} />
              </SuiBox>
            </SuiBox>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// Setting default values for the props of DashboardNavbar
DefaultNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DefaultNavbar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  ...state,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  signOut: (callback) => dispatch(authentication.signOut(callback)),
});

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(DefaultNavbar));
