import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';
import App from './App';


import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './stores/store';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk)),
);

ReactDOM.render(
    <div>
        <Favicon url="http://www.riskmanagementmonitor.com/wp-content/uploads/2015/03/no-marijuana-1024x1024.jpg" />
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </div>, document.getElementById('root'));


