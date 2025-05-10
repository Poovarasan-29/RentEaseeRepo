// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import carsData from '../data/cars.json';
// import axios from 'axios';
// import regionsData from '../data/regions.json';



// export default function CarDisplay({ setCars, setLoading }) {

//     const queryParams = new URLSearchParams(window.location.search);

//     const [models, setModels] = useState([]);
//     const [selectedBrand, setSelectedBrand] = useState("");
//     const [selectedModel, setSelectedModel] = useState("");
//     const [manufacturedYear, setManufacturedYear] = useState("");
//     const [state, setState] = useState("");
//     const navigate = useNavigate();

//     function handleSelectedBrand(e) {
//         setSelectedBrand(e.target.value);
//         setSelectedModel("")
//         const filterModels = carsData.cars.filter(item => item.brand === e.target.value);
//         if (filterModels.length !== 0)
//             setModels(carsData.cars.filter(item => item.brand === e.target.value)[0].models);
//         else
//             setModels([]);
//     }

//     function handleSelectedModel(e) {
//         setSelectedModel(e.target.value);
//     }

//     async function getCars(brand, model, manufacturedYear, state) {
//         let res;

//         if (state === "State" && model === "Select Model" && brand === "Select Brand") {
//             res = await axios.get(process.env.REACT_APP_BASE_URL + 'rent-cars', { params: { brand: '', model: '', manufacturedYear, state: '' } });
//             navigate(`/renteasee/rent-cars?brand=&model=&year=${manufacturedYear}&state=`)
//         }
//         else if (state === "State" && model === "Select Model") {
//             res = await axios.get(process.env.REACT_APP_BASE_URL + 'rent-cars', { params: { brand, model: '', manufacturedYear, state: '' } });
//             navigate(`/renteasee/rent-cars?brand=${brand}&model=&year=${manufacturedYear}&state=`)
//         }
//         else if (state === "State" && brand === "Select Brand") {
//             res = await axios.get(process.env.REACT_APP_BASE_URL + 'rent-cars', { params: { brand: '', model, manufacturedYear, state: '' } });
//             navigate(`/renteasee/rent-cars?brand=${brand}&model=&year=${manufacturedYear}&state=`)
//         }
//         else if (model === "Select Model" && brand === "Select Brand") {
//             res = await axios.get(process.env.REACT_APP_BASE_URL + 'rent-cars', { params: { brand: '', model: '', manufacturedYear, state } });
//             navigate(`/renteasee/rent-cars?brand=${brand}&model=&year=${manufacturedYear}&state=`)
//         }
//         else if (brand === "Select Brand") {
//             res = await axios.get(process.env.REACT_APP_BASE_URL + 'rent-cars', { params: { brand: '', model, manufacturedYear, state } });
//             navigate(`/renteasee/rent-cars?brand=${brand}&model=${model}&year=${manufacturedYear}&state=`)
//         }
//         else if (state === "State") {
//             res = await axios.get(process.env.REACT_APP_BASE_URL + 'rent-cars', { params: { brand, model, manufacturedYear, state: '' } });
//             navigate(`/renteasee/rent-cars?brand=${brand}&model=${model}&year=${manufacturedYear}&state=`)
//         }
//         else if (model === "Select Model") {
//             res = await axios.get(process.env.REACT_APP_BASE_URL + 'rent-cars', { params: { brand, model: '', manufacturedYear, state } });
//             navigate(`/renteasee/rent-cars?brand=${brand}&model=&year=${manufacturedYear}&state=${state}`)
//         }
//         else {
//             res = await axios.get(process.env.REACT_APP_BASE_URL + 'rent-cars', { params: { brand, model, manufacturedYear, state } });
//             navigate(`/renteasee/rent-cars?brand=${brand}&model=${model}&year=${manufacturedYear}&state=${state}`)
//         }

//         setCars(res.data);
//         setLoading(false);
//     }

//     useEffect(() => {
//         const queryBrand = queryParams.get("brand");
//         const queryModel = queryParams.get("model");
//         const filterModels = carsData.cars.filter(item => item.brand === queryBrand);
//         if (filterModels.length !== 0)
//             setModels(carsData.cars.filter(item => item.brand === queryBrand)[0].models);
//         else
//             setModels([]);

//         getCars(queryBrand, queryModel, manufacturedYear, state);

//         setSelectedBrand(queryBrand);
//         setSelectedModel(queryModel);
//     }, [])


//     return (
//         <>
//             <div className=" text-white d-flex flex-column align-items-center justify-content-center container" style={{ marginTop: '100px' }}>
//                 <div className="w-100">
//                     <h2 className="text-center my-3 p-3 text-dark">EXPLORE THE FINEST SELECTION OF RENTAL VEHICLES</h2>
//                     <div className=" design row w-100 d-flex mt-3 row-cols-lg-5 row-cols-2 ">
//                         <div className="col p-3">
//                             <select name="brand" id="" className="p-2 form-control" value={selectedBrand} onChange={handleSelectedBrand} style={{ width: "100%" }}>
//                                 <option value="Select Brand" defaultChecked>Select Brand</option>
//                                 {
//                                     carsData.cars.map((item, index) =>
//                                         <option value={item.brand} key={index}>{item.brand}</option>
//                                     )
//                                 }
//                             </select>
//                         </div>
//                         <div className="col   p-3">
//                             <select name="model" id="" className="p-2 form-control" value={selectedModel} onChange={handleSelectedModel} style={{ width: "100%" }}>
//                                 <option value="Select Model">Select Model</option>
//                                 {
//                                     models.map((item, index) =>
//                                         <option value={item} key={index}>{item}</option>
//                                     )
//                                 }
//                             </select>
//                         </div>
//                         <div className="col p-3">
//                             <input type="number" className="form-control p-2" value={manufacturedYear} onChange={(e) => setManufacturedYear(e.target.value)} placeholder="Model Year" />
//                         </div>
//                         <div className="col p-3">
//                             <select name="state" id="" className="p-2 form-control" value={state} onChange={(e) => setState(e.target.value)} style={{ width: "100%" }}>
//                                 <option value="State" defaultChecked>State</option>
//                                 {
//                                     regionsData.regions.map((region, index) =>
//                                         <option value={region.state} key={index}>{region.state}</option>
//                                     )
//                                 }
//                             </select>
//                         </div>
//                         <div className="col  p-3">
//                             <button className="text-uppercase btn fs-5 rounded-0 text-light" style={{ width: "100%", fontWeight: 'bold', background: '#ad1fff', letterSpacing: '1px', padding: "6px", fontFamily: "monospace" }} onClick={() => { getCars(selectedBrand, selectedModel, manufacturedYear, state) }}>Explore</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// } 



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import carsData from '../data/cars.json';
import axios from 'axios';
import regionsData from '../data/regions.json';

export default function CarDisplay({ setCars, setLoading }) {
    const queryParams = new URLSearchParams(window.location.search);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(queryParams.get("brand") || "");
    const [selectedModel, setSelectedModel] = useState(queryParams.get("model") || "");
    const [manufacturedYear, setManufacturedYear] = useState("");
    const [state, setState] = useState("");
    const navigate = useNavigate();

    // Filter models based on selected brand
    useEffect(() => {
        const filterModels = carsData.cars.find(item => item.brand === selectedBrand)?.models || [];
        setModels(filterModels);
    }, [selectedBrand]);

    const getCars = async () => {
        const params = {
            brand: selectedBrand !== "Select Brand" ? selectedBrand : "",
            model: selectedModel !== "Select Model" ? selectedModel : "",
            manufacturedYear,
            state: state !== "State" ? state : ""
        };

        setLoading(true);
        try {
            const res = await axios.get(process.env.REACT_APP_BASE_URL + 'rent-cars', { params });
            setCars(res.data);
            setLoading(false);
            navigate(`/renteasee/rent-cars?brand=${params.brand}&model=${params.model}&year=${manufacturedYear}&state=${params.state}`);
        } catch (error) {
            console.error("Error fetching cars:", error);
            setLoading(false);
        }
    };

    // Initialize with URL parameters
    useEffect(() => {
        getCars();
    }, []); // Runs once on initial render to fetch cars based on the URL params

    return (
        <>
            <div className="text-white d-flex flex-column align-items-center justify-content-center container" style={{ marginTop: '100px' }}>
                <h2 className="text-center my-3 p-3 text-dark">EXPLORE THE FINEST SELECTION OF RENTAL VEHICLES</h2>
                <div className="design row w-100 d-flex mt-3 row-cols-lg-5 row-cols-2">
                    <div className="col p-3">
                        <select className="p-2 form-control" value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)} style={{ width: "100%" }}>
                            <option value="Select Brand">Select Brand</option>
                            {carsData.cars.map((item, index) => (
                                <option key={index} value={item.brand}>{item.brand}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col p-3">
                        <select className="p-2 form-control" value={selectedModel} onChange={e => setSelectedModel(e.target.value)} style={{ width: "100%" }}>
                            <option value="Select Model">Select Model</option>
                            {models.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col p-3">
                        <input
                            type="number"
                            className="form-control p-2"
                            value={manufacturedYear}
                            onChange={e => setManufacturedYear(e.target.value)}
                            placeholder="Model Year"
                        />
                    </div>
                    <div className="col p-3">
                        <select className="p-2 form-control" value={state} onChange={e => setState(e.target.value)} style={{ width: "100%" }}>
                            <option value="State">State</option>
                            {regionsData.regions.map((region, index) => (
                                <option key={index} value={region.state}>{region.state}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col p-3">
                        <button
                            className="text-uppercase btn fs-5 rounded-0 text-light"
                            style={{
                                width: "100%",
                                fontWeight: 'bold',
                                background: '#ad1fff',
                                letterSpacing: '1px',
                                padding: "6px",
                                fontFamily: "monospace"
                            }}
                            onClick={getCars}
                        >
                            Explore
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
