import React from 'react';
import { AppBar, Typography, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

const ConstantItem = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  transition: "color 0.3s", // Add a smooth transition to the color property
  margin: "0 -4px",
  [theme.breakpoints.down('sm')]: {
    paddingBottom: "1rem",
  },
}));

const MenuItem = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  flexGrow: 1,
  transition: "color 0.3s", // Add a smooth transition to the color property
  margin: "0 -4px",
  "&:hover": {
    color: "#6E7070",
    textDecoration: "underline", // Add underline on hover// Add a scale effect on hover
    // boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", // Optional: Add a shadow effect on hover
  },
  [theme.breakpoints.down('sm')]: {
    paddingBottom: "1rem",
  },
}));

const NavBar = ({ selectedMenuItem, onMenuItemClick }) => {
  return (
    <AppBar sx={{height: "60px",position: "static",backgroundColor: "#403D3D",paddingTop: "1px",display: "flex"}}>
      <Toolbar sx={{ display: "flex", flexDirection: "row", alignItems: "center", mx : "1"}}>
      <ConstantItem variant="h4">
        E-VOTING SYSTEM
      </ConstantItem>
      <MenuItem variant="h5" onClick={() => onMenuItemClick("Current Election")}>
          Current Election
        </MenuItem>
        <MenuItem variant="h5" onClick={() => onMenuItemClick("Create Election")}>
          Create Election
        </MenuItem>
        <MenuItem variant="h5" onClick={() => onMenuItemClick("Results")}>
          Results
        </MenuItem>
        <MenuItem variant="h5" onClick={() => onMenuItemClick("Voters List")}>
          Voters List
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

