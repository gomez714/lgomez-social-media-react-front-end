import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
} from '../types';

import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});

    axios.post('/login', userData)
        .then( response => {     
            setAuthorizationHeader(response.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch( error => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            });
        })
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});

    axios.post('/signup', newUserData)
        .then( response => {            
            setAuthorizationHeader(response.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch( error => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            });
        })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED});
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER});
    axios.get('/user')
        .then(response => {
            dispatch({
                type: SET_USER,
                payload: response.data
            });
        })
        .catch(error => console.log(error));
};

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER});
    axios.post('/user/image', formData)
        .then( () => {
            dispatch(getUserData());
        })
        .catch( error => {
            console.log(error);
        });
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER});
    axios.post('/user', userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch( error => {
            console.log(error);
        })
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};