const endDateFiltered = (allCards, endData) => {
  const filteredCards = []
  allCards.forEach((card) => {
    if (new Date(card.date_created).toLocaleDateString() <= new Date(endData).toLocaleString().slice(0, 10)) {
      filteredCards.push(card)
    }
  })
  return filteredCards
}
const beginDateFiltered = (allCards, beginData) => {
  const filteredCards = []
  allCards.forEach((card) => {
    if (new Date(card.date_created).toLocaleDateString() >= new Date(beginData).toLocaleString().slice(0, 10)) {
      filteredCards.push(card)
    }
  })
  return filteredCards
}
const rangeDateFiltered = (allCards, beginData, endData) => {
  const filteredCards = []
  allCards.forEach((card) => {
    if (new Date(card.date_created).toLocaleDateString() <= new Date(endData).toLocaleString().slice(0, 10) && new Date(card.date_created).toLocaleDateString() >= new Date(beginData).toLocaleString().slice(0, 10)
    ) {
      filteredCards.push(card)
    }
  })
  return filteredCards
}
const nameFiltered = (allCards, fio) => {
  const filteredCards = []
  const fioLowCaseAndSplitToWords = fio.toLowerCase().split(' ')
  const matched = (card) => {
    let fioFromDBLowCaseAndSplitToWords = card.fio.toLowerCase().split(' ')
    for (let partNameDb of fioFromDBLowCaseAndSplitToWords) {
      for (let partName of fioLowCaseAndSplitToWords) {
        if (partNameDb === partName) {
          return true
        }
      }
    }
  }
  allCards.forEach((card) => {
    if (matched(card)) {
      filteredCards.push(card)
    }
  })
  return filteredCards
}


export const filterViewCard = {
  beforeEndData: endDateFiltered,
  afterBeginData: beginDateFiltered,
  rangeDate: rangeDateFiltered,
  name: nameFiltered
}