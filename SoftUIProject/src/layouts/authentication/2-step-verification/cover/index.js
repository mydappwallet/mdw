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
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved9.jpg";

function Cover() {
  return (
    <CoverLayout
      header={
        <SuiBox px={5} textAlign="center">
          <SuiTypography variant="h2" fontWeight="bold">
            2-Step Verification
          </SuiTypography>
        </SuiBox>
      }
      image={curved9}
      top={25}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <Grid container spacing={2}>
            <Grid item xs>
              <SuiInput size="large" inputProps={{ maxLength: 1 }} />
            </Grid>
            <Grid item xs>
              <SuiInput size="large" inputProps={{ maxLength: 1 }} />
            </Grid>
            <Grid item xs>
              <SuiInput size="large" inputProps={{ maxLength: 1 }} />
            </Grid>
            <Grid item xs>
              <SuiInput size="large" inputProps={{ maxLength: 1 }} />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={2}>
          <SuiButton variant="gradient" color="warning" fullWidth>
            send code
          </SuiButton>
        </SuiBox>
        <SuiBox textAlign="center">
          <SuiTypography variant="button" color="text" fontWeight="regular">
            Haven&apos;t received it?{" "}
            <SuiTypography component="a" href="#verification" variant="button">
              Resend a new code
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
}

export default Cover;
