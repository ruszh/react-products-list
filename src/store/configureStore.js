import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const epicMiddleware = createEpicMiddleware();

export const store = createStore(
    rootReducer(history),
    composeWithDevTools(
        applyMiddleware(
            logger,
            sagaMiddleware,
            epicMiddleware,
            routerMiddleware(history)
        )
    )
);

sagaMiddleware.run(rootSaga);
