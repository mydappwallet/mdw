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
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// OrderDetails page components
import Header from "layouts/ecommerce/orders/order-details/components/Header";
import OrderInfo from "layouts/ecommerce/orders/order-details/components/OrderInfo";
import TrackOrder from "layouts/ecommerce/orders/order-details/components/TrackOrder";
import PaymentDetails from "layouts/ecommerce/orders/order-details/components/PaymentDetails";
import BillingInformation from "layouts/ecommerce/orders/order-details/components/BillingInformation";
import OrderSummary from "layouts/ecommerce/orders/order-details/components/OrderSummary";

function OrderDetails() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox my={7}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <SuiBox pt={2} px={2}>
                <Header />
              </SuiBox>
              <Divider />
              <SuiBox pt={1} pb={3} px={2}>
                <SuiBox mb={3}>
                  <OrderInfo />
                </SuiBox>
                <Divider />
                <SuiBox mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                      <TrackOrder />
                    </Grid>
                    <Grid item xs={12} md={6} lg={5}>
                      <PaymentDetails />
                      <SuiBox mt={3}>
                        <BillingInformation />
                      </SuiBox>
                    </Grid>
                    <Grid item xs={12} lg={3} sx={{ ml: "auto" }}>
                      <OrderSummary />
                    </Grid>
                  </Grid>
                </SuiBox>
              </SuiBox>
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OrderDetails;
