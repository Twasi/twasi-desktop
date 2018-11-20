import { AuthManager } from './AuthManager';

describe('AuthManager', () => {

    it('is not authenticated by default', () => {
        const auth = new AuthManager();

        expect(auth.isAuthenticated).toBe(false);
    });

    it('runs authentication callback after authentication info is available', () => {
       const cb = jest.fn();
       const auth = new AuthManager();

       auth.registerOnAuthenticate(cb);

       auth.authenticate("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");

       expect(cb).toHaveBeenCalled();
    });

    it('decodes the token correctly', () => {
        const auth = new AuthManager();

        auth.authenticate("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");

        expect(auth.userByJwt.name).toBe("John Doe");
    });

});