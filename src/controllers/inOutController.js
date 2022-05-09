import db from "../db.js";
import joi from "joi";
import dayjs from "dayjs";

export async function getHistoric(req, res) {
    const { user } = res.locals;
    try {
        const inOut = await db.collection("inOut").find({ userId: user._id }).toArray();
        const saldo = await db.collection("balance").findOne({ email: user.email });
        inOut.forEach((item) => {
            delete item.userId;
            delete item._id;
        });
        const inOutReverse = inOut.reverse()
        const dados = { transaction: [...inOutReverse], balance: saldo.balance, name: user.name };
        console.log(dados);
        res.send(dados);
    } catch (err) {
        console.log("Algo deu errado!", err);
        res.send(500);
    }
}

export async function In(req, res) {
    const { body } = req;
    const { user } = res.locals;
    const inSchema = joi.object({
        value: joi.number().required(),
        describe: joi.string().required()
    });
    const validation = inSchema.validate(body, { abortEarly: true });
    if (validation.error) {
        return res.sendStatus(422);
    }
    const value = parseFloat(body.value);
    try {
        await db.collection("inOut").insertOne({ ...body, type: "in", userId: user._id, date: dayjs().format('DD/MM') });
        const saldo = await db.collection("balance").findOne({ email: user.email });
        console.log(user.email)
        if (!saldo) {
            return res.sendStatus(404);
        }
        await db.collection("balance").updateOne({ email: user.email }, { $set: { balance: saldo.balance + value } });
        res.sendStatus(201);
    } catch (err) {
        console.log("Deu ruim!", err);
        res.sendStatus(500);
    }
}

export async function Out(req, res) {
    const { body } = req;
    const { user } = res.locals;
    const inSchema = joi.object({
        value: joi.number().required(),
        describe: joi.string().required()
    });
    const validation = inSchema.validate(body, { abortEarly: true });
    if (validation.error) {
        return res.sendStatus(422);
    }
    const value = parseFloat(body.value);
    try {
        await db.collection("inOut").insertOne({ ...body, type: "out", userId: user._id, date: dayjs().format('DD/MM') });
        const saldo = await db.collection("balance").findOne({ email: user.email });
        await db.collection("balance").updateOne({ email: user.email }, { $set: { balance: saldo.balance - value } });
        res.sendStatus(201);
    } catch (err) {
        console.log("Deu ruim!", err);
        res.sendStatus(500);
    }
}