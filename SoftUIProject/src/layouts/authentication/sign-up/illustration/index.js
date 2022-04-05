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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Images
import rocket from "assets/images/illustrations/rocket-white.png";

function Illustration() {
  const [agreement, setAgreemnet] = useState(true);

  const handleSetAgremment = () => setAgreemnet(!agreement);

  return (
    <IllustrationLayout
      title="Sign Up"
      description="Enter your email and password to register"
      illustration={{
        image: rocket,
        title: "Your journey starts here",
        description:
          "Just as it takes a company to sustain a product, it takes a community to sustain a protocol.",
      }}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiInput placeholder="Name" size="large" />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiInput type="email" placeholder="Email" size="large" />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiInput type="password" placeholder="Password" size="large" />
        </SuiBox>
        <SuiBox display="flex" alignItems="center">
          <Checkbox checked={agreement} onChange={handleSetAgremment} />
          <SuiTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetAgremment}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;I agree the&nbsp;
          </SuiTypography>
          <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
            Terms and Conditions
          </SuiTypography>
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" color="info" size="large" fullWidth>
            sign up
          </SuiButton>
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiTypography variant="button" color="text" fontWeight="regular">
            Already have an account?&nbsp;
            <SuiTypography
              component={Link}
              to="/authentication/sign-in/illustration"
              variant="button"
              color="info"
              fontWeight="bold"
              textGradient
            >
              Sign in
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </IllustrationLayout>
  );
}

export default Illustration;
