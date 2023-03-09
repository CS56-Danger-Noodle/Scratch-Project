import React from "react";
import { useState, useEffect } from "react";
import  { ColumnModal, CardModal } from '../components/Modals.jsx';
import Column from '../components/Column.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BoardPage({user, setUser}) {
  // state to render a column creation modal
  const [ showColumnModal, setShowColumnModal ] = useState(false)
  // state to render a card creation modal
  const [ showCardModal, setShowCardModal ] = useState(false)
  // const [columnsState, setColumns] = useState(null);
  const [ boardData, setBoardData ] = useState(null);
  const { board_id } = useParams();

  // boardData structure:
  // 
  //   {
  //       "_id": "640635f9e846af21bdd5652e",
  //       "boardName": "testBoard",
  //       "columns": [
  //           {
  //               "_id": "64065a6f664404268f5fc975",
  //               "columnName": "col1",
  //               "cards": [
  //                   {
  //                       "_id": "64065a6f664404268f5fc976",
  //                       "cardText": "hello, I'm a card!"
  //                   }
  //               ]
  //           }
  //       ]
  //   }
  // 
    //This is real code do not delete:
    let renderColumns = [];

    useEffect(() => {
      const getBoard = async () => {
        try {
          const response = await axios.get(`/boards/${board_id}`);
          setBoardData(response.data);
        } catch (e) {
          console.log('error in useEffect get board: ', e.message);
        }
      }
      getBoard();
    }, [])

    const navigate = useNavigate();

    async function logout() {
      try {
        // make DB call to terminate session
        await axios.delete('/logout');
        // clear userState
        setUser(null);
        // navigate to login page
        navigate('/login');
      } catch(err) {
        console.log('error in BoardPage.jsx logout function: ', err.message)
      }
    }

    // console.log('BOARD DATA', boardData)

    if (boardData) {
      renderColumns = boardData.columns.map((column, index) => {
          return (<Column key={index} columnName={column.columnName} cards={column.cards} setShowCardModal={setShowCardModal}/>)
        })
    }
    let overlay = null;

    if (showColumnModal || showCardModal) overlay = <div className="overlay"></div>
    else overlay = null;

    return (
      <div className='homeCont'>

        {overlay}
        
        <header className='homeHeader'>
          <h1> Home Page </h1>
          <button className="logOut" onClick={logout}>LOG OUT</button>

        </header>
      
        <div className='boardDisplay'>
          <div className="modal-box">
            {/* when showModal is set to true a column modal will render */}
            {/* having issues with page re-rendering when state is updated. modal does not stay up */}
            {/* {showColumnModal && <ColumnModal showColumnModal={showColumnModal} setShowColumnModal={setShowColumnModal} />} */}
            {showColumnModal ? (<ColumnModal 
              showColumnModal={showColumnModal} 
              setShowColumnModal={setShowColumnModal} 
              showCardModal={showCardModal} 
              setShowCardModal={setShowCardModal}
              boardData={boardData}
              currBoardID={currBoardID}
              setBoardData={setBoardData} />) 
              : (<></>)
            }
            {showCardModal ? (<CardModal 
              showCardModal={showCardModal} 
              setShowCardModal={setShowCardModal} />) 
              : (<></>)
            }
          </div>
          <div className="column-container">
            {renderColumns}
          </div>
          <div>
            <button className="addColumn" onClick={() => setShowColumnModal(true)}>ADD COLUMN</button>
          </div>
        </div>
      </div>
  );
}

export default BoardPage;