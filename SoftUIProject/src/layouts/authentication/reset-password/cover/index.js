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
import curved6 from "assets/images/curved-images/curved6.jpg";

function Cover() {
  return (
    <CoverLayout
      title="Reset Password"
      description="You will receive an e-mail in maximum 60 seconds"
      image={curved6}
      top={30}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2} lineHeight={1.25}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SuiTypography>
          </SuiBox>
          <SuiInput type="email" placeholder="Enter your e-mail" />
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" color="info" fullWidth>
            reset
          </SuiButton>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
}

export default Cover;
