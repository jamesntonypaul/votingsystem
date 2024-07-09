import * as React from 'react';
import { Card, CardContent, Typography, Grid,Box,TextField,Button,FormControlLabel,Checkbox } from '@mui/material';
import { generateCandidateId } from '../IDgenerator';

const AddCandidateForm = ({handleAddCandidateState,handlesetcandidate}) =>{

    const [selectedGender, setSelectedGender] = React.useState();
    const [candidateImage, setCandidateImage] = React.useState(null);
    const formRef = React.useRef(null);

  const handleAddClick = () => {
    const data = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      CandidateId: generateCandidateId(),
      gender: selectedGender,
      addahar: document.getElementById('addahar').value,
      email: document.getElementById('email').value,
      slogan: document.getElementById('slogan').value,
      CandidateImage: candidateImage
    };

    console.log(data);
    handlesetcandidate(data);
    handleAddCandidateState(true);
  };
    const handleGenderChange = (event) => {
      setSelectedGender(event.target.value);
    };
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setCandidateImage(file);
    };
  return (
      <Card
        sx={{
          width: '100%', // Set the card width to 100% of its container
          maxWidth: '700px', // Set the maximum width for the card (optional)
          minHeight: '400px',
          p: '1rem', // Add padding to the card content
          boxSizing: 'border-box', // Include padding in the width/height calculation
        }} variant="outlined"
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography variant="h4">Candidate Form</Typography>
          <Box component="form" sx={{ mt: 3 }} ref={formRef}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="addahar"
                  label="Adhaar ID"
                  name="addahar"
                  autoComplete="addahar"
                  inputProps={{ maxLength: 12 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="slogan"
                  label="Slogan"
                  id="slogan"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={selectedGender === 'Male'}
                        onChange={handleGenderChange}
                        value="Male"
                        color="primary"
                    />
                    }
                    label="Male"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={selectedGender === 'Female'}
                        onChange={handleGenderChange}
                        value="Female"
                        color="primary"
                    />
                    }
                    label="Female"
                />
              </Grid>
              <Grid Grid item xs={12} sm={6}>
              {/* Input field for candidate image */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              onClick={handleAddClick}
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
              Add Candidate
            </Button>
          </Box>
        </CardContent>
      </Card>
  );
};

export default AddCandidateForm;
