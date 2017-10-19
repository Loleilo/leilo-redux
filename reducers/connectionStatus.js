const actions = require("../actions.js");

const DISCONNECTED = 'DISCONNECTED',
    CONNECTED = 'CONNECTED',
    CONNECTING = 'CONNECTING';

module.exports.reducer = (state = {status: DISCONNECTED}, action) => {
    if (action.type === actions.CONNECT)
        return {status: CONNECTING};
    if (action.type !== actions.EVT)return state;
    const evt = action.evt;
    switch (evt.name) {
        case 'connectSuccess':
            return {status: CONNECTED, username: action.payload.username};
        case 'disconnect':
            return {status: DISCONNECTED};
    }
    return state;
};

module.exports.STATUS = {
    DISCONNECTED: DISCONNECTED,
    CONNECTING: CONNECTING,
    CONNECTED: CONNECTED,
};