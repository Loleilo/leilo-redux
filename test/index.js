const redux = require('redux');
const leilo = require('../middleware');
const actions = require("../actions.js");
const rootReducer=require('../reducers');
const wsConnector = require("../reducers/wsConnector.js");

const middlewares = [];

middlewares.push(leilo);

if (process.env.NODE_ENV !== `production`) {
    const {logger} = require(`redux-logger`);

    // middlewares.push(logger);
}

const actualMiddleware = redux.applyMiddleware(...middlewares);

const store = redux.createStore(rootReducer, actualMiddleware);

console.log(store.getState());

let step = 1;

store.subscribe(() => {
    const state = store.getState();

    if (step === 1 && state.connectionState === wsConnector.STATUS.CONNECTED) {
        step++;
        store.dispatch({
            type: actions.EVT,
            evt: {
                name: "subscribe"
            },
            payload: {
                path: ['**'],
            }
        });
    }

    console.log(state);
});

store.dispatch({
    type: actions.CONNECT,
    config: {
        modules: {
            wsConnector: {
                credentials: {
                    username: "root",
                    password: "pass",
                }
            }
        }
    }
});