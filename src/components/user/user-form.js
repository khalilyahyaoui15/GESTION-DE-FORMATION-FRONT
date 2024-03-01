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
import { createUser } from "src/api/user";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const UserForm = (props) => {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeRole = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
 

  const handleSubmit = (event) => {
    console.log(values)
    event.preventDefault();
    createUser(values)
      .then((res) => {
        console.log(res);
        router.push("/users");
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
                label="Email"
                name="email"
                type="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First Name"
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
                label="Last Name"
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
                label="Password"
                name="password"
                onChange={handleChange}
                required
                type="password"
                value={values.password}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Role</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                >
                    <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
                    <FormControlLabel value="USER" control={<Radio />} label="User" />
                    <FormControlLabel value="FORMATEUR" control={<Radio />} label="Formateur" />
                </RadioGroup>
                </FormControl>
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

export default UserForm;
