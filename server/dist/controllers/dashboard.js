"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharts = exports.getDashboard = void 0;
const DashboardServices_1 = require("../services/DashboardServices");
const getDashboard = async (req, res, next) => {
    try {
        const dashboard = await new DashboardServices_1.DashboardServices().getDashboard(req);
        res.status(200).json(dashboard);
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.getDashboard = getDashboard;
const getCharts = async (req, res, next) => {
    try {
        const dashboard = await new DashboardServices_1.DashboardServices().getCharts(req);
        res.status(200).json({
            chartsData: dashboard,
            message: "Charts fetched successfully",
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.getCharts = getCharts;
//# sourceMappingURL=dashboard.js.map