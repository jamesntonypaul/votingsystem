import * as React from 'react';
import { Card, CardContent, Typography, Grid, Box, Button,Container } from '@mui/material';
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material'
import AddCandidateForm from './AddCandidateForm';
import { useElectionContext } from './ElectionContext';
import { auth,db,store } from '../../firebaseconfig';
import {ref,set,get,update} from "firebase/database"
import * as StoreFunctions from 'firebase/storage';

const AddCandidates = ({ handleCreateElectionClick }) => {
  const user = auth.currentUser;

  if (user) {
  // User is logged in, and you can get the UID like this:
  const uid = user.uid;
  console.log('User UID:', uid);
  } 
  else {
  // No user is logged in
  console.log('No user is logged in');
  }
  const { eid } = useElectionContext()
  const [candidatesform, setCandidatesform] = React.useState(true);
  const handleAddCandidateState = (state)=>
  {
    setCandidatesform(state)
  }
  // Sample candidate list for demonstration
  const [candidates, setCandidates] = React.useState([]);
  async function insertdata(eid, candidates) {
    const candidateUpdates = {};
    candidates.forEach(async function (candidate) {
      // Generate a unique key for each candidate using the generateCandidateID function
       // Replace with your actual function to generate a candidate ID


      // Prepare the candidate data to be inserted
      const candidateData = {
        CandidateId: candidate.CandidateId,
        FirstName: candidate.firstName,
        LastName: candidate.lastName,
        Gender: candidate.gender,
        Slogan: candidate.slogan,
        Addahar: candidate.addahar,
        Votes : 0,
        // Include other properties here if needed
      };
      const candidateKey = candidate.CandidateId
      // Save the candidate data in the candidateUpdates object with the candidateKey as the key
      candidateUpdates[`/Elections/CreatedNow/${eid}/Candidates/${candidateKey}`] = candidateData;

      // Upload the image if available
      if (candidate.CandidateImage) {
        // Assuming you are using Firebase Storage to store images
        // Replace 'your-storage-bucket' with your actual Firebase Storage bucket name
        // Assuming the candidate.CandidateImage is a Blob representing the image
        try {
          // Perform a bulk update to insert all candidate data in a single database operation
          const storageRef = StoreFunctions.ref(store, `${eid}/${candidateKey}`);
          await StoreFunctions.uploadBytes(storageRef, candidate.CandidateImage);
        }
        catch(error) {
            throw error
          }
      }
    });
    try {
      // Perform a bulk update to insert all candidate data in a single database operation
      await update(ref(db), candidateUpdates)
    }
    catch(error) {
        throw error;
      }
  }
  function handlesetcandidate(data) {
    // Append the new candidate data to the existing candidates state
    setCandidates((prevCandidates) => [...prevCandidates, data]);
  }
  // State to keep track of the selected candidate
  const [selectedCandidate, setSelectedCandidate] = React.useState(null);
  // Method to handle candidate selection
  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
  };

  // Method to handle the Add button click
  const handleAddClick = () => {
    handleAddCandidateState(false)
  };

  // Method to handle the Remove button click
  const handleRemoveClick = () => {
    if (selectedCandidate) {
      setCandidates(candidates.filter((candidate) => candidate !== selectedCandidate));
      setSelectedCandidate(null); // Clear selected candidate after removing
    }
  };
  async function handleNextClick1() {
    try{
        await insertdata(eid,candidates)
        handleCreateElectionClick("AddVoter")}
    catch(error){
      alert(error.message)
      window.location.reload();
    }
    }
  function handleBackClick() {

        handleCreateElectionClick("InitialState");
    }
  return (
    <React.Fragment>
    {!candidatesform ? (
        <AddCandidateForm handleAddCandidateState={handleAddCandidateState} handlesetcandidate={handlesetcandidate}/>
    ) : (
      <Container sx={{ display: 'flex',flexDirection:"column", alignItems: 'center'}}>
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
        <Typography variant="h4">Add Candidates</Typography>
        <Box component="form" sx={{ mt: 1 }}>
        <TableContainer sx={{
        width: '100%',
        maxWidth: '700px'}} >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Candidate ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Slogan</TableCell>
                    <TableCell>Addahar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {candidates.map((candidate, index) => (
                    <TableRow key={index}
                    selected={selectedCandidate === candidate}
                    onClick={() => handleCandidateSelect(candidate)}
                    sx={{ cursor: 'pointer', backgroundColor: selectedCandidate === candidate ? '#F0F03F4' : 'transparent' }}
                  > 
                      <TableCell>{candidate.CandidateImage && <img src={URL.createObjectURL(candidate.CandidateImage)} alt="Candidate" style={{ width: "100px" }}/>}</TableCell>
                      <TableCell>{candidate.CandidateId}</TableCell>
                      <TableCell>{`${candidate.firstName} ${candidate.lastName}`}</TableCell>
                      <TableCell>{candidate.gender}</TableCell>
                      <TableCell>{candidate.slogan}</TableCell>
                      <TableCell>{candidate.addahar}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </Box>
        </CardContent>
        </Card>
        <Card sx={{
        width: '100%',
        
        maxWidth: '400px',
        Height: '100px',
        p: '1rem',
        boxSizing: 'border-box',
        mt: "2"
      }}>
        <CardContent>
        <Grid container spacing={2} sx={{justifyContent:"flex-end"}}>
    <Grid item xs={6} sx={{position:"static"}}>
      <Button
        type="button"
        fullWidth
        variant="contained"
        onClick={handleAddClick}
        sx={{ mt: 2 }}
      >
        Add
      </Button>
    </Grid>
    <Grid item xs={6}>
      <Button
        type="button"
        fullWidth
        variant="contained"
        onClick={handleRemoveClick}
        sx={{ mt: 2 }}
      >
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
        Cancel
      </Button>
    </Grid>
    <Grid item xs={6}>
      <Button
        type="button"
        fullWidth
        variant="contained"
        onClick={handleNextClick1}
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
        Next1
      </Button>
    </Grid>
    </Grid>
      </CardContent>
    </Card></Container>)}
    </React.Fragment>
  );
};

export default AddCandidates;
