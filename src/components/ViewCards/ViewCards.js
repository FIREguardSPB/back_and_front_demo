import React from 'react';
import styled from 'styled-components'
import CardUno from "../CardUno/CardUno";

const WrapperViewCards = styled.ul`
  margin-left: -40px;
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`

const ViewCards = ({state, setRefreshFetch}) => {
  const [cardsForView, setCardsForView] = state
  cardsForView.splice(20, cardsForView.length - (20))
  return (
    <>
      <WrapperViewCards>
      {cardsForView.map((card, i) => <CardUno index={i} addressInfo={card.address} fio={card.fio} date={new Date(card.date_created).toLocaleDateString()} phone={card.numberPhone} id={card._id} cards={cardsForView} setFindResult={setCardsForView} setRefreshFetch={setRefreshFetch}/>)}
      </WrapperViewCards>
    </>
  );
};

export default React.memo(ViewCards);