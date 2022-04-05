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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

function DefaultStatisticsCard({ title, count, percentage, dropdown }) {
  return (
    <Card>
      <SuiBox p={2}>
        <Grid container>
          <Grid item xs={7}>
            <SuiBox mb={0.5} lineHeight={1}>
              <SuiTypography
                variant="button"
                fontWeight="medium"
                color="text"
                textTransform="capitalize"
              >
                {title}
              </SuiTypography>
            </SuiBox>
            <SuiBox lineHeight={1}>
              <SuiTypography variant="h5" fontWeight="bold">
                {count}
              </SuiTypography>
              <SuiTypography variant="button" fontWeight="bold" color={percentage.color}>
                {percentage.value}&nbsp;
                <SuiTypography variant="button" fontWeight="regular" color="secondary">
                  {percentage.label}
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </Grid>
          <Grid item xs={5}>
            {dropdown && (
              <SuiBox width="100%" textAlign="right" lineHeight={1}>
                <SuiTypography
                  variant="caption"
                  color="secondary"
                  sx={{ cursor: "pointer" }}
                  onClick={dropdown.action}
                >
                  {dropdown.value}
                </SuiTypography>
                {dropdown.menu}
              </SuiBox>
            )}
          </Grid>
        </Grid>
      </SuiBox>
    </Card>
  );
}

// Setting default values for the props of DefaultStatisticsCard
DefaultStatisticsCard.defaultProps = {
  percentage: {
    color: "success",
    value: "",
    label: "",
  },
  dropdown: false,
};

// Typechecking props for the DefaultStatisticsCard
DefaultStatisticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
      value: PropTypes.string,
    }),
  ]),
};

export default DefaultStatisticsCard;
