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
import SuiBadge from "components/SuiBadge";

function Steps() {
  return (
    <Card>
      <SuiBox p={3}>
        <SuiTypography variant="body2" color="text" fontWeight="regular">
          خطوات
        </SuiTypography>
        <SuiBox mt={2} mb={1} lineHeight={0}>
          <SuiTypography variant="h3" fontWeight="bold">
            11.4ك
          </SuiTypography>
        </SuiBox>
        <SuiBadge variant="contained" color="success" badgeContent="+4.3%" container />
      </SuiBox>
    </Card>
  );
}

export default Steps;
