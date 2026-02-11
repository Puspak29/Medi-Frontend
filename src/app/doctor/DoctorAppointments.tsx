import { useEffect, useState } from "react";
import { HiEye, HiPlus, HiEyeOff } from "react-icons/hi";
import { createAppointment, getAppointedUsers, getDoctorAppointments } from "../../services/doctorServices";
import { toast } from "react-toastify";
import SlotView from "../../components/SlotView";


export interface Slot {
  capacity: number;
  booked: number;
  disabled: boolean;
  users: any[];
}

export interface Slots {
  slot1: Slot;
  slot2: Slot;
  slot3: Slot;
  slot4: Slot;
}

export interface Appointment {
  _id: string;
  doctor: string;
  date: Date | string;
  slots: Slots;
}

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [slotUsers, setSlotUsers] = useState<any[]>([]);
  const [slotName, setSlotName] = useState<string>("");

  const [date, setDate] = useState<string>("");
  const [slots, setSlots] = useState<Slots>({
    slot1: { capacity: 10, booked: 0, disabled: false, users: [] },
    slot2: { capacity: 10, booked: 0, disabled: false, users: [] },
    slot3: { capacity: 10, booked: 0, disabled: false, users: [] },
    slot4: { capacity: 10, booked: 0, disabled: false, users: [] },
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      const data = await getDoctorAppointments();
      if (data.success && data.appointments) {
        setAppointments(sortAppointments(data.appointments));
        return;
      }
      toast.error(data.message || "Failed to fetch appointments");
    };

    fetchAppointments();
  }, []);

  const handleSlotChange = (slotKey: keyof Slots, field: "capacity" | "disabled", value: any) => {
    setSlots(prev => ({
      ...prev,
      [slotKey]: { ...prev[slotKey], [field]: value }
    }));
  };

  const handleCreateAppointment = async () => {
    try {
      if (!date) {
        toast.error("Please select a date for the appointment");
        return;
      }

      const newAppointment = {
        date,
        slots
      };
      // console.log("Creating appointment:", newAppointment);
      const data = await createAppointment(newAppointment);
      if (data.success) {
        toast.success("Appointment created successfully");
        setShowModal(false);

        // Reset form
        setDate("");
        setSlots({
          slot1: { capacity: 10, booked: 0, disabled: false, users: [] },
          slot2: { capacity: 10, booked: 0, disabled: false, users: [] },
          slot3: { capacity: 10, booked: 0, disabled: false, users: [] },
          slot4: { capacity: 10, booked: 0, disabled: false, users: [] },
        });
      }
      else {
        toast.error(data.message || "Failed to create appointment");
      }
    }
    catch (err) {
      toast.error("Failed to create appointment");
    }
  };

  const handleViewSlot = async (appointmentId: string, slotKey: string) => {
    try {
      const data = await getAppointedUsers(appointmentId, slotKey);
      if (data.success && data.slot && data.slot.users) {
        setSlotUsers(data.slot.users || []);
        setSlotName(setTime(slotKey));
        setIsOpen(true);
        return;
      }
      setIsOpen(true);
    }
    catch (err) {
      toast.error("Failed to view slot users");
    }
  }

  // Sort appointments: Today → Tomorrow → After
  const sortAppointments = (list: Appointment[]) => {
    const startOfDay = (d: Date) =>
      new Date(d.getFullYear(), d.getMonth(), d.getDate());

    return [...list].sort((a, b) => {
      const da = startOfDay(new Date(a.date));
      const db = startOfDay(new Date(b.date));
      return da.getTime() - db.getTime();
    });
  };

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

  // Helper to get time range for a slot
  const setTime = (slotKey: string) => {
    const timeMap: { [key: string]: string } = {
      slot1: "09:00 AM - 12:00 PM",
      slot2: "12:00 PM - 03:00 PM",
      slot3: "03:00 PM - 06:00 PM",
      slot4: "06:00 PM - 09:00 PM",
    };
    return timeMap[slotKey] || "Unknown Time";
  }

  const formatSlotInfo = (appointmentId: string, slots: Slots) => {
    return (Object.entries(slots) as [string, Slot][])
      .map(([key, slot]) => (
        <div key={key} className="border border-gray-200 shadow-sm rounded-lg p-5 bg-white flex items-center justify-between text-sm">
          <div>
            <div className="font-semibold">{setTime(key)}:</div>
            <div>
              {slot.booked}/{slot.capacity} booked
            </div>
            {slot.disabled && (
              <span className="text-red-500 text-xs ml-2">Disabled</span>
            )}
          </div>
          <button
            onClick={() => !slot.disabled && handleViewSlot(appointmentId, key)}
            disabled={slot.disabled}
            className={`
            flex items-center gap-1 text-blue-600 hover:text-blue-800
            disabled:text-gray-400 disabled:hover:text-gray-400
            disabled:cursor-not-allowed disabled:opacity-60
          `}
          >
            {slot.disabled ? (
              <HiEyeOff className="text-lg" />
            ) : (
              <HiEye className="text-lg" />
            )}
            <span className="text-sm font-medium">
              {slot.disabled ? "Disabled" : "View"}
            </span>
          </button>
          {isOpen && (
            <SlotView slotName={slotName} slotUsers={slotUsers} setIsOpen={setIsOpen} />
          )}
        </div>
      ));
  };

  return (
    <div className="min-h-screen mt-20 w-full px-6 py-8">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Your Appointments</h1>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
            <HiPlus className="text-xl" />
            Create Appointment
          </button>
        </div>

        {/* LIST */}
        {/* <div className="flex justify-between gap-6"> */}
          <div className="space-y-6">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="border border-gray-200 shadow-sm rounded-lg p-5 bg-gradient-to-br from-blue-50 to-cyan-100"
              >
                {/* Date label */}
                <div className="text-lg font-semibold text-gray-700 mb-4">
                  {formatDate(appointment.date)}
                </div>

                {/* Slots */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formatSlotInfo(appointment._id, appointment.slots)}
                </div>
              </div>
            ))}

            {appointments.length === 0 && (
              <div className="text-gray-500 text-center mt-10">
                No appointments yet.
              </div>
            )}
          </div>
          {/* <div className="space-y-6 w-1/3">
            <div className="border-t-4 border-green-300 shadow-sm rounded-lg p-5 bg-white">
              <div className="flex justify-between gap-2 text-gray-700">
                <div><strong>Patient:</strong> {"Ayan Bera"}</div>
                <div><strong>Email:</strong> {"ayanbera25@gmail.com"}</div>
              </div>
            </div>
            <div className="border-t-4 border-green-300 shadow-sm rounded-lg p-5 bg-white">
              <div className="flex justify-between gap-2 text-gray-700">
                <div><strong>Patient:</strong> {"Ayan Bera"}</div>
                <div><strong>Email:</strong> {"ayanbera25@gmail.com"}</div>
              </div>
            </div>
            <div className="border-t-4 border-green-300 shadow-sm rounded-lg p-5 bg-white">
              <div className="flex justify-between gap-2 text-gray-700">
                <div><strong>Patient:</strong> {"Ayan Bera"}</div>
                <div><strong>Email:</strong> {"ayanbera25@gmail.com"}</div>
              </div>
            </div>
            <div className="border-t-4 border-green-300 shadow-sm rounded-lg p-5 bg-white">
              <div className="flex justify-between gap-2 text-gray-700">
                <div><strong>Patient:</strong> {"Ayan Bera"}</div>
                <div><strong>Email:</strong> {"ayanbera25@gmail.com"}</div>
              </div>
            </div>
          </div> */}
        {/* </div> */}
        {/* APPOINTMENT MODAL */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-xl w-[90%] max-w-md relative animate-fade-in">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-cyan-700 mb-2">Create Appointment</h2>
              </div>

              {/* Date */}
              <div className="mb-6 flex flex-col">
                <label className="text-gray-700 font-semibold mb-2">Appointment Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="
                  w-full border border-gray-300 rounded-lg px-4 py-2
                  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400
                  transition-colors duration-150
                "
                />
              </div>

              {/* Slots */}
              {(["slot1", "slot2", "slot3", "slot4"] as (keyof Slots)[]).map(slotKey => (
                <div
                  key={slotKey}
                  className="mb-4 border border-gray-200 rounded-xl bg-white shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="text-gray-500 font-medium mb-2">{setTime(slotKey)}</div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-semibold">Max Capacity:</label>
                      <input
                        type="number"
                        min={1}
                        value={slots[slotKey].capacity}
                        onChange={(e) => handleSlotChange(slotKey, "capacity", Number(e.target.value))}
                        className="border border-gray-300 rounded-md px-3 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={slots[slotKey].disabled}
                        onChange={(e) => handleSlotChange(slotKey, "disabled", e.target.checked)}
                        id={`disabled-${slotKey}`}
                        className="w-5 h-5 accent-blue-600"
                      />
                      <label htmlFor={`disabled-${slotKey}`} className="text-sm font-medium text-gray-700">
                        Disabled
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              {/* Buttons */}

              <button
                onClick={handleCreateAppointment}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-md transition-all"
              >
                Create
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-lg"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
