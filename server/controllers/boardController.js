const Board = require("../models/boardModel");
const mongoose = require('mongoose');

const boardController = {};


boardController.createBoard = (req, res, next) => {
  console.log('inside of boardController.createBoard. Req.body: ', req.body);
  const { boardName, columnName, cardText } = req.body;
  Board.create({boardName, columnName, cardText})
    .then(data => {
      res.locals.board = data;
      next();
    })
    .catch(err => {
      return next({
        log: "error in boardController.createBoards",
        message: { err: "boardController.createBoards" + err },
      });
    });
};

boardController.getBoards = (req, res, next) => {
  console.log('running boardController.getBoard. res.locals: ', res.locals)
  let { boardIds } = res.locals;

  Board.find({_id: {$in: boardIds}})
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

module.exports = boardController;
