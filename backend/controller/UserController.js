import { Login , Tenants } from "../model/MasterTable.js";
import {getTenantConnection} from "../utils/TenantsDb.js";
// import bcrypt from "bcrypt";
import { getTenantModels } from "../model/tenantTables/Member.js";

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
  
    try {
    const { userName, password } = req.body;
    const user = await Login.findOne({userName, password });
         
    user = req.user

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const tenant = await Tenants.findOne({ tenantId: user.tenantId });
    console.log('tenant',tenant)
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    
     const tenantDb = await getTenantConnection(tenant.dbUrl, tenant.dbName);
//-----------------------------------------------------------------------------------------------
// const { Member, Admin, Trainer } = getTenantModels(tenantDb);
// await Member.create({ name: "John", mobNo: 1234567890 });

// await Admin.create({ adminName: "SuperAdmin", role: "Manager" });
//-------------------------------------------------------------------------------------------------   
    res.status(200).json({
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



