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
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiBadge from "components/SuiBadge";
import SuiSelect from "components/SuiSelect";
import SuiInput from "components/SuiInput";

function ProductInfo() {
  const frameOptions = [
    { value: "aluminium", label: "Aluminium" },
    { value: "carbon", label: "Carbon" },
    { value: "steel", label: "Steel" },
    { value: "wood", label: "Wood" },
  ];

  const colorOptions = [
    { value: "black", label: "black" },
    { value: "blue", label: "blue" },
    { value: "gray", label: "gray" },
    { value: "pink", label: "pink" },
    { value: "red", label: "red" },
    { value: "white", label: "white" },
  ];

  return (
    <SuiBox>
      <SuiBox mb={1}>
        <SuiTypography variant="h3" fontWeight="bold">
          Minimal Bar Stool
        </SuiTypography>
      </SuiBox>
      <SuiTypography variant="h4" color="text">
        <Icon>star</Icon>
        <Icon>star</Icon>
        <Icon>star</Icon>
        <Icon>star</Icon>
        <Icon>star_half</Icon>
      </SuiTypography>
      <SuiBox mt={1}>
        <SuiTypography variant="h6" fontWeight="medium">
          Price
        </SuiTypography>
      </SuiBox>
      <SuiBox mb={1}>
        <SuiTypography variant="h5" fontWeight="medium">
          $1,419
        </SuiTypography>
      </SuiBox>
      <SuiBadge variant="contained" color="success" badgeContent="in stock" container />
      <SuiBox mt={3} mb={1} ml={0.5}>
        <SuiTypography variant="caption" fontWeight="bold">
          Description
        </SuiTypography>
      </SuiBox>
      <SuiBox component="ul" m={0} pl={4} mb={2}>
        <SuiBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <SuiTypography variant="body2" color="text" verticalAlign="middle">
            The most beautiful curves of this swivel stool adds an elegant touch to any environment
          </SuiTypography>
        </SuiBox>
        <SuiBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <SuiTypography variant="body2" color="text" verticalAlign="middle">
            Memory swivel seat returns to original seat position
          </SuiTypography>
        </SuiBox>
        <SuiBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <SuiTypography variant="body2" color="text" verticalAlign="middle">
            Comfortable integrated layered chair seat cushion design
          </SuiTypography>
        </SuiBox>
        <SuiBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <SuiTypography variant="body2" color="text" verticalAlign="middle">
            Fully assembled! No assembly required
          </SuiTypography>
        </SuiBox>
      </SuiBox>
      <SuiBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <SuiTypography component="label" variant="caption" fontWeight="bold">
                Frame Material
              </SuiTypography>
            </SuiBox>
            <SuiSelect defaultValue={frameOptions[3]} options={frameOptions} />
          </Grid>
          <Grid item xs={12} lg={5}>
            <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <SuiTypography component="label" variant="caption" fontWeight="bold">
                Color
              </SuiTypography>
            </SuiBox>
            <SuiSelect defaultValue={colorOptions[5]} options={colorOptions} />
          </Grid>
          <Grid item xs={12} lg={2}>
            <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <SuiTypography component="label" variant="caption" fontWeight="bold">
                Quantity
              </SuiTypography>
            </SuiBox>
            <SuiInput inputProps={{ type: "number" }} defaultValue={1} />
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox mt={3}>
        <Grid item xs={12} lg={5} container>
          <SuiButton variant="gradient" color="info" fullWidth>
            add to cart
          </SuiButton>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

export default ProductInfo;
