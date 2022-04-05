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
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Icon from "@mui/material/Icon";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarDesktopMenu,
} from "components/layout/Navbars/DefaultNavbar/styles";

// Soft UI Dashboard PRO React components
import SuiBox from "components/sui/SuiBox";
import SuiButton from "components/sui/SuiButton";
import Breadcrumbs from "components/layout/Breadcrumbs";

// Soft UI Dashboard PRO React example components
import DefaultNavbarLink from "components/layout/Navbars/TopNavbar/DefaultNavbarLink";
import DefaultNavbarMobile from "components/layout/Navbars/TopNavbar/DefaultNavbarMobile";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// DefaultNavbar dropdown menus
import PagesMenu from "components/layout/Navbars/TopNavbar/Menus/PagesMenu";
import AuthenticationMenu from "components/layout/Navbars/TopNavbar/Menus/AuthenticationMenu";
import EcommerceMenu from "components/layout/Navbars/TopNavbar/Menus/EcommerceMenu";
import ApplicationsMenu from "components/layout/Navbars/TopNavbar/Menus/ApplicationsMenu";
import DocsMenu from "components/layout/Navbars/TopNavbar/Menus/DocsMenu";

// Soft UI Dashboard PRO React context
import { useSoftUIController, setMiniSidenav } from "context";

function TopNavbar({ routes, light, action, absolute, isMini }) {
  const route = useLocation().pathname.split("/").slice(1);
  const [navbarType] = useState();
  const [pagesMenu, setPagesMenu] = useState(false);
  const [authenticationMenu, setAuthenticationMenu] = useState(false);
  const [ecommerceMenu, setEcommerceMenu] = useState(false);
  const [applicationsMenu, setApplicationsMenu] = useState(false);
  const [docsMenu, setDocsMenu] = useState(false);
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openPagesMenu = ({ currentTarget }) => setPagesMenu(currentTarget);
  const closePagesMenu = () => setPagesMenu(false);
  const openAuthenticationMenu = ({ currentTarget }) => setAuthenticationMenu(currentTarget);
  const closeAuthenticationMenu = () => setAuthenticationMenu(false);
  const openEcommerceMenu = ({ currentTarget }) => setEcommerceMenu(currentTarget);
  const closeEcommerceMenu = () => setEcommerceMenu(false);
  const openApplicationsMenu = ({ currentTarget }) => setApplicationsMenu(currentTarget);
  const closeApplicationsMenu = () => setApplicationsMenu(false);
  const openDocsMenu = ({ currentTarget }) => setDocsMenu(currentTarget);
  const closeDocsMenu = () => setDocsMenu(false);
  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  const [controller, dispatch] = useSoftUIController();
  const { transparentNavbar, miniSidenav } = controller;
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SuiBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          <Icon fontSize="medium" sx={navbarDesktopMenu} onClick={handleMiniSidenav}>
            {miniSidenav ? "menu_open" : "menu"}
          </Icon>
        </SuiBox>
        <SuiBox sx={(theme) => navbarRow(theme, { isMini })}>
          <DefaultNavbarLink
            name="pages"
            openHandler={openPagesMenu}
            closeHandler={closePagesMenu}
            light={light}
          />
          <DefaultNavbarLink
            name="authentication"
            openHandler={openAuthenticationMenu}
            closeHandler={closeAuthenticationMenu}
            light={light}
          />

          <DefaultNavbarLink
            name="application"
            openHandler={openApplicationsMenu}
            closeHandler={closeApplicationsMenu}
            light={light}
          />
          <DefaultNavbarLink
            name="ecommerce"
            openHandler={openEcommerceMenu}
            closeHandler={closeEcommerceMenu}
            light={light}
          />
          <DefaultNavbarLink
            name="docs"
            openHandler={openDocsMenu}
            closeHandler={closeDocsMenu}
            light={light}
          />
        </SuiBox>
        {action &&
          (action.type === "internal" ? (
            <SuiBox display={{ xs: "none", lg: "inline-block" }}>
              <SuiButton
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                circular
              >
                {action.label}
              </SuiButton>
            </SuiBox>
          ) : (
            <SuiBox display={{ xs: "none", lg: "inline-block" }}>
              <SuiButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                circular
              >
                {action.label}
              </SuiButton>
            </SuiBox>
          ))}
        <SuiBox
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={openMobileNavbar}
        >
          <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
        </SuiBox>
        <PagesMenu routes={routes} open={pagesMenu} close={closePagesMenu} />
        <AuthenticationMenu
          routes={routes}
          open={authenticationMenu}
          close={closeAuthenticationMenu}
        />
        <EcommerceMenu routes={routes} open={ecommerceMenu} close={closeEcommerceMenu} />
        <ApplicationsMenu routes={routes} open={applicationsMenu} close={closeApplicationsMenu} />
        <DocsMenu routes={routes} open={docsMenu} close={closeDocsMenu} />
        {mobileView && (
          <DefaultNavbarMobile routes={routes} open={mobileNavbar} close={closeMobileNavbar} />
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DefaultNavbar
TopNavbar.defaultProps = {
  absolute: false,
  light: false,
  action: false,
  isMini: false,
};

// Typechecking props for the DefaultNavbar
TopNavbar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  light: PropTypes.bool,
  absolute: PropTypes.bool,
  isMini: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default TopNavbar;
