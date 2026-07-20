import { useEffect, useState } from "react";
import { api } from "../api/client";
import PulseProgress from "./PulseProgress";
import CareInfoCard from "./CareInfoCard";

const STEP_LABELS = ["Your details", "Your need", "Date & time", "Confirmed"];

const emptyForm = {
  patientName: "",
  phone: "",
  city: "",
  careCategory: "",
  symptoms: "",
  preferredDate: "",
  timeSlot: "",
};

export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [meta, setMeta] = useState({ careCategories: [], timeSlots: [] });
  const [careInfo, setCareInfo] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getMeta().then(setMeta).catch(() => setError("Could not reach the server. Is the backend running?"));
  }, []);

  useEffect(() => {
    if (form.careCategory) {
      api.getCareInfo(form.careCategory).then(setCareInfo).catch(() => setCareInfo(null));
    }
  }, [form.careCategory]);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const todayISO = new Date().toISOString().split("T")[0];

  const canContinueStep0 = form.patientName.trim() && form.phone.trim() && form.city.trim();
  const canContinueStep1 = form.careCategory;
  const canSubmitStep2 = form.preferredDate && form.timeSlot;

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.createAppointment(form);
      setResult(data);
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startOver = () => {
    setForm(emptyForm);
    setCareInfo(null);
    setResult(null);
    setError("");
    setStep(0);
  };

  return (
    <div className="card">
      <PulseProgress step={step} steps={STEP_LABELS} />
      {error && <div className="error-banner">{error}</div>}

      {step === 0 && (
        <>
          <h2>Tell us about you</h2>
          <p className="card-subtitle">We'll use this to reach you about your appointment.</p>

          <div className="field">
            <label>Full name</label>
            <input value={form.patientName} onChange={update("patientName")} placeholder="e.g. Priya Sharma" />
          </div>
          <div className="grid-2">
            <div className="field">
              <label>Phone number</label>
              <input value={form.phone} onChange={update("phone")} placeholder="e.g. 98765 43210" />
            </div>
            <div className="field">
              <label>City of residence</label>
              <input value={form.city} onChange={update("city")} placeholder="e.g. Noida" />
            </div>
          </div>

          <div className="btn-row">
            <span />
            <button className="btn btn-primary" disabled={!canContinueStep0} onClick={() => setStep(1)}>
              Continue
            </button>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h2>What do you need help with?</h2>
          <p className="card-subtitle">Choose the option that best matches your concern.</p>

          <div className="category-grid">
            {meta.careCategories.map((cat) => (
              <button
                key={cat}
                className={`category-chip ${form.careCategory === cat ? "selected" : ""}`}
                onClick={() => setForm({ ...form, careCategory: cat })}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="field" style={{ marginTop: 16 }}>
            <label>Describe your symptoms (optional)</label>
            <textarea
              value={form.symptoms}
              onChange={update("symptoms")}
              placeholder="e.g. sore throat and mild fever since yesterday"
            />
          </div>

          {careInfo && (
            <CareInfoCard category={form.careCategory} info={careInfo} disclaimer={careInfo.disclaimer} />
          )}

          <div className="btn-row">
            <button className="btn btn-ghost" onClick={() => setStep(0)}>
              Back
            </button>
            <button className="btn btn-primary" disabled={!canContinueStep1} onClick={() => setStep(2)}>
              Continue
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Pick a date and time</h2>
          <p className="card-subtitle">Choose what works best for you — we'll confirm shortly after booking.</p>

          <div className="field">
            <label>Preferred date</label>
            <input type="date" min={todayISO} value={form.preferredDate} onChange={update("preferredDate")} />
          </div>

          <div className="field">
            <label>Preferred time slot</label>
            <div className="slot-grid">
              {meta.timeSlots.map((slot) => (
                <button
                  key={slot}
                  className={`slot ${form.timeSlot === slot ? "selected" : ""}`}
                  onClick={() => setForm({ ...form, timeSlot: slot })}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="btn-row">
            <button className="btn btn-ghost" onClick={() => setStep(1)}>
              Back
            </button>
            <button className="btn btn-gold" disabled={!canSubmitStep2 || loading} onClick={handleSubmit}>
              {loading ? "Booking…" : "Confirm appointment"}
            </button>
          </div>
        </>
      )}

      {step === 3 && result && (
        <div className="confirmation">
          <svg className="check" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="27" fill="none" stroke="#7fb69b" strokeWidth="2" />
            <path d="M16 29l8 8 16-17" fill="none" stroke="#114b5f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h2>Appointment requested</h2>
          <p className="card-subtitle">{result.message}</p>

          <div style={{ textAlign: "left", marginTop: 20 }}>
            <div className="summary-row"><span>Patient</span><span>{result.appointment.patientName}</span></div>
            <div className="summary-row"><span>Phone</span><span>{result.appointment.phone}</span></div>
            <div className="summary-row"><span>City</span><span>{result.appointment.city}</span></div>
            <div className="summary-row"><span>Need</span><span>{result.appointment.careCategory}</span></div>
            <div className="summary-row">
              <span>Date</span>
              <span>{new Date(result.appointment.preferredDate).toLocaleDateString()}</span>
            </div>
            <div className="summary-row"><span>Time</span><span>{result.appointment.timeSlot}</span></div>
            <div className="summary-row"><span>Status</span><span>{result.appointment.status}</span></div>
          </div>

          <CareInfoCard
            category={result.appointment.careCategory}
            info={result.generalCareInfo}
            disclaimer={result.disclaimer}
          />

          <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={startOver}>
            Book another appointment
          </button>
        </div>
      )}
    </div>
  );
}
