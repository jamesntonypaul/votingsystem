import {useEffect, useState} from 'react';
import { Card, CardContent, Typography, Button,CardActions,CardMedia,Grid,CssBaseline,Box,Container, Divider } from '@mui/material';
import { db } from '../firebaseconfig';
import {ref,set,get,update,remove} from "firebase/database";
import AdminElectionCard from './AdminCurrElection/AdminElectionCard';
import AdminElectionDetails from './AdminCurrElection/AdminElectionDetails';

const AdminCurrElection = (election) => {
  const [Created, setCreated] = useState()
  const [Completed, setCompleted] = useState()
  const [createdElection,setCreatedElection] = useState([]);
  const [completedElection,setCompletedElection] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const handleElectionClick = (election) => {
    setSelectedElection(election);
  };
  const handleBack = () => {
    setSelectedElection(null);
  };
  const fetchcurrdata = async () => {
    try {
      const snapshot =await get(ref(db, `/Elections/CreatedNow/`))
      const data = snapshot.val();
      if (data) {
        const votersArray = Object.values(data); // Convert the data object to an array
        setCreatedElection(votersArray);
        setCreated(true); // Update the 'voters' state with the fetched data
      } else {
        setCreatedElection([]);
        setCreated(false); // If there is no data, set 'voters' state as an empty array
      }
      console.log(Completed)
    }
    catch(error) {
        alert(error)
        window.location.reload();
      }
  }
  const fetchresultdata = async () => {
    try {
      const snapshot =await get(ref(db, `/CurrentlyRunning/`))
      const data = snapshot.val();
      if (data) {
        const votersArray = Object.values(data); // Convert the data object to an array
        setCompletedElection(votersArray);
        setCompleted(true); // Update the 'voters' state with the fetched data
      } else {
        setCompletedElection([]);
        setCompleted(false); // If there is no data, set 'voters' state as an empty array
      }
      
    }
    catch(error) {
        alert(error)
        window.location.reload();
      }
  }
  useEffect (() =>
  {
    fetchcurrdata();
    console.log(Created)
    fetchresultdata();
    console.log(Completed)
    return () =>{
      fetchcurrdata();
      fetchresultdata();
    }
  },[])
  return (
    <Container display="flex" flexDirection="colomn" alignItems="center">
    <CssBaseline />
    <Box mt={4}>
    {/* Display the list of election cards */}
    {selectedElection ? (
            <AdminElectionDetails election={selectedElection} onBack={handleBack} />
          ) : (
            <Container>
              <Typography variant='h4' align='center'>Created Election</Typography>
            <Grid container mt={2} mb={2} spacing={2} justifyContent="flex-start" alignItems="start">
            {Created?(
              createdElection.map((election,index) => (
              <Grid item key={index}>
                <AdminElectionCard
                  election={election}
                  onClick={() => handleElectionClick(election)}
                />
              </Grid>
            ))
            ):(
              <Grid item key={election.ElectionID}>
                <Typography variant='h6' align='center'>No Created New Elections</Typography>
              </Grid>
            )}
          </Grid>
          <Divider/>
            <Typography variant='h4' mt={2} align='center'>Currently Running Election</Typography>
          <Grid container mt={2} mb={2} spacing={2} justifyContent="flex-start" alignItems="start">
            {Completed?(
              completedElection.map((election,index) => (
              <Grid item key={index}>
                <AdminElectionCard
                  election={election}
                  onClick={() => handleElectionClick(election)}
                />
              </Grid>
            ))
            ):(
              <Grid item>
                <Typography variant='h6' align='center'>No Currently Running Elections</Typography>
              </Grid>
            )}
          </Grid>
          </Container>)}
  </Box>
</Container>
  );
};

export default AdminCurrElection;
