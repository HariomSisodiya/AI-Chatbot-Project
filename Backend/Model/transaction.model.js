import mongoose, { Schema } from "mongoose";

const transactionSchema = Schema({
  agentCode2: { type: String },
  amt: { type: String },
  arn_id: { type: String },
  assetType: { type: String },
  branchName: { type: String },
  clientID: { type: String },
  data_type: { type: String },
  file_id: { type: String },
  folioNumber: { type: String },
  fund: { type: String },
  fundDesc: { type: String },
  ID: { type: String },
  insert_time: { type: String },
  insertDate: { type: String },
  nav: { type: String },
  navDt: { type: String },
  pan1: { type: String },
  pan2: { type: String },
  pan3: { type: String },
  price: { type: String },
  scheme: { type: String },
  scheme_type: { type: String },
  schemeCode: { type: String },
  subBrokARNno: { type: String },
  subbrokerCode: { type: String },
  subTransType: { type: String }
}, { timestamps: true });

const Transaction = mongoose.model("transaction_test_batch", transactionSchema);

export default Transaction;
