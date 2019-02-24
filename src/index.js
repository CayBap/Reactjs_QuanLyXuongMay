import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore,applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk'
// import createReducer from './reducers/index';
import App from './App';
import configureStore from './configureStore';
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//     createReducer(),
//     composeEnhancer(applyMiddleware(thunk)),
// );
const initialState = {};
const store = configureStore(initialState);
ReactDOM.render(
    <Provider store={store}>
            <App />
    </Provider>
    , document.getElementById('root'));