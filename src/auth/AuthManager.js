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
        this.isAuthenticatedValue = false;
        this.eventHandlers = [];
    }

    /**
     * Returns if the user is authenticated
     * @returns {boolean}
     */
    isAuthenticated() {
        return this.isAuthenticatedValue;
    }

    /**
     * Authenticate a user using the provided JWT.
     * @param jwt
     */
    authenticate(jwt) {
        this.jwt = jwt;
        this.userByJwt = jwtdecode(jwt);

        this.isAuthenticatedValue = true;

        this.eventHandlers.forEach(handler => handler(jwt));
    }

    /**
     * Registers an event handler that gets called as soon as authentication
     * has completed.
     * @param eventHandler
     */
    registerOnAuthenticate(eventHandler) {
        this.eventHandlers.push(eventHandler);
    }
}

const manager = new AuthManager();

export default manager;

export { AuthManager };