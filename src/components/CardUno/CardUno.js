import React from 'react';
import styled from 'styled-components'

const DeleteButton = styled.div`
  border: 1px solid red;
  width: 10px;
  height: 10px;
  visibility: hidden;
`
const WrapperCard = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;

  &:hover ${DeleteButton} {
    visibility: visible;
    cursor: pointer;
    background: red;
  }
`
const DateCreated = styled.div`
  width: 10%;
  margin-right: 10px;
`
const Name = styled.div`
  width: 30%;
`
const NumberPhone = styled.div`
  width: 30%;
`
const Address = styled.div`
  width: 20%;
`
const CardUno = ({addressInfo, fio, date, phone, id, index, setFindResult, cards, setRefreshFetch}) => {
  const fetchDelete = () => {
    fetch(`/api/card/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({_id: id})
    }).then(response => response.json())
      .then(result => console.log(result))
  }
  const handleDelete = async () => {
    const filteredCards = cards.filter(b => b._id !== id);
    await fetchDelete()
    setRefreshFetch(prev => !prev)
    setFindResult(filteredCards);
  };
  return (
    <>
      <WrapperCard style={index === 0 || (index % 2 === 0) ? {background: 'grey'} : null}>
        <DateCreated>{`${date}`}</DateCreated>
        <Name>{`${fio}`}</Name>
        <NumberPhone>{`${phone}`}</NumberPhone>
        <Address>{`${addressInfo}`}</Address>
        <DeleteButton onClick={(ev) => {
          handleDelete()
        }}/>
        {`${index}`}
      </WrapperCard>
    </>
  );
};

export default CardUno;