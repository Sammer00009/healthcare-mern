const mongoose = require("mongoose");

const CARE_CATEGORIES = [
  "General Checkup",
  "Cold, Cough & Fever",
  "Skin & Dermatology",
  "Digestive Issues",
  "Headache & Body Pain",
  "Allergy",
  "Eye Care",
  "Dental Care",
  "Other",
];

const TIME_SLOTS = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
];

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true, trim: true },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9+\-\s]{7,15}$/, "Please enter a valid phone number"],
    },
    city: { type: String, required: true, trim: true },
    careCategory: { type: String, required: true, enum: CARE_CATEGORIES },
    symptoms: { type: String, trim: true, maxlength: 1000 },
    preferredDate: { type: Date, required: true },
    timeSlot: { type: String, required: true, enum: TIME_SLOTS },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
    doctorNotes: { type: String, trim: true, maxlength: 1000 },
  },
  { timestamps: true }
);

appointmentSchema.statics.CARE_CATEGORIES = CARE_CATEGORIES;
appointmentSchema.statics.TIME_SLOTS = TIME_SLOTS;

module.exports = mongoose.model("Appointment", appointmentSchema);
