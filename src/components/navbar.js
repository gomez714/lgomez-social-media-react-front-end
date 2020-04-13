import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';




class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    <Button variant="contained" color="secondary" component={Link} to='/login' >Login</Button>
                    <Button variant="contained" color="secondary" component={Link} to='/' >Home</Button>
                    <Button variant="contained" color="secondary" component={Link} to='/signup' >Sign Up</Button>

                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar;
