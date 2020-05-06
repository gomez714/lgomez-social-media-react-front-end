import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_CRAFT,
    UNLIKE_CRAFT,
    MARK_NOTIFICATIONS_READ
} from '../types';

const INITIAL_STATE = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false
};

export default function( state = INITIAL_STATE, action){
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return INITIAL_STATE;
        case SET_USER:
            return{
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE_CRAFT:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        craftId: action.payload.craftId
                    }
                ]
            }
        case UNLIKE_CRAFT:
            return {
                ...state,
                likes: state.likes.filter(
                    (like) => like.craftId !== action.payload.craftId
                )
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(notification => notification.read = true);
            return {
                ...state
            };

        default:
            return state;
    }
}