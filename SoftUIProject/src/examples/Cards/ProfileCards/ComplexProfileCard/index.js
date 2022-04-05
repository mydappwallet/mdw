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

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";

function ComplexProfileCard({ image, name, position, description, social }) {
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
      py={1.5}
      pr={1.5}
      pl={key === 0 ? 0 : 1.5}
      lineHeight={1}
    >
      {icon}
    </SuiBox>
  ));

  return (
    <SuiBox width="100%" height="100%" display="flex" alignItems="center">
      <SuiBox width="40%" height="100%">
        <SuiBox
          component="img"
          src={image}
          alt={name}
          shadow="lg"
          borderRadius="lg"
          width="100%"
          height="100%"
          sx={{ objectFit: "cover" }}
        />
      </SuiBox>
      <SuiBox width="60%" py={2.5} px={4}>
        <SuiBox mb={1} lineHeight={1}>
          <SuiTypography variant="h5" fontWeight="bold">
            {name}
          </SuiTypography>
          <SuiTypography
            variant="button"
            color="text"
            textTransform="uppercase"
            fontWeight="medium"
          >
            {position}
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={3}>
          <SuiTypography variant="body2" color="text">
            {description}
          </SuiTypography>
        </SuiBox>
        <SuiBox display="flex">{renderSocial}</SuiBox>
      </SuiBox>
    </SuiBox>
  );
}

// Setting default props for the ComplexProfileCard
ComplexProfileCard.defaultProps = {
  description: "",
  social: [{}],
};

// Typechecking props for the ComplexProfileCard
ComplexProfileCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  description: PropTypes.string,
  social: PropTypes.arrayOf(PropTypes.object),
};

export default ComplexProfileCard;
