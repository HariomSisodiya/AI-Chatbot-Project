import presenDayModel from "../Model/presenDay.model.js";

// Service function
export const fetchCurrentAum = async (distributorId) => {
  try {
    const result = await presenDayModel.aggregate([
    //   { $match: { distributorId: distributorId } }, // Optional filter
      {
        $group: {
          _id: null,
          totalAUM: {
            $sum: {
              $toDouble: "$cur_val" // convert string to number
            }
          }
        }
      }
    ]);
    return result.length > 0 ? result[0].totalAUM : 0;
  } catch (error) {
    console.log("ERROR in fetching AUM: ", error);
    throw error;
  }
};

// Controller for API
export const getCurrentAum = async (req, res) => {
  try {
    // const { distributorId } = req.body;
    // const totalAUM = await fetchCurrentAum(distributorId);
    const totalAUM = await fetchCurrentAum();
    return res.json({ totalAUM: totalAUM.toLocaleString() });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
