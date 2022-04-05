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

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiDropzone from "components/SuiDropzone";

function Media() {
  return (
    <SuiBox>
      <SuiTypography variant="h5">Media</SuiTypography>
      <SuiBox mt={3}>
        <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
          <SuiTypography component="label" variant="caption" fontWeight="bold">
            Product Image
          </SuiTypography>
        </SuiBox>
        <SuiDropzone options={{ addRemoveLinks: true }} />
      </SuiBox>
    </SuiBox>
  );
}

export default Media;
