import express from "express";
import { createLog, getLogsByWebsiteId, getLatestLogByWebsiteId, deleteLog } from "../controllers/monitorigLog.controller";
import { verifyToken } from "../middleware/auth.middleware";

const logsrouter = express.Router();

logsrouter.post("/logs", verifyToken,createLog);
logsrouter.get("/logs/:websiteId",verifyToken, getLogsByWebsiteId);
logsrouter.get("/logs/latest/:websiteId", verifyToken,getLatestLogByWebsiteId);
logsrouter.delete("/logs/:logId", verifyToken,deleteLog);

export default logsrouter;
