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

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved7 from "assets/images/curved-images/curved7.jpg";

function Cover() {
  return (
    <CoverLayout
      image={curved7}
      header={
        <SuiBox textAlign="center">
          <SuiTypography variant="h4" fontWeight="bold">
            Mike Priesler
          </SuiTypography>
          <SuiTypography variant="body2" color="text">
            Enter password to unlock your account.
          </SuiTypography>
        </SuiBox>
      }
      top={30}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiInput type="password" placeholder="Password" />
        </SuiBox>
        <SuiButton variant="gradient" color="dark" size="large" fullWidth>
          unlock
        </SuiButton>
      </SuiBox>
    </CoverLayout>
  );
}

export default Cover;
