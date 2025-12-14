import { FaUser, FaUserMd } from 'react-icons/fa';

function Popup(props: any) {
  const { authMode } = props;
  const laterPart = authMode ? authMode : 'login';
  return (
    <>
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={() => props.setShowModal(false)}
    >
      {/* Modal Box */}
      <div
        className="bg-white rounded-2xl p-8 shadow-xl w-[90%] max-w-md text-center relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-cyan-700 mb-2">
          Choose Account Type
        </h2>
        <p className="text-gray-500 mb-6">
          Please select your account type to continue
        </p>

        <div className="flex justify-around gap-4">
          {/* User Option */}
          <button
            onClick={() => props.handleSelectAccount("user", laterPart)}
            className="flex flex-col items-center justify-center bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-xl p-6 w-36 transition-all"
          >
            <FaUser className="text-3xl mb-2" />
            <span className="font-medium">User</span>
          </button>

          {/* Doctor Option */}
          <button
            onClick={() => props.handleSelectAccount("doctor", laterPart)}
            className="flex flex-col items-center justify-center bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-xl p-6 w-36 transition-all"
          >
            <FaUserMd className="text-3xl mb-2" />
            <span className="font-medium">Doctor</span>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => props.setShowModal(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>
      </div>
    </div>
    </>
  )
}

export default Popup
