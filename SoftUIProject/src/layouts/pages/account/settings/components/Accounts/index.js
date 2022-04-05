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
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Images
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoAsana from "assets/images/small-logos/logo-asana.svg";

function Accounts() {
  const [slack2FA, setSlack2FA] = useState(true);
  const [spotify2FA, setSpotify2FA] = useState(true);
  const [atlassian2FA, setAtlassian2FA] = useState(true);
  const [asana2FA, setAsana2FA] = useState(false);

  const handleSetSlack2FA = () => setSlack2FA(!slack2FA);
  const handleSetSpotify2FA = () => setSpotify2FA(!spotify2FA);
  const handleSetAtlassian2FA = () => setAtlassian2FA(!atlassian2FA);
  const handleSetAsana2FA = () => setAsana2FA(!asana2FA);

  return (
    <Card id="accounts">
      <SuiBox p={3} lineHeight={1}>
        <SuiBox mb={1}>
          <SuiTypography variant="h5">Accounts</SuiTypography>
        </SuiBox>
        <SuiTypography variant="button" color="text" fontWeight="regular">
          Here you can setup and manage your integration settings.
        </SuiTypography>
      </SuiBox>
      <SuiBox pt={2} pb={3} px={3}>
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <SuiBox display="flex" alignItems="center">
            <SuiAvatar src={logoSlack} alt="Slack logo" variant="rounded" />
            <SuiBox ml={2}>
              <SuiTypography variant="h5" fontWeight="medium">
                Slack
              </SuiTypography>
              <SuiBox display="flex" alignItems="flex-end">
                <SuiTypography variant="button" color="text" fontWeight="regular">
                  Show less
                </SuiTypography>
                <SuiTypography variant="button" color="text" sx={{ lineHeight: 0 }}>
                  <Icon fontSize="small">expand_less</Icon>
                </SuiTypography>
              </SuiBox>
            </SuiBox>
          </SuiBox>
          <SuiBox
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            width={{ xs: "100%", sm: "auto" }}
            mt={{ xs: 1, sm: 0 }}
          >
            <SuiBox lineHeight={0} mx={2}>
              <SuiTypography variant="button" color="text" fontWeight="regular">
                {slack2FA ? "Enabled" : "Disabled"}
              </SuiTypography>
            </SuiBox>
            <SuiBox mr={1}>
              <Switch checked={slack2FA} onChange={handleSetSlack2FA} />
            </SuiBox>
          </SuiBox>
        </SuiBox>
        <SuiBox ml={2} pl={6} pt={2} lineHeight={1}>
          <SuiTypography variant="button" color="text" fontWeight="regular">
            You haven&apos;t added your Slack yet or you aren&apos;t authorized. Please add our
            Slack Bot to your account by clicking on here. When you&apos;ve added the bot, send your
            verification code that you have received.
          </SuiTypography>
          <SuiBox
            bgColor="grey-100"
            borderRadius="lg"
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            my={3}
            py={1}
            pl={{ xs: 1, sm: 2 }}
            pr={1}
          >
            <SuiTypography variant="button" fontWeight="medium" color="text">
              Verification Code
            </SuiTypography>
            <SuiBox width={{ xs: "100%", sm: "25%", md: "15%" }} mt={{ xs: 1, sm: 0 }}>
              <Tooltip title="Copy" placement="top">
                <SuiInput size="small" value="1172913" />
              </Tooltip>
            </SuiBox>
          </SuiBox>
          <SuiBox
            bgColor="grey-100"
            borderRadius="lg"
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            my={3}
            py={1}
            pl={{ xs: 1, sm: 2 }}
            pr={1}
          >
            <SuiTypography variant="button" fontWeight="medium" color="text">
              Connected account
            </SuiTypography>
            <SuiBox
              display="flex"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <SuiBox mr={2} mb={{ xs: 1, sm: 0 }} lineHeight={0}>
                <SuiTypography variant="button" fontWeight="medium">
                  hello@creative-tim.com
                </SuiTypography>
              </SuiBox>
              <SuiButton variant="gradient" color="error" size="small">
                delete
              </SuiButton>
            </SuiBox>
          </SuiBox>
        </SuiBox>
        <Divider />
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <SuiBox display="flex" alignItems="center">
            <SuiAvatar src={logoSpotify} alt="Slack logo" variant="rounded" />
            <SuiBox ml={2} lineHeight={0}>
              <SuiTypography variant="h5" fontWeight="medium">
                Spotify
              </SuiTypography>
              <SuiTypography variant="button" color="text" fontWeight="regular">
                Music
              </SuiTypography>
            </SuiBox>
          </SuiBox>
          <SuiBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width={{ xs: "100%", sm: "auto" }}
            mt={{ xs: 1, sm: 0 }}
          >
            <SuiBox lineHeight={0} mx={2}>
              <SuiTypography variant="button" color="text" fontWeight="regular">
                {spotify2FA ? "Enabled" : "Disabled"}
              </SuiTypography>
            </SuiBox>
            <SuiBox mr={1}>
              <Switch checked={spotify2FA} onChange={handleSetSpotify2FA} />
            </SuiBox>
          </SuiBox>
        </SuiBox>
        <Divider />
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <SuiBox display="flex" alignItems="center">
            <SuiAvatar src={logoAtlassian} alt="Slack logo" variant="rounded" />
            <SuiBox ml={2} lineHeight={0}>
              <SuiTypography variant="h5" fontWeight="medium">
                Atlassian
              </SuiTypography>
              <SuiTypography variant="button" color="text" fontWeight="regular">
                Payment vendor
              </SuiTypography>
            </SuiBox>
          </SuiBox>
          <SuiBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width={{ xs: "100%", sm: "auto" }}
            mt={{ xs: 1, sm: 0 }}
          >
            <SuiBox lineHeight={0} mx={2}>
              <SuiTypography variant="button" color="text" fontWeight="regular">
                {atlassian2FA ? "Enabled" : "Disabled"}
              </SuiTypography>
            </SuiBox>
            <SuiBox mr={1}>
              <Switch checked={atlassian2FA} onChange={handleSetAtlassian2FA} />
            </SuiBox>
          </SuiBox>
        </SuiBox>
        <Divider />
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <SuiBox display="flex" alignItems="center">
            <SuiAvatar src={logoAsana} alt="Slack logo" variant="rounded" />
            <SuiBox ml={2} lineHeight={0}>
              <SuiTypography variant="h5" fontWeight="medium">
                Asana
              </SuiTypography>
              <SuiTypography variant="button" color="text" fontWeight="regular">
                Organize your team
              </SuiTypography>
            </SuiBox>
          </SuiBox>
          <SuiBox
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            width={{ xs: "100%", sm: "auto" }}
            mt={{ xs: 1, sm: 0 }}
          >
            <SuiBox lineHeight={0} mx={2}>
              <SuiTypography variant="button" color="text" fontWeight="regular">
                {asana2FA ? "Enabled" : "Disabled"}
              </SuiTypography>
            </SuiBox>
            <SuiBox mr={1}>
              <Switch checked={asana2FA} onChange={handleSetAsana2FA} />
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default Accounts;
