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
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Images
const sofa =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";

function ProductImage() {
  return (
    <Card sx={{ height: "100%" }}>
      <SuiBox p={3}>
        <SuiTypography variant="h5" fontWeight="bold">
          Product Image
        </SuiTypography>
        <SuiBox
          component="img"
          src={sofa}
          alt="Product Image"
          borderRadius="lg"
          shadow="lg"
          width="100%"
          my={3}
        />
        <SuiBox display="flex">
          <SuiBox mr={1}>
            <SuiButton variant="gradient" color="info" size="small">
              edit
            </SuiButton>
          </SuiBox>
          <SuiButton variant="outlined" color="dark" size="small">
            remove
          </SuiButton>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default ProductImage;
