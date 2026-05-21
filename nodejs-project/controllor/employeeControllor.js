import Employee from "../model/Employee.js";
import HttpError from "../middleware/httpError.js";

const add = async (req, res, next) => {
  try {
    const { name, Id, email, dept, mobileNumber } = req.body;

    const employee = await new Employee({
      name,
      Id,
      email,
      dept,
      mobileNumber,
    });

    await employee.save();

    res.status(200).json({
      success: true,
      message: "employee added successfully",
      employee,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

//read data

const getAllEmployee = async (req, res, next) => {
  try {
    const getEmployee = await Employee.find({});

    if (!getEmployee) {
      return next(new HttpError("not found data", 404));
    }
    res.status(200).json({ success: true, message: "data found", getEmployee });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};
//get employee by id

const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employeeId = await Employee(id);

    if (!employeeId) {
      return next(new HttpError("no found data with this id", 404));
    }
    res.status(201).json({ success: true, message: "data found", getEmployee });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

//delete Employee data

const deleteEmployeeData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await Employee.findByIdAndDelete(id);

    if (!deleteEmployee) {
      return next(new HttpError("no found data with this id", 404));
    }
    res
      .status(201)
      .json({ success: true, message: "Employee data deleted successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

//delete all data

const deleteAllData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteAllEmp = await Employee.deleteMany({});

    if (!deleteAllEmp) {
      return next(new HttpError("no found data with this id", 404));
    }
    res.status(201).json({
      success: true,
      message: "Employee all data deleted successfully",
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

//update data

const updateEmployeeData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateEmp = await Employee.findById(id);

    if (!updateEmp) {
      return next(new HttpError("no found data with this id", 404));
    }

    const allowedFields = ["name", "email", "mobileNumber"];

    const update = {};
    if (req.body) {
      Object.keys(req.body).forEach((key) => {
        if (allowedFields.includes(key)) {
          update[key] = req.body[key];
        }
      });
    }

    const updateEmployee = await Employee.findByIdAndUpdate(id, update, {
      new: true,
    });

    res
      .status(200)
      .json({ success: true, message: "Employee data updated successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};
export default {
  add,
  getAllEmployee,
  getEmployeeById,
  deleteEmployeeData,
  deleteAllData,
  updateEmployeeData,
};
