// models/tenant/Menu.js
import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  itemName: String,
  price: Number,
  category: String,
});

export const getMenuModel = (conn) => conn.model('Menu', menuSchema);
