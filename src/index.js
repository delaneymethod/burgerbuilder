import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import App from './App';
import burgerBuilder from './store/reducers/burgerBuilder';
import order from './store/reducers/order';

/*
const logger = store => {
	return next => {
		return action => {
			console.log('[Middleware] Dispatching', action);

			const result = next(action);

			console.log('[Middleware] next state', store.getState());

			return result;
		};
	};
};
*/

const reducers = combineReducers({
	order,
	burgerBuilder
});

const composeEnhancers = window.hasOwnProperty('__REDUX_DEVTOOLS_EXTENSION_COMPOSE__')
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	: compose;

const store = createStore(reducers, composeEnhancers(
	applyMiddleware(thunk)
));

const app = (
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
