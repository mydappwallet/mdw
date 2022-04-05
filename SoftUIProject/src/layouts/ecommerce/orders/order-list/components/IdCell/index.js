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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

function IdCell({ id, checked }) {
  return (
    <SuiBox display="flex" alignItems="center">
      <Checkbox defaultChecked={checked} />
      <SuiBox ml={1}>
        <SuiTypography variant="caption" fontWeight="medium" color="text">
          {id}
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

// Setting default value for the props of IdCell
IdCell.defaultProps = {
  checked: false,
};

// Typechecking props for the IdCell
IdCell.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default IdCell;
