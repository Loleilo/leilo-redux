# Rough docs

Package has 2 parts so far:

 - middleware - just add like a normal middleware
 - reducers - explained in following section
 
## Reducers

 - Use index for all reducers, will give following store structure:
 ```javascript
 store={
    serverState: {}, //the object stored on the server, as synced with client
    connectionStatus: {} //status of connection
 }
```

- server state will look exactly like server state
- connection status looks like:
```javascript
connectionStatus={
    status: DISCONNECTED/CONNECTED/CONNECTING,
    username: ...
}
```

Note: obj reducer is a 2nd order function, allows you to input which ids to accept state changes from
Note: connectionStatus reducer: actual reducer is stored in connectionStatus.reducer, constants stored in
connectionStatus.STATUS