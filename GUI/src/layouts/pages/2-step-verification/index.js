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
import SpaceShip from "components/Icons/SpaceShip";

// Soft UI Dashboard PRO React page layout routes

// Images
import curved9 from "assets/images/curved-images/curved9.jpg";

function Basic() {
  return (
    <PageLayout>
      <SuiBox position="relative" width="100vw" height="100vh" sx={{ overflow: "hidden" }}>
        <SuiBox
          component="img"
          src={curved9}
          alt="background-image"
          position="absolute"
          width="100%"
          height="100%"
          sx={{ objectFit: "cover", objectPosition: "center" }}
        />
        <SuiBox
          position="absolute"
          width="100%"
          height="100%"
          bgColor="dark"
          variant="gradient"
          opacity={0.6}
        />
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Grid item xs={11} md={6} lg={3}>
            <Card>
              <SuiBox textAlign="center" p={6}>
                <SuiBox
                  display="grid"
                  justifyContent="center"
                  alignItems="center"
                  width="6.25rem"
                  height="6.25rem"
                  borderRadius="50%"
                  shadow="md"
                  fontSize="3rem"
                  color="white"
                  bgColor="warning"
                  variant="gradient"
                  mx="auto"
                  mb={3}
                >
                  <SpaceShip color="white" size="35px" />
                </SuiBox>
                <SuiBox mb={3} px={1}>
                  <SuiTypography variant="h2" fontWeight="bold">
                    2-Step Verification
                  </SuiTypography>
                </SuiBox>
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
                <SuiTypography variant="button" color="text" fontWeight="regular">
                  Haven&apos;t received it?{" "}
                  <SuiTypography component="a" href="#verification" variant="button">
                    Resend a new code
                  </SuiTypography>
                  .
                </SuiTypography>
              </SuiBox>
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
    </PageLayout>
  );
}

export default Basic;
