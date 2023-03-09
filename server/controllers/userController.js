const User = require("../models/userModel");
const path = require("path");
const mongoose = require('mongoose');

const userController = {};

// Create new user
userController.createUser = (req, res, next) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      log: "userController.createUser",
      message: { err: "userController.createUser: username and password must be provided" },
    });
  }
  User.create({ username, password })
    .then((user) => {
      res.locals.user = { username, board_ids: user.board_ids };
      next();
    })
    .catch((err) => {
      if (err.code === 11000) {
        console.log(err)
        return next({
          log: "userController.verifyUser",
          status: 400,
          message: { err: 'username already exists' },
        })
      }
      return next({
        log: "userController.verifyUser",
        message: { err: "userController.verifyUser" + err },
      });
    });
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
    if (!isPasswordMatch) throw new Error(`Password does not match`);
    res.locals.user = { username, board_ids: response.board_ids };
    return next();
  } catch (error) {
    // Intentionally vague in the front end response for security purposes
    return next({
      log: error,
      message: { err: "Error occurred in userController.verifyUser" },
    });
  }
};

// this is going to be coming from a patchrequest to add the board we juts created into the usersBoard that created it
  // the request body I'll receive is {username: username}
  // find user by username and update === findOneAndUpdate method thru mongoose

  userController.addBoardId = (req, res, next) => {
  const { username } = req.body;
  const board_id = res.locals.board._id;
  User.findOneAndUpdate({username: username},
    {$push: { board_ids: board_id }},
    {new: true}).exec()
      .then(data => {
        next();
      })
      .catch(err => {
        return next({
          log: "error in userController.addBoardId",
          message: { err: "userController.addBoardId" + err},
        });
      });
};

  userController.removeBoardId = async (req, res, next) => {
  const username  = req.session.username;
  const { board_id } = req.params;
  try {
    await User.findOneAndUpdate({username: username}, {$pull: { board_ids: board_id }}, {new: true});
    return next();
  } catch (e) {
    return next({
      log: "error in userController.removeBoardId",
      message: { err: "userController.removeBoardId" + e },
    });
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
      return next({
        log: "error in userController.getBoardIds",
        message: { err: "userController.getBoardIds" + err },
      });
    });

};

module.exports = userController;
