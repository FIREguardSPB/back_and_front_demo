import Card from "../model/Card.js";

export async function createdCard(card) {
  return await Card.create(card)
}

export async function getCards() {
  return Card.find({deleted: false});
}

export async function deletedCard(id) {
  if (!id) {
    console.log(id)
    throw new Error('Invalid ID')
  }
  return Card.findByIdAndUpdate(id, {deleted: true});
}
