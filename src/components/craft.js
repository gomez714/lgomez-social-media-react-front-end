import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import DeleteCraft from './deleteCraft';
import CraftDialog from './craftDialog';

// Redux
import { connect } from 'react-redux';
import  LikeButton  from './likeButton';

//Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography  from '@material-ui/core/Typography';
import MyButton from '../utility/myButton';

// Icons
import ChatIcon from '@material-ui/icons/Chat';





const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Craft extends Component {

    

    render() {
        dayjs.extend(relativeTime);
        const { 
            classes, 
            craft: {
                body,
                createdAt, 
                userImage, 
                userHandle, 
                craftId, 
                likeCount, 
                commentCount
            },
            user: {
                authenticated,
                credentials: {
                    handle
                }
            }
     } = this.props;

        

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteCraft craftId={craftId}/>
        ) : (null); 
        return (
            <Card className={classes.card}>
                <CardMedia
                image={userImage}
                title="Profile Image"
                className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton craftId={craftId} />
                    <span>{likeCount} Likes</span>
                    <MyButton tip='comments'>
                        <ChatIcon color='primary'/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                    <CraftDialog craftId={craftId} userHandle={userHandle} />
                </CardContent>
            </Card>
        )
    }
}

Craft.propTypes = {
    user: PropTypes.object.isRequired,
    craft: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Craft));
