import  { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">មើលតាមរយៈឯកទេសរបស់វេជ្ជបណ្ឌិត</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex flex-col gap-4 text:sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "គ្រូពេទ្យឯកទេសទូទៅ"
                ? navigate("/doctors")
                : navigate("/doctors/គ្រូពេទ្យឯកទេសទូទៅ")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-grey-300 rounded transition-all cursor-pointer ${
              speciality === "គ្រូពេទ្យឯកទេសទូទៅ"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            គ្រូពេទ្យឯកទេសទូទៅ
          </p>
          <p
            onClick={() =>
              speciality === "គ្រូពេទ្យឯកទេសរោគស្ត្រី"
                ? navigate("/doctors")
                : navigate("/doctors/គ្រូពេទ្យឯកទេសរោគស្ត្រី")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-grey-300 rounded transition-all cursor-pointer ${
              speciality === "គ្រូពេទ្យឯកទេសរោគស្ត្រី" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            គ្រូពេទ្យឯកទេសរោគស្ត្រី
          </p>
          <p
            onClick={() =>
              speciality === "គ្រូពេទ្យឯកទេសសើស្បែក"
                ? navigate("/doctors")
                : navigate("/doctors/គ្រូពេទ្យឯកទេសសើស្បែក")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-grey-300 rounded transition-all cursor-pointer  ${
              speciality === "គ្រូពេទ្យឯកទេសសើស្បែក" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            គ្រូពេទ្យឯកទេសសើស្បែក
          </p>
          <p
            onClick={() =>
              speciality === "គ្រូពេទ្យឯកទេសកុមារ"
                ? navigate("/doctors")
                : navigate("/doctors/គ្រូពេទ្យឯកទេសកុមារ")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-grey-300 rounded transition-all cursor-pointer ${
              speciality === "គ្រូពេទ្យឯកទេសកុមារ" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            គ្រូពេទ្យឯកទេសកុមារ
          </p>
          <p
            onClick={() =>
              speciality === "គ្រូពេទ្យឯកទេសសរសៃប្រសាទ"
                ? navigate("/doctors")
                : navigate("/doctors/គ្រូពេទ្យឯកទេសសរសៃប្រសាទ")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-grey-300 rounded transition-all cursor-pointer ${
              speciality === "គ្រូពេទ្យឯកទេសសរសៃប្រសាទ" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            គ្រូពេទ្យឯកទេសសរសៃប្រសាទ
          </p>
          <p
            onClick={() =>
              speciality === "គ្រូពេទ្យឯកទេសក្រពះពោះវៀន"
                ? navigate("/doctors")
                : navigate("/doctors/គ្រូពេទ្យឯកទេសក្រពះពោះវៀន")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-grey-300 rounded transition-all cursor-pointer ${
              speciality === "គ្រូពេទ្យឯកទេសក្រពះពោះវៀន"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            គ្រូពេទ្យឯកទេសក្រពះពោះវៀន
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-blue-50 " src={item.image} alt="" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center${
                    item.available ? " text-green-500" : " text-gray-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 ${
                      item.available ? " bg-green-500" : "bg-gray-500"
                    } rounded-full`}
                  ></p>{" "}
                  <p>{item.available ? "ទំនេរ" : "មិនទាន់ទំនេរ"}</p>
                </div>
                <p className=" text-gray-900 text-lg font-medium">
                  {" "}
                  {item.name}{" "}
                </p>
                <p className="text-gray-600 text-sm"> {item.speciality} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
