import React, { Component } from "react";
import { useState, useEffect } from "react";
import Column from './Column.jsx'
import axios from 'axios';

// Modal for the columns
const ColumnModal = ({ showColumnModal, setShowColumnModal, showCardModal, setShowCardModal, boardData, setBoardData, currBoardID}) => {

  const [columnName, setColumnName] = useState('');
  
  const saveData = async () => {
    try {
      const response = await axios.post(`/boards/${currBoardID}`, {columnName});
      const updatedBoard = response.data;
      setBoardData(updatedBoard);
    } catch (e) {
      console.log('in save Data, error is: ', e);
    }
    setShowColumnModal(!showColumnModal) 
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
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
          // do we want an onChange here or wait until the input is finished
        />
      </form>
      <div className='modal-button-cont'>
        <button className="modal-text-button"
          onClick={() => saveData()}>
            SAVE
        </button>
        <button className="modal-text-button"
          onClick={() => setShowColumnModal(false)}>
            CANCEL
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