const express = require('express');
const userController = require("../controllers/userController");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

router.post('/oauth',
    userController.verifyUserOauth,
    sessionController.startSession,
    (_, res) => {
        console.log("completing post request to '/login/oauth");
        res.status(200).json(res.locals.user);
    }
);

router.post('/',
    userController.verifyUser,
    sessionController.startSession,
    (_, res) => {
        console.log("completing post request to '/login");
        res.status(200).json(res.locals.user);
    }
);

module.exports = router;