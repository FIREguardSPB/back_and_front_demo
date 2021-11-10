import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components'
import {InputName} from "../Commons";
import DatePicker from 'react-date-picker'
import AddCardPage from "../AddCardPage/AddCardPage";
import ViewCards from "../ViewCards/ViewCards";
import {viewCards} from "../../controllers/viewCards";

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const HeaderPlace = styled.div`
  height: auto;
  text-align: left;
  margin-bottom: 20px;
`
const InputsField = styled.div`
  display: flex;
  flex-direction: row;
`
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 100px;
`
const TextWrapper = styled.div`
  font-size: 14px;
  width: 150px;
  height: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`
const HorizontalLine = styled.div`
  width: 100%;
  height: 2px;
  background: grey;
  margin-top: 20px;
  margin-bottom: 20px;
`

const ButtonSearch = styled.div`
  margin-top: 20px;
  width: 100px;
  height: 50px;
  background: green;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  :hover {
    cursor: pointer;
  }
`
const ButtonText = styled.div`
  text-align: center;
  font-size: 14px;
`
const WrapperButtonAdd = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`
const WrapperInfoSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`
const InfoSearchText = styled.div`
  text-align: left;
  font-size: 14px;
  width: 200px;
  height: 20px;
`
const ButtonAdd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  background: dodgerblue;
  border-radius: 5px;

  :hover {
    cursor: pointer;
  }
`
const WrapperCard = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
const DateCreatedCard = styled.div`
  width: 10%;
  margin-right: 10px;
`
const NameCreatedCard = styled.div`
  text-align: center;
  width: 40%;
`
const NumberPhoneCard = styled.div`
  text-align: center;
  width: 10%;
`
const AddressCard = styled.div`
  text-align: center;
  width: 40%;
`
const SearchingPage = () => {
  const [visibleAddCard, setVisibleAddCard] = useState(false)
  const [beginData, setBeginData] = useState(null);
  const [endData, setEndData] = useState(null);
  const [nameSearch, setNameSearch] = useState('')
  const [findResult, setFindResult] = useState([])
  const [cardsForView, setCardsForView] = useState([])
  const [refreshFetch, setRefreshFetch] = useState(false)
  const [visibleViewCardsOnStart, setVisibleViewCardsOnStart] = useState(false)

  async function fetchGetAllcards() {
    const response = await fetch('/api/card', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const json = await response.json();
    setFindResult(json)
    setCardsForView(json)
  }

  useEffect(() => {
    fetchGetAllcards()
  }, [refreshFetch])
  const nameChange = useCallback((ev) => {
    setNameSearch(ev.target.value)
  }, []);
  const onAddButton = useCallback((ev) => {
    setVisibleAddCard(prevState => !prevState)
  }, [])
  const onSearch = () => {
    const payload = {beginData, endData, nameSearch, findResult, setCardsForView}
    viewCards(payload)
    setVisibleViewCardsOnStart(true)
  }
  return (
    <>
      <Wrapper>
        {visibleAddCard ? <AddCardPage setVisibleAddCard={setVisibleAddCard} setRefreshFetch={setRefreshFetch}/> : null}
        <HeaderPlace>
          Критерии поиска
        </HeaderPlace>
        <InputsField>
          <InputWrapper>
            <TextWrapper>Начальная дата</TextWrapper>
            <DatePicker wrapperClassName="datePicker" onChange={setBeginData}
                        value={beginData} required={false}/>
          </InputWrapper>
          <InputWrapper>
            <TextWrapper>Конечная дата</TextWrapper>
            <DatePicker wrapperClassName="datePicker" onChange={setEndData}
                        value={endData} required={false}/>
          </InputWrapper>
          <InputWrapper>
            <TextWrapper>Часть ФИО</TextWrapper>
            <InputName value={nameSearch} onChange={nameChange} required={true} type={'text'}/>
          </InputWrapper>
        </InputsField>
        <ButtonSearch><ButtonText onClick={() => {
          onSearch()
        }}>Выполнить поиск</ButtonText></ButtonSearch>
        <HorizontalLine/>
        <WrapperButtonAdd>
          <WrapperInfoSearch><InfoSearchText>Найдено {`${cardsForView.length}`} результат
            (ов)</InfoSearchText></WrapperInfoSearch>
          <ButtonAdd onClick={onAddButton}><ButtonText>Добавить карточку</ButtonText></ButtonAdd>
        </WrapperButtonAdd>
        <WrapperCard>
          <DateCreatedCard>Дата создания</DateCreatedCard>
          <NameCreatedCard>ФИО</NameCreatedCard>
          <NumberPhoneCard>Телефон</NumberPhoneCard>
          <AddressCard>Адрес</AddressCard>
        </WrapperCard>
        {visibleViewCardsOnStart ? <ViewCards state={[cardsForView, setCardsForView]} setRefreshFetch={setRefreshFetch}/> : null}
      </Wrapper>
    </>
  );
};

export default React.memo(SearchingPage);