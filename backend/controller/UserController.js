import { Login } from "../model/MasterTable.js";

export const UserRegistration = async (req, res) => {
  const {
    userName,
    email,
    password,
    mobileNo,
    tenant_id,
    restaurant_id,
    role_id,
  } = req.body;

 
  try {
    const existingUser = await Login.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await Login.create({
      userName,
      email,
      password,
      mobileNo,
      tenant_id,
      restaurant_id,
      role_id,
    });
    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const UserLogin = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await Login.findOne({ email, userName, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
