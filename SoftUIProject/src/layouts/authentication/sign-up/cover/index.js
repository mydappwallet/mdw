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
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved11 from "assets/images/curved-images/curved11.jpg";

function Cover() {
  const [agreement, setAgreement] = useState(true);

  const handleSetAgremment = () => setAgreement(!agreement);

  return (
    <CoverLayout
      title="Join us today"
      description="Enter your email and password to register"
      image={curved11}
      top={12}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2} lineHeight={1.25}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Name
            </SuiTypography>
          </SuiBox>
          <SuiInput placeholder="Name" />
        </SuiBox>
        <SuiBox mb={2} lineHeight={1.25}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SuiTypography>
          </SuiBox>
          <SuiInput type="email" placeholder="Email" />
        </SuiBox>
        <SuiBox mb={2} lineHeight={1.25}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SuiTypography>
          </SuiBox>
          <SuiInput type="password" placeholder="Password" />
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
          <SuiButton variant="gradient" color="info" fullWidth>
            sign up
          </SuiButton>
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiTypography variant="button" color="text" fontWeight="regular">
            Already have an account?&nbsp;
            <SuiTypography
              component={Link}
              to="/authentication/sign-in/cover"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign in
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
}

export default Cover;
