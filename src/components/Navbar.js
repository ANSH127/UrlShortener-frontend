import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'white',color:'black'}}>
        <Toolbar>
            <img src="./images/chain.png" alt="logo" style={{width: 25, height: 25,paddingRight:'10px'}} />
          
          <Typography variant="h5" component="div" sx={{ flexGrow: 1,fontWeight:'bold' }}>
          ShortUrl
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
