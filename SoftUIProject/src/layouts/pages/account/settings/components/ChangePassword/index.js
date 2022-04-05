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

// Settings page components
import FormField from "layouts/pages/account/components/FormField";

function ChangePassword() {
  const passwordRequirements = [
    "One special characters",
    "Min 6 characters",
    "One number (2 are recommended)",
    "Change it often",
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <SuiBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <SuiTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </SuiTypography>
      </SuiBox>
    );
  });

  return (
    <Card id="change-password">
      <SuiBox p={3}>
        <SuiTypography variant="h5">Change Password</SuiTypography>
      </SuiBox>
      <SuiBox component="form" pb={3} px={3}>
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
        <SuiBox mt={6} mb={1}>
          <SuiTypography variant="h5">Password requirements</SuiTypography>
        </SuiBox>
        <SuiBox mb={1}>
          <SuiTypography variant="body2" color="text">
            Please follow this guide for a strong password
          </SuiTypography>
        </SuiBox>
        <SuiBox display="flex" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap">
          <SuiBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
            {renderPasswordRequirements}
          </SuiBox>
          <SuiBox ml="auto">
            <SuiButton variant="gradient" color="dark" size="small">
              update password
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default ChangePassword;
