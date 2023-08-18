import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import '../../css/global.css';
import './navbar.css';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Button color="inherit" className="nav-link">Home</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" className="nav-link">Cadastre-se</Button>
          <Button color="inherit" className="nav-link">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
