import express from 'express';
import sha1 from 'sha1';

import {User} from '../models/User';
import {createJWTToken} from '../../lib/logic/auth';

const router = express.Router();

router.post('/', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email) {
        res.status(400).json({
            'message': 'Email not set'
        });
        return;
    }

    if (!password) {
        res.status(400).json({
            'message': 'Password not set'
        });
        return;
    }

    const user = new User({
        email: email,
        password: sha1(password)
    });

    user.save((error) => {
        if (error) {
            res.status(500).json({
                'message': 'An error occurred while saving the user',
                'error': error
            });
        }
    });

    res.status(200).json({
        success: true,
        token: createJWTToken({
            sessionData: user,
            maxAge: 86400
        })
    });
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        'email': email
    }, function (error, user) {
        if (error || !user) {
            res.status(404).json({
                'message': 'User not found',
                'error': error
            });

            return;
        }

        if (sha1(password) !== user.password) {
            res.status(400).json({
                'message': 'Password is incorrect'
            });

            return;
        }

        res.status(200).json({
            success: true,
            token: createJWTToken({
                sessionData: user,
                maxAge: 86400
            })
        });
    })
});

export default router;