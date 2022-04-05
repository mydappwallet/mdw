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
import Link from "@mui/material/Link";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";

function DefaultProfileCard({ image, name, position, description, social }) {
  const { socialMediaColors } = colors;

  // Render the social media icons
  const renderSocial = social.map(({ link, icon, color }, key) => (
    <SuiBox
      key={color}
      component={Link}
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize="1.375rem"
      color={socialMediaColors[color].main}
      py={2}
      pr={2}
      pl={key === 0 ? 0 : 2}
      lineHeight={1}
    >
      {icon}
    </SuiBox>
  ));

  return (
    <SuiBox>
      <SuiAvatar src={image} alt={name} size="xxl" shadow="xl" variant="rounded" />
      <SuiBox py={2.5} pr={4}>
        <SuiTypography variant="h5">{name}</SuiTypography>
        <SuiTypography variant="body2" color="text">
          {position}
        </SuiTypography>
        {description && (
          <SuiBox my={2}>
            <SuiTypography variant="body2" color="text">
              {description}
            </SuiTypography>
          </SuiBox>
        )}
        <SuiBox display="flex">{renderSocial}</SuiBox>
      </SuiBox>
    </SuiBox>
  );
}

// Setting default props for the DefaultProfileCard
DefaultProfileCard.defaultProps = {
  description: "",
  social: [{}],
};

// Typechecking props for the DefaultProfileCard
DefaultProfileCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  description: PropTypes.string,
  social: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProfileCard;
