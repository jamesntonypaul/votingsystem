import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledButton = styled(Button)(({ theme,fontSize,full}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "44px",
  padding: "1 25px",
  boxSizing: "border-box",
  borderRadius: 35,
  borderColor: "#000",
  background: "#FFF",
  color: "#000",
  fullWidth: "true" || full,
  fontSize: fontSize,
  transform: "none",
  transition: "background .3s,border-color .3s,color .3s",
  "&:hover": {
    backgroundColor: "#403D3D",
    color: "#FFF"
  },
  border: "1.5px solid #403D3D",
  // Override the text-transform for the button label
  textTransform: 'capitalize',
}));

function CustomBtn(props) {
  return (
    <StyledButton variant="contained" fontSize = {props.fontSize} full={props.full} >
        <Typography variant="h5">{props.txt}</Typography>
    </StyledButton>
  );
}

export default CustomBtn;