import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function BoardsPage({user}) {

  const [boardName, setBoardName] = useState('');
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = user.username;

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
      const response = await axios.post('/boards', {boardName, username}, {withCredentials: true});
      const newBoard = response.data;
      setBoards(prevBoards => [...prevBoards, newBoard]);
    } catch (e) {
      console.log('in createBoard, error is: ', e.message);
    }
  }

  const deleteBoard = async(board_id) => {
    try {
      const response = await axios.delete(`/boards/${board_id}`, { withCredentials: true });
      setBoards(prevBoards => prevBoards.filter(board => board._id !== board_id));
    } catch (e) {
      console.log('in deleteBoard, error is: ', e.message);
    }
  }

  const boardLinks = boards.map(board => (
    <li className="board-li">
      <Link to={`/boards/${board._id}`} className="board-link" key={board._id} id={board._id}>{board.boardName}</Link>
      <button className="delete-board-button" onClick={() => deleteBoard(board._id)}>Delete</button>
    </li>
  ));

  return (
    <div className="boards-page-container">
      <input className="create-board-input" onChange={e => setBoardName(e.target.value)} value={boardName} placeholder="Board name"></input>
      <button className="create-board-button" onClick={createBoard}>Create Board</button>
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