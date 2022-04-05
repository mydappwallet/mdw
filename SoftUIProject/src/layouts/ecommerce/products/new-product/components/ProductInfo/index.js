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

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiEditor from "components/SuiEditor";
import SuiSelect from "components/SuiSelect";

// NewProduct page components
import FormField from "layouts/ecommerce/products/new-product/components/FormField";

function ProductInfo() {
  const [editorValue, setEditorValue] = useState(
    "<p>Some initial <strong>bold</strong> text</p><br><br><br>"
  );

  return (
    <SuiBox>
      <SuiTypography variant="h5">Product Information</SuiTypography>
      <SuiBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="name" placeholder="eg. Off-White" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="weight" placeholder="eg. 42" />
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox mt={2}>
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
                Size
              </SuiTypography>
            </SuiBox>
            <SuiSelect
              defaultValue={{ value: "medium", label: "Medium" }}
              options={[
                { value: "extra large", label: "Extra Large" },
                { value: "extra small", label: "Extra Small" },
                { value: "large", label: "Large" },
                { value: "medium", label: "Medium" },
                { value: "small", label: "Small" },
              ]}
            />
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

export default ProductInfo;
