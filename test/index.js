const redux = require('redux');
const leilo = require('../middleware');
const actions = require("../actions.js");
const rootReducer = require('../reducers');
const wsConnector = require("../reducers/connectionStatus.js");
const consts = require('leilo-client-api/consts');
const serverID = consts.serverID;

const middlewares = [];

middlewares.push(leilo);

if (process.env.NODE_ENV !== `production`) {
    const {logger} = require(`redux-logger`);

    // middlewares.push(logger);
}

const actualMiddleware = redux.applyMiddleware(...middlewares);

const store = redux.createStore(rootReducer, actualMiddleware);

let step = 1;

store.subscribe(() => {
    const state = store.getState();
    console.log('state', state);

    if (step === 1 && state.connectionStatus.connection === wsConnector.STATUS.CONNECTED) {
        step++;
        store.dispatch({
            type: actions.EVT,
            evt: {
                name: "auth"
            },
            payload: {
                username: 'root',
                password: 'pass',
            }
        });
    }
    if (step === 2 && state.connectionStatus.login === wsConnector.STATUS.LOGGED_IN) {
        step++;
        store.dispatch({
            type: actions.EVT,
            evt: {
                name: "subscribe",
            },
            payload: {
                path: ['**'],
            }
        });
    }
});

store.dispatch({
    type: actions.CONNECT,
    config: {}
});