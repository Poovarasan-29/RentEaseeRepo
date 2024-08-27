import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DriverFilter from "../components/DriverFilter";



export default function Drivers() {

    const [drivers, setDrivers] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const navigate = useNavigate();

    async function fetchDrivers() {

        let response;

        if (selectedDistrict === "District" && selectedCity === "City") {
            response = await axios.get(process.env.REACT_APP_BASE_URL + 'get-drivers', { params: { district: '', city: '' } });
            navigate(`/renteasee/hire-drivers?district=&city=`)
        }
        else if (selectedDistrict !== "District" && selectedCity === "City") {
            response = await axios.get(process.env.REACT_APP_BASE_URL + 'get-drivers', { params: { district: selectedDistrict, city: '' } });
            navigate(`/renteasee/hire-drivers?district=${selectedDistrict}&city=`)
        }
        else if (selectedDistrict === "District" && selectedCity !== "City") {
            response = await axios.get(process.env.REACT_APP_BASE_URL + 'get-drivers', { params: { district: '', city: selectedCity } });
            navigate(`/renteasee/hire-drivers?district=&city=${selectedCity}`)
        }
        else {
            response = await axios.get(process.env.REACT_APP_BASE_URL + 'get-drivers', { params: { district: selectedDistrict, city: selectedCity } });
            navigate(`/renteasee/hire-drivers?district=${selectedDistrict}&city=${selectedCity}`)
        }
        console.log(response.data);

        const drivers = response.data.allDrivers;
        for (let driver of drivers) {
            const dob = new Date(driver.dob);
            const month_diff = Date.now() - dob.getTime();
            const age_dt = new Date(month_diff);
            const year = age_dt.getUTCFullYear();
            const age = Math.abs(year - 1970);
            driver.age = age;
        }
        setDrivers(drivers);
    }

    useEffect(() => {
        fetchDrivers();
    }, []);

    function handleContactBtn() {
        toast.warning("Need to Buy Membership");
    }


    return (
        <>
            <DriverFilter selectedCity={selectedCity} setSelectedCity={setSelectedCity} selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} fetchDrivers={fetchDrivers} />
            <div className=" container-fluid d-flex flex-column justify-content-center align-items-center" style={{ marginTop: '120px' }} >
                <div style={{ width: "90%" }}>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xxl-3 g-1 ">
                        {
                            drivers.map((driver, index) =>
                                <div className="col p-2 ">
                                    <div className="border">
                                        <div className="d-flex">
                                            <div className="me-3">
                                                <img src={driver.driverPhoto} alt="driver-image" width={"150px"} height={"150px"} />
                                            </div>
                                            <div>
                                                <div className="row mt-4 ms-2 row-cols-2 gy-3 gx-4">
                                                    <div className="col">
                                                        <p className="m-0" style={{ fontWeight: "bold" }}>DISTRICT</p>
                                                        <p className="m-0 text-uppercase" style={{ fontSize: "14px" }}>{driver.district}</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="m-0" style={{ fontWeight: "bold" }}>CITY</p>
                                                        <p className="m-0 text-uppercase" style={{ fontSize: "14px" }}>{driver.city}</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="m-0" style={{ fontWeight: "bold" }}>AGE</p>
                                                        <p className="m-0" style={{ fontSize: "14px" }}>{driver.age}</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="m-0" style={{ fontWeight: "bold" }}>GENDER</p>
                                                        <p className="m-0 text-uppercase" style={{ fontSize: "14px" }}>{driver.gender}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-100 p-3">
                                            <div className="row">
                                                <div className="col d-flex align-items-center ">

                                                    <p className="m-0 text-uppercase fs-5" style={{ fontSize: "13px" }}>{driver.name}</p>

                                                </div>
                                                <div className="col">
                                                    <button className="p-2 rounded w-100 mt-2 text-white" style={{ fontWeight: "500", letterSpacing: "2px", backgroundColor: "rgba(22, 167, 22, 0.751)" }} onClick={handleContactBtn} >
                                                        &#9743;Contact</button>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>

                <div>

                </div>


            </div>
        </>
    )
}