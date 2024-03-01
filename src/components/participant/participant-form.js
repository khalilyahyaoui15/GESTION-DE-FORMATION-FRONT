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
import { createParticipant } from "src/api/participant";
import { getSessions } from "src/api/session";

const ParticipantForm = (props) => {
  const [values, setValues] = useState({});
  const [sessions, setSessions] = useState([]);
  const [criteria, setCriteria] = useState("");

  useEffect(() => {
    getSessions(criteria).then((res) => setSessions(res.data));
  }, [criteria]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(values)
  };
  const handleChangeSession = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(values)
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    createParticipant(values)
      .then((res) => {
        console.log(res);
        router.push("/participants");
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
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
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
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
            <InputLabel id="label">Session</InputLabel>
            <Select 
              labelId="label"
              id="select"
              name="session"
              fullWidth
              onChange={handleChangeSession} 
              value={values.session ? values.session: " "}
              label="Session"
            >
            {sessions.map((session) => (
              <MenuItem value={session._id}>{session.titre}</MenuItem>
            ))}
          </Select>
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

export default ParticipantForm;