import { Router } from 'express';
import { getHistoric } from '../controllers/inOutController.js';

const inOutRouter = Router();

inOutRouter.get("/historic", getHistoric);

export default inOutRouter;