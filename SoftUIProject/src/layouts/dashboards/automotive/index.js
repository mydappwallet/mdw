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

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Automotive dashboard components
import AutomotiveDetails from "layouts/dashboards/automotive/components/AutomotiveDetails";
import AutomotiveMonitor from "layouts/dashboards/automotive/components/AutomotiveMonitor";

function Automotive() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox pt={3}>
        <SuiBox mb={3}>
          <AutomotiveDetails />
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MiniStatisticsCard
                bgColor="secondary"
                title={{ text: "today's trip", fontWeight: "medium" }}
                count="145 Km"
                icon={{ component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MiniStatisticsCard
                bgColor="secondary"
                title={{ text: "battery health", fontWeight: "medium" }}
                count="99 %"
                icon={{ component: "sports_esports" }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MiniStatisticsCard
                bgColor="secondary"
                title={{ text: "average speed", fontWeight: "medium" }}
                count="56 Km/h"
                icon={{ component: "speed" }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MiniStatisticsCard
                bgColor="secondary"
                title={{ text: "music volume", fontWeight: "medium" }}
                count="15/100"
                icon={{ color: "info", component: "music_note" }}
              />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <AutomotiveMonitor />
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Automotive;
