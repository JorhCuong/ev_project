import Vehicle from "../models/vehicle.js";
import Reminder from "../models/remider.js"; 

//  Lấy tất cả xe
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ include: Reminder });
    return res.status(200).json(vehicles);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//  Lấy xe theo ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id, { include: Reminder });
    if (!vehicle)
      return res.status(404).json({ message: "Không tìm thấy xe" });
    return res.status(200).json(vehicle);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Tạo xe mới
export const createVehicle = async (req, res) => {
  try {
    const { licensePlate, model, brand, year, customerId } = req.body;

    const newVehicle = await Vehicle.create({
      licensePlate,
      model,
      brand,
      year,
      customerId,
    });

    return res.status(201).json({
      message: "Tạo xe thành công",
      data: newVehicle,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//  Cập nhật xe
export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle)
      return res.status(404).json({ message: "Không tìm thấy xe" });

    await vehicle.update(req.body);
    return res.status(200).json({
      message: "Cập nhật xe thành công",
      data: vehicle,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//  Xóa xe
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle)
      return res.status(404).json({ message: "Không tìm thấy xe" });

    await vehicle.destroy();
    return res.status(200).json({ message: "Xóa xe thành công" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//  Thêm nhắc nhở bảo dưỡng
export const addReminder = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { type, dueDate, message } = req.body;

    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle)
      return res.status(404).json({ message: "Không tìm thấy xe" });

    const reminder = await Reminder.create({
      vehicleId,
      type,
      dueDate,
      message,
    });

    return res.status(201).json({
      message: "Tạo nhắc nhở thành công",
      data: reminder,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//  Lấy danh sách nhắc nhở theo xe
export const getReminders = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const reminders = await Reminder.findAll({ where: { vehicleId } });
    return res.status(200).json(reminders);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
