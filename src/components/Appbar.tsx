import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const Appbar = () => {    

    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    // 追加: Drawer の開閉
    const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen); // Drawer の開閉状態を反転
    };
    //primaryとsecondaryで、色を指定します
    const myTheme = createTheme({
      palette: {
        primary: {
          main: "#000000",
        },
        secondary: {
          main: "#797979",
        },
      },
    });

return (
    <ThemeProvider theme={myTheme}>
    <AppBar position="relative" color="primary">
        <Toolbar>
        <RamenDiningIcon sx={{ mr: 2, '&:hover': {
                  backgroundColor: '#696969', // ホバー時の背景色を指定
                }, }} onClick={() => navigate("/")}/>
        <Typography variant="h6" color="inherit" noWrap sx={{ mr: 2, '&:hover': {
                  backgroundColor: '#696969', // ホバー時の背景色を指定
                }, }} onClick={() => navigate("/")}>
        MENSAKU
        </Typography>
        </Toolbar>
    </AppBar>
    </ThemeProvider>
    )
}

export default Appbar