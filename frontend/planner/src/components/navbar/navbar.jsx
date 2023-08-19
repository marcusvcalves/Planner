import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { Link } from "react-router-dom";

import '../../css/global.css';
import './navbar.css';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Link to="/"><Button className="nav-link">Home</Button></Link>
          <Box sx={{ flexGrow: 1 }} />
          <Link to="/sign_up"><Button className="nav-link">Cadastre-se</Button></Link>
          <Link to="/login"><Button className="nav-link">Login</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
