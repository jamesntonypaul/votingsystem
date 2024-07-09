import * as React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const AdminElectionCard = ({ election, onClick }) => {
  return (
    <Card sx={{height: "150px", width: "300px" }} variant="outlined">
      <CardContent alignItems="center" justifyContent="center">
        <Typography variant="h5">{election.ElectionId}</Typography>
        <Typography variant="subtitle1">Date: {election.ElectionName}</Typography>
        <Button variant="contained" color="primary" onClick={() => onClick(election)} sx={{ mt: 1, 
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
                textTransform: 'capitalize'}}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminElectionCard;
