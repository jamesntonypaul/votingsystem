import React from 'react';
import { Card, CardContent, Typography,Button,Grid } from '@mui/material';

const ElectionDetails = ({ election, onBack}) => {
  return (
    <Grid display="flex" flexDirection={"row"} justifyContent={"space-around"}>
    <Grid display="flex" flexDirection={"column"} justifyContent={"space-between"}>
    <Card sx={{height: "275px", width: "400px",justifyContent:"space-between"}} variant="outlined">
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly",height:"100%"}}>
        <Typography variant="h4">Election Details</Typography>
        <Typography variant="subtitle1">Name: {election.name}</Typography>
        <Typography variant="subtitle1">Date: {election.date}</Typography>
        <Typography variant="Contract Address">Name: {election.name}</Typography>
      </CardContent>
    </Card>
    <Card sx={{height: "275px", width: "400px" }} variant="outlined">
    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "start",height:"100%"}}>
      <Typography variant="h4" sx={{fontSize:"25px"}}>Candiadate List</Typography>
      <Typography variant="subtitle1">Name: {election.name}</Typography>
      <Typography variant="subtitle1">Date: {election.date}</Typography>
      <Typography variant="Contract Address">Name: {election.name}</Typography>
    </CardContent>
    </Card>
    <Grid display="flex" flexDirection="column" justifyContent="center">
    <Button variant="contained" color="primary" sx={{ mt: "auto" }} onClick={onBack}>
      Back
    </Button>
    </Grid>
    </Grid>
    <Card sx={{height: "600px", width: "500px" }} variant="outlined">
    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",height:"100%"}}>
      <Typography variant="h4">Voter List</Typography>
      <Typography variant="subtitle1">Name: {election.name}</Typography>
      <Typography variant="subtitle1">Date: {election.date}</Typography>
      <Typography variant="Contract Address">Name: {election.name}</Typography>
    </CardContent>
  </Card>
  </Grid>
  );
};

export default ElectionDetails;
