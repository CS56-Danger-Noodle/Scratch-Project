const Board = require("../models/boardModel");
const mongoose = require('mongoose');

const boardController = {};

boardController.getBoards = (req, res, next) => {
  console.log('running boardController.getBoards. res.locals: ', res.locals)
  let { boardIds } = res.locals;

  Board.find({_id: {$in: boardIds}})   // [ 1, 2, 3]  _id: 1, _id:2, _id:3  [{board1},{board2}]
    .then(response => {
      res.locals.boards = response;
      return next();
    })
    .catch((err) => {
      return next({
        log: "error in boardController.getBoards",
        message: { err: "boardController.getBoards" + err },
      });
    });
};
boardController.getBoard = (req, res, next) => {
  console.log('running boardController.getBoard. req.param: ', req.params)
  const { board_id } = req.params;

  Board.findById(board_id).exec()
    .then(response => {
      console.log('response: ', response);
      res.locals.board = response;
      return next();
    })
    .catch((err) => {
      return next({
        log: "error in boardController.getBoard",
        message: { err: "boardController.getBoard" + err },
      });
    });
};

module.exports = boardController;

/**
 * select *
 * from Board
 * where id in (1,2,3);
 * 
 */
