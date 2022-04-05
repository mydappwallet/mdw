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

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

function SimpleBlogCard({ image, title, description, action }) {
  return (
    <Card>
      <SuiBox mt={2} mx={2}>
        <SuiBox component="img" src={image} alt={title} width="100%" borderRadius="lg" />
      </SuiBox>
      <SuiBox pt={2} pb={3} px={3}>
        <SuiTypography display="inline" variant="h3" textTransform="capitalize" fontWeight="bold">
          {title}
        </SuiTypography>
        <SuiBox mt={2} mb={3}>
          <SuiTypography variant="body2" component="p" color="text">
            {description}
          </SuiTypography>
        </SuiBox>
        {action.type === "external" ? (
          <MuiLink href={action.route} target="_blank" rel="noreferrer">
            <SuiButton color={action.color ? action.color : "dark"}>{action.label}</SuiButton>
          </MuiLink>
        ) : (
          <Link to={action.route}>
            <SuiButton color={action.color ? action.color : "dark"}>{action.label}</SuiButton>
          </Link>
        )}
      </SuiBox>
    </Card>
  );
}

// Typechecking props for the SimpleBlogCard
SimpleBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
      "default",
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default SimpleBlogCard;
