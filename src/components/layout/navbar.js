import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../utility/myButton';
import PostCraft from '../craft/postCraft';
import Notifications from './notifications';
import withStyles from '@material-ui/core/styles/withStyles';

//Redux
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


//Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//Icons
import HomeIcon from '@material-ui/icons/Home';

const styles = {
    Button: {
        margin: 3
    }
};

class Navbar extends Component {
    render() {

        const { authenticated, classes } = this.props;

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
                            <Notifications/>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button className={classes.Button}  color="secondary" component={Link} to='/login'>Login</Button>
                            <Button className={classes.Button}  color="secondary" component={Link} to='/'>Home</Button>
                            <Button className={classes.Button}  color="secondary" component={Link} to='/signup' >Sign Up</Button>
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
    authenticated: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStatetoProps)(withStyles(styles)(Navbar));
