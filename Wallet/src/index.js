import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LocalizeProvider } from "react-localize-redux";
import * as serviceWorker from './serviceWorker';
import rootRecuder from './reducers';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware';
import { createBrowserHistory } from "history";

const store = createStore(rootRecuder, applyMiddleware(promiseMiddleware(), thunk));

ReactDOM.render(<Provider store={store}><LocalizeProvider store={store}><App store={store} /></LocalizeProvider></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
