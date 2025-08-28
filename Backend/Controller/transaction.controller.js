import Transaction from "../Model/transaction.model.js";

// Service function
export const fetchLatestTransactions = async () => {
  try {
    const result = await Transaction.aggregate([
      {
        $addFields: {
          insertDateObj: { $toDate: "$insertDate" } // convert string to date for sorting
        }
      },
      { $sort: { insertDateObj: -1 } }, // latest first
      { $limit: 10 }, // only 10 latest
      { $project: { insertDateObj: 0 } } // remove temp field
    ]);

    return result;
  } catch (error) {
    console.log("ERROR in fetching latest transactions: ", error);
    throw error;
  }
};

export const getLatestTransactions = async (req, res) => {
  try {
    const transactions = await fetchLatestTransactions();
    return res.json({ transactions });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
