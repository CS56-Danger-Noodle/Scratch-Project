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


boardController.addColumn = (req, res, next) => {
  console.log('running boardController.addColumn');
  console.log('req.params: ', req.params);
  console.log('req.body: ', req.body);
  const { board_id } = req.params;
  const { columnName } = req.body;
  console.log('board_id: ', board_id, 'columnName: ', columnName );
  Board.findOneAndUpdate({_id : board_id}, 
    {$push: {columns: { columnName, cards: [] } }},
    {new: true}).exec()
      .then(data => {
        console.log('newBoard: ', data)
        res.locals.board = data;
        next()
      })
      .catch(err => {
        return next({
          log:"error in boardcontroller.addColumn",
          message: { err: "boardController.addColumn" + err},
        });
      });
}

boardController.removeColumn = (req, res, next) => {
  console.log('running boardController.removeColumn');
  // console.log('req.params: ', req.params);
  const { board_id, column_id } = req.params;
  console.log('board_id: ', board_id, 'column_id: ', column_id );
  Board.findByIdAndUpdate(board_id, {$pull: { columns: { _id: column_id } }}, {new: true}).exec()
    .then((data) => {
      console.log('updatedBoard: ', data)
      res.locals.board = data;
      next();
    })
    .catch((err) => {
      return next({
        log:"error in boardcontroller.addColumn",
        message: { err: "boardController.addColumn" + err},
      });
    });
}

// boardController.addCard = (req, res, next) => {
//   console.log('inside of boardController.addCard');
//   console.log('req.params: ' req.params);
//   console.log('req.body: ', req.body);
//   const { board_id, column_id } = req.params;
//   const { cardText } = req.body;
//   Board.findByIdAndUpdate(board_id, {column_id}, 
//     {$push: {cards : cards}},
//     {new: true}).exec()
//       .then(data => {
//         res.locals.board = data;
//         next()
//       })
//       .catch(err => {
//         return next({
//           log:"error in boardcontroller.addCard",
//           message: { err: "boardController.addCard" + err},
//         });
//       });
// }

module.exports = boardController;
