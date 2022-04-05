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

// react-countup components
import CountUp from "react-countup";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

function DefaultCounterCard({ color, count, title, description, prefix, suffix }) {
  return (
    <Card>
      <SuiBox p={3} textAlign="center" lineHeight={1.25}>
        <SuiTypography variant="h1" color={color} fontWeight="bold" textGradient>
          {prefix && (
            <SuiTypography component="span" variant="h5" fontWeight="bold">
              {prefix}
            </SuiTypography>
          )}
          <SuiBox display="inline-block" mx={0.5}>
            <CountUp end={count} duration={1} separator="," />
          </SuiBox>
          {suffix && (
            <SuiTypography component="span" variant="h5" fontWeight="bold">
              {suffix}
            </SuiTypography>
          )}
        </SuiTypography>
        <SuiTypography variant="h6" fontWeight="bold" textTransform="capitalize">
          {title}
        </SuiTypography>
        {description && (
          <SuiTypography
            variant="button"
            fontWeight="regular"
            opacity={0.8}
            textTransform="capitalize"
          >
            {description}
          </SuiTypography>
        )}
      </SuiBox>
    </Card>
  );
}

// Setting default values for the props of DefaultCounterCard
DefaultCounterCard.defaultProps = {
  color: "info",
  prefix: "",
  suffix: "",
  description: "",
};

// Typechecking props for the BlogCard
DefaultCounterCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default DefaultCounterCard;
