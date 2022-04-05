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
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

function SecuritySettings() {
  return (
    <Card>
      <SuiBox pt={2} px={2}>
        <SuiTypography variant="h6" fontWeight="medium">
          Security Settings
        </SuiTypography>
      </SuiBox>
      <SuiBox p={2}>
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          lineHeight={1}
        >
          <SuiTypography variant="button" fontWeight="regular" color="text">
            Notify me via email when logging in
          </SuiTypography>
          <SuiBox ml={2} mr={1}>
            <Switch defaultChecked />
          </SuiBox>
        </SuiBox>
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          lineHeight={1}
        >
          <SuiTypography variant="button" fontWeight="regular" color="text">
            Send SMS confirmation for all online payments
          </SuiTypography>
          <SuiBox ml={2} mr={1}>
            <Switch />
          </SuiBox>
        </SuiBox>
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          lineHeight={1}
        >
          <SuiTypography variant="button" fontWeight="regular" color="text">
            Check which devices accessed your account
          </SuiTypography>
          <SuiBox ml={2} mr={1}>
            <Switch defaultChecked />
          </SuiBox>
        </SuiBox>
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          lineHeight={1}
        >
          <SuiTypography variant="button" fontWeight="regular" color="text">
            Find My Device, make sure your device can be found if it gets lost
          </SuiTypography>
          <SuiBox ml={2} mr={1}>
            <Switch />
          </SuiBox>
        </SuiBox>
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          lineHeight={1}
        >
          <SuiTypography variant="button" fontWeight="regular" color="text">
            Lock your device with a PIN, pattern, or password
          </SuiTypography>
          <SuiBox ml={2} mr={1}>
            <Switch />
          </SuiBox>
        </SuiBox>
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          lineHeight={1}
        >
          <SuiTypography variant="button" fontWeight="regular" color="text">
            Manage what apps have access to app-usage data on your device
          </SuiTypography>
          <SuiBox ml={2} mr={1}>
            <Switch defaultChecked />
          </SuiBox>
        </SuiBox>
        <SuiBox display="flex" justifyContent="flex-end" mt={6}>
          <SuiBox mr={1}>
            <SuiButton variant="outlined" color="info" size="small">
              cancel
            </SuiButton>
          </SuiBox>
          <SuiButton variant="gradient" color="info" size="small">
            save changes
          </SuiButton>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default SecuritySettings;
