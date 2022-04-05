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
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiSelect from "components/SuiSelect";
import SuiTypography from "components/SuiTypography";

// Security page components
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import FormField from "layouts/pages/account/components/FormField";
import SecuritySettings from "layouts/pages/account/security/components/SecuritySettings";
import Authentication from "layouts/pages/account/security/components/Authentication";
import ChangePassword from "layouts/pages/account/security/components/ChangePassword";
import PasswordRequirements from "layouts/pages/account/security/components/PasswordRequirements";

function Security() {
  return (
    <BaseLayout stickyNavbar>
      <SuiBox mt={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <SuiBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <SuiTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  security question
                </SuiTypography>
              </SuiBox>
              <SuiSelect
                placeholder="Question 1"
                options={[
                  { value: "question 1", label: "Question 1" },
                  { value: "question 2", label: "Question 2" },
                  { value: "question 3", label: "Question 3" },
                  { value: "your question", label: "Your Question", isDisabled: true },
                ]}
              />
            </SuiBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="your answer" placeholder="Enter your answer" />
          </Grid>
        </Grid>
        <Divider />
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <SecuritySettings />
            </Grid>
            <Grid item xs={12} md={6}>
              <Authentication />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ChangePassword />
            </Grid>
            <Grid item xs={12} md={6}>
              <PasswordRequirements />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
    </BaseLayout>
  );
}

export default Security;
