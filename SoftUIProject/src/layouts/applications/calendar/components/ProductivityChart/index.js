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

import { useRef, useEffect, useState, useMemo } from "react";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React helper functions
import gradientChartLine from "assets/theme/functions/gradientChartLine";

// Chart configurations
import configs from "layouts/applications/calendar/components/ProductivityChart/configs";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

function ProductivityChart() {
  const { white } = colors;
  const { size } = typography;
  const chartRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [chartData, setChartData] = useState({});
  const { data, options } = chartData;

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  useEffect(() => {
    const backgroundColor = gradientChartLine(chartRef.current.children[0], white.main, 0.3);

    setChartData(configs(backgroundColor));
  }, [configs]);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      keepMounted
    >
      <MenuItem onClick={handleCloseMenu}>Action</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Anoter action</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Something else here</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <SuiBox bgColor="dark" variant="gradient">
        <SuiBox p={2}>
          <SuiBox display="flex" justifyContent="space-between">
            <SuiBox>
              <SuiTypography variant="h6" fontWeight="medium" color="white">
                Productivity
              </SuiTypography>
              <SuiBox display="flex" alignItems="center">
                <SuiBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                  <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                </SuiBox>
                <SuiTypography variant="button" color="white" fontWeight="medium">
                  4% more{" "}
                  <SuiTypography variant="button" color="white" fontWeight="regular">
                    in 2021
                  </SuiTypography>
                </SuiTypography>
              </SuiBox>
            </SuiBox>
            <SuiTypography color="white" onClick={handleOpenMenu}>
              <Icon fontSize="default" sx={{ cursor: "pointer" }}>
                more_horiz
              </Icon>
            </SuiTypography>
            {renderMenu()}
          </SuiBox>
        </SuiBox>
        {useMemo(
          () => (
            <SuiBox ref={chartRef} sx={{ height: "6.25rem" }}>
              <Line data={data} options={options} />
            </SuiBox>
          ),
          [chartData]
        )}
      </SuiBox>
    </Card>
  );
}

export default ProductivityChart;
