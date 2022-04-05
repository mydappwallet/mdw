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

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// NewUser page components
import FormField from "layouts/pages/users/new-user/components/FormField";

function Profile({ formData }) {
  const { formField, values } = formData;
  const { publicEmail, bio } = formField;
  const { publicEmail: publicEmailV, bio: bioV } = values;

  return (
    <SuiBox>
      <SuiTypography variant="h5" fontWeight="bold">
        Profile
      </SuiTypography>
      <SuiBox mt={1.625}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormField
              type={publicEmail.type}
              label={publicEmail.label}
              name={publicEmail.name}
              value={publicEmailV}
              placeholder={publicEmail.placeholder}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              type={bio.type}
              label={bio.label}
              name={bio.name}
              value={bioV}
              placeholder={bio.placeholder}
              multiline
              rows={5}
            />
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

// typechecking props for Profile
Profile.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Profile;
