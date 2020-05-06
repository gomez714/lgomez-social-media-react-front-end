import { createStore, combineReducers, applyMiddleware} from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';
import dataReducer from './reducers/dataReducer';

const initialState = {};

const middleWare = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
});

const store = createStore(
    reducers, 
    initialState, 
    composeWithDevTools(
        applyMiddleware(...middleWare)
    )
);

export default store;