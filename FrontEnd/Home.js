import './App.css';
import theme1 from './Components/Theme1.js'
import { Link,useNavigate } from 'react-router-dom';
import { Grid, ThemeProvider,Box,Container,TextField} from '@mui/material';
import Button from '@mui/material/Button';
import { AppBar, Typography, Toolbar } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        E-Voting System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function Home() {
  const navigate = useNavigate()
  return (
    <ThemeProvider theme={theme1}>
      <AppBar sx={{height: "60px",position: "static",backgroundColor: "#403D3D",paddingTop: "1px",display: "flex",alignItems: "center"}}>
        <Toolbar sx={{ display: "flex", flexDirection: "row", alignItems: "center",mx : "1"}}>
          <Typography variant="h4" sx = {{position : "center"}}>
            E-VOTING SYSTEM
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container alignItems="stretch" justifyContent="center" height="calc(100vh - 110px)" spacing={2} sx={{mt:2}}>
        <Grid item xs={12} textAlign="center" >
          <Typography variant="h4" color="secondary" sx={{ fontFamily: 'Segoe UI', textDecoration: 'underline', fontSize: '50px' }}>
            E-VOTING SYSTEM
          </Typography>
          <Typography variant="h4" color="secondary" sx={{ fontFamily: 'Segoe UI', fontSize: '28px', mt: 10 }}>
            This is a project created on a decentralized blockchain-based Voting System
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="center" sx={{mt : -5}}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5" color="primary" sx={{ mb: 1,fontSize: '20px' }}>
              If your are a Admin
            </Typography>
            <Button onClick={() => navigate("/LoginAdmin")} variant="contained" color="primary" sx={{ mt: 1, 
                mb: 2,
                minWidth: '200px',
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
                textTransform: 'capitalize', }}>
              Admin
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6} textAlign="center" sx={{mt : -5}}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5" color="primary" sx={{ mb: 1,fontSize: '20px' }}>
              If you are a Voter
            </Typography>
            <Button onClick={() => navigate("/Login")} sx={{ mt: 1, 
                mb: 2,
                minWidth: '200px',
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
                textTransform: 'capitalize', }}>
              Voter
            </Button>
          </Box>
        </Grid>
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
  ) 
}

export default Home;
