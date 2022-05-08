import express from "express";
import cors from "cors";
import authRouter from "./src/Routers/authRouter.js";
import inOutRouter from "./src/Routers/inOutRouter.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(inOutRouter);

app.listen(5000);