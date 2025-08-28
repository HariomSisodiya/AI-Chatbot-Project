import express from "express";
import {getAIAns} from "../Controller/ai.controller.js";
import { getClientList } from "../Controller/client.controller.js";
import { getCurrentAum } from "../Controller/presentDay.controller.js";
import { getLatestTransactions } from "../Controller/transaction.controller.js";

const router = express.Router();

router.post("/getAIAns" , getAIAns);
router.post('/getClientList' , getClientList);
router.get('/getCurrentAUM' , getCurrentAum);
router.get('/getLatestTransactions' , getLatestTransactions);

export default router;