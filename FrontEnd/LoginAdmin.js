import './App.css';
import theme1 from './Components/Theme1.js'
import { ThemeProvider } from '@mui/material';
import SignIn from './Components/SignIn';
import { AppBar, Typography, Toolbar,Container,Link,Box } from '@mui/material';

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

function LoginAdmin() {
  return (
    <ThemeProvider theme={theme1}>
      <AppBar sx={{height: "60px",position: "static",backgroundColor: "#403D3D",paddingTop: "1px",display: "flex",alignItems: "center"}}>
      <Toolbar sx={{ display: "flex", flexDirection: "row", alignItems: "center",mx : "1"}}>
      <Typography variant="h4" sx = {{position : "center"}}>
        E-VOTING SYSTEM
      </Typography>
      </Toolbar>
    </AppBar>
      <SignIn/>
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

export default LoginAdmin;