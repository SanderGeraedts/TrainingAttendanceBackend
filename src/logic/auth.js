import jwt from'jsonwebtoken';
import _ from 'lodash'

export function verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err)
            }

            resolve(decodedToken);
        });
    });
}

export function createJWTToken(details) {
    if (typeof details !== 'object') {
        details = {}
    }

    if (!details.maxAge || typeof details.maxAge !== 'number') {
        details.maxAge = 86400
    }

    details.sessionData = _.reduce(details.sessionData
        || {}, (memo, val, key) => {
        if (typeof val !== 'function' && key !== 'password') {
            memo[key] = val
        }

        return memo;
    }, {});

    const token = jwt.sign({
            data: details.sessionData
        },
        process.env.JWT_SECRET,
        {
            expiresIn: details.maxAge,
            algorithm: 'HS256'
        }
    );

    return token;
}

export default {
    verifyJWTToken,
    createJWTToken
}