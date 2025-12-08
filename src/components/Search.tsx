import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { searchDoctors } from "../services/userServices";
import { toast } from "react-toastify";
import { FiArrowRight } from "react-icons/fi";

type ResultType = {
  _id: string;
  name: string;
  specialization: string;
}

function Search({ setSelectedDoctor }: { setSelectedDoctor: (doc: ResultType) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultType[]>([]);

  const search = async () => {
    if(query.trim() === ""){
      toast.error("Please enter a search query.");
      return;
    }
    const response = await searchDoctors(query);
    if(response.success){
        setResults(response.doctors || []);
    }
    else {
        setResults([]);
    }
  };
  
  return (
    <div className="w-full p-4">

        <div className="flex bg-white shadow-sm border rounded-full overflow-hidden">
        <div className="flex items-center px-3 text-gray-500">
            <FaSearch />
        </div>

        <input
            type="text"
            className="flex-1 outline-none bg-transparent px-2 py-2 text-gray-700 placeholder-gray-400"
            placeholder="Search doctor..."
            onChange={(e) => setQuery(e.target.value)}
        />

        <button
            onClick={search}
            className="bg-blue-600 text-white px-5 py-2 hover:bg-blue-700 transition-colors"
        >
            Search
        </button>
        
        </div>
      <div className="mt-4 space-y-2">
        {results.map((doc) => (
          <div
            key={doc._id}
            onClick={() => setSelectedDoctor(doc)}
            className="p-2 border-b cursor-pointer hover:bg-blue-100"
          >
            <div className="flex flex-col">
              <p className="text-lg md:text-xl font-semibold text-gray-800 leading-tight">
                {doc.name}
              </p>

              <p className="text-sm md:text-base text-gray-500 mt-1">
                {doc.specialization}
              </p>
            </div>

            <div className="text-blue-600 font-semibold text-sm md:text-base flex items-center gap-2">
              <span>View</span>
              <FiArrowRight className="text-blue-600 w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
