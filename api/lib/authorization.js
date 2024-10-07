const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const jsonwebtoken = require('jsonwebtoken');

require('dotenv-safe').config();

const basic = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.match(/^Basic/)) {
        let k = req.headers.authorization.split(' ');
        k = Buffer.from(k[1], 'base64').toString('ascii');
        k = k.split(":");

        req.authorization = {
            email: k[0],
            passwd: crypto.createHash('md5').update(k[1]).digest('hex'),
            cnpj: (req.headers.company) ? parseInt(req.headers.company) : 0
        }

        next();
    } else {
        res.status(401).send({
            message: 'Unauthorized'
        });
    }
};

const check = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.match(/^Bearer/)) {
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
            if (error) {
                res.status(401).send({
                    message: 'Unauthorized'
                });
                return;
            } else {
                console.log(decoded);
                req.user = decoded.user;
                next();
            }
        });
    } else {
        res.status(401).send({
            message: 'Unauthorized'
        });
    }
};

const sign = id => {
    const minutes = 60;
    const token = jsonwebtoken.sign({ user: id },
        process.env.PRIVATE_KEY,
        { expiresIn: `${minutes}m` });

    const expiresIn = new Date();
    expiresIn.setMinutes(expiresIn.getMinutes() + minutes);

    return {
        token: token,
        expiresIn: expiresIn.toISOString()
    };
};

exports.basic = basic;
exports.check = check;
exports.sign = sign;