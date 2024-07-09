import {useEffect, useState} from 'react';
import { Card, CardContent, Typography, Button,CardActions,CardMedia,Grid,CssBaseline,Box,Container, Divider } from '@mui/material';
import { db,auth } from '../firebaseconfig';
import {ref,set,get,update,remove,child,query} from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';
import VoterElectionCard from './VoterCurrElection/VoterElectionCard';
import VoterElectionDetails from './VoterCurrElection/VoterElectionDetails';

const VoterCurrElection = (election) => {
  const [userVOID, setUserVOID] = useState(null);
  const [Completed, setCompleted] = useState(false)
  const [eidlist,seteidlist] = useState([])
  const [completedElection,setCompletedElection] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const handleElectionClick = (election) => {
    setSelectedElection(election);
  };
  const handleBack = () => {
    setSelectedElection(null);
  };
  const addElectionarray = async (eid) => {
    
  }
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        const uid = user.uid;
        const snapshot1 = await get(ref(db, `/Users/${uid}`));
        const data1 = snapshot1.val();

        if (data1) {
          setUserVOID(data1.VOID);
        } else {
          console.log('User data not found.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchResultData = async () => {
      try {
        if (userVOID) {
          const currentElectionsRef = ref(db, '/CurrentlyRunning/');
          const snapshot = await get(currentElectionsRef);

          if (snapshot.exists()) {
            const electionsData = snapshot.val();
            const electionIds = Object.keys(electionsData);

            for (const eid of electionIds) {
              const electionRef = ref(db, `/CurrentlyRunning/${eid}`);
              const votersQuery = query(child(electionRef, `Voters/${userVOID}`));

              const votersSnapshot = await get(votersQuery);

              if (votersSnapshot.exists()) {
                const data = await get(ref(db,`/CurrentlyRunning/${eid}`))
                const snapshot = data.val()
                const snapshot1 = { snapshot }
                console.log(snapshot1)
                if (data)
                {
                  const electionarry = Object.values(snapshot1)
                  console.log(electionarry)
                  setCompletedElection((prev => [...prev, ...electionarry]))
                  setCompleted(true)
                }
            }
            }
            } 
          else 
            {
              setCompletedElection([]);
              setCompleted(false);
          }
          //console.log(completedElection)
        }
      } 
      catch (error) {
        console.error('Error:', error);
      }
    };

    fetchResultData();
    return()=>{
      setCompletedElection([])
      setCompleted(false)
    }
  }, [userVOID]);

  return (
    <Container display="flex" flexDirection="colomn" alignItems="center">
    <CssBaseline />
    <Box mt={4}>
    {/* Display the list of election cards */}
    {selectedElection ? (
            <VoterElectionDetails election={selectedElection} onBack={handleBack} />
          ) : (
            <Container>
            <Typography variant='h4' mt={2} align='center'>Currently Running Election</Typography>
          <Grid container mt={2} mb={2} spacing={2} justifyContent="flex-start" alignItems="start">
            {Completed?(
              completedElection.map((election,index) => (
              <Grid item key={index}>
                <VoterElectionCard
                  election={election}
                  onClick={() => handleElectionClick(election)}
                />
              </Grid>
            ))
            ):(
              <Grid item>
                <Typography variant='h6' align='center'>No Elections you can Vote</Typography>
              </Grid>
            )}
          </Grid>
          </Container>)}
  </Box>
</Container>
  );
};

export default VoterCurrElection
