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

// Images
import coinbase from "assets/images/logos/gray-logos/logo-coinbase.svg";
import nasa from "assets/images/logos/gray-logos/logo-nasa.svg";
import netflix from "assets/images/logos/gray-logos/logo-netflix.svg";
import pinterest from "assets/images/logos/gray-logos/logo-pinterest.svg";
import spotify from "assets/images/logos/gray-logos/logo-spotify.svg";
import vodafone from "assets/images/logos/gray-logos/logo-vodafone.svg";

function PricingCards() {
  return (
    <SuiBox mt={8}>
      <SuiBox textAlign="center">
        <SuiTypography variant="h6" opacity={0.5}>
          More than 50+ brands trust Soft
        </SuiTypography>
      </SuiBox>
      <SuiBox mt={5}>
        <Grid container spacing={3}>
          <Grid item xs={6} md={4} lg={2}>
            <SuiBox
              component="img"
              src={coinbase}
              alt="coinbase"
              width="90%"
              opacity={0.9}
              mb={3}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <SuiBox component="img" src={nasa} alt="nasa" width="90%" opacity={0.9} mb={3} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <SuiBox component="img" src={netflix} alt="netflix" width="90%" opacity={0.9} mb={3} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <SuiBox
              component="img"
              src={pinterest}
              alt="pinterest"
              width="90%"
              opacity={0.9}
              mb={3}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <SuiBox component="img" src={spotify} alt="spotify" width="90%" opacity={0.9} mb={3} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <SuiBox
              component="img"
              src={vodafone}
              alt="vodafone"
              width="90%"
              opacity={0.9}
              mb={3}
            />
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

export default PricingCards;
