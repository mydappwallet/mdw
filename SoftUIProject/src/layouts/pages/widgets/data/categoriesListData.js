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
import SuiTypography from "components/SuiTypography";

export default [
  {
    color: "dark",
    icon: "devices_other",
    name: "Devices",
    description: (
      <>
        250 in stock,{" "}
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          346+ sold
        </SuiTypography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: "settings",
    name: "Tickets",
    description: (
      <>
        123 closed,{" "}
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          15 open
        </SuiTypography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: "info",
    name: "Error logs",
    description: (
      <>
        1 is active,{" "}
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          40 closed
        </SuiTypography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: "thumb_up",
    name: "Happy users",
    description: (
      <SuiTypography variant="caption" color="text" fontWeight="medium">
        + 430
      </SuiTypography>
    ),
    route: "/",
  },
];
