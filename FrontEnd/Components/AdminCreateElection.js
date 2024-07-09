import * as React from 'react';
import { Card, CardContent, Typography, Grid,Box,TextField,Button } from '@mui/material';
import CreateElection from './AdminCreateElection/CreateElection';
import AddCandidates from './AdminCreateElection/AddCandidates';
import VoterList from './AdminCreateElection/VoterList';
import { ElectionContextProvider } from './AdminCreateElection/ElectionContext';

const AdminCreateElection = (State) => {
  const InitialState="InitialState"
  const [createElectionState, setCreateElectionState] = React.useState(InitialState);
  const handleCreateElectionClick = (NextState) => {
    setCreateElectionState(NextState);
  };
  return (
    <ElectionContextProvider>
    <Grid
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
      sx={{
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
       {createElectionState === "AddCandidates" && <AddCandidates  handleCreateElectionClick={handleCreateElectionClick} />}
       {createElectionState === "InitialState" && <CreateElection  handleCreateElectionClick={handleCreateElectionClick} />}
       {createElectionState === "AddVoter" && <VoterList  handleCreateElectionClick={handleCreateElectionClick} />}
    </Grid>
    </ElectionContextProvider>
  );
};

export default AdminCreateElection;