import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utility/myButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Comments from './comments';
import CommentForm from './commentForm';

// Redux
import { connect } from 'react-redux';
import { getCraft, clearErrors } from '../../redux/actions/dataActions';
import LikeButton from './likeButton';

// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Icons
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';


const styles = theme => ({
    dialogContent: {
        padding: 20
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '3%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottomg: 50
    },
    ...theme.spreadIt
});


class CraftDialog extends Component {

    state = {
        open: false,
        oldPath: '',
        newPath: ''
    };

    

    handleOpen = () => {

        let oldPath = window.location.pathname;

        const { userHandle, craftId } = this.props;
        const newPath = `/users/${userHandle}/craft/${craftId}`;

        if(oldPath === newPath) oldPath = `/users/${userHandle}`;

        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath, newPath});
        this.props.getCraft(this.props.craftId);
    };

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false});
        this.props.clearErrors();
    }

    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen();
        }
    }

    render() {

        const { 
            classes,
            craft: {
                craftId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userHandle,
                comments
            },
            UI: { loading }
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={2}>
                <Grid item sm={5}>
                    <img src={userImage} alt='profile' className={classes.profileImage} />
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color='primary'
                        variant='h5'  
                        to={`/users/${userHandle}`}  
                    >
                        {userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant='body2'color='textSecondary'>
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant='body1'>
                        {body}
                    </Typography>
                    <LikeButton craftId={craftId} />
                    <span>{likeCount} Likes</span>
                    <MyButton tip='comments'>
                        <ChatIcon color='primary'/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.visibleSeparator} />
                <CommentForm craftId={craftId} />
                <Comments comments={comments} />
            </Grid>
        )

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Expand Craft' tipClassName={classes.expandButton}>
                    <UnfoldMore color='primary'/>
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
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

CraftDialog.propTypes = {
    getCraft: PropTypes.func.isRequired,
    craftId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    craft: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    craft: state.data.craft,
    UI: state.UI
});

const mapActionsToProps = {
    getCraft,
    clearErrors
};
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CraftDialog));
