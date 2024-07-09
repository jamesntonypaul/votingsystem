import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, Container } from '@mui/material';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useElectionContext } from './ElectionContext';
import { db,store } from '../../firebaseconfig';
import {ref,set,get,update,remove} from "firebase/database";
import * as StoreFunctions from 'firebase/storage';

const VoterList = ({ handleCreateElectionClick }) => {
  const { eid,setEid } = useElectionContext();
  const [votersForm, setVotersForm] = useState(true);
  const handleAddVoterState = (state) => {
    setVotersForm(state);
  };
  const [voters, setVoters] = useState([]);
  const [selectedVoters, setSelectedVoters] = useState([]); // State for selected voters

  function handleSetVoter(data) {
    setVoters((prevVoters) => [...prevVoters, data]);
  }
  const fetchVotersData = async () => {
    //const db = getDatabase(); // Get reference to the Firebase Realtime Database
    try {
      // Perform a bulk update to insert all candidate data in a single database operation
      const snapshot =await get(ref(db, `/Users/`))
      const data = snapshot.val();
      if (data) {
        const votersArray = Object.values(data); // Convert the data object to an array
        setVoters(votersArray); // Update the 'voters' state with the fetched data
      } else {
        setVoters([]); // If there is no data, set 'voters' state as an empty array
      }
    }
    catch(error) {
        alert(error)
        window.location.reload();
      }
    }
    const cleardata = async() => {
      try 
      {
        await remove(ref(db, `/Elections/CreatedNow/${eid}`))
      }
      catch (error)
      {
        throw error
      }
    }
    const saveSelectedVotersToFirebase = async () => {
      try {
        // Save the selected voters data to the 'selectedVoters' node in Firebase
        selectedVoters.forEach(async (voter) => {
          await set(ref(db, `/Elections/CreatedNow/${eid}/Voters/${voter.VOID}`),{
            TransactionID : " ",
            VOID : voter.VOID,
            isVoted : true
          });
        });
      } catch (error) {
        throw error
      }
    };
  const handleAddClick = () => {
    if (selectedVoter) {
      setSelectedVoters((prevSelectedVoters) => [...prevSelectedVoters, selectedVoter]);
      setVoters((prevVoters) => prevVoters.filter((voter) => voter !== selectedVoter));
      setSelectedVoter(null); // Clear selected voter after adding to selected list
    }
  };

  const handleRemoveClick = () => {
    if (selectedVoter) {
      setVoters((prevVoters) => [...prevVoters, selectedVoter]);
      setSelectedVoters((prevSelectedVoters) =>
        prevSelectedVoters.filter((voter) => voter !== selectedVoter)
      );
      setSelectedVoter(null); // Clear selected voter after removing from selected list
    }
  };

  function handleNextClick() {
    try{
      saveSelectedVotersToFirebase();
      alert("Sucessfully Created an ELECTION");
      setEid(null)
      handleCreateElectionClick('InitialState');
    }
    catch (error){
      alert(error.message)
    }
  }
  function handleBackClick() {
    try{
      cleardata()
      setEid(null)
      handleCreateElectionClick('InitialState');
    }
    catch (error){
      alert(error.message)
    }
  }

  // State to keep track of the selected voter
  const [selectedVoter, setSelectedVoter] = useState(null);

  // Method to handle voter selection
  const handleVoterSelect = (voter) => {
    setSelectedVoter(voter);
  };
  React.useEffect(() => {
    // Call the fetchVotersData function when the component mounts
    fetchVotersData();

    // Clean up the listener when the component unmounts
    return () => {
    };
  }, [eid]);
  return (
    <React.Fragment>
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Card
            sx={{
              width: '100%',
              maxWidth: '900px',
              minHeight: '400px',
              p: '1rem',
              boxSizing: 'border-box',
            }}
            variant="outlined"
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '100%',
              }}
            >
              <Typography variant="h4">Voter List</Typography>
              <Box component="form" sx={{ mt: 1 }}>
                <TableContainer sx={{ width: '100%', maxWidth: '700px' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Voter ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>EmailID</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {voters.map((voter, index) => (
                        <TableRow
                          key={index}
                          selected={selectedVoter === voter}
                          onClick={() => handleVoterSelect(voter)}
                          sx={{ cursor: 'pointer', backgroundColor: selectedVoter === voter ? '#F0F03F4' : 'transparent' }}
                        >
                          {/*<TableCell>{voter.ui && <img src={URL.createObjectURL(voter.VoterImage)} alt="Voter" style={{ width: '100px' }} />}</TableCell>*/}
                          <TableCell>{voter.VOID}</TableCell>
                          <TableCell>{`${voter.Firstname} ${voter.Lastname}`}</TableCell>
                          <TableCell>{voter.Gender}</TableCell>
                          <TableCell>{voter.Emailid}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Selected Voters List */}
          <Card
            sx={{
              width: '100%',
              maxWidth: '900px',
              minHeight: '400px',
              p: '1rem',
              boxSizing: 'border-box',
              mt: '2',
            }}
            variant="outlined"
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '100%',
              }}
            >
              <Typography variant="h4">Selected Voters List</Typography>
              <Box component="form" sx={{ mt: 1 }}>
                <TableContainer sx={{ width: '100%', maxWidth: '700px' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Voter ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Email ID</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedVoters.map((voter, index) => (
                        <TableRow
                          key={index}
                          selected={selectedVoter === voter}
                          onClick={() => handleVoterSelect(voter)}
                          sx={{ cursor: 'pointer', backgroundColor: selectedVoter === voter ? '#F0F03F4' : 'transparent' }}
                        >
                          {/*<TableCell>{voter.VoterImage && <img src={URL.createObjectURL(voter.VoterImage)} alt="Voter" style={{ width: '100px' }} />}</TableCell>*/}
                          <TableCell>{voter.VOID}</TableCell>
                          <TableCell>{`${voter.Firstname} ${voter.Lastname}`}</TableCell>
                          <TableCell>{voter.gender}</TableCell>
                          <TableCell>{voter.Emailid}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
          </Container>
          {/* Buttons */}
          <Card
            sx={{
              width: '100%',
              maxWidth: '400px',
              Height: '100px',
              p: '1rem',
              boxSizing: 'border-box',
              mt: '2',
            }}
          >
            <CardContent>
              <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
                <Grid item xs={6} sx={{ position: 'static' }}>
                  <Button type="button" fullWidth variant="contained" onClick={handleAddClick} sx={{ mt: 2 }}>
                    Add
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button type="button" fullWidth variant="contained" onClick={handleRemoveClick} sx={{ mt: 2 }}>
                    Remove
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={handleBackClick}
                    sx={{
                      mt: 3,
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '44px',
                      padding: '1 25px',
                      boxSizing: 'border-box',
                      borderRadius: 35,
                      borderColor: '#000',
                      background: '#F0F0F0',
                      color: '#000',
                      fullWidth: 'true',
                      fontSize: '15px',
                      transform: 'none',
                      transition: 'background .3s,border-color .3s,color .3s',
                      '&:hover': {
                        backgroundColor: '#403D3D',
                        color: '#FFF',
                      },
                      border: '1.5px solid #403D3D',
                      textTransform: 'capitalize',
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={handleNextClick}
                    sx={{
                      mt: 3,
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '44px',
                      padding: '1 25px',
                      boxSizing: 'border-box',
                      borderRadius: 35,
                      borderColor: '#000',
                      background: '#F0F0F0',
                      color: '#000',
                      fullWidth: 'true',
                      fontSize: '15px',
                      transform: 'none',
                      transition: 'background .3s,border-color .3s,color .3s',
                      '&:hover': {
                        backgroundColor: '#403D3D',
                        color: '#FFF',
                      },
                      border: '1.5px solid #403D3D',
                      textTransform: 'capitalize',
                    }}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
    </React.Fragment>
  );
};

export default VoterList;
