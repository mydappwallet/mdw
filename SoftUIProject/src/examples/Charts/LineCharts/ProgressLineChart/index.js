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

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiProgress from "components/SuiProgress";

// ProgressLineChart configurations
import configs from "examples/Charts/LineCharts/ProgressLineChart/config";

function ProgressLineChart({ color, icon, title, count, progress, height, chart }) {
  const { data, options } = configs(color, chart.labels || [], title, chart.data || []);

  return (
    <Card>
      <SuiBox display="flex" alignItems="center" pt={2} px={2}>
        <SuiBox
          width="3rem"
          height="3rem"
          display="grid"
          justifyContent="center"
          alignItems="center"
          borderRadius="md"
          shadow="md"
          color="white"
          bgColor={color}
          variant="gradient"
        >
          <Icon fontSize="default">{icon}</Icon>
        </SuiBox>
        <SuiBox ml={2} lineHeight={1}>
          <SuiTypography
            variant="button"
            fontWeight="medium"
            textTransform="capitalize"
            color="text"
          >
            {title}
          </SuiTypography>
          {count ? (
            <SuiTypography variant="h5" fontWeight="bold">
              {count}
            </SuiTypography>
          ) : null}
        </SuiBox>
        <SuiBox width="25%" ml="auto">
          <SuiTypography display="block" variant="caption" fontWeight="medium" color="text">
            {progress}%
          </SuiTypography>
          <SuiBox mt={0.25}>
            <SuiProgress variant="gradient" color={color} value={progress} />
          </SuiBox>
        </SuiBox>
      </SuiBox>
      {useMemo(
        () => (
          <SuiBox mt={2}>
            <Line data={data} options={options} style={{ height }} />
          </SuiBox>
        ),
        [chart, height]
      )}
    </Card>
  );
}

// Setting default values for the props of ProgressLineChart
ProgressLineChart.defaultProps = {
  color: "info",
  count: 0,
  height: "6.25rem",
};

// Typechecking props for the ProgressLineChart
ProgressLineChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  progress: PropTypes.number.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default ProgressLineChart;
