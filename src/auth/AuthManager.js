import jwtdecode from 'jwt-decode';

if (!window.signin) {
    console.log('Waiting for JWT...');
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