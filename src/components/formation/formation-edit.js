import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import router from "next/router";
import { useEffect } from "react";
import { updateFormation , getFormationById } from "src/api/formation";

const FormationEdit = ({formationId}) => {
const [values, setValues] = useState({});
const [loaded,setLoaded] = useState(false);


  useEffect(() => {
    getFormationById(formationId).then((res) => {
        setValues(res.data)
        setLoaded(true);
    });
  },[formationId]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
        titre :   values.titre,
        nbSession  :   values.nbSession,
        nbParticipants   :   values.nbParticipants,
        duree :   values.duree,
        budget  :   values.budget,
        year    :   values.year
    }    
    updateFormation(formationId,body)
      .then((res) => {
        console.log(res);
        router.push("/formations");
      })
      .catch((err) => console.log(err));
  
      };

  return (
    <>
    {loaded && 
    <form autoComplete="off" noValidate  onSubmit={handleSubmit}>
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
                defaultValue={values.titre}
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
                defaultValue={values.nbSession}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nombre de participant"
                name="nbParticipants"
                onChange={handleChange}
                required
                type="number"
                defaultValue={values.nbParticipant}
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
                defaultValue={values.duree}
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
                defaultValue={values.budget}
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
                defaultValue={values.year}
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
        }
        </>
  );
};

FormationEdit.propTypes = {
    formationId: PropTypes.any,
  };
  
export default FormationEdit;