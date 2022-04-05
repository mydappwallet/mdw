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
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/sui/SuiBox";
import SuiTypography from "components/sui/SuiTypography";
import SuiInput from "components/sui/SuiInput";
import SuiButton from "components/sui/SuiButton";

// Soft UI Dashboard PRO React example components
import PageLayout from "components/layout/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "layouts/pages/components/Footer";

function Basic() {
  return (
    <PageLayout background="light">
      <Grid container spacing={3} justifyContent="center" sx={{ minHeight: "75vh" }}>
        <Grid item xs={10} md={6} lg={4}>
          <SuiBox mt={32} mb={3} px={{ xs: 0, lg: 2 }}>
            <Card>
              <SuiBox pt={3} px={3} pb={1} textAlign="center">
                <SuiTypography variant="h4" fontWeight="bold" textGradient>
                  Reset password
                </SuiTypography>
                <SuiTypography variant="body2" color="text">
                  You will receive an e-mail in maximum 60 seconds
                </SuiTypography>
              </SuiBox>
              <SuiBox p={3}>
                <SuiBox component="form" role="form">
                  <SuiBox mb={2}>
                    <SuiInput type="email" placeholder="Email" />
                  </SuiBox>
                  <SuiBox mt={5} mb={1}>
                    <SuiButton variant="gradient" color="dark" size="large" fullWidth>
                      send
                    </SuiButton>
                  </SuiBox>
                </SuiBox>
              </SuiBox>
            </Card>
          </SuiBox>
        </Grid>
      </Grid>
      <Footer />
    </PageLayout>
  );
}

export default Basic;