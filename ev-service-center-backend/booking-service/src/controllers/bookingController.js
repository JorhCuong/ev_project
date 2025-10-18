import Appointment from "../models/appointment.js";
import ServiceCenter from "../models/serviceCenter.js";

/**
 * @desc Lấy tất cả lịch hẹn (appointments)
 * @route GET /api/appointments
 */
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [{ model: ServiceCenter, as: "serviceCenter" }],
    });
    res.status(200).json(appointments);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách lịch hẹn:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Lấy thông tin một lịch hẹn theo ID
 * @route GET /api/appointments/:id
 */
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [{ model: ServiceCenter, as: "serviceCenter" }],
    });

    if (!appointment)
      return res.status(404).json({ message: "Không tìm thấy lịch hẹn" });

    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Tạo lịch hẹn mới
 * @route POST /api/appointments
 */
export const createAppointment = async (req, res) => {
  try {
    const { customerId, serviceCenterId, vehicleId, date, time, status } =
      req.body;

    if (!customerId || !serviceCenterId || !vehicleId || !date || !time) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin bắt buộc để tạo lịch hẹn" });
    }

    const newAppointment = await Appointment.create({
      customerId,
      serviceCenterId,
      vehicleId,
      date,
      time,
      status: status || "pending",
    });

    res
      .status(201)
      .json({ message: "Tạo lịch hẹn thành công", appointment: newAppointment });
  } catch (err) {
    console.error("❌ Lỗi tạo lịch hẹn:", err);
    res.status(400).json({ message: err.message });
  }
};

/**
 * @desc Cập nhật lịch hẹn
 * @route PUT /api/appointments/:id
 */
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Không tìm thấy lịch hẹn" });

    await appointment.update(req.body);
    res.status(200).json({ message: "Cập nhật thành công", appointment });
  } catch (err) {
    console.error("❌ Lỗi cập nhật lịch hẹn:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Xóa lịch hẹn
 * @route DELETE /api/appointments/:id
 */
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Không tìm thấy lịch hẹn" });

    await appointment.destroy();
    res.status(200).json({ message: "Xóa lịch hẹn thành công" });
  } catch (err) {
    console.error("❌ Lỗi xóa lịch hẹn:", err);
    res.status(500).json({ message: err.message });
  }
};
