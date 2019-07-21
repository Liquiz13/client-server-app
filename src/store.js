import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import logger from 'redux-logger';
import setAuthorizatonToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './action/authAction';
import jwt from 'jsonwebtoken';

const initState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    initState,
    composeEnhancers(applyMiddleware(thunk, logger))
);

if (localStorage.jwt) {
    setAuthorizatonToken(sessionStorage.jwt);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwt)))
}

export default store;