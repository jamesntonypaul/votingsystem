import { createTheme } from '@mui/material/styles';
const theme1 = createTheme({
    palette: {
      primary: {
        main: "#A8653A",
      },
      secondary: {
        main: "#403D3D",
      },
    },
    typography: {
      fontFamily: ['Segoe UI'],
      h4: {
        fontWeight: 600,
        fontSize: 28,
        lineHeight: '2rem',
      },
      h5: {
        fontWeight: 500,
        fontSize: 15,
        lineHeight: '2rem',
      },

    },
  });

  export default theme1;