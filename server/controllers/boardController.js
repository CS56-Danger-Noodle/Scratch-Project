const Board = require("../models/boardModel");
const User = require("../models/userModel");
const createErrorObject = require('./controllerHelper');

const boardController = {};


boardController.createBoard = async (req, res, next) => {
  const { boardName } = req.body;
  try {
    const response = await Board.create({ boardName, columns: [] })
    res.locals.board = response;
    return next();
  } catch (e) {
    if (e.code === 11000) {
      return next({
        log: e,
        status: 400,
        message: { err: 'board name already exists' },
      })
    }
    return next(
      createErrorObject(e, 'boardController.createBoard')
    );
  }
};

boardController.getBoards = async (req, res, next) => {
  const username = req.session.username;
  try {
    const user = await User.findOne({ username });
    const boards = await Board.find({ '_id': { $in: user.board_ids } });
    res.locals.boards = boards;
    return next();
  } catch (e) {
    return next(
      createErrorObject(e, 'boardController.getBoards')
    );
  }
};

boardController.getBoard = (req, res, next) => {
  const { board_id } = req.params;

  Board.findById(board_id).exec()
    .then(response => {
      console.log('response: ', response);
      res.locals.board = response;
      return next();
    })
    .catch((err) => {
      return next(
        createErrorObject(err, 'boardController.getBoard')
      );
    });
};
boardController.deleteBoard = async (req, res, next) => {
  const { board_id } = req.params;
  try {
    await Board.findOneAndDelete({ _id: board_id });
    return next();
  } catch (e) {
    return next(
      createErrorObject(e, 'boardController.deleteBoard')
    );
  }
};

module.exports = boardController;
