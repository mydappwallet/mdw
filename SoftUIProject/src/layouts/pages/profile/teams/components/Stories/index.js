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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Soft UI Dashboard PRO React data variables
import storiesData from "layouts/pages/profile/teams/components/Stories/data/storiesData";

function Stories() {
  const { borderWidth } = borders;

  const renderStories = storiesData.map(({ image, name, color }) => (
    <Grid key={name} item xs={4} sm={3} md={2} lg={1} sx={{ flex: "0 0 100%" }}>
      <SuiBox
        borderRadius="50%"
        width="3.625rem"
        height="3.625rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
        mx="auto"
        border={`${borderWidth[1]} solid ${colors[color].main}`}
        sx={{ cursor: "pointer" }}
      >
        <SuiAvatar src={image} alt={name} />
      </SuiBox>
      <SuiBox mt={0.75} textAlign="center" lineHeight={1}>
        <SuiTypography variant="button" color="text" fontWeight="regular">
          {name}
        </SuiTypography>
      </SuiBox>
    </Grid>
  ));

  return (
    <Card sx={{ overflow: "scroll" }}>
      <SuiBox width="100%" pt={3} pb={2.5} px={3}>
        <Grid container justifyContent="space-between" wrap="nowrap">
          <Grid item xs={4} sm={3} md={2} lg={1} sx={{ flex: "0 0 100%" }}>
            <SuiBox
              bgColor="info"
              borderRadius="50%"
              width="3.625rem"
              height="3.625rem"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mx="auto"
              variant="gradient"
              sx={{ cursor: "pointer" }}
            >
              <Icon fontSize="small">add</Icon>
            </SuiBox>
            <SuiBox mt={0.75} textAlign="center" lineHeight={1}>
              <SuiTypography variant="button" color="text" fontWeight="regular">
                Add story
              </SuiTypography>
            </SuiBox>
          </Grid>
          {renderStories}
        </Grid>
      </SuiBox>
    </Card>
  );
}

export default Stories;
