/**
 * AuthManager holds the current state and information of the authentication.
 * It allows for other components of the application to register and wait for the
 * event of a successful authentication
 *
 * Lars Bärtschi, 27.11.2018
 */

import jwtdecode from 'jwt-decode';

if (!window.signin) {
    //console.log('Waiting for JWT...');
    window.signin = jwt => {
        manager.authenticate(jwt)
    }
}

class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.eventHandlers = [];
    }

    isAuthenticated() {
        return this.isAuthenticated;
    }

    authenticate(jwt) {
        this.jwt = jwt;
        this.userByJwt = jwtdecode(jwt);

        this.eventHandlers.forEach(handler => handler(jwt));
    }

    registerOnAuthenticate(eventHandler) {
        this.eventHandlers.push(eventHandler);
    }
}

const manager = new AuthManager();

export default manager;

export { AuthManager };