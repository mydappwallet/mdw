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

function DefaultTeamCard({ image, name, jobTitle, action }) {
  const template = (
    <Card>
      <SuiBox p={2} textAlign="center" lineHeight={1}>
        <SuiBox component="img" src={image} alt={name} width="100%" borderRadius="md" />
        <SuiBox mt={2} mb={0.5}>
          <SuiTypography variant="h5" textTransform="capitalize">
            {name}
          </SuiTypography>
        </SuiBox>
        <SuiTypography
          variant="caption"
          textTransform="uppercase"
          fontWeight="bold"
          color={jobTitle.color ? jobTitle.color : "info"}
          textGradient
        >
          {jobTitle.label}
        </SuiTypography>
      </SuiBox>
    </Card>
  );

  return action.type === "external" ? (
    <MuiLink href={action.route} target="_blank" rel="noreferrer">
      {template}
    </MuiLink>
  ) : (
    <Link to={action.route}>{template}</Link>
  );
}

// Typechecking props for the DefaultTeamCard
DefaultTeamCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  jobTitle: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
  }).isRequired,
};

export default DefaultTeamCard;
