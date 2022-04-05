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
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiBadge from "components/SuiBadge";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiProgress from "components/SuiProgress";

// Custom styles for the Card

function Card({ image, badge, content, progress, attachedFiles, members }) {
  const renderMembers = members.map((member, key) => {
    const imageAlt = `image-${key}`;

    return (
      <SuiAvatar
        key={imageAlt}
        src={member}
        alt={imageAlt}
        size="xs"
        sx={{
          border: ({ borders: { borderWidth }, palette: { white } }) =>
            `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        }}
      />
    );
  });

  return (
    <>
      {image && <SuiBox component="img" src={image} width="100%" borderRadius="sm" mb={1} />}
      <SuiBadge size="xs" color={badge.color} badgeContent={badge.label} container />
      <SuiBox mt={1} mb={2}>
        <SuiTypography variant="body2" color="text">
          {content}
        </SuiTypography>
        {progress > 0 && (
          <SuiBox mt={0.25}>
            <SuiProgress variant="gradient" value={progress} color={badge.color} />
          </SuiBox>
        )}
      </SuiBox>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center">
        <SuiBox display="flex" alignItems="center" color="text">
          {attachedFiles && (
            <>
              <SuiTypography variant="body2" color="text" sx={{ lineHeight: 0 }}>
                <Icon sx={{ fontWeight: "bold" }}>attach_file</Icon>
              </SuiTypography>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                &nbsp;{attachedFiles}
              </SuiTypography>
            </>
          )}
        </SuiBox>
        <SuiBox display="flex">{renderMembers}</SuiBox>
      </SuiBox>
    </>
  );
}

// Setting default props for the Card
Card.defaultProps = {
  image: "",
  progress: 0,
  attachedFiles: "",
};

// Typechecking props for the Card
Card.propTypes = {
  image: PropTypes.string,
  badge: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.node.isRequired,
  progress: PropTypes.number,
  attachedFiles: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Card;
