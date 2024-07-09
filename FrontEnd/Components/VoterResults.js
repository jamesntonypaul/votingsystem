import {useState,useEffect} from 'react';
import { Card, CardContent, Typography, Button,CardActions,CardMedia,Grid,CssBaseline,Box,Container } from '@mui/material';
import VotersResultsCard from './VotersResults/VotersResultsCard';
import VotersResultsDetails from './VotersResults/VotersResultsDetails';
import { db,store } from '../firebaseconfig';
import {ref,set,update,get,remove} from 'firebase/database';


const VoterResults = (election) => {
    const [Completed, setCompleted] = useState([])
    const [selectedElection, setSelectedElection] = useState();
  
    const handleElectionClick = (election) => {
      setSelectedElection(election);
    };
    const handleBack = () => {
      setSelectedElection(null);
    };
    const fetchresultdata = async () => {
      try {
        const snapshot =await get(ref(db, `/Elections/Completed/`))
        const data = snapshot.val();
        if (data) {
          const votersArray = Object.values(data); // Convert the data object to an array
          setCompleted(votersArray); // Update the 'voters' state with the fetched data
        } else {
          setCompleted([]); // If there is no data, set 'voters' state as an empty array
        }
        
      }
      catch(error) {
          alert(error)
          window.location.reload();
        }
    }
    useEffect (() =>
    {
      fetchresultdata();
      return () =>{
        fetchresultdata();
      }
    },[])
  return (
    <Container>
    <CssBaseline />
    <Box mt={4}>
    {/* Display the list of election cards */}
    {selectedElection ? (
            <VotersResultsDetails election={selectedElection} onBack={handleBack} />
          ) : (
            <Grid container spacing={2} justifyContent="flex-start" alignItems="start">
            {Completed.map((election) => (
              <Grid item key={election.id}>
                <VotersResultsCard
                  election={election}
                  onClick={() => handleElectionClick(election)}
                />
              </Grid>
            ))}
          </Grid>)}
  </Box>
</Container>
  );
};

export default VoterResults;