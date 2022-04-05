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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiAvatar from "components/SuiAvatar";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

// Soft UI Dashboard PRO React base styles
import borders from "assets/theme/base/borders";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";
import bruceMars from "assets/images/bruce-mars.jpg";
import workSpace from "assets/images/work-space.jpeg";

function Post() {
  const { borderWidth, borderColor } = borders;

  const [comments] = useState([
    {
      image: bruceMars,
      name: "michael lewis",
      text: "I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves!",
      like: 3,
      share: 2,
    },
    {
      image: team5,
      name: "jessica stones",
      text: "Society has put up so many boundaries, so many limitations on what’s right and wrong that it’s almost impossible to get a pure thought out. It’s like a little kid, a little boy.",
      like: 10,
      share: 1,
    },
  ]);

  const renderComments = comments.map(({ image, name, text, like, share }, key) => (
    <SuiBox key={name} display="flex" mt={key === 0 ? 0 : 3}>
      <SuiBox flexShrink={0}>
        <SuiAvatar src={image} alt={name} />
      </SuiBox>
      <SuiBox flexGrow={1} ml={2}>
        <SuiTypography variant="h5" fontWeight="medium" textTransform="capitalize">
          {name}
        </SuiTypography>
        <SuiBox mt={1} mb={2} lineHeight={0.75}>
          <SuiTypography variant="button" fontWeight="regular" color="text">
            {text}
          </SuiTypography>
        </SuiBox>
        <SuiBox display="flex" flexWrap="wrap" alignItems="center">
          <SuiBox display="flex" alignItems="center" mr={1}>
            <SuiTypography component="a" href="#" variant="body2" color="text">
              <Icon>thumb_up</Icon>&nbsp;
            </SuiTypography>
            <SuiTypography variant="button" fontWeight="regular" color="text">
              {like} likes
            </SuiTypography>
          </SuiBox>
          <SuiBox display="flex" alignItems="center">
            <SuiTypography component="a" href="#" variant="body2" color="text">
              <Icon>share</Icon>&nbsp;
            </SuiTypography>
            <SuiTypography variant="button" fontWeight="regular" color="text">
              {share} shares
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </SuiBox>
  ));

  return (
    <Card>
      <SuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
        borderBottom={`${borderWidth[1]} solid ${borderColor}`}
        py={2}
        px={3}
      >
        <SuiAvatar src={team4} alt="profile-image" variant="rounded" />
        <SuiBox mx={2} lineHeight={1}>
          <SuiTypography component="a" href="#" variant="button" fontWeight="regular">
            John Snow
          </SuiTypography>
          <SuiTypography component="div" variant="button" color="text" fontWeight="regular">
            3 days ago
          </SuiTypography>
        </SuiBox>
        <SuiBox ml={{ xs: 0, sm: "auto" }} mt={{ xs: 2, sm: 0 }}>
          <SuiButton variant="gradient" color="info" size="small">
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>&nbsp; follow
          </SuiButton>
        </SuiBox>
      </SuiBox>
      <SuiBox p={3}>
        <SuiBox mb={3}>
          <SuiTypography variant="body2" color="text">
            Personal profiles are the perfect way for you to grab their attention and persuade
            recruiters to continue reading your CV because you’re telling them from the off exactly
            why they should hire you.
          </SuiTypography>
        </SuiBox>
        <SuiBox component="img" src={workSpace} shadow="lg" borderRadius="xl" width="100%" />
        <SuiBox mt={3} mb={1} px={1}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={6}>
              <SuiBox display="flex" alignItems="center">
                <SuiBox display="flex" alignItems="center" mr={2}>
                  <SuiTypography component="a" href="#" variant="body2" color="text">
                    <Icon>thumb_up</Icon>&nbsp;
                  </SuiTypography>
                  <SuiTypography variant="button" fontWeight="regular" color="text">
                    150
                  </SuiTypography>
                </SuiBox>
                <SuiBox display="flex" alignItems="center" mr={2}>
                  <SuiTypography component="a" href="#" variant="body2" color="text">
                    <Icon>mode_comment</Icon>&nbsp;
                  </SuiTypography>
                  <SuiTypography variant="button" fontWeight="regular" color="text">
                    36
                  </SuiTypography>
                </SuiBox>
                <SuiBox display="flex" alignItems="center" mr={2}>
                  <SuiTypography component="a" href="#" variant="body2" color="text">
                    <Icon>share</Icon>&nbsp;
                  </SuiTypography>
                  <SuiTypography variant="button" fontWeight="regular" color="text">
                    12
                  </SuiTypography>
                </SuiBox>
              </SuiBox>
            </Grid>
            <Grid item xs={12} sm={6}>
              <SuiBox
                display={{ xs: "none", sm: "flex" }}
                justifyContent="flex-end"
                alignItems="center"
                width="100%"
              >
                <SuiAvatar src={team5} alt="person 1" size="xs" />
                <SuiAvatar src={team2} alt="person 2" size="xs" />
                <SuiAvatar src={team1} alt="person 3" size="xs" />
                <SuiBox pl={1}>
                  <SuiTypography variant="button" color="text" fontWeight="medium">
                    and 30+ more
                  </SuiTypography>
                </SuiBox>
              </SuiBox>
            </Grid>
          </Grid>
          <Divider />
          {renderComments}
          <SuiBox display="flex" alignItems="center" mt={3}>
            <SuiBox flexShrink={0} mr={2}>
              <SuiAvatar src={team4} alt="profile picture" />
            </SuiBox>
            <SuiBox flexGrow={1}>
              <SuiInput placeholder="Write your comment" multiline />
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default Post;
