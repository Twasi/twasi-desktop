import AuthManager from '../auth/AuthManager';
import fetch from './fetch';

const getGraph = query => fetch(window.env.GRAPHQL_URL, 'post', `query=${encodeURI(query)}`);

const getUserGraph = (query, jwt) => {
    if (jwt === null) {
        // eslint-disable-next-line
        console.log('Not authenticated, could not do request.');
        return null;
    }
    return new Promise(resolve => {
        getGraph(`query{panel(token:"${jwt}"){${query}}}`).then(data => {
            resolve(data.data.panel);
        });
    });
};

class APIConnector {
    constructor() {
        this.readyHandlers = [];
        this.isReady = false;
    }

    setup(jwt) {
        this.jwt = jwt;
        this.isReady = true;

        this.readyHandlers.forEach(handler => handler());
        this.readyHandlers = [];
    }

    doPanelRequest(query) {
        return getUserGraph(query, this.jwt);
    }

    getUserInfo() {
        return this.doPanelRequest('user{id,twitchAccount{email}}');
    }

    ready(eventHandler) {
        if (this.isReady) {
            eventHandler();
        } else {
            this.readyHandlers.push(eventHandler);
        }
    }
}

const connector = new APIConnector();
AuthManager.registerOnAuthenticate(jwt => connector.setup(jwt));

export default connector;