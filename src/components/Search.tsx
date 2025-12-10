import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { searchDoctors } from "../services/userServices";
import { toast } from "react-toastify";

type ResultType = {
  _id: string;
  name: string;
  specialization: string;
};

function Search({ setSelectedDoctor, onClose }: { setSelectedDoctor: (doc: ResultType) => void, onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = async () => {
    if (query.trim() === "") {
      toast.error("Please enter a search query.");
      return;
    }

    setLoading(true);
    setSearched(true);
    const response = await searchDoctors(query);
    setLoading(false);

    if (response.success) setResults(response.doctors || []);
    else setResults([]);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-50 p-4 pt-12">
      {/* MODAL */}
      <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-lg md:max-w-2xl lg:max-w-5xl max-h-[80vh] overflow-y-auto p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Search Doctor</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
        </div>

        {/* SEARCH BAR */}
        <div className="flex items-center border rounded-full overflow-hidden mb-4">
          <div className="px-3 text-gray-500">
            <FaSearch />
          </div>

          <input
            type="text"
            className="flex-1 outline-none bg-transparent px-3 py-2 text-gray-700 placeholder-gray-400"
            placeholder="Search doctor by name or specialization..."
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={search}
            className="bg-blue-600 text-white px-5 py-2 hover:bg-blue-700 transition-colors rounded-r-full"
          >
            Search
          </button>
        </div>

        {/* RESULTS */}
        <div className="space-y-2">
          {!loading && results.length === 0 && searched && (
            <p className="text-center text-gray-500 py-4">No doctors found.</p>
          )}

          {results.map((doc) => (
            <div
              key={doc._id}
              className="p-3 border rounded-xl bg-white shadow-sm flex justify-between items-center hover:shadow-md hover:bg-blue-50 transition-all duration-150"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">{doc.name}</p>
                <p className="text-sm text-gray-500">{doc.specialization}</p>
              </div>

              <button
                onClick={() => setSelectedDoctor(doc)}
                className="text-blue-600 flex items-center gap-2 font-semibold"
              >
                <span>View</span>
                <FiArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
