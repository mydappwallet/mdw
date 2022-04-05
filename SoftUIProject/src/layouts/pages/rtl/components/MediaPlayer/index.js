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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Images
import curved1 from "assets/images/curved-images/curved1.jpg";

function MediaPlayer() {
  const mediaPlayerButtonStyles = ({ functions: { pxToRem } }) => ({
    width: pxToRem(46),
    height: pxToRem(46),
    minWidth: pxToRem(46),
    minHeight: pxToRem(46),
    mr: 1,
  });

  return (
    <Card
      sx={({ functions: { linearGradient, rgba }, palette: { gradients } }) => ({
        backgroundImage: `${linearGradient(
          rgba(gradients.dark.main, 0.85),
          rgba(gradients.dark.state, 0.85)
        )}, url(${curved1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      })}
    >
      <SuiBox p={3} position="relative" lineHeight={0}>
        <SuiTypography variant="h5" color="white" fontWeight="bold">
          نوع من البلوز
        </SuiTypography>
        <SuiTypography variant="button" color="white" fontWeight="medium">
          ديفتونز
        </SuiTypography>
        <SuiBox display="flex" mt={3} pt={1}>
          <SuiBox display="flex" alignItems="center" justifyContent="center">
            <SuiButton
              variant="outlined"
              size="large"
              circular
              iconOnly
              sx={mediaPlayerButtonStyles}
            >
              <Icon>skip_previous</Icon>
            </SuiButton>
            <SuiButton
              variant="outlined"
              size="large"
              circular
              iconOnly
              sx={mediaPlayerButtonStyles}
            >
              <Icon>play_arrow</Icon>
            </SuiButton>
            <SuiButton
              variant="outlined"
              size="large"
              circular
              iconOnly
              sx={mediaPlayerButtonStyles}
            >
              <Icon>skip_next</Icon>
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default MediaPlayer;
