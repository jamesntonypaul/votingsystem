import React, { useState} from 'react';
import {useNavigate} from 'react-router-dom'
import './App.css';
import theme1 from './Components/Theme1.js';
import { ThemeProvider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockIcon from '@mui/icons-material/Lock';
import { Grid, Typography, Box, CssBaseline, IconButton,Button,TextField } from '@mui/material';
import NavBar from './Components/VoterNavBar';
import PrevElection from './Components/VoterResults';
import VoterCurrElection from './Components/VoterCurrElection';
import { signOut,onAuthStateChanged, getAuth } from 'firebase/auth';
import {app} from './firebaseconfig';

function Voter() {
  const auth = getAuth(app)
  const [passd,setpassd] = React.useState(false)
  const [userid, setUserid] = React.useState();
  const [user, setUser] = React.useState(false);
  const navigate = useNavigate()
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  const handleRedirectLogout=()=>{
    navigate("/Login")
  }
  const handlePasswordchange =()=>{
    setpassd(!passd)
  }
  const handlePasswordchangeauth=()=>{
    /*updatePassword(auth.currentUser, data.get('password'))
     .then(() => {
    console.log('Password updated successfully.');
  })
    .catch(error => {
    console.error('Error updating password:', error);
  });*/
  }
  const handleLogout = async () =>{
  try{
    const status = await signOut(auth)
    console.log(status)
    navigate("/Login")
  }
  catch(error)
  {
    alert(error.message)
  }
  }
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const isAdmin = idTokenResult.claims.admin || false;
        setUserid(user.uid)
        setUser(isAdmin);
        console.log(user.uid)
      } else {
        setUser();
        setUser(true);
      }})
      return () => unsubscribe();
  }, []);
  
   if (!user) { 
    return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ThemeProvider theme={theme1}>
        <NavBar selectedMenuItem={selectedMenuItem} onMenuItemClick={handleMenuItemClick} />
        <Grid container sx={{ flexGrow: 1 }}>
        <CssBaseline />
          <Grid item xs={4} md={3} lg={2} sx={{ background: '#F0F0F0', p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start',p:2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center',mb:2 }}>
                <IconButton color="primary" sx={{ mr: 1 }}>
                  <AccountCircleIcon style={{ fontSize: '5rem' }} />
                </IconButton>
                <Typography component="h1" variant="h5" sx={{ background: 'secondary' }}>
                  Hi, Voter
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center',mb:2  }}>
                <IconButton color="primary" sx={{ mr: 1 }}>
                  <LockIcon style={{ fontSize: '2rem' }} onClick={handlePasswordchange}/>
                </IconButton>
                {passd?(<Box component="form" onSubmit={handlePasswordchangeauth}><TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Enter new Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
            /><Button> change </Button></Box>
            ):(<Typography component="h1" variant="h5" sx={{ background: 'secondary' }}>
            Change Password
          </Typography>)}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center',mb:2  }}>
                <IconButton color="primary" sx={{ mr: 1 }}>
                  <ExitToAppIcon style={{ fontSize: '2rem' }} onClick={handleLogout} />
                </IconButton>
                <Typography component="h1" variant="h5" sx={{ background: 'secondary' }}>
                  Logout
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={9} lg={10} sx={{ p: 2 }}>
            <Box
              component="main"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                width:"100%",
              }}
            >
              {selectedMenuItem === 'Current Election' && <VoterCurrElection />}
              {selectedMenuItem === 'Results' && <PrevElection />}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>);
    }
    else{ return(
      <Grid container sx={{ display:"flex",flexGrow: 1,flexDirection:"column",alignItems:"center"}}>
        <Typography variant="h4">Unauthorized Usage</Typography>
        <Button
        type="submit"
        variant="contained"
        onClick={handleRedirectLogout}
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
          fontSize: "15px",
          transform: "none",
          transition: "background .3s,border-color .3s,color .3s",
          "&:hover": {
            backgroundColor: "#403D3D",
            color: "#FFF"
          },
          border: "1.5px solid #403D3D",
          textTransform: 'capitalize', }}>
            To Login Page
        </Button>
      </Grid>);
       }
}

export default Voter;
