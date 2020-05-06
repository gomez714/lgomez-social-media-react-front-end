import React from 'react';
import PropTypes from 'prop-types';
import NoImage from '../images/no-image.png';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = {
    paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00e676'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        }
      },
    handle: {
        height: 20,
        backgroundColor: '#00e676',
        width: 60,
        margin: '0 auto 7px auto'
    },
    fullLine: {
        height: 15,
        backgroundColor: '#54595c',
        width: '100%',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        backgroundColor: '#54595c',
        width: '50%',
        marginBottom: 10
    }
};

const ProfileSkeleton = (props) => {

    const { classes } = props;

    return (
        <Paper className={classes.paper} >
            <div className={classes.profile}>
                <div className='image-wrapper'>
                    <img src={NoImage} alt='profile' className="profile-image" />
                </div>
            </div>
            <hr/>
            <div className='profile-details'>
                <div className={classes.handle}/>
                <hr/>
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <hr/>
                <LocationOn color='primary'/> <div className={classes.halfLine} />
                <hr/>
                <LinkIcon color='primary' /> <div className={classes.halfLine} />
                <hr/>
                <CalendarToday color='primary'/> <div className={classes.halfLine} />
            </div>
        </Paper>
    )
};

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
