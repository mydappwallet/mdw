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

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";

// Custom styles for ComplexProjectCard
function ComplexProjectCard({ color, image, title, dateTime, description, members, dropdown }) {
  const renderMembers = members.map((member, key) => {
    const memberKey = `member-${key}`;

    return (
      <SuiAvatar
        key={memberKey}
        src={member}
        alt="member profile"
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    );
  });

  return (
    <Card>
      <SuiBox p={2}>
        <SuiBox display="flex" alignItems="center">
          <SuiAvatar
            src={image}
            alt={title}
            size="xl"
            variant="rounded"
            bgColor={color}
            sx={{ p: 1 }}
          />
          <SuiBox ml={2} lineHeight={0}>
            <SuiBox mb={1} lineHeight={0}>
              <SuiTypography variant="h6" textTransform="capitalize" fontWeight="medium">
                {title}
              </SuiTypography>
            </SuiBox>
            {members.length > -1 ? <SuiBox display="flex">{renderMembers}</SuiBox> : null}
          </SuiBox>
          {dropdown && (
            <SuiTypography
              color="secondary"
              onClick={dropdown.action}
              sx={{
                ml: "auto",
                alignSelf: "flex-start",
                py: 1.25,
              }}
            >
              <Icon fontSize="default" sx={{ cursor: "pointer" }}>
                more_vert
              </Icon>
            </SuiTypography>
          )}
          {dropdown.menu}
        </SuiBox>
        <SuiBox my={2} lineHeight={1}>
          <SuiTypography variant="button" fontWeight="regular" color="text">
            {description}
          </SuiTypography>
        </SuiBox>
        <Divider />
        <SuiBox display="flex" justifyContent="space-between" alignItems="center">
          {members.length > -1 ? (
            <SuiBox display="flex" flexDirection="column" lineHeight={0}>
              <SuiTypography variant="button" fontWeight="medium">
                {members.length}
              </SuiTypography>
              <SuiTypography variant="button" fontWeight="medium" color="secondary">
                Participants
              </SuiTypography>
            </SuiBox>
          ) : null}
          {dateTime ? (
            <SuiBox display="flex" flexDirection="column" lineHeight={0}>
              <SuiTypography variant="button" fontWeight="medium">
                {dateTime}
              </SuiTypography>
              <SuiTypography variant="button" fontWeight="medium" color="secondary">
                Due date
              </SuiTypography>
            </SuiBox>
          ) : null}
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

// Setting default values for the props of ComplexProjectCard
ComplexProjectCard.defaultProps = {
  color: "dark",
  dateTime: "",
  members: [],
  dropdown: false,
};

// Typechecking props for the ProfileInfoCard
ComplexProjectCard.propTypes = {
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
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string,
  description: PropTypes.node.isRequired,
  members: PropTypes.arrayOf(PropTypes.string),
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
    }),
  ]),
};

export default ComplexProjectCard;
