import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const tenantConnections = {};

const getTenantConnection = async (tenantDbName) => {
  const tenantDbUrl = process.env.tenantDbUrl;
  const dbName = tenantDbName || process.env.tenantDbName;

  if (!tenantDbUrl || !dbName) {
    throw new Error('Missing tenant DB URL or tenant DB name');
  }

  const cacheKey = dbName;

  if (tenantConnections[cacheKey]) {
    console.log(`Already connected to tenant DB: ${dbName}`);
    return tenantConnections[cacheKey];
  }

  try {
    const conn = await mongoose.createConnection(tenantDbUrl, {
      dbName,
    });

    tenantConnections[cacheKey] = conn;

    return conn;
  } catch (error) {
    console.error(`Failed to connect to tenant DB: ${dbName}. Error: ${error.message}`); // Error message
    throw error; // Rethrow the error after logging
  }
};

export { getTenantConnection };
