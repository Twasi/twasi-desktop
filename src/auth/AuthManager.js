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
    }

    isAuthenticated() {
        return this.isAuthenticated;
    }

    authenticate(jwt) {
        this.jwt = jwt;
        this.userByJwt = jwtdecode(jwt);
    }
}

const manager = new AuthManager();

export default manager;