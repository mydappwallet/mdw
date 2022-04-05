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

// react-tilt components
import Tilt from "react-tilt";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiBadge from "components/SuiBadge";
import SuiButton from "components/SuiButton";

// Images
import whiteCurved from "assets/images/curved-images/white-curved.jpeg";

function AnimatedStatisticsCard({ color, title, count, percentage, action }) {
  const sharedStyles = {
    transform: `translateZ(50px) scale(0.7)`,
    transition: "all 500ms linear",
  };

  const actionStyles = {
    my: 1,
    width: ({ functions: { pxToRem } }) => pxToRem(160),
    ...sharedStyles,

    "&:hover, &:focus": {
      transform: `translateZ(50px) scale(0.7)`,
    },
  };

  return (
    <Tilt
      options={{
        reverse: false,
        max: 35,
        perspective: 1000,
        scale: 1,
        speed: 300,
        transition: true,
        axis: null,
        reset: true,
        easing: "cubic-bezier(0.03,0.98,0.52,0.99)",
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Card
        sx={({ functions: { linearGradient, rgba }, palette: { gradients } }) => ({
          backgroundImage: gradients[color]
            ? `${linearGradient(
                rgba(gradients[color].main, 0.85),
                rgba(gradients[color].state, 0.85)
              )}, url(${whiteCurved})`
            : `${linearGradient(
                rgba(gradients[color].main, 0.85),
                rgba(gradients[color].state, 0.85)
              )}, url(${whiteCurved})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "visible",
        })}
      >
        <SuiBox p={3} display="flex" flexDirection="column" alignItems="center">
          <SuiBox mt={1}>
            <SuiTypography
              variant="h2"
              color="white"
              textTransform="capitalize"
              fontWeight="bold"
              sx={{
                mt: 1,
                ...sharedStyles,
              }}
            >
              {title}
            </SuiTypography>
          </SuiBox>
          <SuiTypography variant="h1" fontWeight="bold" color="white" sx={sharedStyles}>
            {count}
          </SuiTypography>
          <SuiBox sx={sharedStyles}>
            <SuiBadge
              color={percentage.color}
              badgeContent={<>&nbsp;{percentage.label}&nbsp;</>}
              size="lg"
              container
            />
          </SuiBox>
          {action.type === "internal" ? (
            <SuiButton
              component={Link}
              to={action.route}
              variant="outlined"
              color="white"
              sx={actionStyles}
            >
              {action.label}
            </SuiButton>
          ) : (
            <SuiButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              color="white"
              size="small"
              sx={actionStyles}
            >
              {action.label}
            </SuiButton>
          )}
        </SuiBox>
      </Card>
    </Tilt>
  );
}

// Setting default values for the props of AnimatedStatisticsCard
AnimatedStatisticsCard.defaultProps = {
  color: "info",
};

// Typechecking props for the AnimatedStatisticsCard
AnimatedStatisticsCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"])
      .isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnimatedStatisticsCard;
