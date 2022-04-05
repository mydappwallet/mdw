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
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Security page components
import FormField from "layouts/pages/account/components/FormField";

function ChangePassword() {
  return (
    <Card id="change-password">
      <SuiBox pt={2} px={2} lineHeight={1}>
        <SuiTypography variant="h6" fontWeight="medium">
          Change Password
        </SuiTypography>
        <SuiTypography variant="button" fontWeight="regular" color="text">
          We will send you an email with the verification code.
        </SuiTypography>
      </SuiBox>
      <SuiBox component="form" p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              label="current password"
              placeholder="Current Password"
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              label="new password"
              placeholder="New Password"
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              label="confirm new password"
              placeholder="Confirm Password"
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
        </Grid>
        <SuiBox mt={2}>
          <SuiButton variant="gradient" color="dark" fullWidth>
            update password
          </SuiButton>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default ChangePassword;
