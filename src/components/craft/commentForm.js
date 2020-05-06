import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';


// MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    ...theme.spreadIt
});

class CommentForm extends Component {

    state = {
        body: '',
        errors: {}

    };

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors})
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){ this.setState({body: ''})}
    }

    hanldeChange = (event) => {
        this.setState({ [event.target.name]: event.target.value});
    };
    hanldeSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.craftId, {body: this.state.body});
    }
    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? ( 
            <Grid item sm={12} style={{textAlign: 'center'}}>
                <form onSubmit={this.hanldeSubmit}>
                    <TextField
                        name='body'
                        type='text'
                        label="Leave a comment"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.hanldeChange}
                        fullWidth
                        className={classes.textField}
                        />
                        <Button type="submit"
                        variant='contained'
                        color='primary'
                        className={classes.button}>
                            Submit
                        </Button>
                </form>
                <hr className={classes.visibleSeparator} />
            </Grid>
        ) : null;

        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    craftId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated,
});

const mapActionsToProps = {
    submitComment
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));
