import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import router from "next/router";
import { createFormateur } from "src/api/formateur";

const FormateurForm = (props) => {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createFormateur(values)
      .then((res) => {
        //console.log(res);
        router.push("/formateurs");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form autoComplete="off" noValidate {...props} onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="prenom"
                onChange={handleChange}
                required
                value={values.prenom}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="nom"
                onChange={handleChange}
                required
                value={values.nom}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="tel"
                onChange={handleChange}
                type="number"
                value={values.tel}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default FormateurForm;
