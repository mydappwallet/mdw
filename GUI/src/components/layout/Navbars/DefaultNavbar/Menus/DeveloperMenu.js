/* eslint-disable no-unused-vars */
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

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";

// Soft UI Dashboard PRO React components
import SuiBox from "components/sui/SuiBox";
import SuiTypography from "components/sui/SuiTypography";
import Shop from "components/Icons/Shop";

// Soft UI Dashboard PRO React example components
import DefaultNavbarMenu from "components/layout/Navbars/DefaultNavbar/DefaultNavbarMenu";

function DeveloperMenu({ anchorEl, close, mobileMenu }) {
  const renderDocsMenuRoute = () => (
    <MenuItem
      key="applications"
      component={Link}
      href="http://aa"
      target="_blank"
      rel="noreferrer"
      onClick={mobileMenu ? undefined : close}
    >
      <SuiBox display="flex" py={0.25}>
        {typeof icon === "string" ? (
          <Icon>
            <Shop size="12px" />
          </Icon>
        ) : (
          <SuiBox mt={0.5}>
            <Shop size="12px" />
          </SuiBox>
        )}
        <SuiBox pl={2} lineHeight={0}>
          <SuiTypography variant="h6" fontWeight="bold">
            Applications
          </SuiTypography>
          <SuiTypography variant="button" fontWeight="regular" color="text">
            Your applications
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </MenuItem>
  );

  return mobileMenu ? (
    renderDocsMenuRoute()
  ) : (
    <DefaultNavbarMenu anchorEl={anchorEl} close={close}>
      {renderDocsMenuRoute()}
    </DefaultNavbarMenu>
  );
}

// Setting default values for the props of DocsMenu
DeveloperMenu.defaultProps = {
  mobileMenu: false,
  anchorEl: false,
  close: false,
};

// Typechecking props for the DocsMenu
DeveloperMenu.propTypes = {
  anchorEl: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  close: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  mobileMenu: PropTypes.bool,
};

export default DeveloperMenu;
