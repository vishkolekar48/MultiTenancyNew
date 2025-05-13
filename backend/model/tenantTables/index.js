// models/tenant/index.js
import { getMenuModel } from './Restaurant.js';

export default function registerTenantModels(conn) {
  return {
    Menu: getMenuModel(conn),
    // Order: getOrderModel(conn),
    // Add more models here as needed
  };
}
