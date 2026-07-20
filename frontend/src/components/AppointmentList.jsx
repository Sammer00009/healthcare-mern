import { useEffect, useState } from "react";
import { api } from "../api/client";

const STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"];

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .listAppointments(statusFilter ? { status: statusFilter } : {})
      .then(setAppointments)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [statusFilter]);

  const changeStatus = async (id, status) => {
    try {
      await api.updateAppointment(id, { status });
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this appointment?")) return;
    try {
      await api.deleteAppointment(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>Front desk — all appointments</h2>
      <p className="card-subtitle">Review bookings, confirm slots, and update patient status.</p>

      {error && <div className="error-banner">{error}</div>}

      <div className="list-toolbar">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button className="btn btn-ghost" onClick={load}>Refresh</button>
      </div>

      {loading && <p className="card-subtitle">Loading…</p>}

      {!loading && appointments.length === 0 && (
        <div className="empty-state">No appointments yet.</div>
      )}

      {appointments.map((a) => (
        <div className="appt-row" key={a._id}>
          <div>
            <div className="name">{a.patientName}</div>
            <div className="muted">{a.city} · {a.phone}</div>
          </div>
          <div>
            <div>{a.careCategory}</div>
            <div className="muted">{a.symptoms || "No symptoms noted"}</div>
          </div>
          <div>
            <div>{new Date(a.preferredDate).toLocaleDateString()}</div>
            <div className="muted">{a.timeSlot}</div>
          </div>
          <div>
            <span className={`status-badge status-${a.status}`}>{a.status}</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <select value={a.status} onChange={(e) => changeStatus(a._id, e.target.value)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button className="btn btn-ghost" onClick={() => remove(a._id)}>✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}
