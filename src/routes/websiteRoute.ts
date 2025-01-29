import express from "express";
import {
  createService,
  getServiceById,
  getServicesByUserId,
  updateService,
  deleteService,
} from "../controllers/website.controller";
import { verifyToken } from "../middleware/auth.middleware";

const websiterouter = express.Router();


websiterouter.post("/new",verifyToken, createService);
websiterouter.get("/website/:id",verifyToken, getServiceById);
websiterouter.get("/users/:userId/websites",verifyToken, getServicesByUserId);
websiterouter.put("/websites/:id", verifyToken,updateService);
websiterouter.delete("/websites/:id",verifyToken, deleteService);

export default websiterouter;
