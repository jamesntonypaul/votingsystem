import React, { useState} from 'react';
import {useNavigate} from 'react-router-dom'
import './App.css';
import theme1 from './Components/Theme1.js';
import { ThemeProvider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockIcon from '@mui/icons-material/Lock';
import { Grid, Typography, Box, CssBaseline, IconButton,Button } from '@mui/material';
import NavBar from './Components/AdminNavBar';
import AdminResults from './Components/AdminResults';
import AdminCurrElection from './Components/AdminCurrElection';
import AdminVoterList from './Components/AdminVoterList';
import AdminCreateElection from './Components/AdminCreateElection';
import { signOut,onAuthStateChanged,getAuth } from 'firebase/auth';
import {app} from './firebaseconfig';

function Admin() {
  const auth = getAuth(app)
  const [admin, setadmin] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const navigate = useNavigate()
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  const handleRedirectLogout=()=>{
    navigate("/LoginAdmin")
  }
  const handleLogout = async () =>{
  try{
    const status = await signOut(auth)
    console.log(status)
    navigate("/LoginAdmin")
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
        console.log(user.uid)
        const isAdmin = idTokenResult.claims.admin || false;

        setadmin(user);
        setIsAdmin(isAdmin);
      } else {
        setadmin(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);
  
   if (isAdmin) { 
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
                  Hi, Admin
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center',mb:2  }}>
                <IconButton color="primary" sx={{ mr: 1 }}>
                  <LockIcon style={{ fontSize: '2rem' }} />
                </IconButton>
                <Typography component="h1" variant="h5" sx={{ background: 'secondary' }}>
                  Change Password
                </Typography>
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
              {selectedMenuItem === 'Current Election' && <AdminCurrElection />}
              {selectedMenuItem === 'Create Election' && <AdminCreateElection State={1} />}
              {selectedMenuItem === 'Results' && <AdminResults />}
              {selectedMenuItem === 'Voters List' && <AdminVoterList />}
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

export default Admin;
