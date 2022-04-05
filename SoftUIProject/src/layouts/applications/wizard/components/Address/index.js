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

// Wizard application components
import FormField from "layouts/applications/wizard/components/FormField";

function Address() {
  return (
    <SuiBox>
      <SuiBox width="80%" textAlign="center" mx="auto" mb={4}>
        <SuiBox mb={1}>
          <SuiTypography variant="h5" fontWeight="regular">
            Are you living in a nice area?
          </SuiTypography>
        </SuiBox>
        <SuiTypography variant="body2" fontWeight="regular" color="text">
          One thing I love about the later sunsets is the chance to go for a walk through the
          neighborhood woods before dinner
        </SuiTypography>
      </SuiBox>
      <SuiBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <FormField type="text" label="street name" placeholder="Eg. Soft" />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormField type="number" label="street number" placeholder="Eg. 221" />
          </Grid>
          <Grid item xs={12} md={7}>
            <FormField type="text" label="city" placeholder="Eg. Tokyo" />
          </Grid>
          <Grid item xs={12} md={5}>
            <FormField type="text" label="country" placeholder="Eg. Argentina" />
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

export default Address;
