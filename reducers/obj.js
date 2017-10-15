const immutable = require('../_leilo-redux/immutableFix');
const EVT = require('../actions').EVT;
const wildcard = require('wildcard');
const consts = require('leilo-client-api/consts');

module.exports = (acceptSrc = consts.serverID, acceptDst = consts.localID) => {
    return (state = {}, action) => {
        if (action.type !== EVT)return state;

        const evt = action.evt;

        if (!wildcard(acceptSrc, evt.src) || !wildcard(acceptDst, evt.dst))
            return state;

        const payload = action.payload;

        switch (evt.name) {
            case "update":
                state = immutable.set(state, evt.path, payload.value);
                break;
            case "create":
                state = immutable.set(state, evt.path.concat([payload.newObjName]), payload.newObjVal);
                break;
            case "delete":
                state = immutable.set(state, evt.path);
                break;
            case "updatePerms":
                //todo implement this
                break;
        }

        return state;
    }
};