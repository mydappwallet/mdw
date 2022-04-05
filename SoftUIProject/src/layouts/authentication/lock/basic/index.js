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
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import SuiAvatar from "components/SuiAvatar";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import curved8 from "assets/images/curved-images/curved8.jpg";
import team4 from "assets/images/team-4.jpg";

function Basic() {
  return (
    <BasicLayout image={curved8}>
      <Card>
        <SuiBox py={4} px={3} textAlign="center">
          <SuiBox display="flex" justifyContent="center" mb={3}>
            <SuiAvatar src={team4} alt="profile-picture" size="xxl" variant="rounded" />
          </SuiBox>
          <SuiTypography variant="h4" fontWeight="bold">
            Mike Priesler
          </SuiTypography>
          <SuiBox mb={3}>
            <SuiTypography variant="body2" color="text">
              Enter password to unlock your account.
            </SuiTypography>
          </SuiBox>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiInput type="password" placeholder="Password" />
            </SuiBox>
            <SuiBox mt={4}>
              <SuiButton variant="gradient" color="dark" size="large">
                unlock
              </SuiButton>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
