import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import themeFile from '../utility/theme';
import MyButton from '../utility/myButton';

//Redux
import { connect } from 'react-redux';
import { postCraft, clearErrors } from '../redux/actions/dataActions';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

//Icons
import BrushIcon from '@material-ui/icons/Brush';
import CloseIcon from '@material-ui/icons/Close';

const styles = ({
    themeFile,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '4%'
    }
});

class PostCraft extends Component {

    state = {
        open: false,
        body: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        }

        if(!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ 
                body: '', 
                open: false, 
                errors: {}
            });
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });

    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postCraft({ body: this.state.body });
    }

    render() {

        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Create a Craft!'>
                    <BrushIcon color='secondary' />
                </MyButton>

                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth='sm'
                >
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>
                        Create a New Craft
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField 
                                name='body'
                                type='text'
                                label='Craft'
                                multiline
                                rows='3'
                                placeholder='Share your craft for your friends to see!'
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                />
                            <Button type='submit' variant='contained' color='primary' className={classes.submitButton} 
                                disabled={loading}>
                                    Create
                                    { loading && (
                                        <CircularProgress size={30} className={classes.progressSpinner} />
                                    )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostCraft.propTypes = {
    postCraft: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, {postCraft, clearErrors })(withStyles(styles)(PostCraft));
