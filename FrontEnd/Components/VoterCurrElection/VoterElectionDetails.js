import {useEffect, useState} from 'react'
import { Card, CardContent, Typography,Button,Grid,CardMedia,FormControlLabel,Checkbox, Container, Divider } from '@mui/material';
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material'
import { db,auth,store } from '../../firebaseconfig';
import {ref,set,update,get,remove} from 'firebase/database';
import * as dref from 'firebase/storage'

const AdminElectionDetails = ({ election, onBack}) => {
    const [voted,setvoted] = useState(true)
    const [account,setaccount] = useState()
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidates, setSelectedCandidates] = useState();
    const c = "CandidateImage"
    const testdata = async() => {
        const user = auth.currentUser;
        const uid = user.uid;
        const snapshot = await get(ref(db,`/Users/${uid}`))
        const data = snapshot.val()
        const snapshot1 = await get(ref(db,`/CurrentlyRunning/${election.ElectionId}/Voters/${data.VOID}`))
        const data1 = snapshot1.val()
        setvoted(data1.isVoted)
        if (!data1.isVoted) {
            setaccount(data1.TransactionID)
        }
    }
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
        setCandidates(updatedCandidates)
        }
  }
  const updateVoteCount = async (contractAddress, id, account) => {
    try {
      //console.log(account);
      const response = await fetch(`http://localhost:5000/candidates/${contractAddress}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Vote count updated successfully', data.transactionHash);
        return(data)
      } else {
        throw new Error(response.reason);
      }
    } catch (error) {
      throw (error);
    }
  };
      const handleCandidateSelection = (candidateId) => {
        setSelectedCandidates(candidateId)
      };
      const handleVote = async () => {
        try {
            const det = await updateVoteCount(election.ContractAddress,selectedCandidates,account)
            const user = auth.currentUser;
            const uid = user.uid;
            const snapshot = await get(ref(db,`/Users/${uid}`))
            const data = snapshot.val()
            const snapshot1 = await update(ref(db,`/CurrentlyRunning/${election.ElectionId}/Voters/${data.VOID}`),{
                isVoted : true,
            })
            alert("Vote Casted Sucessfully, TransactionHash: ",det.transactionHash)
            onBack()
        }
        catch(error){
            alert(error.message)
        }
      };
  useEffect(() => {
        testdata()
        fetchdata()
    },[])
    return (
        <Container alignItems="center">
        {!voted?(<Grid container display="flex" flexDirection={"column"} justifyContent={"space-between"}>
        <Grid display="flex" flexDirection={"row"} justifyContent={"space-between"}>
        <Card sx={{height: "175px", width: "400px",justifyContent:"space-between",mb:2}} variant="outlined">
        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly",height:"100%"}}>
            <Typography variant="h6">Election Details</Typography>
            <Typography variant="subtitle1">ID: {election.ElectionId}</Typography>
            <Typography variant="subtitle1">Name: {election.ElectionName}</Typography>
            <Button onClick={onBack} variant='contained' sx={{mt : 4}}>Back</Button>
        </CardContent>
        </Card>
        </Grid>
        <Divider/>
        <Typography variant="h4" align='center'>Candidate List</Typography>
        <Grid display="flex" flexDirection={"row"} justifyContent={"space-around"} mt={2}>
        {candidates.map((candidate,index) => (
        <div><Card key={index}>
          <CardMedia component="img" alt="Candidate" style={{ width: "100px" ,p:2}} image={candidate.CandidateImage} />
          <CardContent>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCandidates === index}
                  onChange={() => handleCandidateSelection(index)}
                  color="primary"
                />
              }
              label={`Candidate ${candidate.CandidateId}`}
            />
            <Typography variant="subtitle1">Name: {`${candidate.FirstName} ${candidate.LastName}`}</Typography>
            <Typography variant="subtitle1">Slogan: {candidate.Slogan}</Typography>
          </CardContent>
        </Card>
        </div>
      ))}</Grid>
      <Button onClick={handleVote} type="submit"
              variant="contained"
              sx={{ mt: 3, 
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "44px",
                    width : "250px",
                    padding: "1 25px",
                    boxSizing: "border-box",
                    borderRadius: 35,
                    borderColor: "#000",
                    background: "#F0F0F0",
                    color: "#000",
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
        Vote
      </Button>
    </Grid>):(<Typography variant="h2" align='center'>You have Voted</Typography> )}
    </Container>
    );
    };
export default AdminElectionDetails;
