import { Default } from "react-spinners-css";

// react-router-dom components

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import themeRTL from "assets/theme/theme-rtl";
// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";
// RTL plugins

// Soft UI Dashboard PRO React components
import SuiBox from "components/sui/SuiBox";

function Spinner({ background }) {
  return (
    <ThemeProvider theme={themeRTL}>
      <SuiBox
        width="100vw"
        height="100%"
        minHeight="100vh"
        bgColor={background}
        sx={{ overflowX: "hidden", position: "relative" }}
      >
        <Default
          color={colors.info.main}
          size={200}
          style={{
            position: "absolute",
            margin: "-25px 0 0 -25px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </SuiBox>
    </ThemeProvider>
  );
}

Spinner.defaultProps = {
  background: "default",
};

// Typechecking props for the PageLayout
Spinner.propTypes = {
  background: PropTypes.oneOf(["white", "light", "default"]),
};

export default Spinner;
