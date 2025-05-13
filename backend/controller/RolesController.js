import { Roles } from "../model/MasterTable.js";

export const createRole = async (req, res) => {
  try {
    const { name, createdBy } = req.body;

    const existingRole = await Roles.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const newRole = new Roles({
      name,
      createdBy,
      updatedBy: createdBy,
    });

    await newRole.save();

    return res.status(201).json({
      message: "Role created successfully",
      role: newRole,
    });
  } catch (error) {
    console.error("Error creating role:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
