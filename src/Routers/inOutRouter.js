import { Router } from 'express';
import { getHistoric, In, Out } from '../controllers/inOutController.js';
import { validateToken } from '../middlewares/validate.js';

const inOutRouter = Router();
inOutRouter.use(validateToken);
inOutRouter.get("/historic", getHistoric);
inOutRouter.post("/in", In);
inOutRouter.post("/out", Out);

export default inOutRouter;