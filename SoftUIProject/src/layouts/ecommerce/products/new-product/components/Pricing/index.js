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

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiSelect from "components/SuiSelect";

// NewProduct page components
import FormField from "layouts/ecommerce/products/new-product/components/FormField";

function Pricing() {
  return (
    <SuiBox>
      <SuiTypography variant="h5">Pricing</SuiTypography>
      <SuiBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <FormField type="text" label="price" placeholder="99.00" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Currency
              </SuiTypography>
            </SuiBox>
            <SuiSelect
              defaultValue={{ value: "usd", label: "USD" }}
              options={[
                { value: "btc", label: "BTC" },
                { value: "cny", label: "CNY" },
                { value: "eur", label: "EUR" },
                { value: "gbp", label: "GBP" },
                { value: "inr", label: "INR" },
                { value: "use", label: "USD" },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormField type="text" label="SKU" placeholder="71283476591" />
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox mt={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <SuiTypography component="label" variant="caption" fontWeight="bold">
                Project Tags
              </SuiTypography>
            </SuiBox>
            <SuiSelect
              defaultValue={[
                { value: "in stock", label: "In Stock" },
                { value: "out of stock", label: "Out of Stock" },
              ]}
              options={[
                { value: "black friday", label: "Black Friday" },
                { value: "expired", label: "Expired", isDisabled: true },
                { value: "out of stock", label: "Out of Stock" },
                { value: "in stock", label: "In Stock" },
                { value: "sale", label: "Sale" },
              ]}
              size="large"
              isMulti
            />
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

export default Pricing;
