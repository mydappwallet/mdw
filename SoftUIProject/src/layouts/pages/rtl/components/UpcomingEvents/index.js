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

// Soft UI Dashboard PRO React example components
import DefaultItem from "examples/Items/DefaultItem";

function OrdersOverview() {
  return (
    <Card sx={{ height: "100%" }}>
      <SuiBox pt={2} px={2}>
        <SuiTypography variant="h6" fontWeight="bold">
          الأحداث القادمة
        </SuiTypography>
        <SuiTypography variant="button" color="text" fontWeight="bold">
          انضم
        </SuiTypography>
      </SuiBox>
      <SuiBox p={2}>
        <DefaultItem icon="paid" title="أسبوع الإنترنت" description="01 يونيو 2021, ي 12:30 PM" />
        <SuiBox mt={3.5}>
          <DefaultItem
            color="primary"
            icon="notifications"
            title="لقاء مع ماري"
            description="24 مايو 2021, ي 10:00 PM"
          />
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default OrdersOverview;
