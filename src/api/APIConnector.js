/**
 * APIConnector holds the connection to the GraphQL backend.
 *
 * Lars Bärtschi, 27.11.2018
 */

import AuthManager from '../auth/AuthManager';
import fetch from './fetch';

/**
 * Returns a formatted GraphQL request using the provided query and the configured GRAPHQL_URL.
 * @param query the query to use
 * @returns {Promise<data>}
 */
const getGraph = query => fetch(window.env.GRAPHQL_URL, 'post', `query=${encodeURI(query)}`);

/**
 * Returns a formatted GraphQL request for a certain user
 * @param query the query to use
 * @param jwt the user's jwt token
 * @param target the GraphQL target
 * @returns {Promise<data>}
 */
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

    /**
     * Set's up the local settings, calls all callback handlers since auth context is available
     * @param jwt
     */
    setup(jwt) {
        this.jwt = jwt;
        this.isReady = true;

        this.readyHandlers.forEach(handler => handler());
        this.readyHandlers = [];
    }

    /**
     * Does a request to a certain
     * @param query the query to execute
     * @param target the GraphQL target
     * @returns {Promise<data>}
     */
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

    /**
     * Returns data about the currently signed in user
     * @returns {Promise<data>}
     */
    getUserInfo() {
        return this.doPanelRequest('user{id,twitchAccount{email}}');
    }

    /**
     * Register the provided handler to be called as soon as the auth context is available
     * If the auth context is already available while the function is called, the event handler
     * will be called immediately.
     * @param eventHandler
     */
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

export { APIConnector };
