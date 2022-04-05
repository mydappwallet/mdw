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

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard PRO React base styles
import borders from "assets/theme/base/borders";

function OutlinedPricingCard({ color, title, description, price, specifications, action }) {
  const { borderWidth, borderColor } = borders;

  const renderSpecifications = specifications.map(({ label, includes }, key) => (
    <SuiBox
      key={label}
      display="flex"
      alignItems="center"
      pb={specifications.length - 1 !== key ? 2 : 0}
    >
      <SuiTypography variant="body1" color={includes ? "success" : "error"} sx={{ lineHeight: 0 }}>
        <Icon sx={{ fontWeight: "bold" }}>{includes ? "done" : "close"}</Icon>
      </SuiTypography>
      <SuiBox pl={2} lineHeight={1}>
        <SuiTypography variant="button" color="text" fontWeight="regular">
          {label}
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  ));

  return (
    <SuiBox height="100%" borderRadius="xl" border={`${borderWidth[1]} solid ${borderColor}`}>
      <SuiBox pt={3} pb={0.5} px={3} lineHeight={1} textAlign="center">
        <SuiTypography variant="h5" color={color}>
          {title}
        </SuiTypography>
        <SuiBox mb={2} mt={0.5}>
          <SuiTypography variant="button" color="text" fontWeight="regular">
            {description}
          </SuiTypography>
        </SuiBox>
        <SuiBox mt={2} mb={1}>
          <SuiTypography variant="h3" color={color} fontWeight="bold">
            {price.value}&nbsp;
            <SuiTypography variant="button" color="text" fontWeight="regular">
              /{price.type}
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
        <SuiBox mt={3} mb={1}>
          {action.type === "internal" ? (
            <SuiButton
              component={Link}
              to={action.route}
              variant="gradient"
              color={color}
              size="small"
              fullWidth
            >
              {action.label}
            </SuiButton>
          ) : (
            <SuiButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="gradient"
              color={color}
              size="small"
              fullWidth
            >
              {action.label}
            </SuiButton>
          )}
        </SuiBox>
      </SuiBox>
      <Divider />
      <SuiBox pt={1} pb={3} px={3}>
        {renderSpecifications}
      </SuiBox>
    </SuiBox>
  );
}

// Setting default values for the props of OutlinedPricingCard
OutlinedPricingCard.defaultProps = {
  color: "dark",
};

// Typechecking props for the OutlinedPricingCard
OutlinedPricingCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.shape({
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  specifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default OutlinedPricingCard;
