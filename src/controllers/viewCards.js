import {filterViewCard} from "./filtredMethods";

export const viewCards = (payload) => {
  const {beginData, endData, nameSearch, findResult, setCardsForView} = payload
  if (beginData && !endData && !nameSearch) { //все записи после начальной даты
    setCardsForView(filterViewCard.afterBeginData(findResult, beginData))
  }
  if (!beginData && endData && !nameSearch) { //все записи до конечной даты
    setCardsForView(filterViewCard.beforeEndData(findResult, endData))
  }
  if (beginData && endData && !nameSearch) { //все записи в промежутке указанных дат
    setCardsForView(filterViewCard.rangeDate(findResult, beginData, endData))
  }
  if (!beginData && !endData && nameSearch) { //все записи по совпадениям в имени
    setCardsForView(filterViewCard.name(findResult, nameSearch))
  }
  if (!beginData && !endData && !nameSearch){ //вывод всех записей из базы, если ни одно поле не запонено
    setCardsForView(findResult)
  }
  if (beginData && !endData && nameSearch){ //начальная дата и имя
    setCardsForView(filterViewCard.name(filterViewCard.afterBeginData(findResult, beginData), nameSearch))
  }
  if(beginData && !endData && nameSearch){
    setCardsForView(filterViewCard.name(filterViewCard.beforeEndData(findResult, endData), nameSearch))
  }
  if(beginData && endData && nameSearch){
    setCardsForView(filterViewCard.name(filterViewCard.rangeDate(findResult, beginData, endData), nameSearch))
  }
}