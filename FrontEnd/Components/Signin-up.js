import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme1 from './Theme1';
import Divider from '@mui/material/Divider'
import { Checkbox, FormControlLabel } from '@mui/material';
import {app,db} from '../firebaseconfig';
import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged, getAuth} from "firebase/auth"
import {ref,set,get,update} from "firebase/database"
import {generateVoterId} from "./IDgenerator"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        E-Voting System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignInSide() {
  const auth = getAuth(app)
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const user =  await signInWithEmailAndPassword(auth,data.get('email'),data.get('password'))
      navigate("/Voter")
    }
    catch (error){
      alert(error.message)
    }
  };

  const handleSubmitSignUp = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const user = await createUserWithEmailAndPassword(auth, data.get('email'), data.get('password'));
      var uid = user.user.uid
      await insertdata(uid,data);
      await mapdata(uid);
      console.log(user.user.uid);
      window.location.reload();
    } catch (error) {
      alert(error.message)
    }
  };

  async function insertdata(user,data){
    await set(ref(db, `/Users/${user}`),{
        VOID      : generateVoterId(),
        Firstname : data.get('firstName'),
        Lastname  : data.get('lastName'),
        Gender: selectedGender,
        Emailid   : data.get('email'),
        Aadhar    : data.get('addahar'),
    })
    .then(()=>{
        alert("User Created, Please Sign-in")
    })
    .catch((error)=>{
        throw error
    });
  }
  
  async function mapdata(uid) {
    try {
      const snapshot1 = await get(ref(db, `/Users/${uid}`));
      const data1 = snapshot1.val();
      
      if (data1) {
        const voidToUidPath = `/VOIDtoUid/${data1.VOID}`;
        const existingSnapshot = await get(ref(db, voidToUidPath))
        const existingData = existingSnapshot.val() || {};
        let u ="Uid"
        // Append or update the UID for the VOID
        existingData[u] = uid; // You can use true as a placeholder value
  
        await update(ref(db, voidToUidPath), existingData);
      }
    } catch (error) {
      throw error;
    }
  }
  const [selectedGender, setSelectedGender] = useState();
  
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  return (
    <ThemeProvider theme={theme1}>
      <Grid container component="main" sx={{ height: '83vh', disableEqualOverflow: "true" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
          }}
        >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Sign in, If you have Registered
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, 
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "44px",
                padding: "1 25px",
                boxSizing: "border-box",
                borderRadius: 35,
                borderColor: "#000",
                background: "#F0F0F0",
                color: "#000",
                fullWidth: "true",
                fontSize: "15px",
                transform: "none",
                transition: "background .3s,border-color .3s,color .3s",
                "&:hover": {
                  backgroundColor: "#403D3D",
                  color: "#FFF"
                },
                border: "1.5px solid #403D3D",
                textTransform: 'capitalize', }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        </Grid>
        <Divider orientation="vertical" sx={{height : "100%"}} />
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Sign up, If not Registered
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmitSignUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={selectedGender === 'Male'}
                        onChange={handleGenderChange}
                        value="Male"
                        color="primary"
                    />
                    }
                    label="Male"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={selectedGender === 'Female'}
                        onChange={handleGenderChange}
                        value="Female"
                        color="primary"
                    />
                    }
                    label="Female"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="addahar"
                  label="Adhaar ID"
                  name="addahar"
                  autoComplete="email"
                  inputProps={{ maxLength: 12 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, 
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "44px",
                    padding: "1 25px",
                    boxSizing: "border-box",
                    borderRadius: 35,
                    borderColor: "#000",
                    background: "#F0F0F0",
                    color: "#000",
                    fullWidth: "true",
                    fontSize: "15px",
                    transform: "none",
                    transition: "background .3s,border-color .3s,color .3s",
                    "&:hover": {
                    backgroundColor: "#403D3D",
                    color: "#FFF"
                    },
                    border: "1.5px solid #403D3D",
                    textTransform: 'capitalize', }} 
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
      </Grid>
      <Box
          component="footer"
          sx={{
            maxHeight: 4,
            py: 4,
            px: "auto",
            backgroundColor: "#B3B3B3",
            position: "fixed",
            width: "100%",
            bottom: "0"
          }}
        >
          <Container maxWidth="sm">
            <Copyright sx={{ mb: 4 }}/>
          </Container>
        </Box>
    </ThemeProvider>
  );
}