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
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import OutlinedCounterCard from "examples/Cards/CounterCards/OutlinedCounterCard";
import TransparentInfoCard from "examples/Cards/InfoCards/TransparentInfoCard";
import ComplexBackgroundCard from "examples/Cards/BackgroundCards/ComplexBackgroundCard";
import DataTable from "examples/Tables/DataTable";

// Referral page components
import ReferralCode from "layouts/ecommerce/referral/components/ReferralCode";
import OutlinedCard from "layouts/ecommerce/referral/components/OutlinedCard";

// Data
import dataTableData from "layouts/ecommerce/referral/data/dataTableData";

// Images
import officeDark from "assets/images/office-dark.jpg";

const image1 =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/window-desk.jpg";

function Referral() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox my={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox p={2}>
              <SuiBox mb={1}>
                <SuiTypography variant="h5" fontWeight="medium">
                  Referral Program
                </SuiTypography>
              </SuiBox>
              <SuiTypography variant="body2" fontWeight="regular" color="text">
                Track and find all the details about our referral program, your stats and revenues.
              </SuiTypography>
            </SuiBox>
            <SuiBox p={2}>
              <Grid container spacing={3}>
                <Grid item xs={6} lg={3}>
                  <OutlinedCounterCard count={23980} prefix="$" title="earnings" />
                </Grid>
                <Grid item xs={6} lg={3}>
                  <OutlinedCounterCard count={2400} prefix="$" title="customers" />
                </Grid>
                <Grid item xs={6} lg={3}>
                  <OutlinedCounterCard count={48} prefix="$" title="avg. value" />
                </Grid>
                <Grid item xs={6} lg={3}>
                  <OutlinedCounterCard count={4} suffix="%" title="refund rate" />
                </Grid>
              </Grid>
              <SuiBox mt={6} mb={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={5}>
                    <ReferralCode />
                  </Grid>
                  <Grid item xs={12} lg={7}>
                    <SuiTypography variant="h6" fontWeight="medium">
                      How to use
                    </SuiTypography>
                    <SuiBox mb={2}>
                      <SuiTypography variant="button" color="text" fontWeight="regular">
                        Integrate your referral code in 3 easy steps.
                      </SuiTypography>
                    </SuiBox>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <TransparentInfoCard
                          color="dark"
                          icon="paid"
                          description="1. Create & validate your referral link and get"
                          value={
                            <>
                              <SuiTypography component="span" variant="button">
                                $
                              </SuiTypography>
                              100
                            </>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TransparentInfoCard
                          color="dark"
                          icon="unarchive"
                          description="2. For every order you make you get"
                          value={
                            <>
                              10
                              <SuiTypography component="span" variant="button">
                                %
                              </SuiTypography>
                            </>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TransparentInfoCard
                          color="dark"
                          icon="emoji_events"
                          description="3. Get other friends to generate link and get"
                          value={
                            <>
                              <SuiTypography component="span" variant="button">
                                $
                              </SuiTypography>
                              500
                            </>
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </SuiBox>
              <Divider />
              <SuiBox mt={2}>
                <SuiBox mb={1}>
                  <SuiTypography variant="h6" fontWeight="medium">
                    Other programs
                  </SuiTypography>
                </SuiBox>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={4}>
                    <ComplexBackgroundCard
                      image={image1}
                      description="User #hashtag in a photo on social media and get $10 for each purchase you make."
                      action={{
                        type: "internal",
                        route: "/ecommerce/referral",
                        label: "read more",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <ComplexBackgroundCard
                      image={officeDark}
                      description="Send the invitation link to 10 friends and get a 50% coupon to use on any purchase."
                      action={{
                        type: "internal",
                        route: "/ecommerce/referral",
                        label: "read more",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <OutlinedCard />
                  </Grid>
                </Grid>
              </SuiBox>
            </SuiBox>
          </Card>
        </SuiBox>
        <Card>
          <SuiBox pt={3} px={3}>
            <SuiTypography variant="h6" fontWeight="medium">
              Top Referred Users
            </SuiTypography>
          </SuiBox>
          <DataTable
            table={dataTableData}
            entriesPerPage={false}
            showTotalEntries={false}
            isSorted={false}
            noEndBorder
          />
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Referral;
