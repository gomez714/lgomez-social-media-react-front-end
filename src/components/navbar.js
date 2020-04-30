import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../utility/myButton';
import PostCraft from './postCraft';


//Redux
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


//Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//Icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';


class Navbar extends Component {
    render() {

        const { authenticated } = this.props;

        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    { authenticated ? (
                        <Fragment>
                            <PostCraft />
                            <Link to='/'>
                                <MyButton tip='Home!'>
                                    <HomeIcon color='secondary'/>
                                </MyButton>
                            </Link>
                            <MyButton tip='Notifications'>
                                <Notifications color='secondary'/>
                            </MyButton>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button variant="contained" color="secondary" component={Link} to='/login' >Login</Button>
                            <Button variant="contained" color="secondary" component={Link} to='/'>Home</Button>
                            <Button variant="contained" color="secondary" component={Link} to='/signup' >Sign Up</Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStatetoProps = (state) => ({
    authenticated: state.user.authenticated
})

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

export default connect(mapStatetoProps)(Navbar);
