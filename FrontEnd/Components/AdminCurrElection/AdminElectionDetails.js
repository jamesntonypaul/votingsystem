import {useEffect, useState} from 'react'
import { Card, CardContent, Typography,Button,Grid } from '@mui/material';
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material'
import { db,store } from '../../firebaseconfig';
import {ref,set,update,get,remove} from 'firebase/database';
import * as dref from 'firebase/storage'

const AdminElectionDetails = ({ election, onBack}) => {
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
    const updatedVoters=[]
    for (const voterid in election.Voters) {
        const voterDetails = election.Voters[voterid];
            try {
                const snapshot = await get(ref(db, `/VOIDtoUid/${voterid}`));
                const data = snapshot.val()
                const snapshot1 = await get(ref(db, `/Users/${data.Uid}`));
                const data1 = snapshot1.val()
                updatedVoters.push(data1)
            } catch (error) {
                alert("Data not retrived please refresh");
            }
        }
        setVoters(updatedVoters);
    }
  const cleardata = async() => {
        try 
        {
            console.log(election.ElectionId)
            await remove(ref(db, `/Elections/CreatedNow/${election.ElectionId}`))
            alert("Election Deleted")
            onBack();
        }
        catch (error)
        {
          throw error
        }
    }
  const deployContract = async () => {
        try {
          const response = await fetch('http://localhost:5000/deploy',{
            method: 'GET'
          });
          const data = await response.json();
          if (response.ok) {
            return(data)
          } else {
            throw new Error('Failed to Sent', response.status);
          }
        } catch (error) {
          throw error
        }
    };
  const addCandBlockChain = async (contractAddress,name, accounts) => {
        try {
            const response = await fetch(`http://localhost:5000/candidates/${contractAddress}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, accounts }),
            });
            if (response.status === 201) {
            const data = await response.json();
            console.log('Transaction Hash:', data.transactionHash);
            } else {
                throw new Error('Failed to Sent', response.status);
            }
        } catch (error) {
            throw error
        }
      };
  const grantRole = async (contractAddress) => {
        try {
            const response = await fetch(`http://localhost:5000/GrantRole/${contractAddress}`,{
            method: 'GET'
            })
            .catch(error => {
            console.error('Failed to fetch account list:', error);
            });
        
            if (response.status === 201) {
            const data = await response.json();
            console.log(data)
            return(data)
            } else {
                throw new Error('Failed to Sent', response.status);
            }
        } catch (error) {
            throw error;
        }
      };
      //Stopping Election
  const locchange = async() =>{
        try {
            const sourceRef = ref(db, `/Elections/CreatedNow/${election.ElectionId}/`);
            const sourceSnapshot = await get(sourceRef);
            const sourceData = sourceSnapshot.val();

            const targetRef = ref(db, `/CurrentlyRunning/${election.ElectionId}/`);
            await update(targetRef, sourceData);

            await remove(sourceRef);
        } catch (error) {
            throw error
        }
      };
      const EndElection = async(contractAddress) =>{
        try {
            const response = await fetch(`http://localhost:5000/EndElection/${contractAddress}`,{
            method: 'GET'
            })
            .catch(error => {
            console.error('Failed to fetch account list:', error);
            });
        
            if (response.status === 201) {
            const data = await response.json();
            //console.log('Transaction Hash:', data.transactionHash);
            console.log('Voting Ended ');
            } else {
            throw new Error(response.status);
            }
        } catch (error) {
            throw error
        }
      };
  const fetchCandidates = async (contractAddress) => {
        try {
          const response = await fetch(`http://localhost:5000/candidates/${contractAddress}`);
          const data = await response.json();
          return data;
        } catch (error) {
          throw new Error(error)
        }
      };
  const locchange1 = async() =>{
        try {
            const sourceRef = ref(db, `/CurrentlyRunning/${election.ElectionId}/`);
            const sourceSnapshot = await get(sourceRef);
            const sourceData = sourceSnapshot.val();

            const targetRef = ref(db, `/Elections/Completed/${election.ElectionId}/`);
            await update(targetRef, sourceData);

            await remove(sourceRef);
        } catch (error) {
            throw error
        }
      };
    function largestvotecount(data) {
        let largestVoteCount = -1;
        let largestVoteId = -1;
  
        for (const item of data) {
          const voteCount = parseInt(item.voteCount);
  
          if (voteCount > largestVoteCount) {
            largestVoteCount = voteCount;
            largestVoteId = item.id;
          }
        }
        return largestVoteId;
      }
  const handlestop = async() =>{
      try {
        await EndElection(election.ContractAddress).catch((error)=>{throw new Error(error)})
        for (const voter of voters){ 
          await update(ref(db,`/Elections/CreatedNow/${election.ElectionId}/Voters/${voter.VOID}`),{
              TransactionID : " ",isVoted : true
          })
          .catch((error)=>{console.log(error,"Update Status ")})
        }
        const data = await fetchCandidates(election.ContractAddress)
        const winner = largestvotecount(data)
        let voteCount = [];
        for (const item of data) {
          voteCount.push(parseInt(item.voteCount));
        }
        {candidates.map(async (candidate, index) => { 
          try {
            const updateData = {
              Votes: voteCount[index]
            };
            
            await update(
              ref(db, `/CurrentlyRunning/${election.ElectionId}/Candidates/${candidate.CandidateId}/`),
              updateData
            ).then(() => {
              console.log("Vote updated successfully");
            }).catch((error) => {
              console.log(error, "Vote Update Error");
            });
          } catch (error) {
            console.log(error, "Vote Update Error");
          }
        })}
        let i = 0;
        {candidates.map(async (candidate, index) => {
          if (index === winner) {
            try {
              await update(ref(db, `/CurrentlyRunning/${election.ElectionId}/Winner`), {
                CandidateId: candidate.CandidateId,
                FirstName: candidate.FirstName,
                LastName: candidate.LastName
              });
            } catch (error) {
              console.log(error,"Update Winner");
            }
          }
        })}
        try{
          await locchange1();
        }        
        catch(error){
          console.log(error,"Change Diectory");
        }
        alert("Election Stopped")
        onBack()
  } catch (error){
    alert(error.message)
  }
}
  const handlestart = async () => {
        const updatedata = {}
        try {
            const data = await get(ref(db,`/Elections/CreatedNow/${election.ElectionId}`))
            if (data){
            const contractdata = await deployContract();
            updatedata.ContractAddress = contractdata.deployedAddress;updatedata.Account = contractdata.accounts1;
            await update(ref(db,`/Elections/CreatedNow/${election.ElectionId}`),updatedata)
            .catch((error)=>{throw new Error('Failed ', error)})
            {candidates.map(async (candidate, index) => ( 
                await addCandBlockChain(updatedata.ContractAddress,`${candidate.FirstName} ${candidate.LastName}`,contractdata.accounts1)
                .catch((error)=>{throw new Error('Failed ', error)})
            ))}
            const voteracc = await grantRole(contractdata.deployedAddress)
            let i = 0;
            for (const voter of voters){ 
                await update(ref(db,`/Elections/CreatedNow/${election.ElectionId}/Voters/${voter.VOID}`),{
                    TransactionID : voteracc[i].account,isVoted : false
                })
                .catch((error)=>{throw new Error('Failed',error)})
                console.log(voteracc[i].account,voter.VOID)
                i++
            }
            await locchange().catch((error)=>{throw new Error('Failed ', error)})
            alert("Election Sucessfully Started")}
            else
            {
              throw new Error('Election already running')
            }
        }
        catch (error) {
            alert(error);
        }
      };
  useEffect(() => {
        fetchdata()
        return()=>{
          setCandidates([])
          setVoters([])
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
        </CardContent>
        </Card>
        <Card sx={{height: "375px", width: "400px" }} variant="outlined">
        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "start",height:"100%"}}>
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
                    <TableCell>Gender</TableCell>
                    <TableCell>Slogan</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {candidates.map((candidate, index) => (
                    <TableRow key={index}> 
                      <TableCell>{candidate.CandidateImage && <img src={candidate.CandidateImage} alt="Candidate" style={{ width: "100px" }}/>}</TableCell>
                      <TableCell>{candidate.CandidateId}</TableCell>
                      <TableCell>{`${candidate.FirstName} ${candidate.LastName}`}</TableCell>
                      <TableCell>{candidate.Gender}</TableCell>
                      <TableCell>{candidate.Slogan}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </CardContent>
        </Card>
        <Grid display="flex" flexDirection="row" justifyContent="space-around">
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={onBack}>
            Back
            </Button>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={cleardata}>
            Delete
            </Button>
        </Grid>
        <Grid display="flex" flexDirection="row" justifyContent="space-around">
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handlestop}>
            Stop
            </Button>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handlestart}>
            Start
            </Button>
        </Grid>
        </Grid>
        <Card sx={{height: "600px", width: "500px" }} variant="outlined">
        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",height:"100%"}}>
        <Typography variant="h4">Voters List</Typography>
        <TableContainer sx={{
        width: '100%',
        maxWidth: '700px'}} >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Voter ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {voters.map((voter, index) => (
                    <TableRow key={index}> 
                      <TableCell>{voter.VOID}</TableCell>
                      <TableCell>{`${voter.Firstname} ${voter.Lastname}`}</TableCell>
                      <TableCell>{voter.Gender}</TableCell>
                      <TableCell>{voter.Emailid}</TableCell>
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
export default AdminElectionDetails;
