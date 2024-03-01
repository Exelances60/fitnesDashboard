const CalenderAct = require("../models/CalenderAcv");
const Customer = require("../models/Customer");

exports.deleteAct = async (req, res, next) => {
  const actId = req.params.actId;
  try {
    const act = await CalenderAct.findById(actId);
    if (!act) {
      const error = new Error("Could not find act.");
      error.statusCode = 404;
      throw error;
    }
    await CalenderAct.findByIdAndDelete(actId);
    const fetchedUser = await Customer.findById(act.customerId);
    fetchedUser.calendarAcv.pull(actId);
    await fetchedUser.save();
    res.status(200).json({ message: "Deleted act.", status: 200 });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
