import {createdCard, deletedCard, getCards} from "../service/CardService.js";

export async function createCard(req, res) {
  try {
    console.log(req.body)
    const card = await createdCard(req.body)
    res.status(200).json(card)
  } catch (e) {
    res.status(500).json({e})
  }

}

export async function getAllCards(req, res) {
  try {
    const cards = await getCards()
    console.log(cards)
    res.status(200).json(cards)
  } catch (e) {
    res.status(500).json({e})
  }
}

export async function deleteCard(req, res) {
  try {
    const card = await deletedCard(req.body)
    return res.json(card)
  } catch (e) {
    res.status(500).json({e})
  }
}