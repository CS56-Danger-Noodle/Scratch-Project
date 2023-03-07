import React, { Component } from "react";
import { useState, useEffect } from "react";
import Column from './Column.jsx'

// Modal for the columns
const ColumnModal = ({ showColumnModal, setShowColumnModal, showCardModal, setShowCardModal, boardData, setBoardData, currBoardID}) => {
  
  /*
  boardData {
    boardName: { type: String, required: true, unique: true },
      columns: [
        {
          columnName: { type: String, required: true, unique: true },
          cards: [
            {
              cardText: { type: String, required: true, unique: true }
            }
          ]
        }
      ]
    }
  */
 

  const saveData = () => {
    // get the value from the input field
    const newColumnName = document.querySelector('.modal-column-input').value;

    // store it somewhere (local?)
    console.log('boardData from line 29: ', boardData);
    console.log('typeof boardData[0]: ', typeof boardData[0]);
    // our local state needs to reflect added column
    const columnName = boardData[0]
    console.log('line 33: ', columnName)
    console.log('type of columnName: ', typeof columnName.columns)

    const newBoardData = boardData.map(board => {
      console.log('board: ', board)
      console.log('currBoardID: ', currBoardID)
      if (board._id === currBoardID) {
        console.log('board and ID match')
        board.columns.push({columnName: newColumnName, cards: [{cardText: 'Hello, I\'m a new column!'}]})
        console.log('board: ', board)
      }
      return board;
    })
    console.log('newBoardData: ', newBoardData);
    setBoardData(newBoardData)
    console.log(boardData)


    // [{board1}, {board2}, {board3}]
    // grab our current board by currBoardID
    // create a newArrayOfBoards without the currBoard (filter by currBoardID)
    // update current board
    // add to array of boards
    // setBoardData(newArrayOfBoards)



    // setBoardData([{}])
    // boardData = array of BoardObjs
    // filter currentBoard 

    // setBoardData((data) => ({
    //   ...data,
    //   columnName: newColumnName
    // }))
    // send a request to DB to udpate Board with new column
    // toggle columnModal

    console.log('save data button is running')
    setShowColumnModal(!showColumnModal)  //toggle columnModal on / off
    // setShowCardModal is true, column should also render with reflected data
    setShowCardModal(!showCardModal)
  }

  const deleteData = () => {
    setShowColumnModal(!showColumnModal)    // toggle columnModal on / off
  }

  return (
    <div className="modal-home">

      <form className='modal-form'>
        <h1>ADD COLUMN</h1>
        <input 
          className="modal-column-input"
          type="text"
          required
          placeholder="column name"
          // do we want an onChange here or wait until the input is finished
        />
      </form>
      <div className='modal-button-cont'>
        <button className="modal-text-button"
          onClick={() => saveData()}>
            SAVE
        </button>
        <button className="modal-text-button"
          onClick={() => deleteData()}>
            DELETE
        </button>
      </div>

      {showCardModal && <CardModal />}
    </div>
  )
}



// Modal for the card
const CardModal = ({  showCardModal,setShowCardModal }) => {

  const addTask = () => {
    const newCard = document.querySelector('card-modal-input').value;
    // post users data to database
    set
    setShowCardModal(!showCardModal)
  }

  const deleteTask = () => {
    setShowCardModal(!showCardModal)
  }

  return (
    <div className="modal-home">

        <form className='modal-form'>
          <h1>ADD CARD</h1>
          <input 
            className="card-modal-input"
            type="text"
            required
            placeholders="add a task"
            // do we want an onChange here or wait until the input is finished
          />
        </form>
        <div className='modal-button-cont'>
          <button className="modal-text-button"
            onClick={() => addTask()}>
            ADD CARD
          </button>
          <button className="modal-text-button"
            onClick={() => deleteTask()}>
              CANCEL
          </button>
        </div>

    </div>
  )
}

export { ColumnModal, CardModal }