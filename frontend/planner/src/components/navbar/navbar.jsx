import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { Link } from "react-router-dom";

import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

import '../../css/global.css';
import './navbar.css';



export default function ButtonAppBar() {
  let {user, logoutUser} = useContext(AuthContext);

  return (
    <>
    {/* Navbar usuário autenticado */}
    {user ? <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Link to="/"><Button className="nav-link">Home</Button></Link>
          <Box sx={{ flexGrow: 1 }} />
          <Link to="/"><Button className="nav-link">Meu Perfil</Button></Link>
          <Button className="nav-link" onClick={logoutUser}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box> :
    /* Navbar usuário não autenticado */
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Link to="/"><Button className="nav-link">Home</Button></Link>
          <Box sx={{ flexGrow: 1 }} />
          <Link to="/sign_up"><Button className="nav-link">Cadastre-se</Button></Link>
          <Link to="/login"><Button className="nav-link">Login</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>}
    </>
  );
}
