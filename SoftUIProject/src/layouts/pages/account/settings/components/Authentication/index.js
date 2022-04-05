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
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiBadge from "components/SuiBadge";

function Authentication() {
  return (
    <Card id="2fa" sx={{ overflow: "visible" }}>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SuiTypography variant="h5">Two-factor authentication</SuiTypography>
        <SuiBadge variant="contained" color="success" badgeContent="enabled" container />
      </SuiBox>
      <SuiBox p={3}>
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <SuiTypography variant="body2" color="text">
            Security keys
          </SuiTypography>
          <SuiBox
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <SuiBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <SuiTypography variant="button" color="text" fontWeight="regular">
                No Security keys
              </SuiTypography>
            </SuiBox>
            <SuiButton variant="outlined" color="dark" size="small">
              add
            </SuiButton>
          </SuiBox>
        </SuiBox>
        <Divider />
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <SuiTypography variant="body2" color="text">
            SMS number
          </SuiTypography>
          <SuiBox
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <SuiBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <SuiTypography variant="button" color="text" fontWeight="regular">
                +3012374423
              </SuiTypography>
            </SuiBox>
            <SuiButton variant="outlined" color="dark" size="small">
              edit
            </SuiButton>
          </SuiBox>
        </SuiBox>
        <Divider />
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <SuiTypography variant="body2" color="text">
            Authenticator app
          </SuiTypography>
          <SuiBox
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <SuiBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <SuiTypography variant="button" color="text" fontWeight="regular">
                Not Configured
              </SuiTypography>
            </SuiBox>
            <SuiButton variant="outlined" color="dark" size="small">
              set up
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default Authentication;
