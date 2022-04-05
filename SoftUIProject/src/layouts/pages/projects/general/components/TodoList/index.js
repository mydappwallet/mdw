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

// Soft UI Dasboard PRO Material components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// General page components
import Todo from "layouts/pages/projects/general/components/Todo";

function TodoList() {
  return (
    <Card>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SuiTypography variant="h6" fontWeight="medium">
          To do list
        </SuiTypography>
        <SuiTypography variant="button" fontWeight="regular" color="text">
          23 - 30 March 2020
        </SuiTypography>
      </SuiBox>
      <Divider />
      <SuiBox pb={2} px={2}>
        <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Todo
            title="Check status"
            date="24 March 2019"
            project="2414_VR4sf3#"
            company="Creative Tim"
            defaultChecked
          />
          <Todo
            color="dark"
            title="Management discussion"
            date="24 March 2019"
            project="4411_8sIsdd23"
            company="Apple"
            defaultChecked
          />
          <Todo
            color="warning"
            title="New channel distribution"
            date="25 March 2019"
            project="827d_kdl33D1s"
            company="Slack"
            defaultChecked
          />
          <Todo
            color="success"
            title="IOS App development"
            date="26 March 2019"
            project="88s1_349DA2sa"
            company="Facebook"
            noDivider
          />
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default TodoList;
