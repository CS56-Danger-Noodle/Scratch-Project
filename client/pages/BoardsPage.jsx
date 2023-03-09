import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function BoardsPage({user}) {

  const [boardName, setBoardName] = useState('');
  const [boards, setBoards] = useState([]);

  console.log('in boards page, user is: ', user);
  const username = user.username;
  useEffect(() => {
    try {
      const getBoards = async () => {
        const response = await axios.get('/boards');
        const userBoards = response.data;
        console.log('in useEffect boardsPage, userBoards is: ', userBoards);
        setBoards(userBoards);
      }
      getBoards();
    } catch (e) {
      console.log('error in useEffect getBoards: ', e);
    }
  }, []);

  const createBoard = async (e) => {
    try {
      const response = await axios.post('/boards', {boardName, username}, {withCredentials: true});
      const newBoard = response.data;
      setBoards(prevBoards => [...prevBoards, newBoard]);
      console.log(' in create board, response is: ', response);
    } catch (e) {
      console.log('in createBoard, error is: ', e.message);
    }
  }

  const deleteBoard = async(board_id) => {
    try {
      const response = await axios.delete(`/boards/${board_id}`, { withCredentials: true });
      console.log(' in delete board, response is: ', response);
      setBoards(prevBoards => prevBoards.filter(board => board._id !== board_id));
    } catch (e) {
      console.log('in deleteBoard, error is: ', e.message);
    }
  }

  console.log('BOARDS IS: ', boards);
  const boardLinks = boards.map(board => (
    <li className="board-li">
      <Link to={`/boards/${board._id}`} key={board._id} id={board._id}>{board.boardName}</Link>
      <button onClick={() => deleteBoard(board._id)}>Delete</button>
    </li>
  ));

  return (
    <>
      <h1>Boards Page</h1>
      <ul className="boards-list">
        {boardLinks.length > 0 && boardLinks}
      </ul>
      <input onChange={e => setBoardName(e.target.value)} value={boardName} placeholder="Board name"></input>
      <button onClick={createBoard}>Create Board</button>
    </>
  );
}
export default BoardsPage;