import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DriverFilter from "../components/DriverFilter";
import { Helmet } from "react-helmet-async";
import DriverCardSkeleton from "../skeleton/DriverCardSkeleton";
import { MDBCol, MDBRow, MDBCard, MDBCardTitle, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';


export default function Drivers() {

    const [drivers, setDrivers] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [loading, setLoading] = useState(true);
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
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true)
        fetchDrivers();
    }, []);

    function handleContactBtn() {
        toast.warning("Need to Buy Membership");
    }


    return (
        <>
            <Helmet>
                <title>RentEasee | Drivers</title>
            </Helmet>
            <DriverFilter selectedCity={selectedCity} setSelectedCity={setSelectedCity} selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} fetchDrivers={fetchDrivers} />
            {
                loading ?
                    Array(6).fill(0).map(_ => <div className="col p-2"><DriverCardSkeleton /></div>)
                    :
                    drivers.length !== 0 ?
                        <div className="vh-100" style={{ backgroundColor: '#efefef', overflowX: 'hidden' }}>
                            <div className="" style={{ width: '100vw' }} >
                                <MDBRow className="justify-content-center px-3 pe-5">
                                    {drivers.map((driver, index) =>
                                        <MDBCol md="9" lg="7" xl="5" className="mt-5" style={{ width: 'fit-content' }} >
                                            <MDBCard style={{ borderRadius: '5px', border: '1px solid rgba(0,0,0,.3)' }}>
                                                <MDBCardBody className="p-4">
                                                    <div className="d-flex text-black">
                                                        <div className="flex-shrink-0">
                                                            <MDBCardImage
                                                                style={{ width: '180px', borderRadius: '10px' }}
                                                                src={driver.driverPhoto}
                                                                alt={driver.name}
                                                                fluid />
                                                        </div>
                                                        <div className="ms-3">
                                                            <MDBCardTitle className="fw-bold text-uppercase" style={{ color: '#ad1fff' }}>{driver.name}</MDBCardTitle>
                                                            <MDBRow className="d-flex" style={{ width: 'fit-content' }}>
                                                                <MDBRow>
                                                                    <MDBCol className="p-0 ms-3">
                                                                        <p className="m-0 fw-bold" style={{ color: 'rgba(0,0,0,.8)' }}>DISTRICT</p>
                                                                        <p className="m-0" style={{ fontSize: '14px', color: 'rgba(0,0,0,.7)' }}>{driver.district}</p>
                                                                    </MDBCol>
                                                                    <MDBCol className="p-0 ms-4">
                                                                        <p className="m-0 fw-bold" style={{ color: 'rgba(0,0,0,.8)' }}>CITY</p>
                                                                        <p className="m-0" style={{ fontSize: '14px', color: 'rgba(0,0,0,.7)' }}>{driver.city}</p>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                                <MDBRow style={{ marginTop: '10px' }}>
                                                                    <MDBCol className="p-0 ms-3">
                                                                        <p className="m-0 fw-bold" style={{ color: 'rgba(0,0,0,.8)' }}>AGE</p>
                                                                        <p className="m-0" style={{ fontSize: '14px', color: 'rgba(0,0,0,.7)' }}>{driver.age}</p>
                                                                    </MDBCol>
                                                                    <MDBCol className="p-0 ms-4">
                                                                        <p className="m-0 fw-bold" style={{ color: 'rgba(0,0,0,.8)' }}>GENDER</p>
                                                                        <p className="m-0" style={{ fontSize: '14px', color: 'rgba(0,0,0,.7)' }}>{driver.gender}</p>
                                                                    </MDBCol>
                                                                </MDBRow>

                                                            </MDBRow>
                                                            <div className="d-flex pt-1">
                                                                <MDBBtn outline className="me-1 " style={{ width: 'fit-content' }}>Profile</MDBBtn>
                                                                <MDBBtn className="" style={{ width: 'fit-content' }} onClick={handleContactBtn} >Contact</MDBBtn>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    )}
                                </MDBRow>
                            </div>
                        </div>
                        :
                        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '25px' }}>No Drivers matched your search</div>
            }
        </>
    )
}
