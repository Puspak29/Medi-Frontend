import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import AppointmentCard from "../../components/AppointmentCard";
import Search from "../../components/Search";
import TimeSlot from "../../components/TimeSlot";
import API_URL from "../../config/apiUrl";

type ResultType = {
  _id: string;
  name: string;
  specialization: string;
};

type AppointmentByUser = {
  _id: string;
  date: string;
  slot: string;
  doctor: {
    name: string;
    email: string;
  };
};

export default function Appointment() {
  const [appointments, setAppointments] = useState<AppointmentByUser[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<ResultType | null>(null);

  useEffect(() => {
    // Load dummy data
    async function fetchAppointments() {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch(`${API_URL}/user/appointments`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      // console.log("Fetched appointments:", data);
      setAppointments(data.appointments);
    }
    fetchAppointments();
  }, []);

  const groupedByDate: Record<string, AppointmentByUser[]> = {};
  if(appointments && appointments.length > 0){
      appointments.forEach((appt) => {
      const dateKey = new Date(appt.date).toISOString().split("T")[0];
      if (!groupedByDate[dateKey]) groupedByDate[dateKey] = [];
      groupedByDate[dateKey].push(appt);
    });
  }
  const dateKeys = Object.keys(groupedByDate);

  const formatDate = (dateStr: Date | string) => {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();

    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen mt-20 w-full px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Your Appointments</h1>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            <HiPlus className="text-xl" />
            Book Appointment
          </button>
        </div>

        {/* APPOINTMENT LIST */}
        {dateKeys.length === 0 && <div className="text-gray-500 text-center mt-10">No booked appointments.</div>}

        <div className="space-y-10">
          {dateKeys.map((dateKey) => (
            <div key={dateKey}>
              <h2 className="text-lg font-semibold mb-3 text-gray-700">{formatDate(dateKey)}</h2>
              <div className="space-y-4">
                {groupedByDate[dateKey].map((appointment) => (
                  <AppointmentCard key={appointment._id} appointment={appointment} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH POPUP */}
      {isSearchOpen && (
        <Search
          setSelectedDoctor={(doctor) => {
            setSelectedDoctor(doctor); // Save selected doctor
            setIsSearchOpen(false);    // Close search popup
          }}
          onClose={() => setIsSearchOpen(false)}
        />
      )}

      {/* TIME SLOT POPUP */}
      {selectedDoctor && (
        <TimeSlot
          doctorId={selectedDoctor._id}
          doctorName={selectedDoctor.name}
          setIsClicked={(val) => {
            if (!val) setSelectedDoctor(null); // Close popup
          }}
        />
      )}
    </div>
  );
}
