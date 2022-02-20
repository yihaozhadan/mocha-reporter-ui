import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from './reducers';

const middleware = applyMiddleware(promise, thunk, logger);

export const store = createStore(reducers, {}, composeWithDevTools(middleware));
