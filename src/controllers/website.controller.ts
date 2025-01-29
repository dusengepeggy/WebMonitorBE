import { Request, Response } from "express";
import MonitoredWebsiteService from "../repository/website";


export const createService = async (req: Request, res: Response) => {
    try {
        const { userId, name, url }: { userId: string; name: string; url: string } = req.body;
        const newService = await MonitoredWebsiteService.createWebsite(userId, name, url);
        return res.status(201).json({
            message: "Service created successfully",
            service: newService,
        });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};


export const getServiceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const service = await MonitoredWebsiteService.getWebsiteById(id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        return res.status(200).json({ service });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};


export const getServicesByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const services = await MonitoredWebsiteService.getWebsitesByUserId(userId);
        return res.status(200).json({ services });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};


export const updateService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, url, status }: { name: string; url: string; status: string } = req.body;
        const updatedService = await MonitoredWebsiteService.updateWebsite(id, name , url, status);
        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }
        return res.status(200).json({
            message: "Service updated successfully",
            service: updatedService,
        });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};


export const deleteService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await MonitoredWebsiteService.deleteWebsite(id);
        if (!deleted) {
            return res.status(404).json({ message: "Service not found" });
        }
        return res.status(200).json({ message: "Service deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
