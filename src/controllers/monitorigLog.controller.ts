import { Request, Response } from "express";
import MonitoringLogService from "../repository/monitoringLogs";


export async function createLog(req: Request, res: Response) {
  try {
    const { websiteId, status } = req.body;
    if (!websiteId || !status) {
      return res.status(400).json({ error: "Website ID and status are required." });
    }

    const log = await MonitoringLogService.createMonitoringLog(websiteId, status);
    return res.status(201).json({ message: "Monitoring log created successfully", log });
  } catch (error) {
    console.error("Error creating monitoring log:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function getLogsByWebsiteId(req: Request, res: Response) {
  try {
    const { websiteId } = req.params;
    if (!websiteId) {
      return res.status(400).json({ error: "Website ID is required." });
    }

    const logs = await MonitoringLogService.getMonitoringLogsByWebsiteId(websiteId);
    return res.status(200).json({ logs });
  } catch (error) {
    console.error("Error fetching monitoring logs:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function getLatestLogByWebsiteId(req: Request, res: Response) {
  try {
    const { websiteId } = req.params;
    if (!websiteId) {
      return res.status(400).json({ error: "Website ID is required." });
    }

    const latestLog = await MonitoringLogService.getLatestMonitoringLogByWebsiteId(websiteId);
    if (!latestLog) {
      return res.status(404).json({ error: "No logs found for this website." });
    }

    return res.status(200).json({ latestLog });
  } catch (error) {
    console.error("Error fetching latest monitoring log:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function deleteLog(req: Request, res: Response) {
  try {
    const { logId } = req.params;
    if (!logId) {
      return res.status(400).json({ error: "Log ID is required." });
    }

    await MonitoringLogService.deleteMonitoringLog(logId);
    return res.status(200).json({ message: "Monitoring log deleted successfully." });
  } catch (error) {
    console.error("Error deleting monitoring log:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
