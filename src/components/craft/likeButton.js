import React, { Component } from 'react';
import MyButton from '../../utility/myButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Redux
import { connect } from 'react-redux';
import { likeCraft, unlikeCraft  } from '../../redux/actions/dataActions';

//Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


export class LikeButton extends Component {

    likedCraft = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.craftId === this.props.craftId))
            return true;
        else return false;
    };

    likeCraft = () => {
        this.props.likeCraft(this.props.craftId);
    };

    unlikeCraft = () => {
        this.props.unlikeCraft(this.props.craftId);
    };
    
    render() {

        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to='/login'>    
                <MyButton tip='Like'>
                    <FavoriteBorder color='primary'/>
                </MyButton>
            </Link>
        ) : (
            this.likedCraft() ? (
                <MyButton tip='Unlike' onClick={this.unlikeCraft}>
                    <FavoriteIcon color='primary'/>
                </MyButton>
            ) : (
                <MyButton tip='Like' onClick={this.likeCraft}>
                    <FavoriteBorder color='primary'/>
                </MyButton>
            )
        );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    craftId: PropTypes.string.isRequired,
    likeCraft: PropTypes.func.isRequired,
    unlikeCraft: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeCraft,
    unlikeCraft
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
