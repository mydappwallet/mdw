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
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Analytics application components
import PagesHeaderCell from "layouts/applications/analytics/components/PagesHeaderCell";
import PagesBodyCell from "layouts/applications/analytics/components/PagesBodyCell";

function Pages() {
  return (
    <Card>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SuiTypography variant="h6">Pages</SuiTypography>
        <Tooltip title="Data is based from sessions and is 100% accurate" placement="left">
          <SuiButton variant="outlined" color="success" size="small" circular iconOnly>
            <Icon sx={{ fontWeight: "bold" }}>done</Icon>
          </SuiButton>
        </Tooltip>
      </SuiBox>
      <SuiBox py={1} px={2}>
        <TableContainer sx={{ boxShadow: "none" }}>
          <Table>
            <SuiBox component="thead">
              <TableRow>
                <PagesHeaderCell>page</PagesHeaderCell>
                <PagesHeaderCell>pages view</PagesHeaderCell>
                <PagesHeaderCell>avg. time</PagesHeaderCell>
                <PagesHeaderCell>bounce rate</PagesHeaderCell>
              </TableRow>
            </SuiBox>
            <TableBody>
              <PagesBodyCell rows={["1. /bits", 345, "00:17:07", "40.91%"]} />
              <PagesBodyCell rows={["2. /pages/argon-dashboard", 520, "00:23:13", "31.14%"]} />
              <PagesBodyCell rows={["3. /pages/soft-ui-dashboard", 122, "00:3:10", "54.10%"]} />
              <PagesBodyCell rows={["4. /bootstrap-themes", "1,900", "00:30:42", "20.93%"]} />
              <PagesBodyCell rows={["5. /react-themes", "1,442", "00:31:50", "34.98%"]} />
              <PagesBodyCell
                rows={["6. /product/argon-dashboard-angular", "201", "00:12:42", "21.4%"]}
              />
              <PagesBodyCell
                rows={["7. /product/material-dashboard-pro", "2,115", "00:50:11", "34.98%"]}
                noBorder
              />
            </TableBody>
          </Table>
        </TableContainer>
      </SuiBox>
    </Card>
  );
}

export default Pages;
