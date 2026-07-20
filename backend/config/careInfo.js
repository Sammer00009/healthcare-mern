// General, non-prescriptive self-care information shown to patients while they
// wait for their appointment. This is intentionally generic (no drug names,
// no dosages, no personalized diagnosis) — it is educational only and always
// paired with a disclaimer telling the patient to consult the doctor.

const careInfo = {
  "General Checkup": {
    tips: [
      "Note down any symptoms, when they started, and how often they occur.",
      "List current medications or supplements you're taking, if any.",
      "Stay hydrated and get adequate rest before your visit.",
    ],
    seekHelpNow:
      "Seek emergency care immediately if you have chest pain, difficulty breathing, or sudden severe symptoms.",
  },
  "Cold, Cough & Fever": {
    tips: [
      "Rest and drink plenty of fluids such as water, soup, or warm water with honey.",
      "Use a humidifier or steam inhalation to ease congestion.",
      "Monitor your temperature and keep a simple log to share with the doctor.",
    ],
    seekHelpNow:
      "Seek emergency care immediately if fever is very high, breathing becomes difficult, or symptoms worsen rapidly.",
  },
  "Skin & Dermatology": {
    tips: [
      "Keep the affected area clean and dry, and avoid scratching.",
      "Avoid new soaps, lotions, or cosmetics until you've been seen.",
      "Take a photo of the affected area to show the doctor how it looked when it started.",
    ],
    seekHelpNow:
      "Seek emergency care immediately if you notice rapid swelling, difficulty breathing, or signs of a severe allergic reaction.",
  },
  "Digestive Issues": {
    tips: [
      "Stick to light, bland meals and stay hydrated with water or oral rehydration solutions.",
      "Avoid spicy, oily, or heavy foods until symptoms settle.",
      "Keep track of what you ate before symptoms started.",
    ],
    seekHelpNow:
      "Seek emergency care immediately for severe abdominal pain, persistent vomiting, or signs of dehydration.",
  },
  "Headache & Body Pain": {
    tips: [
      "Rest in a quiet, dimly lit room and stay hydrated.",
      "Note the location, intensity, and duration of the pain to describe to the doctor.",
      "Avoid strenuous activity until you've been evaluated.",
    ],
    seekHelpNow:
      "Seek emergency care immediately for a sudden, severe headache, confusion, or head injury.",
  },
  Allergy: {
    tips: [
      "Try to identify and avoid the possible trigger (food, dust, pollen, etc.).",
      "Keep the environment clean and well-ventilated.",
      "Note when the reaction started and what you were exposed to beforehand.",
    ],
    seekHelpNow:
      "Seek emergency care immediately for difficulty breathing, swelling of the face or throat, or dizziness.",
  },
  "Eye Care": {
    tips: [
      "Avoid rubbing the eyes and limit screen time until seen.",
      "Remove contact lenses if you wear them and switch to glasses temporarily.",
      "Note any discharge, redness, or vision changes to describe to the doctor.",
    ],
    seekHelpNow:
      "Seek emergency care immediately for sudden vision loss, severe eye pain, or a chemical injury to the eye.",
  },
  "Dental Care": {
    tips: [
      "Rinse gently with warm salt water to keep the area clean.",
      "Avoid very hot, cold, or hard foods on the affected side.",
      "Avoid over-the-counter pain relief you're not normally prescribed without asking a pharmacist first.",
    ],
    seekHelpNow:
      "Seek emergency care immediately for a knocked-out tooth, uncontrolled bleeding, or severe facial swelling.",
  },
  Other: {
    tips: [
      "Write down your main concern and how long you've had it.",
      "Bring any relevant reports or previous prescriptions to your appointment.",
      "Stay hydrated and rested before your visit.",
    ],
    seekHelpNow:
      "Seek emergency care immediately if you feel your condition is severe or rapidly worsening.",
  },
};

const disclaimer =
  "This information is general and educational only. It is not a diagnosis or a prescription, and it does not replace advice from a qualified doctor. Please book an appointment for a proper evaluation, especially if symptoms are severe or persistent.";

module.exports = { careInfo, disclaimer };
