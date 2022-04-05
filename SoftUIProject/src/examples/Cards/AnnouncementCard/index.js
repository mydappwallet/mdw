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

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiAvatar from "components/SuiAvatar";
import SuiBadge from "components/SuiBadge";

// Custom styles for AnnouncementCard
// import style from "examples/Cards/AnnouncementCard/style";

function AnnouncementCard({ by, badge, title, description, value, action }) {
  // const classes = style();

  return (
    <Card>
      <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" p={2}>
        {by.image || by.name || by.date ? (
          <SuiBox display="flex" mr={2}>
            {by.image ? (
              <SuiAvatar src={by.image} alt={by.name} size="sm" variant="rounded" />
            ) : null}
            <SuiBox display="flex" flexDirection="column" justifyContent="center" ml={1}>
              {by.name ? (
                <SuiTypography variant="button" fontWeight="medium" textTransform="capitalize">
                  {by.name}
                </SuiTypography>
              ) : null}
              {by.date ? (
                <SuiTypography variant="caption" color="text">
                  {by.date}
                </SuiTypography>
              ) : null}
            </SuiBox>
          </SuiBox>
        ) : null}
        {badge.color && badge.label ? (
          <SuiBadge color={badge.color} badgeContent={badge.label} size="sm" container />
        ) : null}
      </SuiBox>
      <SuiBox pt={0.5} pb={2} px={2}>
        <SuiTypography variant="h6">{title}</SuiTypography>
        <SuiBox mt={1} mb={2} lineHeight={0}>
          <SuiTypography variant="button" fontWeight="regular" color="text">
            {description}
          </SuiTypography>
        </SuiBox>
        <SuiBox
          bgColor="grey-100"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="lg"
          p={2}
        >
          {value.amount ? (
            <SuiTypography variant="h4">
              {value.method ? (
                <SuiBox component="span" mr={0.5}>
                  <SuiTypography
                    variant="button"
                    color="secondary"
                    fontWeight="medium"
                    verticalAlign="text-bottom"
                  >
                    {value.type}
                  </SuiTypography>
                </SuiBox>
              ) : null}
              {value.amount}
              {value.method ? (
                <SuiBox component="span" ml={0.5}>
                  <SuiTypography
                    variant="button"
                    color="secondary"
                    fontWeight="medium"
                    verticalAlign="text-bottom"
                  >
                    / {value.method}
                  </SuiTypography>
                </SuiBox>
              ) : null}
            </SuiTypography>
          ) : (
            <SuiBox />
          )}
          {action.type === "internal" ? (
            <SuiButton component={Link} to={action.route} variant="outlined" color="dark">
              {action.label}
            </SuiButton>
          ) : (
            <SuiButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              color="dark"
            >
              {action.label}
            </SuiButton>
          )}
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

// Setting default values for the props of AnnouncementCard
AnnouncementCard.defaultProps = {
  by: {},
  badge: {},
  value: {},
};

// Typechecking props for the AnnouncementCard
AnnouncementCard.propTypes = {
  by: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
  }),
  badge: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    label: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.shape({
    type: PropTypes.string,
    amount: PropTypes.string,
    method: PropTypes.string,
  }),
  action: PropTypes.shape({
    type: PropTypes.oneOf(["enternal", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnnouncementCard;
