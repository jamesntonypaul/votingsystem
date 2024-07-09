import {useEffect, useState} from 'react'
import { Card, CardContent, Typography,Button,Grid } from '@mui/material';
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material'
import { db,store } from '../../firebaseconfig';
import {ref,set,update,get,remove} from 'firebase/database';
import * as dref from 'firebase/storage'

const VotersResultsDetails = ({ election, onBack}) => {
    const [candidates, setCandidates] = useState([]);
    const [voters,setVoters] = useState([]);
    const c = "CandidateImage"
    const fetchdata = async () => {
    const updatedCandidates = [];
    for (const candidateId in election.Candidates) {
    const candidateDetails = election.Candidates[candidateId];
        try {
        const url = await dref.getDownloadURL(dref.ref(store, `${election.ElectionId}/${candidateId}`));
        candidateDetails.CandidateImage = url;
        } catch (error) {
            alert("Image of " + candidateDetails.CandidateId + " not retrieved");
        }
    updatedCandidates.push(candidateDetails);
    }
    setCandidates(updatedCandidates);
    }
  useEffect(() => {
        fetchdata()
        return()=>{

        }
    },[])
    return (
        <Grid display="flex" flexDirection={"row"} justifyContent={"space-around"}>
        <Grid display="flex" flexDirection={"column"} justifyContent={"space-between"}>
        <Card sx={{height: "175px", width: "400px",justifyContent:"space-between"}} variant="outlined">
        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly",height:"100%"}}>
            <Typography variant="h4">Election Details</Typography>
            <Typography variant="subtitle1">ID: {election.ElectionId}</Typography>
            <Typography variant="subtitle1">Name: {election.ElectionName}</Typography>
            <Typography variant="subtitle1">Winner: {`${election.Winner.FirstName}${election.Winner.LastName}`}</Typography>
        </CardContent>
        </Card>
        <Grid display="flex" flexDirection="row" justifyContent="space-around">
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={onBack}>
            Back
            </Button>
        </Grid>
        </Grid>
        <Card sx={{height: "600px", width: "500px" }} variant="outlined">
        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",height:"100%"}}>
        <Typography variant="h4">Candidate List</Typography>
        <TableContainer sx={{
        width: '100%',
        maxWidth: '700px'}} >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Candidate Image</TableCell>
                    <TableCell>Candidate ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Slogan</TableCell>
                    <TableCell>Votes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {candidates.map((candidate, index) => (
                    <TableRow key={index}> 
                      <TableCell>{candidate.CandidateImage && <img src={candidate.CandidateImage} alt="Candidate" style={{ width: "100px" }}/>}</TableCell>
                      <TableCell>{candidate.CandidateId}</TableCell>
                      <TableCell>{`${candidate.FirstName} ${candidate.LastName}`}</TableCell>
                      <TableCell>{candidate.Slogan}</TableCell>
                      <TableCell>{candidate.Votes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </CardContent>
    </Card>
    </Grid>
    );
    };
export default VotersResultsDetails;
