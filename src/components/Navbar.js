import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'#0f172a',color:'white',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.05)',
        
        }}>
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
