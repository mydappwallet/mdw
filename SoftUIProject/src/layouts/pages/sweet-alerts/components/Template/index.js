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

// prop-types is a library for type checking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

function Template({ title, action }) {
  return (
    <Card>
      <SuiBox p={3} textAlign="center">
        <SuiBox mb={2}>
          <SuiTypography variant="body2" color="text">
            {title}
          </SuiTypography>
        </SuiBox>
        <SuiButton variant="gradient" color="info" onClick={action}>
          try me!
        </SuiButton>
      </SuiBox>
    </Card>
  );
}

// Typechecking props for the Template
Template.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default Template;
