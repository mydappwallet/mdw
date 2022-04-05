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
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

function ReferralCode() {
  const { secondary } = colors;
  const { borderWidth } = borders;

  return (
    <>
      <SuiBox lineHeight={1}>
        <SuiTypography variant="h6" fontWeight="medium">
          Referral Code
        </SuiTypography>
        <SuiTypography variant="button" fontWeight="regular" color="text">
          Copy the code bellow to your registered provider.
        </SuiTypography>
      </SuiBox>
      <SuiBox
        borderRadius="md"
        border={`${borderWidth[1]} dashed ${secondary.main}`}
        pt={2}
        pb={1.5}
        px={2}
        mt={2}
      >
        <SuiBox mb={1} lineHeight={0}>
          <SuiTypography variant="caption" color="text">
            Generated 23 days ago by <span sx={{ fontWeight: "bold" }}>softuidash23</span>
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={2} lineHeight={0}>
          <SuiTypography variant="caption" color="text" fontWeight="bold">
            (Used one time)
          </SuiTypography>
        </SuiBox>
        <SuiBox display="flex" alignItems="center" mb={2}>
          <SuiBox width="70%" mr={1}>
            <SuiInput
              size="small"
              defaultValue="soft-ui-dashboard-vmsk392"
              icon={{ component: "lock", direction: "right" }}
              disabled
            />
          </SuiBox>
          <Tooltip title="Referral code expires in 24 hours" placement="top">
            <SuiButton
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ padding: "0.5rem 1rem" }}
            >
              copy
            </SuiButton>
          </Tooltip>
        </SuiBox>
        <SuiBox mb={0.5} lineHeight={1.2}>
          <SuiTypography component="p" variant="caption" color="text">
            You cannot generate codes.
          </SuiTypography>
          <SuiTypography variant="caption" color="text">
            <SuiTypography
              component={Link}
              variant="caption"
              href="#link"
              className="color-background"
            >
              Contact us
            </SuiTypography>{" "}
            to generate more referrals link.
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </>
  );
}

export default ReferralCode;
