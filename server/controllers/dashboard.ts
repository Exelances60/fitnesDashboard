import { NextFunction, Request, Response } from "express";
import { DashboardServices } from "../services/DashboardServices";

export const getDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboard = await new DashboardServices().getDashboard(req);
    res.status(200).json(dashboard);
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getCharts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboard = await new DashboardServices().getCharts(req);

    res.status(200).json({
      chartsData: dashboard,
      message: "Charts fetched successfully",
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
