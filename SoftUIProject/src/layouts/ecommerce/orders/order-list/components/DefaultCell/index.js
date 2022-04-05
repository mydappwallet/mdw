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

// Soft UI Dashboard PRO React components
import SuiTypography from "components/SuiTypography";

function DefaultCell({ value, suffix }) {
  return (
    <SuiTypography variant="caption" fontWeight="medium" color="text">
      {value}
      {suffix && (
        <SuiTypography variant="caption" fontWeight="medium" color="secondary">
          &nbsp;&nbsp;{suffix}
        </SuiTypography>
      )}
    </SuiTypography>
  );
}

// Setting default values for the props of DefaultCell
DefaultCell.defaultProps = {
  suffix: "",
};

// Typechecking props for the DefaultCell
DefaultCell.propTypes = {
  value: PropTypes.string.isRequired,
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default DefaultCell;
