import mongoose, { Schema } from "mongoose";

const LoginSchema = new Schema(
  {
    userName: {type: String,required: true,unique: true,lowercase: true,},
    email: {type: String, lowercase: true,},
    password: {type: String,},
    mobileNo: {type: String,},
    tenant_id: {type: mongoose.Schema.Types.ObjectId,ref: "Tenants",},
    restaurant_id: {type: mongoose.Schema.Types.ObjectId,ref: "Restaurants",},
    // role_id: {type: mongoose.Schema.Types.ObjectId,ref: "Roles",},
  },
  { timestamps: true } 
);

const TenantsSchema = new Schema(
  { 
    login_id: {type: mongoose.Schema.Types.ObjectId,ref: "Login",required: true,},
    restaurant_id: {type: mongoose.Schema.Types.ObjectId,ref: "Restaurants",required: true,},
    dbName: { type: String, required: true },
    dbUrl: { type: String, required: false },
    active: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Login" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Login" },
  },
  {
timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);
const RestaurantsSchema = new Schema(
  {
    name: {type: String,required: true,},
    email: {type: String,required: true,lowercase: true,unique: true,},
    mobileNo: {type: String,required: true},
    address: {type: String,required: true,},
    active: {type: Boolean,default: true,},
    createdBy: {type: mongoose.Schema.Types.ObjectId,ref: "Login",},
    updatedBy: {type: mongoose.Schema.Types.ObjectId,ref: "Login",},
  },
  { timestamps: true }
);
const ClientsSchema = new Schema(
  {
    name: { type: String, required: true, trim: true},
    email: { type: String,required: true,unique: true,lowercase: true,},
    password: {type: String,required: true,},
    mobileNo: {type: String,required: true,},
    userName: {type: String,required: true,},
    login_id: {type: mongoose.Schema.Types.ObjectId,ref: "Login",},
    isActive: {type: Boolean,default: true,},
    createdBy: {type: mongoose.Schema.Types.ObjectId,ref: "Login",},
    updatedBy: {type: mongoose.Schema.Types.ObjectId,ref: "Login",},
  },
  { timestamps: true }
);
const NavigationBarSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      enum: ["Booking","Restaurant","Menu","Reviews","User","Client","Customer","Master",],},
    routePath: {type: String,required: true,},
    icon: {type: String,},
    order: {type: Number,},
    active: {type: Boolean,default: true,},
    createdBy: {type: String,required: true,},
    updatedBy: {type: String,},
  },
  {
    timestamps: true,
  }
);

const UserNavigationBarSchema = new Schema(
  {
    login_id: {type: mongoose.Schema.Types.ObjectId,ref: "Login",required: true},
    navigationbar_id: {type: mongoose.Schema.Types.ObjectId, ref:"NavigationBar", required:true },
    createdBy: {type: mongoose.Schema.Types.ObjectId,ref:'Login' },
    updatedBy: {type: mongoose.Schema.Types.ObjectId,ref: "Login",}
  },
  { timestamps: true }
);
const RolesSchema = new Schema(
  {
    name: { type: String,required: true, unique: true,},
    createdBy: {type: mongoose.Schema.Types.ObjectId,ref:'Login' },
    updatedBy: {type: mongoose.Schema.Types.ObjectId,ref: "Login",},
    createdAt: {type: Date },
    updatedAt: { type: Date,},
  },
  {
    timestamps: true,
  }
);

const Login = mongoose.model("Login", LoginSchema);
const Tenants = mongoose.model("Tenants", TenantsSchema);
const Restaurants = mongoose.model("Restaurants", RestaurantsSchema);
const Clients = mongoose.model("Clients", ClientsSchema);
const NavigationBar = mongoose.model("NavigationBar", NavigationBarSchema);
const UserNavigationBar = mongoose.model("UserNavigationBar",UserNavigationBarSchema);
const Roles = mongoose.model("Roles", RolesSchema);

export {Login,Tenants,Restaurants,Clients,NavigationBar,UserNavigationBar,Roles,};
