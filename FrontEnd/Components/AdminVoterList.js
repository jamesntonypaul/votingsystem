import { useEffect,useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, Container } from '@mui/material';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { db } from '../firebaseconfig';
import {ref,get} from "firebase/database";

const AdminVoterList = () => {
  const [voters, setVoters] = useState([]);
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
  useEffect(() => {
    // Call the fetchVotersData function when the component mounts
    fetchVotersData();

    // Clean up the listener when the component unmounts
    return () => {
    };
  }, []);
  return (
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
                          sx={{ cursor: 'pointer'}}
                        >
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
  );
};

export default AdminVoterList;

