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

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiProgress from "components/SuiProgress";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

function SocialItem({ icon, title, percentage }) {
  const { socialMediaColors } = colors;
  const { size } = typography;

  return (
    <SuiBox width="100%" py={1} mb={1}>
      <SuiBox display="flex" justifyContent="space-between" mb={1}>
        <SuiBox display="flex" alignItems="center" lineHeight={0}>
          <SuiBox mr={1} color={socialMediaColors[icon.color].main} fontSize={size.lg}>
            {icon.component}
          </SuiBox>
          <SuiTypography variant="button" fontWeight="medium" color="text">
            {title}
          </SuiTypography>
        </SuiBox>
        <SuiTypography variant="button" fontWeight="medium" color="text">
          {percentage}%
        </SuiTypography>
      </SuiBox>
      <SuiProgress value={percentage} color="dark" />
    </SuiBox>
  );
}

// Typechecking props for the SocialItem
SocialItem.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "facebook",
      "twitter",
      "instagram",
      "linkedin",
      "pinterest",
      "youtube",
      "vimeo",
      "slack",
      "dribbble",
      "github",
      "reddit",
      "tumblr",
    ]).isRequired,
    component: PropTypes.node.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default SocialItem;
