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

// react-circular-slider-svg components
import CircularSlider from "react-circular-slider-svg";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";

// Custom styles for TemperatureSlider
import circularSlider from "layouts/dashboards/smart-home/components/TemperatureSlider/styles";

function TemperatureSlider({ title, color, current, label, start, end, ...sliderProps }) {
  const { circleSliderColors } = colors;

  return (
    <Card sx={{ height: "99.5%" }}>
      <SuiBox p={2} position="relative" height="100%">
        <SuiBox mb={1}>
          <SuiTypography variant="h6" fontWeight="medium">
            {title}
          </SuiTypography>
        </SuiBox>
        <SuiBox height="100%" textAlign="center" sx={(theme) => circularSlider(theme, { color })}>
          <CircularSlider
            {...sliderProps}
            arcBackgroundColor={circleSliderColors.background}
            arcColor={colors[color].main}
            startAngle={45}
            endAngle={315}
            handleSize={6}
            size={220}
          />
          <SuiBox mt={12}>
            <SuiTypography variant="h4" fontWeight="medium">
              {current}
            </SuiTypography>
          </SuiBox>
          <SuiBox
            display="flex"
            justifyContent="space-around"
            alignItems="baseline"
            width="12.5rem"
            mx="auto"
            mt={6}
          >
            <SuiTypography variant="caption" color="text">
              {start}
            </SuiTypography>
            <SuiTypography variant="body2" color="text" textTransform="capitalize">
              {label}
            </SuiTypography>
            <SuiTypography variant="caption" color="text">
              {end}
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

// Setting default values for the props of TemperatureSlider
TemperatureSlider.defaultProps = {
  color: "info",
};

// Typechecking props for the TemperatureSlider
TemperatureSlider.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  current: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  start: PropTypes.node.isRequired,
  end: PropTypes.node.isRequired,
};

export default TemperatureSlider;
