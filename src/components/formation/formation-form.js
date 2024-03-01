import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import router from "next/router";
import { createFormation } from "src/api/formation";

const FormationForm = (props) => {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createFormation(values)
      .then((res) => {
        //console.log(res);
        router.push("/formations");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form autoComplete="off" noValidate {...props} onSubmit={handleSubmit}>
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the title"
                label="Title"
                name="titre"
                onChange={handleChange}
                required
                value={values.titre}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nombre de session"
                name="nbSession"
                onChange={handleChange}
                required
                type="number"
                value={values.nbSession}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nombre de participant"
                name="nbParticipant"
                onChange={handleChange}
                required
                type="number"
                value={values.nbParticipant}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Durée"
                name="duree"
                onChange={handleChange}
                required
                type="number"
                value={values.duree}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Budget"
                name="budget"
                onChange={handleChange}
                type="number"
                required
                value={values.budget}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Année"
                name="year"
                required
                onChange={handleChange}
                value={values.year}
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

export default FormationForm;
