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

function DeleteAccount() {
  return (
    <Card id="delete-account">
      <SuiBox p={3} lineHeight={1}>
        <SuiBox mb={1}>
          <SuiTypography variant="h5">Delete Account</SuiTypography>
        </SuiBox>
        <SuiTypography variant="button" color="text" fontWeight="regular">
          Once you delete your account, there is no going back. Please be certain.
        </SuiTypography>
      </SuiBox>
      <SuiBox
        pb={3}
        px={3}
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <SuiBox display="flex" alignItems="center" mb={{ xs: 3, sm: 0 }}>
          <Switch />
          <SuiBox ml={2} lineHeight={0}>
            <SuiTypography display="block" variant="button" fontWeight="medium">
              Confirm
            </SuiTypography>
            <SuiTypography variant="caption" color="text">
              I want to delete my account.
            </SuiTypography>
          </SuiBox>
        </SuiBox>
        <SuiBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
          <SuiButton variant="outlined" color="secondary">
            deactivate
          </SuiButton>
          <SuiBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
            <SuiButton variant="gradient" color="error" sx={{ height: "100%" }}>
              delete account
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default DeleteAccount;
