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
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Setting pages components
import TableCell from "layouts/pages/account/settings/components/TableCell";

function Notifications() {
  return (
    <Card id="notifications">
      <SuiBox p={3} lineHeight={1}>
        <SuiBox mb={1}>
          <SuiTypography variant="h5">Notifications</SuiTypography>
        </SuiBox>
        <SuiTypography variant="button" color="text" fontWeight="regular">
          Choose how you receive notifications. These notification settings apply to the things
          you’re watching.
        </SuiTypography>
      </SuiBox>
      <SuiBox pb={3} px={3}>
        <SuiBox minWidth="auto" sx={{ overflow: "scroll" }}>
          <Table sx={{ minWidth: "36rem" }}>
            <SuiBox component="thead">
              <TableRow>
                <TableCell width="100%" padding={[1.5, 3, 1.5, 0.5]}>
                  Activity
                </TableCell>
                <TableCell align="center" padding={[1.5, 3, 1.5, 3]}>
                  Email
                </TableCell>
                <TableCell align="center" padding={[1.5, 3, 1.5, 3]}>
                  Push
                </TableCell>
                <TableCell align="center" padding={[1.5, 3, 1.5, 3]}>
                  SMS
                </TableCell>
              </TableRow>
            </SuiBox>
            <TableBody>
              <TableRow>
                <TableCell padding={[1, 1, 1, 0.5]}>
                  <SuiBox lineHeight={1.4}>
                    <SuiTypography display="block" variant="button" fontWeight="regular">
                      Mentions
                    </SuiTypography>
                    <SuiTypography variant="caption" color="text" fontWeight="regular">
                      Notify when another user mentions you in a comment
                    </SuiTypography>
                  </SuiBox>
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding={[1, 1, 1, 0.5]}>
                  <SuiBox lineHeight={1.4}>
                    <SuiTypography display="block" variant="button" fontWeight="regular">
                      Comments
                    </SuiTypography>
                    <SuiTypography variant="caption" color="text" fontWeight="regular">
                      Notify when another user comments your item.
                    </SuiTypography>
                  </SuiBox>
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding={[1, 1, 1, 0.5]}>
                  <SuiBox lineHeight={1.4}>
                    <SuiTypography display="block" variant="button" fontWeight="regular">
                      Follows
                    </SuiTypography>
                    <SuiTypography variant="caption" color="text" fontWeight="regular">
                      Notify when another user follows you.
                    </SuiTypography>
                  </SuiBox>
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding={[1, 1, 1, 0.5]} noBorder>
                  <SuiTypography display="block" variant="button" color="text" fontWeight="regular">
                    Log in from a new device
                  </SuiTypography>
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]} noBorder>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]} noBorder>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]} noBorder>
                  <Switch defaultChecked />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default Notifications;
