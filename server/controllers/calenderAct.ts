import { Request, Response, NextFunction } from "express";
import CalenderAct from "../models/CalenderAcv";
import Customer from "../models/Customer";
import throwBadRequestError from "../utils/err/throwBadRequestError";

export const deleteAct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const actId = req.params.actId;
  try {
    const act = await CalenderAct.findById(actId);
    if (!act) {
      const error = new Error("Could not find act.") as any;
      error.statusCode = 404;
      throw error;
    }
    await CalenderAct.findByIdAndDelete(actId);
    const fetchedUser = await Customer.findById(act.customerId);
    if (!fetchedUser) {
      return throwBadRequestError("Could not find user");
    }
    fetchedUser.calendarAcv.filter((act) => act.toString() !== actId);
    await fetchedUser.save();
    res.status(200).json({ message: "Deleted act.", status: 200 });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
