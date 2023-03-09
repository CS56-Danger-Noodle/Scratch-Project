const User = require("../models/userModel");
const { GOOGLE_AUTH_CLIENT_ID } = require('../../config-default');
const jwt_decode = require('jwt-decode');
const createErrorObject = require('./controllerHelper');

const userController = {};

// In our user schema `password` field is required
// Since we have both in-house and google OAuth as authentication
// The app would be more robust if the field is kept as required
// Since the password would not be used for verification purposes
// It would be save to just insert a dummy password
const DUMMY_PASSWORD_FOR_OAUTH = 'dummy';

const setUserObject = ({ username, board_ids }, res) => res.locals.user = { username, board_ids };

const createUserInDb = (username, password, res, next) => {
  User.create({ username, password })
    .then((user) => {
      setUserObject(user, res);
      next();
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next({
          log: err,
          status: 400,
          message: { err: 'username already exists' },
        })
      }
      return next(
        createErrorObject(err, "`createUserInDb` in userController.js")
      );
    });
};

// Create new user
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next({
      log: `Missing username and/or password. Username: '${username}'; Password: '${password}`,
      message: { err: "userController.createUser: username and password must be provided" },
    });
  }
  createUserInDb(username, password, res, next);
}

// Verify user
userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // console.log('req.body: ', req.body);
    // ERROR HANDLING
    if (!username || !password) throw new Error('username and password must be provided');

    // check if req.body.username matches a username in the database
    const response = await User.findOne({ username: username }).exec();
    console.log('response: ', response)
    if (!response) throw new Error(`User '${username}' not found`);
    const isPasswordMatch = await response.comparePassword(password);
    if (!isPasswordMatch) throw new Error('Password does not match');
    res.locals.user = { username, board_ids: response.board_ids };
    return next();
  } catch (error) {
    // Intentionally vague in the front end response for security purposes
    return next(
      createErrorObject(error, 'userController.verifyUser')
    );
  }
};

userController.verifyUserOauth = async (req, res, next) => {
  const userFacingErrorMessage = 'Failed to sign-in via google.';
  const { credential, clientId } = req.body;
  if (!(credential && clientId)) {
    return next({
      log: "Expected value(s) not found in request body.",
      message: { err: userFacingErrorMessage },
    })
  } else if (clientId !== GOOGLE_AUTH_CLIENT_ID) {
    return next({
      log: "Invalid client ID from google sign-in.",
      message: { err: userFacingErrorMessage },
    })
  };
  const { email } = jwt_decode(credential);
  if (!email) {
    return next({
      log: "Failed to decode JWT from google-sign-in",
      message: { err: userFacingErrorMessage },
    })
  }
  // Although mongoose's `findOneAndupdate` allows upsert
  // It does not have the ability to perform password hashing easily
  // So we will check if a user is exist in a separate query before inserting
  try {
    const response = await User.findOne({ username: email });
    if (response) {
      setUserObject(response, res);
      return next();
    }
  } catch (error) {
    return next({
      log: error,
      message: { err: userFacingErrorMessage },
    });
  };

  createUserInDb(email, DUMMY_PASSWORD_FOR_OAUTH, res, next);

}

// this is going to be coming from a patchrequest to add the board we juts created into the usersBoard that created it
// the request body I'll receive is {username: username}
// find user by username and update === findOneAndUpdate method thru mongoose

userController.addBoardId = (req, res, next) => {
  const { username } = req.body;
  const board_id = res.locals.board._id;
  User.findOneAndUpdate({ username: username },
    { $push: { board_ids: board_id } },
    { new: true }).exec()
    .then(data => {
      next();
    })
    .catch(err => {
      return next(
        createErrorObject(err, 'userController.addBoardId')
      );
    });
};

userController.removeBoardId = async (req, res, next) => {
  const username = req.session.username;
  const { board_id } = req.params;
  try {
    await User.findOneAndUpdate({ username: username }, { $pull: { board_ids: board_id } }, { new: true });
    return next();
  } catch (e) {
    return next(
      createErrorObject(e, 'userController.removeBoardId')
    );
  }
};

userController.getBoardIds = (req, res, next) => {
  let { username } = req.body;

  User.findOne({ username }).exec()
    .then(response => {
      res.locals.boardIds = response.board_ids
      return next();
    })
    .catch((err) => {
      return next(
        createErrorObject(err, 'userController.getBoardIds')
      );
    });

};

module.exports = userController;
