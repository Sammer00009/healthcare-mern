# CareLine — Healthcare Appointment Booking (MERN)

A full-stack healthcare booking site: patients enter their name, phone, and
city, pick what kind of help they need, see general (non-prescriptive)
self-care information while they wait, and book an appointment date/time.
A "Front desk" view lets staff see all bookings and update status.

## Stack
- **Frontend:** React + Vite (plain CSS, no extra UI framework)
- **Backend:** Node.js + Express
- **Database:** MongoDB (via Mongoose)

## Project structure
```
healthcare-mern/
  backend/
    config/        # db connection + static care-info content
    models/         # Mongoose schema
    routes/         # /api/appointments, /api/care-info
    server.js
  frontend/
    src/
      api/          # fetch wrapper for the backend
      components/   # BookingForm, AppointmentList, PulseProgress, CareInfoCard
      App.jsx
```

## 1. Set up MongoDB
Either install MongoDB locally, or create a free cluster on MongoDB Atlas
and copy its connection string.

## 2. Run the backend
```bash
cd backend
npm install
cp .env.example .env      # then edit MONGO_URI if needed
npm run dev                # starts on http://localhost:5000
```

## 3. Run the frontend
```bash
cd frontend
npm install
npm run dev                # starts on http://localhost:5173
```

Open http://localhost:5173 in your browser.

## API overview
| Method | Endpoint                     | Purpose                              |
|--------|-------------------------------|---------------------------------------|
| GET    | /api/appointments/meta        | Get category list + time slots        |
| POST   | /api/appointments              | Create a booking                      |
| GET    | /api/appointments              | List all bookings (filter by ?status=, ?city=) |
| GET    | /api/appointments/:id          | Get one booking                       |
| PATCH  | /api/appointments/:id          | Update status / notes / reschedule    |
| DELETE | /api/appointments/:id          | Delete a booking                      |
| GET    | /api/care-info                 | All general self-care tips            |
| GET    | /api/care-info/:category       | Tips for one category                 |

## Important note on the "medicine" feature
You mentioned wanting to "show medicine for temporary time." I deliberately
did **not** build a feature that recommends specific medicines or dosages
based on symptoms — matching a patient's symptoms to a drug and dose is
medical practice, and getting it wrong can be dangerous, so it isn't
something safe to automate without a licensed clinician in the loop.

Instead, each category shows general, non-prescriptive self-care tips
(rest, hydration, when to seek emergency care) plus a clear disclaimer,
and steers the patient toward booking the appointment for a real
evaluation. If you want to go further — e.g. letting your actual doctors
attach specific advice or prescriptions to a booking after reviewing it —
that's easy to add on top of this (a `doctorNotes` field already exists
on each appointment for exactly that), and I'm happy to build it out.

## Next steps you may want
- Add authentication (e.g. JWT) so the "Front desk" view is staff-only
- Send SMS/email confirmations when a booking is created or confirmed
- Add doctor/staff accounts and let them attach notes or prescriptions
  to a completed appointment
- Deploy: frontend to Vercel/Netlify, backend to Render/Railway, database
  to MongoDB Atlas
