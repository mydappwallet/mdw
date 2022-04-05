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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Fade from "@mui/material/Fade";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiBadge from "components/SuiBadge";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";

function CameraView({ image, date, time, value, index }) {
  const { size } = typography;

  return (
    value === index && (
      <Fade in timeout={850}>
        <SuiBox width="100%" height="100%" position="relative" borderRadius="lg">
          <SuiBox
            component="img"
            src={image}
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            borderRadius="lg"
            sx={{ objectFit: "cover", objectPosition: "center" }}
          />
          <SuiBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            position="absolute"
            top={0}
            left={0}
            width="calc(100% - 1rem)"
          >
            <SuiBox p={2}>
              <SuiTypography variant="h6" fontWeight="regular" color="white">
                {date} &nbsp; {time}
              </SuiTypography>
            </SuiBox>
            <SuiBadge
              color="secondary"
              variant="contained"
              size="lg"
              badgeContent={
                <SuiBox display="flex" alignItems="center">
                  <SuiBox color="error" lineHeight={0} fontSize={size.md}>
                    <Icon>fiber_manual_record</Icon>
                  </SuiBox>
                  <SuiBox mb={-0.25} ml={0.25}>
                    <SuiTypography
                      component="span"
                      variant="caption"
                      color="text"
                      fontWeight="bold"
                      textTransform="uppercase"
                    >
                      recording
                    </SuiTypography>
                  </SuiBox>
                </SuiBox>
              }
            />
          </SuiBox>
        </SuiBox>
      </Fade>
    )
  );
}

// Typechecking props for the CameraView
CameraView.propTypes = {
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CameraView;
