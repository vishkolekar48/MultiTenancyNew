import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const tenantConnections = {};
const dbConnectionObj = {}
const getTenantConnection = async (url, tenantDbName) => {
  const tenantDbUrl = url;
  const dbName = tenantDbName;

  if (!tenantDbUrl || !dbName) {
    throw new Error('Missing tenant DB URL or tenant DB name');
  }

  const cacheKey = dbName;

  if (tenantConnections[cacheKey]) {
    console.log(`Already connected to tenant DB: ${dbName}`);
    return tenantConnections[cacheKey];
  }

  try {
    const conn = mongoose.createConnection(tenantDbUrl, { dbName });

    // Wait for connection to open before accessing `conn.db`
    await new Promise((resolve, reject) => {
      conn.once('open', resolve);
      conn.once('error', reject);
    });

    // Now `conn.db` is defined
    const collections = await conn.db.listCollections().toArray();
    console.log(`Collections in ${dbName}:`, collections.map(c => c.name));
    console.log(tenantConnections)  //--------------------------------------------
    tenantConnections[cacheKey] = conn;
    dbConnectionObj['db'] = conn;
     console.log(tenantConnections)  //--------------------------------------------

    return conn;
  } catch (error) {
    console.error(`Failed to connect to tenant DB: ${dbName}. Error: ${error.message}`);
    throw error;
  }
};

export { getTenantConnection , tenantConnections,dbConnectionObj};
