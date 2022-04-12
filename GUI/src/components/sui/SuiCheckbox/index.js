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

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-select components
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";

const SuiCheckbox = forwardRef(({ error, helperText, ...rest }, ref) => (
  // styles for the focused state of the input

  <>
    <Checkbox {...rest} ref={ref} />
    <FormHelperText error id="accountId-error">
      {helperText}
    </FormHelperText>
  </>
));

// Setting default values for the props of SuiSelect
SuiCheckbox.defaultProps = {
  error: false,
  helperText: "",
};

// Typechecking props for the SuiSelect
SuiCheckbox.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default SuiCheckbox;
