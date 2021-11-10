import React, {useCallback, useRef, useState} from 'react';
import styled from 'styled-components'
import style from "./AddCardPage.module.css"
import {Input} from "../Commons";
import ReactDadataBox from "react-dadata-box";
// import dotEnv from "dotenv"
// dotEnv.config()
// const API_KEY = process.env.API_KEY
const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  position: absolute;
  background: white;
  flex-direction: column;
  z-index: 1;
  width: 100%;
  height: 100rem;
  align-items: flex-start;
`
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;

  .Data_Box {
    :focus {
      border: 2px solid green
    }
  }
`
const NameTextNear = styled.div`
  text-align: right;
  margin-left: 209px;
`
const AddressTextNear = styled.div`
  text-align: right;
  margin-left: 197px;
`
const FiasTextNear = styled.div`
  text-align: right;
  margin-right: 5px;
`
const PhoneTextNear = styled.div`
  text-align: right;
  margin-left: 184px;
`
const ButtonsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Button = styled.div`
  display: flex;
  width: 200px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background: greenyellow;
  margin-right: 20px;

  :hover {
    cursor: pointer;
  }

`
const TextButton = styled.div`
  font-size: 14px;
  text-align: center;
`

const AddCardPage = ({setVisibleAddCard, setRefreshFetch}) => {
  const [address, setAddress] = useState('')
  const [fias, setFias] = useState('')
  const [fio, setFio] = useState('')
  const [numberPhone, setNumberPhone] = useState('')
  const [fiasError, setFiasError] = useState(false)
  const [fioError, setFioError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const onSetNumberPhone = useCallback((ev) => {
    setNumberPhone(ev.target.value)
  })
  const onSetFio = useCallback((ev) => {
    setFio(ev.target.value)
  })
  const onSetChoice = useCallback((ev) => {
    setFias(ev.data.fias_id);
    setAddress(ev.value)
  }, [])
  const fioRef = useRef(null)
  const saveNoExit = async () => {
    if (!fias) {
      setFiasError(true)
    } else {
      setFiasError(false);
      fioRef.current.focus();
    }
    if (!address) {
      setAddressError(true)
    } else {
      setAddressError(false);
    }
    if (!fio) {
      setFioError(true)
    } else setFioError(false)
    if (fias && address && fio && numberPhone) {
      fetch('/api/card', {
        method: "POST",
        body: JSON.stringify({
          address,
          fias,
          fio,
          numberPhone,
          date_created: new Date(Date.now()).toISOString()
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
      setFiasError(false)
      setFioError(false)
      setAddressError(false)
      setAddress('')
      setFias('')
      setFio('')
      setNumberPhone('')
      return true
    }
  }
  const saveCard = async () => {
    const save = await saveNoExit()
    if (save) {
      setVisibleAddCard(false)
      setRefreshFetch(prev => !prev)
    }
  }
  const cancelButton = () => {
    setAddress('')
    setFias('')
    setFio('')
    setNumberPhone('')
    setVisibleAddCard(false)
    setRefreshFetch(prev => !prev)
  }
  return (
    <>
      <Wrapper>
        <InputWrapper>
          <NameTextNear style={fioError ? {color: 'red'} : null}>ФИО*</NameTextNear>
          <Input ref={fioRef} required={true} value={fio} onChange={onSetFio}/>
        </InputWrapper>
        <InputWrapper>
          <PhoneTextNear>Телефон</PhoneTextNear>
          <Input value={numberPhone} onChange={onSetNumberPhone}/>
        </InputWrapper>
        <InputWrapper>
          <AddressTextNear style={addressError ? {color: 'red'} : null}>Адрес*</AddressTextNear>
          <ReactDadataBox className={`${style.Data_Box}`} value={address}
                          token={window.env.API_KEY} placeholder={''}
                          onChange={onSetChoice} allowClear={true} query={address} style={{width:'400px'}}/>
        </InputWrapper>
        <InputWrapper>
          <FiasTextNear style={fiasError ? {color: 'red'} : null}>Код адреса в
            формате ФИАС*</FiasTextNear>
          <Input disabled={true} value={fias}/>
        </InputWrapper>
        <ButtonsWrapper>
          <Button>
            <TextButton onClick={() => saveCard()}>Сохранить</TextButton>
          </Button>
          <Button>
            <TextButton onClick={() => saveNoExit()}>Сохранить и продолжить</TextButton>
          </Button>
          <Button>
            <TextButton onClick={() => cancelButton()}>Отменить</TextButton>
          </Button>
        </ButtonsWrapper>
      </Wrapper>
    </>
  );
};

export default AddCardPage;