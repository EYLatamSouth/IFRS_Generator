const express = require('express');
const User = require('./models/user');
const authorization = require('./authorization');

const router = express.Router();

router.get('/login', authorization.basic, async (req, res) => {
    try {
        const user = await User.findOne(req.authorization);
        if (user) {
            const r = authorization.sign(user.email);
            res.status(200).send(r);
        } else {
            res.status(401).send({
                status: 'Unauthorized'
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router;