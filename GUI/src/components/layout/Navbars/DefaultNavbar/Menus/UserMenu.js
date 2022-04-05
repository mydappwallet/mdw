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

// react-router components

// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
// Soft UI Dashboard PRO React components

import SuiBox from "components/sui/SuiBox";
import SuiTypography from "components/sui/SuiTypography";
// Soft UI Dashboard PRO React example components

import DefaultNavbarMenu from "components/layout/Navbars/DefaultNavbar/DefaultNavbarMenu";

// Images
import curved8 from "assets/images/curved-images/curved8.jpg";

function UserMenu({ anchorEl, close, style, mobileMenu }) {
  const renderMenuContent = (
    <SuiBox display={mobileMenu ? "block" : "flex"}>
      {!mobileMenu && (
        <SuiBox
          width="10rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          borderRadius="lg"
          overflow="hidden"
        >
          <SuiBox
            component="img"
            src={curved8}
            alt="background-image"
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
          />
          <SuiBox
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            opacity={0.8}
            bgColor="info"
            variant="gradient"
          />
          <SuiBox position="relative" textAlign="center">
            <SuiBox
              bgColor="white"
              width="3rem"
              height="3rem"
              borderRadius="50%"
              shadow="md"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mx="auto"
              mb={1}
            >
              <Icon
                sx={({ functions: { linearGradient }, palette: { gradients, transparent } }) => ({
                  backgroundImage: `${linearGradient(
                    gradients.info.main,
                    gradients.info.state
                  )} !important`,
                  WebkitBackgroundClip: "text !important",
                  WebkitTextFillColor: `${transparent.main} !important`,
                })}
              >
                star
              </Icon>
            </SuiBox>
            <SuiTypography variant="body1" fontWeight="medium" color="white">
              Explore our utilities pages
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      )}
      <SuiBox py={1} pl={2}>
        <MenuItem onClick={close}>Profile</MenuItem>
        <MenuItem onClick={close}>My account</MenuItem>
        <MenuItem onClick={close}>My account</MenuItem>
        <MenuItem onClick={close}>My account</MenuItem>
        <MenuItem onClick={close}>My account</MenuItem>
      </SuiBox>
    </SuiBox>
  );

  return mobileMenu ? (
    renderMenuContent
  ) : (
    <DefaultNavbarMenu anchorEl={anchorEl} close={close} style={style}>
      {renderMenuContent}
    </DefaultNavbarMenu>
  );
}

// Setting default values for the props of AuthenticationMenu
UserMenu.defaultProps = {
  mobileMenu: false,
  anchorEl: false,
  close: false,
  style: {},
};

// Typechecking props for the AuthenticationMenu
UserMenu.propTypes = {
  anchorEl: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  close: PropTypes.oneOfType([PropTypes.func]),
  // eslint-disable-next-line react/no-unused-prop-types
  mobileMenu: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

export default UserMenu;
