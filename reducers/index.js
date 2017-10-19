const obj = require('./obj');
const wsConnector = require('./connectionStatus');
const combineReducers = require("redux").combineReducers;

module.exports = combineReducers({
    serverState: obj(),
    connectionStatus: wsConnector.reducer,
});