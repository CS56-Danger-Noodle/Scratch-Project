const express = require('express');
const userController = require("../controllers/userController");
const sessionController = require("../controllers/sessionController");
const boardController = require('../controllers/boardController');

const router = express.Router();

// To get specific board
router.get("/:board_id",
    sessionController.isLoggedIn,
    boardController.getBoard,
    (req, res) => {
        res.status(200).json(res.locals.board);
    }
);

// To get all boards
router.get("/",
    sessionController.isLoggedIn,
    boardController.getBoards,
    (req, res) => {
        res.status(200).json(res.locals.boards);
    }
);

// To add new column
router.post(
    "/:board_id",
    sessionController.isLoggedIn,
    boardController.addColumn,
    (req, res) => {
        res.status(200).json(res.locals.board)
    }
);

// To add new Board
router.post("/",
    sessionController.isLoggedIn,
    boardController.createBoard,
    userController.addBoardId,
    (req, res) => {
        res.status(200).json(res.locals.board);
    }
);

// To remove column
router.delete(
    "/:board_id/:column_id",
    boardController.removeColumn,
    (req, res) => {
        res.status(200).json(res.locals.board)
    }
);

router.delete(
    "/:board_id",
    sessionController.isLoggedIn,
    boardController.deleteBoard,
    userController.removeBoardId,
    (req, res) => {
        res.sendStatus(200);
    }
);

//'/boards/:board_id/:column_id/:card_id'
// TODO: To add a card
// router.post(
//   "/:board_id/:column_id/",
//   // sessionController.isLoggedIn,
//   boardController.addCard,
//   (req, res) => {
//     res.status(200).json(res.locals.board)
//   }
// );

module.exports = router;