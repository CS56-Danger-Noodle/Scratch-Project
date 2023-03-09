import React, {useState, useEffect} from "react";
import axios from 'axios';

function BoardsPage({user}) {

  const [boardName, setBoardName] = useState('');

  console.log('in boards page, user is: ', user);
  const username = user.username;
  useEffect(() => {
    // here's where we want to get all boards from db
    // axios.get();
  }, []);

  const createBoard = async (e) => {
    try {
      const response = await axios.post('/boards', {boardName, username}, {withCredentials: true});
      console.log(' in create board, response is: ', response);
    } catch (e) {
      console.log('in createBoard, error is: ', e.message);
    }
  }

  return (
    <>
      <h1>Boards Page</h1>
      <ul className="boards-list">
      </ul>
      <input onChange={e => setBoardName(e.target.value)} value={boardName} placeholder="Board name"></input>
      <button onClick={createBoard}>Create Board</button>
    </>
  );
}
export default BoardsPage;