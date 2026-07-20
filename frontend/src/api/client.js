const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function handle(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const api = {
  getMeta: () => fetch(`${BASE_URL}/appointments/meta`).then(handle),

  getCareInfo: (category) =>
    fetch(`${BASE_URL}/care-info/${encodeURIComponent(category)}`).then(handle),

  createAppointment: (payload) =>
    fetch(`${BASE_URL}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handle),

  listAppointments: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return fetch(`${BASE_URL}/appointments${qs ? `?${qs}` : ""}`).then(handle);
  },

  updateAppointment: (id, updates) =>
    fetch(`${BASE_URL}/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }).then(handle),

  deleteAppointment: (id) =>
    fetch(`${BASE_URL}/appointments/${id}`, { method: "DELETE" }).then(handle),
};
