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
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React base styles
import borders from "assets/theme/base/borders";

// Images
import rocketShip from "assets/images/illustrations/rocket-white.png";

function OutlinedCard() {
  const { borderWidth, borderColor } = borders;
  return (
    <SuiBox
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      alignItems="center"
      borderRadius="xl"
      shadow="xxl"
      border={`${borderWidth[1]} dashed ${borderColor}`}
      textAlign="center"
      p={3}
    >
      <SuiBox component="img" src={rocketShip} alt="Rocketship" width="50%" mb={3} />
      <SuiTypography
        component="a"
        href="#"
        variant="button"
        color="white"
        textTransform="capitalize"
        fontWeight="medium"
        sx={({ palette: { secondary }, typography: { size } }) => ({
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          color: `${secondary.main} !important`,

          "& .material-icons-round": {
            ml: 0.5,
            fontSize: size.md,
            transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
          },

          "&:hover .material-icons-round": {
            transform: "translateX(5px)",
          },
        })}
      >
        Join rocketship program <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
      </SuiTypography>
    </SuiBox>
  );
}

export default OutlinedCard;
