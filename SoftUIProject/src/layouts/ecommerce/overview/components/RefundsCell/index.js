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
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

function RefundsCell({ value, icon, tooltip }) {
  return (
    <SuiBox display="flex" justifyContent="center" alignItems="center" px={2}>
      <SuiTypography variant="button" fontWeight="medium" color="text">
        {value}
      </SuiTypography>
      <SuiBox color={icon.color} lineHeight={0}>
        <Icon sx={{ fontWeight: "bold" }} fontSize="default">
          {icon.name}
        </Icon>
      </SuiBox>
      {tooltip && (
        <SuiBox ml={2}>
          <Tooltip title={tooltip} placement="left">
            <SuiButton variant="outlined" color="secondary" size="small" circular iconOnly>
              <Icon>priority_high</Icon>
            </SuiButton>
          </Tooltip>
        </SuiBox>
      )}
    </SuiBox>
  );
}

// Setting default values for the props or RefundsCell
RefundsCell.defaultProps = {
  tooltip: "",
};

// Typechecking props for the RefundsCell
RefundsCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["info", "success", "warning", "error"]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  tooltip: PropTypes.string,
};

export default RefundsCell;
