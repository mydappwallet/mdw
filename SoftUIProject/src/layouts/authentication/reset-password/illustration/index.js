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
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Image
import lock from "assets/images/illustrations/lock.png";

function Illustration() {
  return (
    <IllustrationLayout
      title="Reset Password"
      description="You will receive an e-mail in maximum 60 seconds"
      illustration={{
        image: lock,
        title: "Soft UI Design",
        description:
          "Just as it takes a company to sustain a product, it takes a community to sustain a protocol.",
      }}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiInput type="email" placeholder="Email" size="large" />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiInput placeholder="Verification Code" size="large" />
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" color="info" size="large" fullWidth>
            send
          </SuiButton>
        </SuiBox>
      </SuiBox>
    </IllustrationLayout>
  );
}

export default Illustration;
