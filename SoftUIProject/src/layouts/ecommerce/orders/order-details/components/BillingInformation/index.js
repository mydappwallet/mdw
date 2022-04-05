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

function BillingInformation() {
  return (
    <>
      <SuiTypography variant="h6" fontWeight="medium">
        Billing Information
      </SuiTypography>
      <SuiBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor="grey-100"
        borderRadius="lg"
        p={3}
        mt={2}
      >
        <SuiBox width="100%" display="flex" flexDirection="column" lineHeight={1}>
          <SuiBox mb={2}>
            <SuiTypography variant="button" fontWeight="medium" textTransform="capitalize">
              Oliver Liam
            </SuiTypography>
          </SuiBox>
          <SuiBox mb={1} lineHeight={0}>
            <SuiTypography variant="caption" color="text">
              Company Name:&nbsp;&nbsp;&nbsp;
              <SuiTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                Viking Burrito
              </SuiTypography>
            </SuiTypography>
          </SuiBox>
          <SuiBox mb={1} lineHeight={0}>
            <SuiTypography variant="caption" color="text">
              Email Address:&nbsp;&nbsp;&nbsp;
              <SuiTypography variant="caption" fontWeight="medium">
                oliver@burrito.com
              </SuiTypography>
            </SuiTypography>
          </SuiBox>
          <SuiTypography variant="caption" color="text">
            VAT Number:&nbsp;&nbsp;&nbsp;
            <SuiTypography variant="caption" fontWeight="medium">
              FRB1235476
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </>
  );
}

export default BillingInformation;
