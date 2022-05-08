import db from "../db.js";
import { v4 as uuid } from 'uuid';
import joi from "joi";

export async function getHistoric(req, res) {
    try {
        const inOut = await db.collection("inOut").find({}).toArray();
        res.send(inOut);
    } catch (err) {
        console.log("Algo deu errado!", err);
        res.send(500);
    }
}

export async function In(req, res) {
    const { body } = req;
    const inSchema = joi.object({
        value: joi.number().required(),

    })
}