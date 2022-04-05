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

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAlert from "components/SuiAlert";
import SuiButton from "components/SuiButton";
import SuiSnackbar from "components/SuiSnackbar";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Notifications() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const alertContent = (name) => (
    <SuiTypography variant="body2" color="white">
      A simple {name} alert with{" "}
      <SuiTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </SuiTypography>
      . Give it a click if you like.
    </SuiTypography>
  );

  const renderSuccessSB = (
    <SuiSnackbar
      color="success"
      icon="check"
      title="Soft UI Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <SuiSnackbar
      icon="notifications"
      title="Soft UI Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <SuiSnackbar
      color="warning"
      icon="star"
      title="Soft UI Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <SuiSnackbar
      color="error"
      icon="warning"
      title="Soft UI Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <SuiBox p={2}>
                <SuiTypography variant="h5">Alerts</SuiTypography>
              </SuiBox>
              <SuiBox pt={2} px={2}>
                <SuiAlert color="primary" dismissible>
                  {alertContent("primary")}
                </SuiAlert>
                <SuiAlert color="secondary" dismissible>
                  {alertContent("secondary")}
                </SuiAlert>
                <SuiAlert color="success" dismissible>
                  {alertContent("success")}
                </SuiAlert>
                <SuiAlert color="error" dismissible>
                  {alertContent("error")}
                </SuiAlert>
                <SuiAlert color="warning" dismissible>
                  {alertContent("warning")}
                </SuiAlert>
                <SuiAlert color="info" dismissible>
                  {alertContent("info")}
                </SuiAlert>
                <SuiAlert color="light" dismissible>
                  {alertContent("light")}
                </SuiAlert>
                <SuiAlert color="dark" dismissible>
                  {alertContent("dark")}
                </SuiAlert>
              </SuiBox>
            </Card>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Card>
              <SuiBox p={2} lineHeight={0}>
                <SuiTypography variant="h5">Notifications</SuiTypography>
                <SuiTypography variant="button" color="text" fontWeight="regular">
                  Notifications on this page use Toasts from Bootstrap. Read more details here.
                </SuiTypography>
              </SuiBox>
              <SuiBox p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <SuiButton variant="gradient" color="success" onClick={openSuccessSB} fullWidth>
                      success notification
                    </SuiButton>
                    {renderSuccessSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <SuiButton variant="gradient" color="info" onClick={openInfoSB} fullWidth>
                      info notification
                    </SuiButton>
                    {renderInfoSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <SuiButton variant="gradient" color="warning" onClick={openWarningSB} fullWidth>
                      warning notification
                    </SuiButton>
                    {renderWarningSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <SuiButton variant="gradient" color="error" onClick={openErrorSB} fullWidth>
                      error notification
                    </SuiButton>
                    {renderErrorSB}
                  </Grid>
                </Grid>
              </SuiBox>
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
