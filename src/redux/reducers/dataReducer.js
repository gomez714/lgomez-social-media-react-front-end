import {
    SET_CRAFTS,
    LIKE_CRAFT,
    UNLIKE_CRAFT,
    LOADING_DATA,
    DELETE_CRAFT,
    POST_CRAFT,
    SET_CRAFT,
    SUBMIT_COMMENT
} from '../types';

const INITIAL_STATE = {
    crafts: [],
    craft: {},
    loading: false
};

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_CRAFTS:
            return {
                ...state,
                crafts: action.payload,
                loading: false
            };
        case SET_CRAFT:
            return {
                ...state,
                craft: action.payload
            }
        case LIKE_CRAFT:
        case UNLIKE_CRAFT:
            let index = state.crafts.findIndex((craft) => craft.craftId === action.payload.craftId);
            state.crafts[index] = action.payload;
            if (state.craft.craftId === action.payload.craftId) {
                state.craft = {...state.craft, ...action.payload}
              };
            return {
                ...state
            };
        case DELETE_CRAFT:{
            let index = state.crafts.findIndex((craft) => craft.craftId === action.payload);
            state.crafts.splice(index, 1);
            return {
                ...state
            };}
        case POST_CRAFT:
            return {
                ...state,
                crafts: [
                    action.payload,
                    ...state.crafts
                ]
            };
        case SUBMIT_COMMENT:
                let commentedOnIndex = state.crafts.findIndex(
                craft => craft.craftId === action.payload.craftId
                );
                return {
                    ...state,
                    craft: {
                    ...state.craft,
                    comments: [action.payload, ...state.craft.comments],
                    commentCount: state.craft.commentCount + 1
                    },
                    crafts: state.crafts.map((craft, craftsArrIndex) =>
                    craftsArrIndex === commentedOnIndex
                        ? { ...craft, commentCount: craft.commentCount + 1 }
                        : craft
                    )
                };
    
        default: return state;
    }
}