
export type AppointmentByUser = {
  _id: string;
  date: string;
  slot: string;
  doctor: {
    name: string;
    email: string;
  };
};

const setTime = (slotKey: string) => {
    const timeMap: { [key: string]: string } = {
      slot1: "09:00 AM - 12:00 PM",
      slot2: "12:00 PM - 03:00 PM",
      slot3: "03:00 PM - 06:00 PM",
      slot4: "06:00 PM - 09:00 PM",
    };
    return timeMap[slotKey] || "Unknown Time";
  }

const AppointmentCard = ({ appointment }: { appointment: AppointmentByUser }) => {
  return (
    <div className="border border-gray-200 shadow-sm rounded-lg p-5 bg-white">
      <div className="text-gray-700">
        <div><strong>Doctor:</strong> {appointment.doctor.name}</div>
        <div><strong>Email:</strong> {appointment.doctor.email}</div>
        <div><strong>Slot:</strong> {setTime(appointment.slot)}</div>
      </div>
    </div>
  );
};

export default AppointmentCard;