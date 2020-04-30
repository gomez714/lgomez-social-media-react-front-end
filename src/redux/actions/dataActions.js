import {
    SET_CRAFTS,
    LOADING_DATA,
    LIKE_CRAFT,
    UNLIKE_CRAFT,
    DELETE_CRAFT,
    LOADING_UI,
    CLEAR_ERRORS,
    POST_CRAFT,
    SET_ERRORS,
    SET_CRAFT,
    STOP_LOADING_UI
} from '../types';

import axios from 'axios';

// Get all crafts
export const getCrafts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/crafts')
        .then(response => {
            dispatch({
                type: SET_CRAFTS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: SET_CRAFTS,
                payload: []
            });
        })
};

// Get one craft

export const getCraft = (craftId) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios.get(`/craft/${craftId}`)
        .then( response => {
            dispatch({ 
                type: SET_CRAFT,
                payload: response.data
            });
            dispatch({ type: STOP_LOADING_UI});
        })
        .catch(error => console.log(error));
}

// Create / Post a Craft 

export const postCraft = (newCraft) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios.post('/craft', newCraft)
        .then( response => {
            dispatch({
                type: POST_CRAFT,
                payload: response.data
            });
            dispatch(clearErrors());
        })
        .catch( error => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            });
        })
}

// Like a craft

export const likeCraft = (craftId) => dispatch => {
    axios.get(`/craft/${craftId}/like`)
        .then( response => {
            dispatch({
                type: LIKE_CRAFT,
                payload: response.data
            });
        })
        .catch(error => console.log(error));
};

// Unlike a craft

export const unlikeCraft = (craftId) => dispatch => {
    axios.get(`/craft/${craftId}/unlike`)
        .then( response => {
            dispatch({
                type: UNLIKE_CRAFT,
                payload: response.data
            });
        })
        .catch(error => console.log(error));

};

// Delete Craft

export const deleteCraft = (craftId) => (dispatch) => {
    axios.delete(`/craft/${craftId}`)
        .then(() => {
            dispatch({
                type: DELETE_CRAFT,
                payload: craftId
            });
        })
        .catch( (error) => console.log(error));
};

//Clear errors 
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};