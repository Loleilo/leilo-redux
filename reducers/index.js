const obj = require('./obj');
const wsConnector = require('./wsConnector');
const combineReducers = require("redux").combineReducers;

module.exports = combineReducers({
    serverState: obj(),
    connectionState: wsConnector.reducer,
});