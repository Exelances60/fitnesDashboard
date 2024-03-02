const Employee = require("../models/Employees");
exports.createEmployee = async (req, res) => {
  const profilePicture = req.files
    .filter((file) => {
      if (file.fieldname === "profilePicture") {
        file.path.replace(/\\/g, "/");
        return file.path;
      }
    })
    .map((file) => file.path);

  const documents = req.files
    .filter((file) => {
      if (file.fieldname === "documents") {
        return file.path.replace(/\\/g, "/");
      }
    })
    .map((file) => file.path);

  const employee = new Employee({
    ...req.body,
    profilePicture: profilePicture[0],
    documents: documents,
  });
  try {
    const savedEmployee = await employee.save();
    res
      .status(201)
      .json({ message: "Employee created successfully", savedEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  const ownerId = req.params.ownerId;
  try {
    const employees = await Employee.find({ ownerId: ownerId });
    res.status(200).json({ employees: employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
