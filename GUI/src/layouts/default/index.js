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
import SuiBox from "components/sui/SuiBox";

// Soft UI Dashboard PRO React example components
import DefaultLayout from "components/layout/LayoutContainers/DefaultLayout";
import DefaultNavbar from "components/layout/Navbars/DefaultNavbar";
import Footer from "components/layout/Footer";
// Soft UI Dashboard PRO React page layout routes
import pageRoutes from "page.routes";

function Default() {
  return (
    <DefaultLayout>
      <DefaultNavbar routes={pageRoutes} />
      <SuiBox py={3} minHeight="calc(100vh - 114px - 23px)">
        <Grid container>
          <Grid item xs={12} lg={7}>
            <Grid container>
              <Grid item xs={12}>
                <div>Default</div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DefaultLayout>
  );
}

export default Default;
