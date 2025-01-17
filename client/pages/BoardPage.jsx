import React from "react";
import { useState, useEffect } from "react";
import { ColumnModal, CardModal } from '../components/Modals.jsx';
import Column from '../components/Column.jsx';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BoardPage({ user, setUser }) {
  // state to render a column creation modal
  const [showColumnModal, setShowColumnModal] = useState(false)
  // state to render a card creation modal
  const [showCardModal, setShowCardModal] = useState(false)
  const [boardData, setBoardData] = useState(null);
  const { board_id } = useParams();

  let renderColumns = [];

  const addNewColumn = () => {

  }

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

  // console.log('BOARD DATA', boardData)

  if (boardData) {
    renderColumns = boardData.columns.map((column, index) => {
      return (<Column key={index} id={column._id} board_id={board_id} columnName={column.columnName} cards={column.cards} setShowCardModal={setShowCardModal} setBoardData={setBoardData} />)
    })
  }
  let overlay = null;

  if (showColumnModal || showCardModal) overlay = <div className="overlay"></div>
  else overlay = null;

  return (
    <div className='homeCont'>

      {overlay}

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
            currBoardID={board_id}
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