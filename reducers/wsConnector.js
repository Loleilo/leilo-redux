const actions = require("../actions.js");

const DISCONNECTED = 'DISCONNECTED',
    CONNECTED = 'CONNECTED',
    CONNECTING = 'CONNECTING';

module.exports.reducer = (state = DISCONNECTED, action) => {
    if (action.type === actions.CONNECT)return CONNECTING;
    if (action.type !== actions.EVT)return state;
    const evt = action.evt;
    switch (evt.name) {
        case 'connectSuccess':
            return CONNECTED;
        case 'disconnect':
            return DISCONNECTED;
    }
    return state;
};

module.exports.STATUS = {
    DISCONNECTED: DISCONNECTED,
    CONNECTING: CONNECTING,
    CONNECTED: CONNECTED,
};