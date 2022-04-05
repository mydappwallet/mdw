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

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiProgress from "components/SuiProgress";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

function Reviews() {
  return (
    <Card sx={{ height: "100%" }}>
      <SuiBox pt={2} px={2}>
        <SuiTypography variant="h6" fontWeight="medium">
          Reviews
        </SuiTypography>
      </SuiBox>
      <SuiBox pt={2} px={2}>
        <SuiBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <SuiBox component="li" w="100%" py={1} mb={0.5}>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <SuiTypography
                variant="button"
                fontWeight="medium"
                color="text"
                textTransform="capitalize"
              >
                positive reviews
              </SuiTypography>
              <SuiTypography
                variant="button"
                fontWeight="medium"
                color="text"
                textTransform="capitalize"
              >
                80%
              </SuiTypography>
            </SuiBox>
            <SuiProgress variant="gradient" value={80} />
          </SuiBox>
          <SuiBox component="li" w="100%" py={1} mb={0.5}>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <SuiTypography
                variant="button"
                fontWeight="medium"
                color="text"
                textTransform="capitalize"
              >
                neutral reviews
              </SuiTypography>
              <SuiTypography
                variant="button"
                fontWeight="medium"
                color="text"
                textTransform="capitalize"
              >
                17%
              </SuiTypography>
            </SuiBox>
            <SuiProgress variant="gradient" color="dark" value={17} />
          </SuiBox>
          <SuiBox component="li" w="100%" py={1} mb={0.5}>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <SuiTypography
                variant="button"
                fontWeight="medium"
                color="text"
                textTransform="capitalize"
              >
                negative reviews
              </SuiTypography>
              <SuiTypography
                variant="button"
                fontWeight="medium"
                color="text"
                textTransform="capitalize"
              >
                3%
              </SuiTypography>
            </SuiBox>
            <SuiProgress variant="gradient" color="error" value={3} />
          </SuiBox>
        </SuiBox>
      </SuiBox>
      <SuiBox pb={2} px={2} display="flex" flexDirection={{ xs: "column", sm: "row" }} mt="auto">
        <SuiBox width={{ xs: "100%", sm: "60%" }} lineHeight={1}>
          <SuiTypography variant="button" color="text" fontWeight="regular">
            More than <strong>1,500,000</strong> developers used Creative Tim&apos;s products and
            over <strong>700,000</strong>
            projects were created.
          </SuiTypography>
        </SuiBox>
        <SuiBox width={{ xs: "100%", sm: "40%" }} textAlign="right" mt={{ xs: 2, sm: "auto" }}>
          <SuiButton variant="gradient" color="dark">
            view all reviews
          </SuiButton>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default Reviews;
