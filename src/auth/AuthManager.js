if (!window.signin) {
    console.log('Waiting for JWT...');
    window.signin = jwt => {
        console.log('JWT: ' + jwt);
    }
}

class AuthManager {
    constructor() {
        this.isAuthenticated = false;
    }
}

export default new AuthManager();