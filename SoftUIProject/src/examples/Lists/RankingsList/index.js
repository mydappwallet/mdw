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
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

function RankingList({ title, date, rankings }) {
  const renderRankings = rankings.map(({ color, icon, name, description, value }, key) => (
    <SuiBox key={name} component="li" pt={1} pr={2}>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center">
        <SuiBox display="flex" alignItems="center">
          <SuiBox mr={2}>
            <SuiButton
              variant="outlined"
              color={color}
              size="small"
              iconOnly
              circular
              sx={({ functions: { pxToRem } }) => ({
                width: pxToRem(34),
                minWidth: pxToRem(34),
                height: pxToRem(34),
                minHeight: pxToRem(34),
              })}
            >
              <Icon>{icon}</Icon>
            </SuiButton>
          </SuiBox>
          <SuiBox display="flex" flexDirection="column">
            <SuiTypography variant="button" fontWeight="medium" gutterBottom>
              {name}
            </SuiTypography>
            <SuiTypography variant="caption" color="text">
              {description}
            </SuiTypography>
          </SuiBox>
        </SuiBox>
        <SuiTypography variant="button" color={color} fontWeight="medium" textGradient>
          {value}
        </SuiTypography>
      </SuiBox>
      {key === rankings.length - 1 ? null : (
        <Divider
          sx={{
            mt: 2,
            mb: 1,
          }}
        />
      )}
    </SuiBox>
  ));

  return (
    <Card sx={{ height: "100%" }}>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SuiTypography>
        <SuiTypography variant="button" color="text" fontWeight="regular" sx={{ display: "flex" }}>
          <Icon
            color="inherit"
            fontSize="small"
            sx={{
              mr: 0.75,
              mt: -0.125,
            }}
          >
            date_range
          </Icon>
          {date}
        </SuiTypography>
      </SuiBox>
      <SuiBox p={2}>
        <SuiBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {renderRankings}
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

// Typechecking props for the RankingList
RankingList.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rankings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RankingList;
