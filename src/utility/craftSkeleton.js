import React, { Fragment } from 'react';
import NoImage from '../images/no-image.png';
import PropTypes from 'prop-types';

//MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },
    cover: {
        minWidth: 200,
        objectFit: 'cover'
    },
    handle: {
        width: 60,
        height: 18,
        background: '#00e676',
        marginBottom: 7
    },
    date: {
        height: 14,
        width: 100,
        background: '#cfd8dc',
        marginBottom: 7
    },
    fullLine: {
        height: 15,
        width: '90%',
        marginBottom: 10,
        background: '#54595c'
    },
    halfLine: {
        height: 15,
        width: '50%',
        marginBottom: 10,
        background: '#54595c'
    }
};

const CraftSkeleton = (props) => {
    const { classes } = props;

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={NoImage}/>
            <CardContent className={classes.cardContent}>
                <div className={classes.handle}/>
                <div className={classes.date}/>
                <div className={classes.fullLine}/>
                <div className={classes.fullLine}/>
                <div className={classes.halfLine}/>
            </CardContent>
        </Card>
    ))

    return <Fragment>{content}</Fragment>
}

CraftSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CraftSkeleton);
