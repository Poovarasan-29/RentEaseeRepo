// import React, { useEffect, useState } from "react";
// import regionsData from "../data/regions.json";

// export default function DriverFilter({
//   selectedDistrict,
//   setSelectedDistrict,
//   selectedCity,
//   setSelectedCity,
//   fetchDrivers,
// }) {
//   const [districts, setDistricts] = useState([]);
//   const [cities, setCities] = useState([]);


//   useEffect(() => {
//     const filter = regionsData.regions.filter(
//       (region) => region.state === "Tamil Nadu"
//     );
//     if (filter.length !== 0) {
//       setDistricts(filter[0].districts);
//     }
//   }, []);

//   function handleDistrict(e) {
//     setSelectedDistrict(e.target.value);
//     const filter = districts.filter((dist) => dist.district === e.target.value);

//     if (filter.length !== 0) {
//       setCities(filter[0].city);
//       setSelectedCity("");
//     } else {
//       setSelectedCity("");
//     }
//   }

//   return (
//     <div
//       className=" text-white d-flex flex-column align-items-center justify-content-center container"
//       style={{ marginTop: "100px" }}
//     >
//       <div className="w-100">
//         <h2 className="text-center mt-3 pt-3 text-dark">
//           EXPLORE YOUR FINEST SELECTION OF DRIVERS
//         </h2>
//         <div className="design row w-100 d-flex justify-content-center row-cols-lg-5 row-cols-2 ">


//           <div className="col p-3">
//             <select
//               name="district"
//               id=""
//               className="p-2 form-control"
//               value={selectedDistrict}
//               onChange={handleDistrict}
//               style={{ width: "100%" }}
//             >
//               <option value="District" defaultChecked>
//                 District
//               </option>
//               {districts.map((dist, index) => (
//                 <option value={dist.district} key={index}>
//                   {dist.district}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col p-3">
//             <select
//               name="city"
//               id=""
//               className="p-2 form-control"
//               value={selectedCity}
//               onChange={(e) => setSelectedCity(e.target.value)}
//               style={{ width: "100%" }}
//             >
//               <option value="City" defaultChecked>
//                 City
//               </option>
//               {cities.map((city, index) => (
//                 <option value={city} key={index}>
//                   {city}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col  p-3">
//             <button
//               className="text-uppercase btn fs-5 rounded-0 text-light"
//               style={{
//                 width: "100%",
//                 fontWeight: "bold",
//                 background: "#ad1fff",
//                 letterSpacing: "1px",
//                 padding: "6px",
//                 fontFamily: "monospace",
//               }}
//               onClick={() => fetchDrivers()}
//             >
//               Explore
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import regionsData from "../data/regions.json";

export default function DriverFilter({
  selectedDistrict,
  setSelectedDistrict,
  selectedCity,
  setSelectedCity,
  fetchDrivers,
  setSelectedState,
  selectedState
}) {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const stateList = regionsData.regions.map((region) => region.state);
    setStates(stateList);
  }, []);

  function handleStateChange(e) {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSelectedDistrict("");
    setSelectedCity("");
    setCities([]);

    const stateData = regionsData.regions.find((region) => region.state === stateName);
    if (stateData) {
      setDistricts(stateData.districts);
    } else {
      setDistricts([]);
    }
  }

  function handleDistrictChange(e) {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    setSelectedCity("");

    const districtData = districts.find((dist) => dist.district === districtName);
    if (districtData) {
      setCities(districtData.city);
    } else {
      setCities([]);
    }
  }

  return (
    <div
      className="text-white d-flex flex-column align-items-center justify-content-center container"
      style={{ marginTop: "100px" }}
    >
      <div className="w-100">
        <h2 className="text-center mt-3 pt-3 text-dark">
          EXPLORE YOUR FINEST SELECTION OF DRIVERS
        </h2>
        <div className="design row w-100 d-flex justify-content-center row-cols-lg-5 row-cols-2">

          {/* State Dropdown */}
          <div className="col p-3">
            <select
              name="state"
              className="p-2 form-control"
              value={selectedState}
              onChange={handleStateChange}
              style={{ width: "100%" }}
            >
              <option value="">Select State</option>
              {states.map((state, index) => (
                <option value={state} key={index}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div className="col p-3">
            <select
              name="district"
              className="p-2 form-control"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              style={{ width: "100%" }}
              disabled={!selectedState}
            >
              <option value="">Select District</option>
              {districts.map((dist, index) => (
                <option value={dist.district} key={index}>
                  {dist.district}
                </option>
              ))}
            </select>
          </div>

          {/* City Dropdown */}
          <div className="col p-3">
            <select
              name="city"
              className="p-2 form-control"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{ width: "100%" }}
              disabled={!selectedDistrict}
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option value={city} key={index}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Explore Button */}
          <div className="col p-3">
            <button
              className="text-uppercase btn fs-5 rounded-0 text-light"
              style={{
                width: "100%",
                fontWeight: "bold",
                background: "#ad1fff",
                letterSpacing: "1px",
                padding: "6px",
                fontFamily: "monospace",
              }}
              onClick={fetchDrivers}
              disabled={!selectedState}
            >
              Explore
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
