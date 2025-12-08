import { useEffect, useState } from "react";

type SlotType = {
  capacity: number;
  booked: number;
  disabled: boolean;
}

type SlotsObject = {
  slot1: SlotType;
  slot2: SlotType;
  slot3: SlotType;
  slot4: SlotType;
};

const dummySlots: SlotsObject = {
  slot1: { capacity: 10, booked: 2, disabled: false },
  slot2: { capacity: 10, booked: 10, disabled: false },
  slot3: { capacity: 10, booked: 5, disabled: false },
  slot4: { capacity: 10, booked: 0, disabled: true },
}

function TimeSlot({ doctorId }: { doctorId: string }) {

  const [slots, setSlots] = useState<SlotsObject>(dummySlots);
  const [selected, setSelected] = useState<string | null>(null);

//   useEffect(() => {
//     if (doctorId)
//       axios.get(`/api/slots/${doctorId}`).then((res) => setSlots(res.data));
//   }, [doctorId]);
  const getColor = (s: SlotType, slotKey: string, selectedKey: string | null) => {
    if (s.booked >= s.capacity) return "bg-gray-400"; // full
    if (selectedKey === slotKey) return "bg-green-500"; // selected
    return "bg-blue-500"; // available
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
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {Object.entries(slots).filter(([_, s]) => !s.disabled).map(([key, s]) => (
        <div
          key={key}
          onClick={() => {
            if (s.booked < s.capacity) setSelected(key);
          }}
          className={`p-4 text-white rounded cursor-pointer ${getColor(s, key, selected)}`}
        >
          <p className="font-medium">{setTime(key)}</p>
          <p className="text-sm">{s.capacity - s.booked} remaining</p>
        </div>
      ))}
    </div>
  )
}

export default TimeSlot
