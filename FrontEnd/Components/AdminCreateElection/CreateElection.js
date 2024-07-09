import * as React from 'react';
import { Card, CardContent, Typography, Grid,Box,TextField,Button } from '@mui/material';
import { generateElectionId } from '../IDgenerator';
import { db } from '../../firebaseconfig';
import {ref,set} from "firebase/database"
import { useElectionContext } from './ElectionContext';
import * as StoreFunctions from 'firebase/storage';

const CreateElection = ({handleCreateElectionClick}) =>{
    const { setEid } = useElectionContext();
    const handleNextClick = async (event) => {
        event.preventDefault();
        const data = {Ename: document.getElementById('Ename').value}
        var eid = generateElectionId()
        try {
            await insertdata(eid,data)
            setEid(eid)
            handleCreateElectionClick("AddCandidates")
          }
        catch (error){
          alert(error.message)
        }
      };
      async function insertdata(eid,data){
        await set(ref(db, `/Elections/CreatedNow/${eid}`),{
            ElectionId : eid,
            ElectionName : data.Ename,
            ContractAddress : " ",
            Account : " ",
        })
        .catch((error)=>{
           throw error
        });
      }
  return (
      <Card
        sx={{
          width: '100%', // Set the card width to 100% of its container
          maxWidth: '700px', // Set the maximum width for the card (optional)
          minHeight: '400px',
          p: '1rem', // Add padding to the card content
          boxSizing: 'border-box', // Include padding in the width/height calculation
        }} variant="outlined"
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography variant="h4">Create Election</Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              //required
              fullWidth
              id="Ename"
              label="Election Name" 
              name="Ename"
              autoComplete="Ename"
              autoFocus
            />
            <TextField
              margin="normal"
              //required
              fullWidth
              name="Edesc"
              label="Add Description"
              type="descripton"
              id="Edesc"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(event) => handleNextClick(event)}
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
              Next
            </Button>
          </Box>
        </CardContent>
      </Card>
  );
};

export default CreateElection;
