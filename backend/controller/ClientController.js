import { Clients } from "../model/MasterTable.js";
export const createClient = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobileNo,
      userName,
      login_id,
      createdBy,
    } = req.body;

    const existing = await Clients.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Client with this email already exists' });
    }

    const newClient = new Clients({
      name,
      email,
      password,
      mobileNo,
      userName,
      login_id,
      createdBy,
      updatedBy: createdBy,
    });

    await newClient.save();

    res.status(201).json({ message: 'Client created successfully', client: newClient });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};