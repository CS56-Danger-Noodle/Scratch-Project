import React from "react";
import axios from 'axios';



function Column({ columnName, cards, setShowCardModal, id, board_id, setBoardData }) {
  const renderCards = cards.map((card, index) => {
    return (<div key={index} className='card'>{card.cardText}</div>);
  })

  const removeColumn = async () => {
    try {
      const response = await axios.delete(`/boards/${board_id}/${id}`);
      const updatedBoard = response.data;
      setBoardData(updatedBoard);
    } catch (e) {
      console.log('error in removeColumn: ', e);
    }
  }
  return (
    <div className='columnCont'>
      <div>{columnName}</div>
      <div className='cardCont'>
        {renderCards}
      </div>
      <button onClick={() => setShowCardModal(true)}>ADD CARD</button>
      <button onClick={removeColumn}>REMOVE COLUMN</button>
    </div>
  );
}

export default Column;