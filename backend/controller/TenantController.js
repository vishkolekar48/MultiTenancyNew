import { Tenants } from "../model/MasterTable.js";

export const createTenant = async (req, res) => {
  const { login_id, restaurant_id, dbName, dbUrl, createdBy } = req.body;

  try {
    const newTenant = await Tenants.create({
      login_id,
      restaurant_id,
      dbName,
      dbUrl,
      createdBy,
    });

    return res.status(201).json({
      message: "Tenant created successfully",
      tenant: newTenant,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
