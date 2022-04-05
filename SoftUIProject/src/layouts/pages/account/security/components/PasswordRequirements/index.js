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

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

function PasswordRequirements() {
  const passwordRequirements = [
    "One special characters",
    "Min 6 characters",
    "One number (2 are recommended)",
    "Change it often",
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <SuiBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1.25}>
        <SuiTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </SuiTypography>
      </SuiBox>
    );
  });

  return (
    <Card id="change-password">
      <SuiBox pt={2} px={2} lineHeight={1}>
        <SuiTypography variant="h6" fontWeight="medium">
          Password requirements
        </SuiTypography>
        <SuiTypography variant="button" fontWeight="regular" color="text">
          Please follow this guide for a strong password:
        </SuiTypography>
      </SuiBox>
      <SuiBox p={2}>
        <SuiBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
          {renderPasswordRequirements}
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default PasswordRequirements;
