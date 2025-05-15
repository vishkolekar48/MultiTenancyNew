import mongoose from "mongoose";

export const getTenantModels = (tenantDb) => {
  const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobNo: { type: Number },
    email: { type: String },
    password: { type: String },
  });

  const adminSchema = new mongoose.Schema({
    adminName: { type: String, required: true },
    role: { type: String },
    createdAt: { type: Date, default: Date.now },
  });

  const trainerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String },
    experience: { type: Number },
  });

  return {
    Member: tenantDb.models.Member || tenantDb.model('Member', memberSchema),
    Admin: tenantDb.models.Admin || tenantDb.model('Admin', adminSchema),
    Trainer: tenantDb.models.Trainer || tenantDb.model('Trainer', trainerSchema),
  };
};
