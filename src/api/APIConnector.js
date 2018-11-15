import AuthManager from '../auth/AuthManager';
import fetch from './fetch';

const getGraph = query => fetch(window.env.GRAPHQL_URL, 'post', `query=${encodeURI(query)}`);

const getUserGraph = (query, jwt, target) => {
    if (jwt === null) {
        // eslint-disable-next-line
        console.log('Not authenticated, could not do request.');
        return null;
    }
    return new Promise(resolve => {
        getGraph(`query{${target}(token:"${jwt}"){${query}}}`).then(data => {
            resolve(data.data[target]);
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

    doPanelRequest(query, target) {
        if (!target) {
            target = "panel";
        }
        
        if (!this.isReady) {
            console.error("Tried to do panel request but APIConnector is not ready yet.");
            return;
        }
        return getUserGraph(query, this.jwt, target);
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
