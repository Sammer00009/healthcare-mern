const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const { careInfo, disclaimer } = require("../config/careInfo");

// GET /api/appointments/meta -> categories & time slots for the booking form
router.get("/meta", (req, res) => {
  res.json({
    careCategories: Appointment.CARE_CATEGORIES,
    timeSlots: Appointment.TIME_SLOTS,
  });
});

// GET /api/appointments -> list all (supports ?status= & ?city= filters)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.city) filter.city = new RegExp(req.query.city, "i");

    const appointments = await Appointment.find(filter).sort({
      preferredDate: 1,
      createdAt: -1,
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch appointments", error: err.message });
  }
});

// GET /api/appointments/:id -> single appointment
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ message: "Invalid appointment id" });
  }
});

// POST /api/appointments -> create a new booking
router.post("/", async (req, res) => {
  try {
    const { patientName, phone, city, careCategory, symptoms, preferredDate, timeSlot } = req.body;

    if (!patientName || !phone || !city || !careCategory || !preferredDate || !timeSlot) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    const chosenDate = new Date(preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosenDate < today) {
      return res.status(400).json({ message: "Preferred date cannot be in the past." });
    }

    const appointment = await Appointment.create({
      patientName,
      phone,
      city,
      careCategory,
      symptoms,
      preferredDate: chosenDate,
      timeSlot,
    });

    const info = careInfo[careCategory] || careInfo["Other"];

    res.status(201).json({
      appointment,
      generalCareInfo: info,
      disclaimer,
      message: "Appointment request received. Our team will confirm shortly.",
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: Object.values(err.errors)[0].message });
    }
    res.status(500).json({ message: "Failed to create appointment", error: err.message });
  }
});

// PATCH /api/appointments/:id -> update status / doctor notes / reschedule
router.patch("/:id", async (req, res) => {
  try {
    const allowedUpdates = ["status", "doctorNotes", "preferredDate", "timeSlot"];
    const updates = {};
    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const appointment = await Appointment.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ message: "Failed to update appointment", error: err.message });
  }
});

// DELETE /api/appointments/:id -> cancel/remove a booking
router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(400).json({ message: "Invalid appointment id" });
  }
});

module.exports = router;
