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

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiSelect from "components/SuiSelect";
import SuiDatePicker from "components/SuiDatePicker";
import SuiEditor from "components/SuiEditor";
import SuiDropzone from "components/SuiDropzone";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function NewProject() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [editorValue, setEditorValue] = useState(
    "<p>Hello World!</p><p>Some initial <strong>bold</strong> text</p><br><br>"
  );

  const handleSetStartDate = (newDate) => setStartDate(newDate);
  const handleSetEndDate = (newDate) => setEndDate(newDate);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={3} mb={4}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={9}>
            <Card sx={{ overflow: "visible" }}>
              <SuiBox p={2} lineHeight={1}>
                <SuiTypography variant="h6" fontWeight="medium">
                  New Project
                </SuiTypography>
                <SuiTypography variant="button" fontWeight="regular" color="text">
                  Create new project
                </SuiTypography>
                <Divider />
                <SuiBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Project Name
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput placeholder="Soft UI Dashboard PRO Material" />
                </SuiBox>
                <SuiBox mt={3} mb={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                        <SuiTypography component="label" variant="caption" fontWeight="bold">
                          Private Project
                        </SuiTypography>
                      </SuiBox>
                      <SuiBox pl={0.5} pb={1.5}>
                        <SuiTypography
                          component="label"
                          variant="caption"
                          fontWeight="regular"
                          color="text"
                        >
                          If you are available for hire outside of the current situation, you can
                          encourage others to hire you.
                        </SuiTypography>
                      </SuiBox>
                      <SuiBox ml={0.5} mb={0.25}>
                        <Switch />
                      </SuiBox>
                    </Grid>
                  </Grid>
                </SuiBox>
                <SuiBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SuiBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Project Description
                    </SuiTypography>
                  </SuiBox>
                  <SuiBox mb={1.5} ml={0.5} mt={0.5} lineHeight={0} display="inline-block">
                    <SuiTypography
                      component="label"
                      variant="caption"
                      fontWeight="regular"
                      color="text"
                    >
                      This is how others will learn about the project, so make it good!
                    </SuiTypography>
                  </SuiBox>
                  <SuiEditor value={editorValue} onChange={setEditorValue} />
                </SuiBox>

                <SuiBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SuiBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Project Tags
                    </SuiTypography>
                  </SuiBox>
                  <SuiSelect
                    defaultValue={[
                      { value: "choice 1", label: "Choice 1" },
                      { value: "label two", label: "label two" },
                    ]}
                    options={[
                      { value: "choice 1", label: "Choice 1" },
                      { value: "choice 2", label: "Choice 2" },
                      { value: "choice 3", label: "Choice 3" },
                      { value: "choice 4", label: "Choice 4" },
                      { value: "label one", label: "Label One", isDisabled: true },
                      { value: "label two", label: "Tabel Two" },
                      { value: "label three", label: "Label Three" },
                    ]}
                    isMulti
                  />
                </SuiBox>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <SuiBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <SuiBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                        <SuiTypography component="label" variant="caption" fontWeight="bold">
                          Start Date
                        </SuiTypography>
                      </SuiBox>
                      <SuiDatePicker value={startDate} onChange={handleSetStartDate} />
                    </SuiBox>
                  </Grid>
                  <Grid item xs={6}>
                    <SuiBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <SuiBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                        <SuiTypography component="label" variant="caption" fontWeight="bold">
                          End Date
                        </SuiTypography>
                      </SuiBox>
                      <SuiDatePicker value={endDate} onChange={handleSetEndDate} />
                    </SuiBox>
                  </Grid>
                </Grid>
                <SuiBox>
                  <SuiBox
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                    height="100%"
                  >
                    <SuiBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                      <SuiTypography component="label" variant="caption" fontWeight="bold">
                        Starting Files
                      </SuiTypography>
                    </SuiBox>
                    <SuiDropzone options={{ addRemoveLinks: true }} />
                  </SuiBox>
                </SuiBox>
                <SuiBox display="flex" justifyContent="flex-end" mt={3}>
                  <SuiBox mr={1}>
                    <SuiButton color="light">cancel</SuiButton>
                  </SuiBox>
                  <SuiButton variant="gradient" color="info">
                    create project
                  </SuiButton>
                </SuiBox>
              </SuiBox>
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NewProject;
