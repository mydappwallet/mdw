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

// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiSelect from "components/SuiSelect";
import SuiTagInput from "components/SuiTagInput";

// Settings page components
import FormField from "layouts/pages/account/components/FormField";

// Data
import selectData from "layouts/pages/account/settings/components/BasicInfo/data/selectData";

function BasicInfo() {
  const [skills, setSkills] = useState(["react", "angular"]);

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <SuiBox p={3}>
        <SuiTypography variant="h5">Basic Info</SuiTypography>
      </SuiBox>
      <SuiBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField label="first name" placeholder="Alec" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="last name" placeholder="Thompson" />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <SuiBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SuiTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      I&apos;m
                    </SuiTypography>
                  </SuiBox>
                  <SuiSelect placeholder="Male" options={selectData.gender} />
                </SuiBox>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5}>
                    <SuiBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                        <SuiTypography
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                          textTransform="capitalize"
                        >
                          birth date
                        </SuiTypography>
                      </SuiBox>
                      <SuiSelect placeholder="February" options={selectData.birthDate} />
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SuiBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <SuiSelect placeholder={1} options={selectData.days} />
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <SuiBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <SuiSelect placeholder={2021} options={selectData.years} />
                    </SuiBox>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="confirmation email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="your location" placeholder="Sydney, A" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="phone number"
              placeholder="+40 735 631 620"
              inputProps={{ type: "number" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField label="language" placeholder="English" />
          </Grid>
          <Grid item xs={12} md={6}>
            <SuiBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SuiTagInput
                tags={skills}
                placeholder=" "
                onChange={(newSkill) => setSkills(newSkill)}
                removeOnBackspace
              />
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
    </Card>
  );
}

export default BasicInfo;
