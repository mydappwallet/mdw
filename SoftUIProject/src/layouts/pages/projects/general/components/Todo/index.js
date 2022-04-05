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

import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dasboard PRO Material components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dasboard PRO Material base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";

function Todo({ color, title, date, project, company, defaultChecked, noDivider }) {
  const { borderWidth } = borders;
  const [openMenu, setOpenMenu] = useState(null);

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      keepMounted
    >
      <MenuItem onClick={handleCloseMenu}>Action</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Another action</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Something else here</MenuItem>
    </Menu>
  );

  return (
    <SuiBox
      component="li"
      width="100%"
      pr={2}
      mb={2}
      borderLeft={`${borderWidth[3]} solid ${colors[color].main}`}
      sx={{ listStyle: "none" }}
    >
      <SuiBox width="100%" pl={1} ml={2}>
        <SuiBox display="flex" alignItems="center">
          <Checkbox defaultChecked={defaultChecked} />
          <SuiBox ml={0.2} lineHeight={1}>
            <SuiTypography variant="button" fontWeight="medium">
              {title}
            </SuiTypography>
          </SuiBox>
          <SuiBox ml="auto" color="secondary" pr={3} lineHeight={0}>
            <Icon fontSize="default" sx={{ cursor: "pointer" }} onClick={handleOpenMenu}>
              more_horiz
            </Icon>
          </SuiBox>
          {renderMenu()}
        </SuiBox>
        <SuiBox
          display="flex"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mt={2}
          ml={3}
          pl={0.5}
        >
          <SuiBox lineHeight={1} mb={{ xs: 1, sm: 0 }}>
            <SuiTypography display="block" variant="caption" fontWeight="medium" color="secondary">
              Date
            </SuiTypography>
            <SuiTypography variant="caption" fontWeight="bold" color="text">
              {date}
            </SuiTypography>
          </SuiBox>
          <SuiBox ml={{ xs: 0, sm: "auto" }} mb={{ xs: 1, sm: 0 }} lineHeight={1}>
            <SuiTypography display="block" variant="caption" fontWeight="medium" color="secondary">
              Project
            </SuiTypography>
            <SuiTypography variant="caption" fontWeight="bold" color="text">
              {project}
            </SuiTypography>
          </SuiBox>
          <SuiBox mx={{ xs: 0, sm: "auto" }} lineHeight={1}>
            <SuiTypography display="block" variant="caption" fontWeight="medium" color="secondary">
              Company
            </SuiTypography>
            <SuiTypography variant="caption" fontWeight="bold" color="text">
              {company}
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      </SuiBox>
      {noDivider ? null : <Divider sx={{ marginBottom: 0 }} />}
    </SuiBox>
  );
}

// Setting default values for the props of Todo
Todo.defaultProps = {
  color: "info",
  noDivider: false,
  defaultChecked: false,
};

// Typechecking props for the Todo
Todo.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
  noDivider: PropTypes.bool,
};

export default Todo;
