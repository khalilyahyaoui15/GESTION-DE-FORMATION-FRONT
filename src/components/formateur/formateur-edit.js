import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import router from "next/router";
import { useEffect } from "react";
import { updateFormateur , getFormateurById } from "src/api/formateur";

const FormateurEdit = ({formateurId}) => {
const [values, setValues] = useState({});
const [loaded,setLoaded] = useState(false);


  useEffect(() => {
    getFormateurById(formateurId).then((res) => {
        setValues(res.data)
        setLoaded(true);
    });
  },[formateurId]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
        nom :   values.nom,
        prenom  :   values.prenom,
        email   :   values.email,
        tel :   values.tel
    }    
    updateFormateur(formateurId,body)
      .then((res) => {
        console.log(res);
        router.push("/formateurs");
      })
      .catch((err) => console.log(err));
  
      };

  return (
    <>
    {loaded && 
    <form autoComplete="off" noValidate  onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="prenom"
                onChange={handleChange}
                required
                defaultValue={values.prenom}
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
                defaultValue={values.nom}
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
                defaultValue={values.email}
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
                defaultValue={values.tel}
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

FormateurEdit.propTypes = {
    formateurId: PropTypes.any,
  };
  
export default FormateurEdit;