import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';
import theme1 from './Theme1';
import { useNavigate } from 'react-router-dom';
import {app} from '../firebaseconfig';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"

export default function SignIn() {
  const auth = getAuth(app)
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
        const user =  await signInWithEmailAndPassword(auth,data.get('email'),data.get('password'))
        console.log(user)
        navigate("/Admin")
      }
      catch (error){
        console.log(error.message)
        alert(error.message)
      }
  };

  return (
    <ThemeProvider theme={theme1}>
     <Grid container component="main" sx={{ height: '83vh', disableEqualOverflow: "true" }}>
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
          <Typography component="h1" variant="h4" color="secondary" sx={{ fontFamily: 'Segoe UI',mb:5}}>
            Sign in, Admin
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
              autoFocus
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
      </Container>
      </Grid>
    </ThemeProvider>
  );
}
