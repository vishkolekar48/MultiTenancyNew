// db/tenantDbManager.js
import mongoose from 'mongoose';

const tenantConnections = {}; // Cache object

const getTenantConnection = async (tenantDbUrl, tenantDbName) => {
  const cacheKey = tenantDbName;
  if (tenantConnections[cacheKey]) {
    return tenantConnections[cacheKey];
  }
  const conn = await mongoose.createConnection(tenantDbUrl, {
    dbName: tenantDbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  tenantConnections[cacheKey] = conn;
  return conn;
};
export { getTenantConnection };
