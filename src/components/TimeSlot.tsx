import { useEffect, useState } from "react";
import { bookAppointmentService, getAppointmentsByUser } from "../services/userServices";
import { toast } from "react-toastify";

type SlotType = {
  capacity: number;
  booked: number;
  disabled: boolean;
};

type SlotsObject = {
  slot1: SlotType;
  slot2: SlotType;
  slot3: SlotType;
  slot4: SlotType;
};

type AppointmentType = {
  _id: string;
  date: string;
  slots: SlotsObject;
};

type Props = {
  doctorId: string;
  doctorName: string;
  setIsClicked: (val: boolean) => void;
};

function TimeSlot({ doctorId, doctorName, setIsClicked }: Props) {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<{ appointmentId: string; dateId: string; slotKey: string } | null>(null);

  useEffect(() => {
    if (!doctorId) return;

    const fetchAppointments = async () => {
      try {
        const res = await getAppointmentsByUser(doctorId);
        setAppointments(res.appointments || []);
      } catch (err) {
        toast.error("Failed to fetch appointments.");
      }
    };

    fetchAppointments();
  }, [doctorId]);

  async function bookAppointment(){
    try{
      if (!selectedSlot) return;

      console.log("Booking slot:", selectedSlot);
      const res = await bookAppointmentService(selectedSlot.appointmentId, selectedSlot.slotKey);
      if(!res.success){
        toast.error(res.message || "Failed to book appointment.");
        return;
      }
      setIsClicked(false);
      toast.success(res.message);
    }
    catch(err){
      toast.error("Failed to book appointment.");
    }
  }

  const getColor = (s: SlotType, dateId: string, slotKey: string) => {
    if (s.disabled || s.booked >= s.capacity) return "bg-gray-400 cursor-not-allowed"; // full or disabled
    if (selectedSlot?.dateId === dateId && selectedSlot?.slotKey === slotKey) return "bg-green-500"; // selected
    return "bg-blue-500 hover:bg-blue-600"; // available
  };

  const setTime = (slotKey: string) => {
    const timeMap: { [key: string]: string } = {
      slot1: "09:00 AM - 12:00 PM",
      slot2: "12:00 PM - 03:00 PM",
      slot3: "03:00 PM - 06:00 PM",
      slot4: "06:00 PM - 09:00 PM",
    };
    return timeMap[slotKey] || "Unknown Time";
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-50 p-4 pt-12">
      {/* MODAL */}
      <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-lg md:max-w-2xl lg:max-w-5xl max-h-[80vh] overflow-y-auto p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Select Time Slot</h2>
          <button
            onClick={() => setIsClicked(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-700 font-medium mb-4">
          Doctor: {doctorName}
        </p>

        {/* SLOTS */}
        <div className="space-y-6">
          {appointments.length === 0 && (
            <p className="text-center text-gray-500 py-4">No available slots.</p>
          )}
          {appointments.map((appointment) => (
            <div key={appointment._id} className="border rounded-xl p-4 shadow-sm">
              <p className="font-semibold text-gray-700 mb-3">
                {new Date(appointment.date).toLocaleDateString()}
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(appointment.slots)
                  .filter(([_, slot]) => !slot.disabled)
                  .map(([slotKey, slot]) => (
                    <div
                      key={slotKey}
                      onClick={() => {
                        if (slot.booked < slot.capacity)
                          setSelectedSlot({ appointmentId: appointment._id, dateId: appointment._id, slotKey });
                      }}
                      className={`p-4 text-white rounded cursor-pointer text-center ${getColor(
                        slot,
                        appointment._id,
                        slotKey
                      )}`}
                    >
                      <p className="font-medium">{setTime(slotKey)}</p>
                      <p className="text-sm">{slot.capacity - slot.booked} remaining</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={bookAppointment}
            disabled={!selectedSlot}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition-colors ${
              selectedSlot ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimeSlot;
