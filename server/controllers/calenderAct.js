const CalenderAct = require("../models/CalenderAcv");

exports.getAct = async (req, res, next) => {
  const customerId = req.params.customerId;
  const fetchedAct = await CalenderAct.find({ customerId: customerId });
  try {
    res.status(200).json({
      message: "Fetched act successfully.",
      act: fetchedAct,
      status: 200,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
