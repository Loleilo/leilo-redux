const immutable = require('object-path-immutable');

module.exports = Object.assign({}, immutable, {
    set: (object, path, value) => {
        if (path.length === 0) return value;
        return immutable.set(object, path, value);
    }
});