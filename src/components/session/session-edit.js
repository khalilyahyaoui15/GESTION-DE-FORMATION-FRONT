import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import router from "next/router";
import { updateSession ,  getSessionById } from "src/api/session";
import { getFormations } from "src/api/formation";
import { getFormateurs } from "src/api/formateur";
import { MobileDatePicker } from "@mui/lab";
import dayjs, { Dayjs } from 'dayjs';

const SessionEdit = ({sessionId}) => {
  const [values, setValues] = useState({});
  const [loaded,setLoaded] = useState(false);
  const [formateurs, setFormateurs] = useState([]);
  const [formations, setFormations] = useState([]);
  const [criteria, setCriteria] = useState("");
  const [date, setDate] = useState(
    dayjs(values.dateDebut),
  );

  useEffect(() => {
    getFormations(criteria).then((res) => setFormations(res.data));
  }, [criteria]);

  useEffect(() => {
    getFormateurs(criteria).then((res) => setFormateurs(res.data));
  }, [criteria]);

  useEffect(() => {
    getSessionById(sessionId).then((res) => {
        setValues(res.data)
        setLoaded(true);
    });
  },[sessionId]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(values)
  };
 
  const handleChangeDateDebut = (newValue) => {
    setDate(newValue),
    setValues({
      ...values,
      dateDebut: date,
    });
    console.log(values)
  };
  const handleChangeDateFin = (newValue) => {
    setDate(newValue),
    setValues({
      ...values,
      dateFin: date,
    });
    console.log(values)
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
        formation : values.formation,
        titre : values.titre,
        dateDebut : values.dateDebut,
        dateFin : values.dateFin,
        formateur : values.formateur,
    }
    updateSession(sessionId,body)
      .then((res) => {
        console.log(res);
        router.push("/sessions");
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
                label="Title"
                name="titre"
                onChange={handleChange}
                required
                defaultValue={values.titre}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
            <InputLabel id="label">Formation</InputLabel>
            <Select 
              labelId="label"
              id="select"
              name="formation"
              fullWidth
              onChange={handleChange} 
              defaultValue={values.formation ? values.formation: " "}
              label="Formation"
            >
            {formations.map((formation) => (
              <MenuItem value={formation._id}>{formation.titre}</MenuItem>
            ))}
          </Select>
            </Grid>
            <Grid item md={6} xs={12}>
            <InputLabel id="label">Formateur</InputLabel>
            <Select 
              labelId="label"
              id="select"
              name="formateur"
              fullWidth
              onChange={handleChange} 
              defaultValue={values.formateur ? values.formateur: ""}
              label="Formateur"
            >
            {formateurs.map((formateur) => (
              <MenuItem value={formateur._id}>{formateur.prenom} {formateur.nom}</MenuItem>
            ))}
          </Select>
            </Grid>
            <Grid item md={6} xs={12}>
                <MobileDatePicker
                    label="Date Debut"
                    inputFormat="dd/MM/yyyy"
                    name="dateDebut"
                    value={values.dateDebut}
                    required
                    onChange={handleChangeDateDebut}
                    renderInput={(params) => <TextField {...params} />}
                    variant="outlined"
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <MobileDatePicker
                        label="Date Fin"
                        inputFormat="dd/MM/yyyy"
                        name="dateFin"
                        value={values.dateFin}
                        required
                        onChange={handleChangeDateFin}
                        renderInput={(params) => <TextField {...params} />}
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

export default SessionEdit;
