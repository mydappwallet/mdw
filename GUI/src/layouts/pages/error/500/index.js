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

// react-router-dom components
import { Link } from "react-router-dom";

import { withLocalize, Translate } from "react-localize-redux";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/sui/SuiBox";
import SuiTypography from "components/sui/SuiTypography";
import SuiButton from "components/sui/SuiButton";

// Soft UI Dashboard PRO React example components
import PageLayout from "components/layout/LayoutContainers/PageLayout";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";

// Authentication layout components
import Footer from "layouts/pages/components/Footer";

// Images
import error500 from "assets/images/illustrations/error-500.png";

function Error500() {
  const { d1, d3, d4, d5 } = typography;

  return (
    <PageLayout white>
      <SuiBox my={18} height="calc(100vh - 18rem)">
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Grid item xs={11} sm={9} container alignItems="center">
            <Grid item xs={12} lg={5}>
              <SuiBox
                fontSize={{ xs: d5.fontSize, sm: d4.fontSize, md: d3.fontSize, lg: d1.fontSize }}
                lineHeight={1.2}
              >
                <SuiTypography variant="inherit" color="warning" textGradient fontWeight="bold">
                  Error 500
                </SuiTypography>
              </SuiBox>
              <SuiTypography variant="h2" color="text" fontWeight="bold">
                <Translate id="error-title-500" />
              </SuiTypography>
              <SuiBox mt={1} mb={2}>
                <SuiTypography variant="body1" color="text" opacity={0.6}>
                  <Translate id="error-500" />
                </SuiTypography>
              </SuiBox>
              <SuiBox mt={4} mb={2}>
                <SuiButton component={Link} to="/" variant="gradient" color="warning">
                  <Translate id="go-to-homepage" />e
                </SuiButton>
              </SuiBox>
            </Grid>
            <Grid item xs={12} lg={7}>
              <SuiBox component="img" src={error500} alt="error-404" width="100%" />
            </Grid>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </PageLayout>
  );
}

export default withLocalize(Error500);
