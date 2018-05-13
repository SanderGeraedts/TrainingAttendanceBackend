import {verifyJWTToken} from './logic/auth'

export function verifyJWT_MW(req, res, next) {
    const token = req.header('Auth');

    verifyJWTToken(token)
        .then((decodedToken) => {
            req.user = decodedToken.data;
            next();
        })
        .catch((err) => {
            res.status(400).json({
                message: 'Invalid auth token provide.',
                err: err
            });
        });
}