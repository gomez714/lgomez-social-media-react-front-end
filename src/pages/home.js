import React, { Component } from 'react'
import Grid  from '@material-ui/core/Grid';
import axios from 'axios';

import Craft from '../components/craft.js';

class Home extends Component {

    state = {
        crafts: null
    }

    componentDidMount(){
        axios.get('/crafts')
            .then(result => {
                this.setState({
                    crafts: result.data
                })
            })
            .catch(error => console.log(error));
    }

    render() {

        let recentCraftsMarkup = this.state.crafts ? (
        this.state.crafts.map(craft => <Craft key={craft.craftId} craft={craft}/>)
        ) : (
            <p>Loading...</p>
        );

        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {recentCraftsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile. . .</p>
                </Grid>
            </Grid>
        )
    }
}

export default Home;
