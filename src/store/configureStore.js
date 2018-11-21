import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

export const store = createStore(
  rootReducer(history),
  composeWithDevTools(
    applyMiddleware(
      logger,
      sagaMiddleware,
      routerMiddleware(history)
      )
  )
);


sagaMiddleware.run(rootSaga);