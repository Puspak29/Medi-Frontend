import { useState } from "react";
import Search from "../../components/Search";
import TimeSlot from "../../components/TimeSlot";

type ResultType = {
  _id: string;
  name: string;
  specialization: string;
}

function Appointment() {
    const [doctor, setDoctor] = useState<ResultType | null>(null);
  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-blue-50 to-cyan-100 p-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Appointment</h1>
      </div>

      <Search setSelectedDoctor={setDoctor} />

      {doctor && (
        <div>
          <h2 className="text-xl font-semibold mt-4">Choose time for: {doctor.name}</h2>
          <TimeSlot doctorId={doctor._id} />
        </div>
      )}
    </div>
    </div>
  )
}

export default Appointment
