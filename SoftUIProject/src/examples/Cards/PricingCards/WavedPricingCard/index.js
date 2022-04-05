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
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Custom styles for the WavedPricingCard
import WavedPricingCardWavesRoot from "examples/Cards/PricingCards/WavedPricingCard/WavedPricingCardWavesRoot";

function WavedPricingCard({ color, title, price, specifications, action }) {
  const renderSpecifications = specifications.map(({ count, label }, key) => (
    <SuiBox component="li" key={label} textAlign="center">
      <SuiTypography variant="body2" color="text">
        <SuiBox component="strong" color="text">
          {count}
        </SuiBox>{" "}
        {label}
      </SuiTypography>
      {specifications.length - 1 === key ? null : <Divider />}
    </SuiBox>
  ));

  return (
    <Card>
      <SuiBox
        position="relative"
        pt={3}
        pb={6}
        px={3}
        textAlign="center"
        bgColor={color}
        variant="gradient"
      >
        <SuiBox position="relative" zIndex={1}>
          <SuiTypography variant="h5" color={color === "light" ? "dark" : "white"} gutterBottom>
            {title}
          </SuiTypography>
          <SuiTypography
            variant="h1"
            fontWeight="bold"
            color={color === "light" ? "dark" : "white"}
          >
            <SuiBox component="small" color={color === "light" ? "dark" : "white"}>
              {price.currency}
            </SuiBox>
            {price.value}
          </SuiTypography>
          <SuiTypography
            variant="body2"
            fontWeight="medium"
            color={color === "light" ? "dark" : "white"}
            gutterBottom
          >
            {price.type}
          </SuiTypography>
        </SuiBox>
      </SuiBox>
      <SuiBox position="relative" height="3.125rem" overflow="hidden" zIndex={2} mt={-5}>
        <SuiBox position="absolute" width="100%" top={0} zIndex={1}>
          <SuiBox
            component="svg"
            position="relative"
            width="100%"
            height="3.125rem"
            minHeight="3.125rem"
            maxHeight="3.125rem"
            mb={-0.875}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 40"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="card-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <WavedPricingCardWavesRoot>
              <use xlinkHref="#card-wave" x="48" y="-1" fill="rgba(255,255,255,0.30" />
              <use xlinkHref="#card-wave" x="48" y="3" fill="rgba(255,255,255,0.35)" />
              <use xlinkHref="#card-wave" x="48" y="5" fill="rgba(255,255,255,0.25)" />
              <use xlinkHref="#card-wave" x="48" y="8" fill="rgba(255,255,255,0.20)" />
              <use xlinkHref="#card-wave" x="48" y="13" fill="rgba(255,255,255,0.15)" />
              <use xlinkHref="#card-wave" x="48" y="16" fill="rgba(255,255,255,0.99)" />
            </WavedPricingCardWavesRoot>
          </SuiBox>
        </SuiBox>
      </SuiBox>
      <SuiBox p={4.5}>
        <SuiBox component="ul" mx="auto" sx={{ listStyle: "none" }}>
          {renderSpecifications}
        </SuiBox>
        {action.type === "internal" ? (
          <SuiBox mt={4.5}>
            <SuiButton
              component={Link}
              to={action.route}
              variant="gradient"
              color={color}
              fullWidth
            >
              {action.label}
            </SuiButton>
          </SuiBox>
        ) : (
          <SuiBox mt={4.5}>
            <SuiButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="gradient"
              color={color}
              fullWidth
            >
              {action.label}
            </SuiButton>
          </SuiBox>
        )}
      </SuiBox>
    </Card>
  );
}

// Setting default props for the WavedPricingCard
WavedPricingCard.defaultProps = {
  color: "dark",
};

// Typechecking props for the WavedPricingCard
WavedPricingCard.propTypes = {
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
  price: PropTypes.shape({
    type: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  specifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default WavedPricingCard;
