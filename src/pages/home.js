import React, { Component } from 'react'
import Grid  from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getCrafts } from '../redux/actions/dataActions';


import Craft from '../components/craft/craft';
import Profile from '../components/profile/profile';
import CraftSkeleton from '../utility/craftSkeleton';

class Home extends Component {


    componentDidMount(){
        this.props.getCrafts();
    };

    render() {

        const { crafts, loading } = this.props.data;
        
        let recentCraftsMarkup = !loading ? (
            crafts.map(craft => <Craft key={craft.craftId} craft={craft}/>)
        ) : (
            <CraftSkeleton />
        );

        return (
            <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
                <Grid item sm={8} xs={12}>
                    {recentCraftsMarkup}
                </Grid>
            </Grid>
        )
    }
}

Home.propTypes = {
    getCrafts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, { getCrafts })(Home);
