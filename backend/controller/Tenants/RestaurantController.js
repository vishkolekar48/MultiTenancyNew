// controllers/RestaurantController.js
const {Tenants} = require('../../model/MasterTable');
const { getTenantConnection } = require('../../utils/TenantsDb');

exports.addMenu = async (req, res) => {
  try {
    const { tenantId, itemName, price, category } = req.body;

    if (!tenantId || !itemName || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Step 1: Get tenant info
    const tenant = await Tenants.findOne({ tenantId });
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    // Step 2: Get tenant DB connection + models
    const tenantDb = await getTenantConnection(tenant.dbUrl, tenant.dbName);
    const { Menu } = tenantDb.models;

    // Step 3: Save new menu item
    const newMenu = new Menu({ itemName, price, category });
    await newMenu.save();

    res.status(201).json({
      message: 'Menu item added successfully',
      data: newMenu
    });
  } catch (error) {
    console.error('Add menu error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
