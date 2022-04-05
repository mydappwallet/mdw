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
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import Globe from "examples/Globe";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// VR dashboards components
import BaseLayout from "layouts/dashboards/virtual-reality/components/BaseLayout";

// Data
import salesTableData from "layouts/dashboards/default/data/salesTableData";

function VRDefault() {
  const { values } = breakpoints;

  return (
    <BaseLayout>
      <SuiBox ml={{ xs: 0, md: 3 }} py={{ xs: 0, md: 3 }} mt={{ xs: 0, md: 4 }}>
        <Grid container>
          <Grid item xs={12} lg={7}>
            <SuiBox mb={3} p={1}>
              <SuiTypography
                variant={window.innerWidth < values.sm ? "h3" : "h2"}
                textTransform="capitalize"
                fontWeight="bold"
                gutterBottom
              >
                general statistics
              </SuiTypography>
              <SuiBox display="flex" alignItems="center">
                <SuiBox mr={3}>
                  <SuiTypography variant="h6">All users</SuiTypography>
                </SuiBox>
                <SuiTypography
                  component="a"
                  href="#"
                  variant="button"
                  color="info"
                  sx={({ typography: { size }, functions: { pxToRem } }) => ({
                    display: "flex",
                    alignItems: "center",

                    "& .material-icons-round": {
                      fontSize: size.md,
                      transform: `translate(0, ${pxToRem(-1)})`,
                      transition: "all 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                    },

                    "&:hover .material-icons-round, &:focus .material-icons-round": {
                      transform: `translate(${pxToRem(5)}, ${pxToRem(-1)})`,
                    },
                  })}
                >
                  Read More&nbsp;
                  <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                </SuiTypography>
              </SuiBox>
              <SuiTypography
                variant={window.innerWidth < values.sm ? "h2" : "h1"}
                textTransform="capitalize"
                fontWeight="bold"
                gutterBottom
              >
                1,600,000
              </SuiTypography>
            </SuiBox>

            <Grid container>
              <Grid item xs={12}>
                <Globe
                  display={{ xs: "none", md: "block" }}
                  position="absolute"
                  top="25%"
                  right={0}
                  mt={{ xs: -12, lg: 1 }}
                  mr={{ xs: 0, lg: 24 }}
                  canvassx={{ marginTop: "3rem", outline: "none", transform: "scale(1.6)" }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={5} xl={4}>
                <SuiBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "today's money" }}
                    count="$53,000"
                    percentage={{ color: "success", text: "+55%" }}
                    icon={{ color: "info", component: "paid" }}
                  />
                </SuiBox>
                <MiniStatisticsCard
                  title={{ text: "today's users" }}
                  count="2,300"
                  percentage={{ color: "success", text: "+3%" }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
              <Grid item xs={12} md={5} xl={4}>
                <SuiBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "new clients" }}
                    count="+3,462"
                    percentage={{ color: "error", text: "-2%" }}
                    icon={{ color: "info", component: "emoji_events" }}
                  />
                </SuiBox>
                <SuiBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "sales" }}
                    count="$103,430"
                    percentage={{ color: "success", text: "+5%" }}
                    icon={{
                      color: "info",
                      component: "shopping_cart",
                    }}
                  />
                </SuiBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={10} lg={7}>
            <Grid item xs={12}>
              <SuiBox mb={3} position="relative">
                <SalesTable title="Sales by Country" rows={salesTableData} />
              </SuiBox>
            </Grid>
          </Grid>
        </Grid>
      </SuiBox>
    </BaseLayout>
  );
}

export default VRDefault;
