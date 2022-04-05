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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard PRO React base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";

// Invoice page components
import BaseLayout from "layouts/pages/account/components/BaseLayout";

// Images
import logoCT from "assets/images/logo-ct.png";

function Invoice() {
  const { borderWidth } = borders;
  const { light } = colors;
  const borderBottom = `${borderWidth[1]} solid ${light.main}`;

  return (
    <BaseLayout stickyNavbar>
      <SuiBox mt={{ xs: 4, md: 10 }} mb={{ xs: 4, md: 8 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <Card>
              {/* Invoice header */}
              <SuiBox p={3}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={12} md={4}>
                    <SuiBox component="img" src={logoCT} width="25%" p={1} mb={1} />
                    <SuiTypography variant="h6" fontWeight="medium">
                      St. Independence Embankment, 050105 Bucharest, Romania
                    </SuiTypography>
                    <SuiBox mt={1} mb={2}>
                      <SuiTypography display="block" variant="body2" color="secondary">
                        tel: +4 (074) 1090873
                      </SuiTypography>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} md={7} lg={3}>
                    <SuiBox width="100%" textAlign={{ xs: "left", md: "right" }} mt={6}>
                      <SuiBox mt={1}>
                        <SuiTypography variant="h6" fontWeight="medium">
                          Billed to: John Doe
                        </SuiTypography>
                      </SuiBox>
                      <SuiBox mb={1}>
                        <SuiTypography variant="body2" color="secondary">
                          4006 Locust View Drive
                          <br />
                          San Francisco CA
                          <br />
                          California
                        </SuiTypography>
                      </SuiBox>
                    </SuiBox>
                  </Grid>
                </Grid>
                <SuiBox mt={{ xs: 5, md: 10 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                      <SuiTypography variant="h6" color="secondary" fontWeight="medium">
                        Invoice no
                      </SuiTypography>
                      <SuiTypography variant="h5" fontWeight="medium">
                        #0453119
                      </SuiTypography>
                    </Grid>
                    <Grid item xs={12} md={7} lg={5}>
                      <SuiBox
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                        mt={{ xs: 3, md: 0 }}
                      >
                        <SuiBox width="50%">
                          <SuiTypography variant="h6" color="secondary" fontWeight="medium">
                            Invoice date:
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox width="50%">
                          <SuiTypography variant="h6" fontWeight="medium">
                            06/03/2019
                          </SuiTypography>
                        </SuiBox>
                      </SuiBox>
                      <SuiBox
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                      >
                        <SuiBox width="50%">
                          <SuiTypography variant="h6" color="secondary" fontWeight="medium">
                            Due date:
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox width="50%">
                          <SuiTypography variant="h6" fontWeight="medium">
                            11/03/2019
                          </SuiTypography>
                        </SuiBox>
                      </SuiBox>
                    </Grid>
                  </Grid>
                </SuiBox>
              </SuiBox>

              {/* Invoice table */}
              <SuiBox p={3}>
                <SuiBox width="100%" overflow="auto">
                  <Table sx={{ minWidth: "32rem" }}>
                    <SuiBox component="thead">
                      <TableRow>
                        <SuiBox
                          component="th"
                          width={{ xs: "45%", md: "50%" }}
                          py={1.5}
                          px={1}
                          textAlign="left"
                          borderBottom={borderBottom}
                        >
                          <SuiTypography variant="h6" color="text" fontWeight="medium">
                            Item
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox
                          component="th"
                          py={1.5}
                          pl={3}
                          pr={1}
                          textAlign="left"
                          borderBottom={borderBottom}
                        >
                          <SuiTypography variant="h6" color="text" fontWeight="medium">
                            Qty
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox
                          component="th"
                          py={1.5}
                          pl={3}
                          pr={1}
                          textAlign="left"
                          borderBottom={borderBottom}
                        >
                          <SuiTypography variant="h6" color="text" fontWeight="medium">
                            Rate
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox
                          component="th"
                          py={1.5}
                          pl={3}
                          pr={1}
                          textAlign="left"
                          borderBottom={borderBottom}
                        >
                          <SuiTypography variant="h6" color="text" fontWeight="medium">
                            Amount
                          </SuiTypography>
                        </SuiBox>
                      </TableRow>
                    </SuiBox>
                    <TableBody>
                      <TableRow>
                        <SuiBox component="td" textAlign="left" p={1} borderBottom={borderBottom}>
                          <SuiTypography variant="body2" color="text">
                            Premium Support
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <SuiTypography variant="body2" color="text">
                            1
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <SuiTypography variant="body2" color="text">
                            $ 9.00
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <SuiTypography variant="body2" color="text">
                            $ 9.00
                          </SuiTypography>
                        </SuiBox>
                      </TableRow>
                      <TableRow>
                        <SuiBox component="td" textAlign="left" p={1} borderBottom={borderBottom}>
                          <SuiTypography variant="body2" color="text">
                            Soft UI Design System PRO
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <SuiTypography variant="body2" color="text">
                            3
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <SuiTypography variant="body2" color="text">
                            $ 100.00
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <SuiTypography variant="body2" color="text">
                            $ 300.00
                          </SuiTypography>
                        </SuiBox>
                      </TableRow>
                      <TableRow>
                        <SuiBox component="td" textAlign="left" p={1}>
                          <SuiTypography variant="body2" color="text">
                            Parts for service
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox component="td" textAlign="left" py={1} pr={1} pl={3}>
                          <SuiTypography variant="body2" color="text">
                            1
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox component="td" textAlign="left" py={1} pr={1} pl={3}>
                          <SuiTypography variant="body2" color="text">
                            $ 89.00
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox component="td" textAlign="left" py={1} pr={1} pl={3}>
                          <SuiTypography variant="body2" color="text">
                            $ 89.00
                          </SuiTypography>
                        </SuiBox>
                      </TableRow>
                      <TableRow>
                        <SuiBox component="td" textAlign="left" p={1} borderBottom={borderBottom} />
                        <SuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        />
                        <SuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <SuiTypography variant="h5">Total</SuiTypography>
                        </SuiBox>
                        <SuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <SuiTypography variant="h5">$ 698</SuiTypography>
                        </SuiBox>
                      </TableRow>
                    </TableBody>
                  </Table>
                </SuiBox>
              </SuiBox>

              {/* Invoice footer */}
              <SuiBox p={3} mt={7}>
                <Grid container>
                  <Grid item xs={12} lg={5}>
                    <SuiTypography variant="h5" fontWeight="medium">
                      Thank you!
                    </SuiTypography>
                    <SuiBox mt={1} mb={2} lineHeight={0}>
                      <SuiTypography variant="button" fontWeight="regular" color="secondary">
                        If you encounter any issues related to the invoice you can contact us at:
                      </SuiTypography>
                    </SuiBox>
                    <SuiTypography
                      component="span"
                      variant="h6"
                      fontWeight="medium"
                      color="secondary"
                    >
                      email:{" "}
                      <SuiTypography component="span" variant="h6" fontWeight="medium">
                        support@creative-tim.com
                      </SuiTypography>
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={12} lg={7}>
                    <SuiBox
                      width="100%"
                      height={{ xs: "auto", md: "100%" }}
                      display="flex"
                      justifyContent={{ xs: "flex-start", md: "flex-end" }}
                      alignItems="flex-end"
                      mt={{ xs: 2, md: 0 }}
                    >
                      <SuiButton variant="gradient" color="info" onClick={() => window.print(this)}>
                        print
                      </SuiButton>
                    </SuiBox>
                  </Grid>
                </Grid>
              </SuiBox>
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
    </BaseLayout>
  );
}

export default Invoice;
