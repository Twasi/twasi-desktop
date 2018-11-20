import { APIConnector } from './APIConnector'

describe('APIConnector', () => {

    it('runs the callback as soon as authentication info is available', () => {
        const cb = jest.fn();
        const connector = new APIConnector();

        connector.ready(cb);

        connector.setup("myJwt");

        expect(cb).toHaveBeenCalled();
    });

});