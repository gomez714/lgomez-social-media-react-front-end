import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Craft from '../components/craft/craft';
import StaticProfile from '../components/profile/staticProfile';
import CraftSkeleton from '../utility/craftSkeleton';
import ProfileSkeleton from '../utility/profileSkeleton';

// Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

//Mui
import Grid from '@material-ui/core/Grid';

class User extends Component {

    state = {
        profile: null,
        craftIdParam: null
    };

    componentDidMount(){
        const handle = this.props.match.params.handle;
        const craftId = this.props.match.params.craftId;

        if(craftId) this.setState({craftIdParam: craftId})

        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
            .then( response => {
                this.setState({
                    profile: response.data.user
                });
            })
            .catch(error => console.log(error));
    }
    render() {

        const { crafts, loading } = this.props.data;
        const { craftIdParam } = this.state;

        const craftsMarkup = loading ? (
            <CraftSkeleton />
        ) : crafts === null ? (
            <p>This user hasn't created any crafts</p>
        ) : !craftIdParam ? (
            crafts.map((craft) => <Craft key={craft.craftId} craft={craft} />)
        ) : (
            crafts.map(craft => {
                if(craft.craftId !== craftIdParam) 
                   return <Craft key={craft.craftId} craft={craft} />
                else return <Craft key={craft.craftId} craft={craft} openDialog/>
            })
        )

        return (
            <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                    { this.state.profile === null ? (
                        <ProfileSkeleton />
                    ) : (   <StaticProfile profile={this.state.profile} />)}
                </Grid>
                <Grid item sm={8} xs={12}>
                    {craftsMarkup}
                </Grid>
            </Grid>
        )
    }
}

User.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getUserData })(User);
