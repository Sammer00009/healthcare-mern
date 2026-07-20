import { useState } from "react";
import BookingForm from "./components/BookingForm";
import AppointmentList from "./components/AppointmentList";

export default function App() {
  const [view, setView] = useState("book");

  return (
    <div className="app-shell">
      <header className="header">
        <div className="brand">
          <svg className="brand-mark" viewBox="0 0 34 34">
            <circle cx="17" cy="17" r="16" fill="#114b5f" />
            <path d="M9 17h4l2-6 4 12 2-6h4" fill="none" stroke="#d9a441" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h1>Care<span>Line</span></h1>
        </div>

        <div className="tabs">
          <button className={`tab ${view === "book" ? "active" : ""}`} onClick={() => setView("book")}>
            Book a visit
          </button>
          <button className={`tab ${view === "desk" ? "active" : ""}`} onClick={() => setView("desk")}>
            Front desk
          </button>
        </div>
      </header>

      {view === "book" ? <BookingForm /> : <AppointmentList />}
    </div>
  );
}
