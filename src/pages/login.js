import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppLogo from '../images/artists-integrate.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

import themeFile from '../utility/theme';

//Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typogrophy from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';



const styles = themeFile;


class Login extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}

        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post('/login', userData)
            .then( result => {
                console.log(result.data);
                localStorage.setItem('FBIdToken', `Bearer ${result.data.token}`);
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch( error => {
                this.setState({
                    errors: error.response.data,
                    loading: false
                });
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppLogo} alt='circles' className={classes.image}/>
                    <Typogrophy variant="h2" className={classes.pageTitle}>Login</Typogrophy>

                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                        id='email'
                        name='email'
                        type='email'
                        label='Email'
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value={this.state.email} 
                        onChange={this.handleChange}
                        fullWidth />

                        <TextField 
                        id='password'
                        name='password'
                        type='password'
                        label='Password'
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={this.state.password} 
                        onChange={this.handleChange}
                        fullWidth />
                        
                        {errors.general && (
                            <Typogrophy variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typogrophy>
                        )}

                        <Button type='submit' variant='contained' color='primary' className={classes.button} disabled={loading}>
                            Login
                            {loading && ( <CircularProgress size={30} className={classes.progress} />)}
                        </Button>
                        <br/>
                        <small>Don't have an account? Sign up! <Link to="/signup">here</Link></small>

                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);