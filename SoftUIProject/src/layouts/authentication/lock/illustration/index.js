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
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Image
import lock from "assets/images/illustrations/dark-lock-ill.png";

function Illustration() {
  return (
    <IllustrationLayout
      color="dark"
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
      illustration={{
        image: lock,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiInput type="password" placeholder="Password" size="large" />
        </SuiBox>
        <SuiButton variant="gradient" color="dark" size="large" fullWidth>
          unlock
        </SuiButton>
      </SuiBox>
    </IllustrationLayout>
  );
}

export default Illustration;
