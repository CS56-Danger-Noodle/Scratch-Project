import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function BoardsPage({ user }) {
  const [boardName, setBoardName] = useState('');
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = user.username;
  const alertRef = useRef();

  const setAlertTextVisible = () => alertRef.current.style.visibility = 'visible';

  useEffect(() => {
    try {
      const getBoards = async () => {
        const response = await axios.get('/boards');
        const userBoards = response.data;
        setBoards(userBoards);
        setLoading(false);
      }
      getBoards();
    } catch (e) {
      console.log('error in useEffect getBoards: ', e);
    }
  }, []);

  const createBoard = async () => {
    try {
      if (boardName === '') {
        alertRef.current.innerHTML = 'Please enter a board name.';
        setAlertTextVisible();
      } else {
        const response = await axios.post(
          '/boards',
          { boardName, username },
          { withCredentials: true }
        );
        const newBoard = response.data;
        setBoards(prevBoards => [...prevBoards, newBoard]);
      }
    } catch (e) {
      const { response } = e;
      if (response) {
        const { status, data } = response;
        if (status === 400 && data.err.includes('already exist')) {
          alertRef.current.innerHTML = 'Board name already exists. Please select a different name.';
          setAlertTextVisible();
        } else {
          alertRef.current.innerHTML = 'Failed to create a new board. Please try again.';
          setAlertTextVisible();
        }
      } else {
        console.log(e);
        console.log('in createBoard, error is: ', e.message);
      }
    }
  }

  const deleteBoard = async (board_id) => {
    try {
      const response = await axios.delete(`/boards/${board_id}`, { withCredentials: true });
      setBoards(prevBoards => prevBoards.filter(board => board._id !== board_id));
    } catch (e) {
      console.log('in deleteBoard, error is: ', e.message);
    }
  }

  const handleBoardInputChange = (e) => {
    setBoardName(e.target.value);
    if (alertRef.current.style.visibility === 'visible') alertRef.current.style.visibility = 'hidden';
  }

  const boardLinks = boards.map(board => (
    <li className="board-li" key={board._id}>
      <Link to={`/boards/${board._id}`} className="board-link" id={board._id}>{board.boardName}</Link>
      <button className="delete-board-button" onClick={() => deleteBoard(board._id)}>Delete</button>
    </li>
  ));

  return (
    <div className="boards-page-container">
      <section className='boards-page-input'>
        <span className='alert' ref={alertRef}></span>
        <input className="create-board-input" onChange={handleBoardInputChange} value={boardName} placeholder="Board name"></input>
        <button className="create-board-button" onClick={createBoard}>Create Board</button>
      </section>
      <div className="boards-list-container">
        <h1 className="boards-page-heading">
          {!loading && (boards.length > 0 ? 'My Boards' : 'No Boards Currently')}
        </h1>
        <span className={`loader ${!loading && 'hidden'}`}></span>
        <ul className="boards-list">
          {boardLinks.length > 0 && boardLinks}
        </ul>
      </div>
    </div>
  );
}
export default BoardsPage;