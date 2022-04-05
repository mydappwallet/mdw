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

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <>
      <SuiTypography variant="h6" fontWeight="medium">
        Track order
      </SuiTypography>
      <SuiBox mt={2}>
        <TimelineItem
          color="secondary"
          icon="notifications"
          title="Order received"
          dateTime="22 DEC 7:20 PM"
        />
        <TimelineItem
          color="secondary"
          icon="inventory_2"
          title="Generate order id #1832412"
          dateTime="22 DEC 7:21 AM"
        />
        <TimelineItem
          color="secondary"
          icon="shopping_cart"
          title="Order transmited to courier"
          dateTime="22 DEC 8:10 AM"
        />
        <TimelineItem
          color="success"
          icon="done"
          title="Order delivered"
          dateTime="22 DEC 4:54 PM"
        />
      </SuiBox>
    </>
  );
}

export default OrdersOverview;
