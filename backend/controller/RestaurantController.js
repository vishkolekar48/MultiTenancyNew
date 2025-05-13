import { Restaurants } from "../model/MasterTable.js";

export const createRestaurant = async (req, res) => {
  try {
    const {
      name,
      email,
      mobileNo,
      address,
      active, 
      createdBy,
    } = req.body;
    
    const existing = await Restaurants.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Restaurant with this email already exists" });
    }

    const newRestaurant = new Restaurants({
      name,
      email,
      mobileNo,
      address,
      active,
      createdBy,
      updatedBy: createdBy,
    });

    await newRestaurant.save();

    return res.status(201).json({
      message: "Restaurant created successfully",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
