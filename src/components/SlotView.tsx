
function SlotView(props: any) {
  const { slotName, slotUsers, setIsOpen } = props;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-50 p-4 pt-12">
        <div className="bg-white rounded-2xl shadow-xl
        w-full sm:max-w-l md:max-w-2xl lg:max-w-5xl
        max-h-[80vh] overflow-y-auto p-6">
        <div className="text-center">
        <h2 className="text-2xl font-semibold text-cyan-700 mb-2">{slotName}</h2>
        </div>
        {slotUsers.length === 0 ? (
            <p>No users have booked this slot yet.</p>
        ) : (
            <ul className="space-y-2">
            {slotUsers
                .slice() // copy to avoid mutating state
                .sort((a: any, b: any) => new Date(a.bookedAt).getTime() - new Date(b.bookedAt).getTime())
                .map((item: any, index: number) => (
                <li key={item.user._id} className="flex flex-col md:flex-row md:justify-between border-b pb-1">
                    <span className="mb-1 md:mb-0 text-base font-medium">
                    {index + 1}. {item.user.name || "Unknown User"} {/* index as booking order */}
                    </span>
                    <span className="text-gray-500 text-sm md:text-base">
                    {item.user.email}
                    </span>
                </li>
            ))}
            </ul>
        )}
        <button
            onClick={() => setIsOpen(false)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Close
        </button>
        </div>
    </div>
  )
}

export default SlotView
