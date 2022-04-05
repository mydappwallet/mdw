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

function FullBody() {
  return (
    <Card>
      <SuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={3}
        mb={2}
        px={3}
      >
        <SuiTypography variant="body2" color="text" fontWeight="regular">
          Full Body
        </SuiTypography>
        <SuiBadge variant="contained" color="info" badgeContent="moderate" container />
      </SuiBox>
      <SuiBox pb={3} px={3}>
        <SuiTypography variant="body2" color="text" fontWeight="regular">
          What matters is the people who are sparked by it. And the people who are liked.
        </SuiTypography>
      </SuiBox>
    </Card>
  );
}

export default FullBody;
