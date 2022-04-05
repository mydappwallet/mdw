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

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiEditor from "components/SuiEditor";
import SuiSelect from "components/SuiSelect";

// NewProduct page components
import FormField from "layouts/ecommerce/products/edit-product/components/FormField";

function ProductInfo() {
  const [editorValue, setEditorValue] = useState(
    `<p>
      Long sleeves black denim jacket with a twisted design. Contrast stitching. Button up closure. White arrow prints on the back.
    </p>`
  );

  return (
    <Card sx={{ overflow: "visible" }}>
      <SuiBox p={3}>
        <SuiTypography variant="h5">Product Information</SuiTypography>
        <SuiBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField type="text" label="name" defaultValue="Minimal Bar Stool" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField type="number" label="weight" defaultValue={2} />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <FormField type="text" label="collection" defaultValue="Summer" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormField type="text" label="price" defaultValue="$90" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormField type="number" label="quantity" defaultValue={50} />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <SuiTypography component="label" variant="caption" fontWeight="bold">
                  Description&nbsp;&nbsp;
                  <SuiTypography variant="caption" fontWeight="regular" color="text">
                    (optional)
                  </SuiTypography>
                </SuiTypography>
              </SuiBox>
              <SuiEditor value={editorValue} onChange={setEditorValue} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SuiBox mb={3}>
                <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                  <SuiTypography
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                    textTransform="capitalize"
                  >
                    Category
                  </SuiTypography>
                </SuiBox>
                <SuiSelect
                  defaultValue={{ value: "clothing", label: "Clothing" }}
                  options={[
                    { value: "clothing", label: "Clothing" },
                    { value: "electronics", label: "Electronics" },
                    { value: "furniture", label: "Furniture" },
                    { value: "others", label: "Others" },
                    { value: "real estate", label: "Real Estate" },
                  ]}
                />
              </SuiBox>
              <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <SuiTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  Color
                </SuiTypography>
              </SuiBox>
              <SuiSelect
                defaultValue={{ value: "black", label: "Black" }}
                options={[
                  { value: "black", label: "Black" },
                  { value: "blue", label: "Blue" },
                  { value: "green", label: "Green" },
                  { value: "orange", label: "Orange" },
                  { value: "white", label: "White" },
                ]}
              />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default ProductInfo;
