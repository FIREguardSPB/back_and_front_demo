import Router from "express"
import {createCard, deleteCard, getAllCards} from "../controllers/cardControllers.js";

const apiRouter = new Router()

//end points
apiRouter
  .post('/card', createCard) //add card
  .get('/card', getAllCards)
  .put("/card", deleteCard) // pseudo delete card

export default apiRouter