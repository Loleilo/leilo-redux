const actions = require("../actions.js");

const DISCONNECTED = 'DISCONNECTED',
    CONNECTED = 'CONNECTED',
    CONNECTING = 'CONNECTING';

const LOGGED_OUT = 'LOGGED_OUT',
    LOGGING_IN = 'LOGGING_IN',
    LOGGED_IN = 'LOGGED_IN';

module.exports.reducer = (state = {connection: DISCONNECTED}, action) => {
    if (action.type === actions.CONNECT)
        return {connection: CONNECTING};
    if (action.type !== actions.EVT)return state;
    const evt = action.evt,
        payload = action.payload;
    switch (evt.name) {
        case 'init':
            return {
                connection: CONNECTED,
                connectionID: payload.connID,
                login: LOGGED_OUT,
            };
        case 'disconnect':
            return {connection: DISCONNECTED};
        case 'auth':
            return Object.assign(state, {login: LOGGING_IN});
        case 'authSuccess':
            return Object.assign(state, {
                login: LOGGED_IN,
                username: payload,
            });
    }
    return state;
};

module.exports.STATUS = {
    DISCONNECTED: DISCONNECTED,
    CONNECTING: CONNECTING,
    CONNECTED: CONNECTED,
    LOGGED_IN: LOGGED_IN,
    LOGGED_OUT: LOGGED_OUT,
    LOGGING_IN: LOGGING_IN,
};