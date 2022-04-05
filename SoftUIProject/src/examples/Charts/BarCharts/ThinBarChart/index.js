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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Bar } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// ThinBarChart configuration
import configs from "examples/Charts/BarCharts/ThinBarChart/configs";

function ThinBarChart({ color, title, height, chart }) {
  const { data, options } = configs(color, chart.labels || [], chart.datasets || {});

  const renderChart = (
    <SuiBox p={2}>
      {title && (
        <SuiBox mb={1}>
          <SuiTypography variant="h6" color={color}>
            {title}
          </SuiTypography>
        </SuiBox>
      )}
      {useMemo(
        () => (
          <SuiBox height={height} pt={2}>
            <Bar data={data} options={options} />
          </SuiBox>
        ),
        [chart, height]
      )}
    </SuiBox>
  );

  return title ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of ThinBarChart
ThinBarChart.defaultProps = {
  color: "dark",
  title: "",
  height: "12.5rem",
};

// Typechecking props for the ThinBarChart
ThinBarChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string,
  chart: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string])
    ).isRequired,
  }).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ThinBarChart;
