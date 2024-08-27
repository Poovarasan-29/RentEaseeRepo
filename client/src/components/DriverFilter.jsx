import React, { useEffect, useState } from 'react';
import regionsData from '../data/regions.json';


export default function DriverFilter({ selectedDistrict, setSelectedDistrict, selectedCity, setSelectedCity, fetchDrivers }) {

    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);


    // function handleState(e) {
    //     setSelectedState(e.target.value);
    //     const filter = regionsData.regions.filter(region => region.state === e.target.value);
    //     if (filter.length !== 0) {
    //         setDistricts(filter[0].districts);
    //         setSelectedDistrict("")
    //         setSelectedCity("")
    //     }
    //     else {
    //         setSelectedDistrict("")
    //         setSelectedCity("")
    //         console.log(filter);
    //     }
    // }
    useEffect(() => {
        const filter = regionsData.regions.filter(region => region.state === "Tamil Nadu");
        if (filter.length !== 0) {
            setDistricts(filter[0].districts);
        }

    }, []);

    function handleDistrict(e) {
        setSelectedDistrict(e.target.value);
        const filter = districts.filter(dist => dist.district === e.target.value);

        if (filter.length !== 0) {
            setCities(filter[0].city);
            setSelectedCity("")
        } else {
            setSelectedCity("")
        }
    }


    return <div className=" text-white d-flex flex-column align-items-center justify-content-center container" style={{ marginTop: '100px' }}>
        <div className="w-100">
            <h2 className="text-center my-3 p-3 text-dark">EXPLORE THE FINEST SELECTION OF RENTAL VEHICLES</h2>
            <div className=" design row w-100 d-flex justify-content-center mt-3 row-cols-lg-5 row-cols-2 ">

                {/* <div className="col p-3">
                    <select name="state" id="" className="p-2 form-control" value={selectedState} onChange={handleState} style={{ width: "100%" }}>
                        <option value="State" defaultChecked>State</option>
                        {
                            regionsData.regions.map((region, index) =>
                                <option value={region.state} key={index}>{region.state}</option>
                            )
                        }
                    </select>
                </div> */}

                <div className="col p-3">
                    <select name="district" id="" className="p-2 form-control" value={selectedDistrict} onChange={handleDistrict} style={{ width: "100%" }}>
                        <option value="District" defaultChecked>District</option>
                        {
                            districts.map((dist, index) =>
                                <option value={dist.district} key={index}>{dist.district}</option>
                            )
                        }
                    </select>
                </div>

                <div className="col p-3">
                    <select name="city" id="" className="p-2 form-control" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} style={{ width: "100%" }}>
                        <option value="City" defaultChecked>City</option>
                        {
                            cities.map((city, index) =>
                                <option value={city} key={index}>{city}</option>
                            )
                        }
                    </select>
                </div>
                <div className="col  p-3">
                    <button className="text-uppercase btn fs-5 rounded-0 text-light" style={{ width: "100%", fontWeight: 'bold', background: '#ad1fff', letterSpacing: '1px', padding: "6px", fontFamily: "monospace" }} onClick={() => fetchDrivers()} >Explore</button>
                </div>
            </div>
        </div>
    </div>
}
