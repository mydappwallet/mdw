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
import SuiButton from "components/SuiButton";

function Authentication() {
  return (
    <Card>
      <SuiBox display="flex" justifyContent="space-between" alignItems="centers" pt={2} px={2}>
        <SuiTypography variant="h6" fontWeight="medium">
          Two factor authentication
        </SuiTypography>
        <SuiButton variant="gradient" color="dark" size="small">
          enable
        </SuiButton>
      </SuiBox>
      <SuiBox p={2}>
        <SuiBox mt={6} mb={3} lineHeight={0}>
          <SuiTypography variant="button" fontWeight="regular" color="text">
            Two-factor authentication adds an additional layer of security to your account by
            requiring more than just a password to log in.
          </SuiTypography>
        </SuiBox>
        <SuiBox
          bgColor="dark"
          borderRadius="lg"
          shadow="lg"
          p={2}
          variant="gradient"
          lineHeight={1}
        >
          <SuiTypography variant="h6" fontWeight="medium" color="white">
            Questions about security?
          </SuiTypography>
          <SuiBox mb={3}>
            <SuiTypography variant="button" fontWeight="regular" color="white">
              Have a question, concern, or comment about security? Please contact us.
            </SuiTypography>
          </SuiBox>
          <SuiButton variant="gradient" color="light">
            contact us
          </SuiButton>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default Authentication;
