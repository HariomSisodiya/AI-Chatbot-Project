import Client from "../Model/client.model.js";

export const fetchClientsByDistributorId = async (distributorId) => {
  return await Client.find({ distributorId });
};

export const getClientList = async (req, res) => {
  try {
    const { distributorId } = req.body; // body se le rahe ho

    if (!distributorId) {
      return res.status(400).json({ error: "distributorId is required in body" });
    }

    // Find all clients for the given distributor
    const result = await Client.find({ distributorId: distributorId });

    return res.status(200).json({
      success: true,
      msg: "All Clients fetched successfully",
      clients: result
    });
  } catch (error) {
    console.error("ERROR in fetching client list:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
