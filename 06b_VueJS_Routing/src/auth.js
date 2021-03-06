import axios from 'axios';

export default {
    login(username, password, callback) {
        authenticationRequest(username, password, (response) => {
            if (response.authenticated) {
                localStorage.token = response.token;
                this.onLoginStatusChanged(true);
                callback({
                   authenticated: true,
                   token: response.token, 
                });
            } else {
                delete localStorage.token;
                this.onLoginStatusChanged(false);
                callback({authenticated: false});
            }
        });
    },

    logout(callback) {
        delete localStorage.token;
        callback({authenticated: false});
        this.onLoginStatusChanged(false);
    },

    loggedIn() {
        console.log('loggedIn()::');
        console.log(localStorage.token);
        console.log(!!localStorage.token);
        return !!localStorage.token;
    },

    onLoginStatusChanged() {}
}

function authenticationRequest(username, password, callback) {
    // phase 1
    if (username === 'admin' && password === 'opensesame') {
        callback({
            authenticated: true,
            token: Math.random().toString(36).substring(7),
        });
    } else {
        callback({
            authenticated: false,
        });
    }

    let url = 'https://jsonplaceholder.typicode.com/users?username=' +
              username + '&email=' + password;
    console.log(`url: ${url}`);
    axios.get(url).then((result) => {
        if (result.data.length > 0) {
            console.log('Authenticated (placeholder API)');
            callback({
                authenticated: true,
                token: Math.random().toString(36).substring(7),
            });
        } else {
            callback({
                authenticated: false,
            });
        }
    }).catch((error) => {
        console.log(error);
    });
}