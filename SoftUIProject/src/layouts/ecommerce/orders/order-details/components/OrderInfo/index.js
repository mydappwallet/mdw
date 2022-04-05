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
import SuiButton from "components/SuiButton";
import SuiAvatar from "components/SuiAvatar";
import SuiBadge from "components/SuiBadge";

// Images
const orderImage =
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80";

function OrderInfo() {
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
        <SuiBox display="flex" alignItems="center">
          <SuiBox mr={2}>
            <SuiAvatar variant="rounded" size="xxl" src={orderImage} alt="Gold Glasses" />
          </SuiBox>
          <SuiBox lineHeight={1}>
            <SuiTypography variant="h6" fontWeight="medium">
              Gold Glasses
            </SuiTypography>
            <SuiBox mb={2}>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                Order was delivered 2 days ago.
              </SuiTypography>
            </SuiBox>
            <SuiBadge
              variant="gradient"
              color="success"
              size="xs"
              badgeContent="delivered"
              container
            />
          </SuiBox>
        </SuiBox>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
        <SuiButton variant="gradient" color="info">
          contact us
        </SuiButton>
        <SuiBox mt={0.5}>
          <SuiTypography variant="button" fontWeight="regular" color="text">
            Do you like the product? Leave us a review{" "}
            <SuiTypography component="a" href="#" variant="button" fontWeight="regular">
              here
            </SuiTypography>
            .
          </SuiTypography>
        </SuiBox>
      </Grid>
    </Grid>
  );
}

export default OrderInfo;
