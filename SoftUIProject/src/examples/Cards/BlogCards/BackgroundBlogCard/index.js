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
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

function BackgroundBlogCard({ color, image, title, description, action }) {
  return (
    <Card raised sx={{ p: 2 }}>
      <SuiBox
        sx={({
          functions: { linearGradient, rgba },
          palette: { gradients },
          borders: { borderRadius },
        }) => ({
          backgroundImage: gradients[color]
            ? `${linearGradient(
                rgba(gradients[color].main, 0.8),
                rgba(gradients[color].state, 0.8)
              )}, url(${image})`
            : `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}, url(${image})`,
          backgroundSize: "cover",
          borderRadius: borderRadius.lg,
          p: 2,
        })}
      >
        <SuiBox mb={2}>
          <SuiTypography variant="h6" color="white" fontWeight="bold" textTransform="capitalize">
            {title}
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={2}>
          <SuiTypography variant="body2" color="white">
            {description}
          </SuiTypography>
        </SuiBox>
        {action.type === "internal" ? (
          <SuiButton component={Link} to={action.route} variant="outlined" color="white" circular>
            {action.label} &nbsp; <Icon>arrow_forward</Icon>
          </SuiButton>
        ) : (
          <SuiButton
            component="a"
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            color="white"
            circular
          >
            {action.label} &nbsp; <Icon>arrow_forward</Icon>
          </SuiButton>
        )}
      </SuiBox>
    </Card>
  );
}

// Setting default values for the props of BackgroundBlogCard
BackgroundBlogCard.defaultProps = {
  color: "dark",
};

// Typechecking props for the BackgroundBlogCard
BackgroundBlogCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default BackgroundBlogCard;
