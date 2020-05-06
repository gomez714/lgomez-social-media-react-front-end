import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../utility/myButton';

//MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from "@material-ui/core/DialogActions";
import { red } from '@material-ui/core/colors';

//Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

//Redux
import { connect } from 'react-redux';
import { deleteCraft } from '../../redux/actions/dataActions';

const styles = {
    deleteButton: {
      position: 'absolute',
      left: '90%',
      top: '10%'
    }
  };


class DeleteCraft extends Component {

    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({
            open: true
        });
    };
    handleClose = () => {
        this.setState({
            open: false
        });
    };
    deleteCraft = () => {
        this.props.deleteCraft(this.props.craftId);
        this.setState({
            open: false
        });
    };


    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip='Delete Craft' onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline style={{ color: red[600] }}/>
                </MyButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth='sm'
                >
                    <DialogTitle>
                        Are you sure you want delete this craft?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                            Once this craft is deleted, you will not be able to undo.
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button onClick={this.deleteCraft} style={{ color: red[600] }}>
                            Delete
                        </Button>

                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteCraft.propTypes = {
    deleteCraft: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    craftId: PropTypes.string.isRequired
};

export default connect(null, {deleteCraft})(withStyles(styles)(DeleteCraft));
