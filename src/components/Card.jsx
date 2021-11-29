import React from 'react';
import BackOfCard from '../img/kort.jpg';
import './Card.css';


const Card = ({card, handleClickedCard, TurnCard, lockCards}) => {
   
  const handleClick = () => {
          if(!lockCards){
              handleClickedCard(card);
    }
          
  }
  
  return (
    <div className="Card">   
          
    <div className={TurnCard ? "TurnCard" : ""}>
     <img src={`${card.image}`} alt="Cardsback" className="FrontCardimg"/>
     <img src={`${BackOfCard}`} alt="Cardsfront" onClick={handleClick} className="BackCardimg" />
      </div>
           
      </div>
      );
  };
  
  
  export default Card;