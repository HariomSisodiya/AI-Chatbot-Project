import mongoose, { Schema } from "mongoose";

const PresentDAyWSummary = Schema({
  arn_id: {
    type: Number,
    required: true,
  },
  data_type: {
    type: String,
    required: true,
  },
  ID: {
    type: String,
    required: true,
  },
  folio: {
    type: String,
    required: true,
  },
  sCode: {
    type: String,
    required: true,
  },
  pur_nav: {
    type: String,
    default: "0",
  },
  divPaid: {
    type: String,
    default: "0",
  },
  divReInv: {
    type: String,
    default: "0",
  },
  units: {
    type: String,
    required: true,
  },
  amt_inv: {
    type: String,
    required: true,
  },
  fund: {
    type: String,
    default: "",
  },
  fundDesc: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    required: true,
  },
  cur_val: {
    type: String,
    required: true,
  },
  rID: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    default: "",
  },
  tID: {
    type: String,
    default: "0",
  },
  pur_amt: {
    type: String,
    required: true,
  },
  pur_unit: {
    type: String,
    required: true,
  },
  agentCode: {
    type: String,
    required: true,
  },
  IHNO: {
    type: String,
    default: "",
  },
  final_cagr: {
    type: String,
    default: "",
  },
  cagr_values: {
    type: [String],
    default: [],
  },
  cagr_dates: {
    type: [String], 
    default: [],
  },
  insert_time: {
    type: String,
    required: true,
  },
  gainloss: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model("present_day_test_summary", PresentDAyWSummary);
