const client = require('leilo-client-api');
const actions = require('./actions');
const d = require('./_leilo-redux/util').getDefault;
const MODES = require('./sendModes');
const consts=require('leilo-client-api/consts');
const localID=consts.localID;

module.exports = (store) => {
    let conn;
    let config;
    return (next) => (action) => {
        switch (action.type) {
            case actions.CONNECT:
                conn = client(action.config);
                config = conn.config;

                //todo make this less cust
                config.sendMode = MODES.OPTIMISTIC;

                //translates server events to client
                const handler = (payload, evt) => store.dispatch({
                    type: actions.EVT,
                    evt: evt,
                    payload: payload,
                    receive: true,
                });

                //attach events
                conn.on({
                    name: '*',
                    dst: localID,
                }, handler);
                conn.on({
                    name: '*',
                    path: '**',
                    dst: localID,
                }, handler);
                break;
            case actions.EVT:
                //if action was sent from server, don't send it back to server
                if (action.receive) break;

                // handle different operation modes
                const sendMode = d(action.sendMode, config.sendMode);

                //this will send event and leave local state as is
                if (sendMode === MODES.PESSIMISTIC) return;

                // this will wait for server to send ack before letting local state update happen
                else if (sendMode === MODES.WAIT_ACK)
                    return conn.emit(action.evt, action.payload, action.callback, () => next(action));

                // this will do local state change, even if server didn't acknowledge
                else if (sendMode === MODES.OPTIMISTIC)
                    conn.emit(action.evt, action.payload, action.callback);

                break;
        }
        next(action);
    }
};