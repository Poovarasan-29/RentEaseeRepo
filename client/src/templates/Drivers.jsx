import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DriverFilter from "../components/DriverFilter";
import { Helmet } from "react-helmet-async";
import DriverCardSkeleton from "../skeleton/DriverCardSkeleton";
import { MDBCol, MDBRow, MDBCard, MDBCardTitle, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';

export default function Drivers() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [selectedState, setSelectedState] = useState(queryParams.get("state") || "");
    const [selectedDistrict, setSelectedDistrict] = useState(queryParams.get("district") || "");
    const [selectedCity, setSelectedCity] = useState(queryParams.get("city") || "");
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [appliedStateFilter, setAppliedStateFilter] = useState("");
    const [appliedDistrictFilter, setAppliedDistrictFilter] = useState("");

    async function fetchDrivers() {
        setLoading(true);

        const query = {
            state: selectedState !== "State" ? selectedState : "",
            district: selectedDistrict !== "District" ? selectedDistrict : "",
            city: selectedCity !== "City" ? selectedCity : ""
        };

        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}get-drivers`, {
                params: query
            });
            if (query.city.length !== 0)
                navigate(`/renteasee/hire-drivers?state=${query.state}&district=${query.district}&city=${query.city}`);
            else if (query.district.length !== 0)
                navigate(`/renteasee/hire-drivers?state=${query.state}&district=${query.district}`);
            else
                navigate(`/renteasee/hire-drivers?state=${query.state}`);

            const fetchedDrivers = response.data.allDrivers.map(driver => {
                const dob = new Date(driver.dob);
                const age = new Date(Date.now() - dob.getTime()).getUTCFullYear() - 1970;
                return { ...driver, age };
            });

            setDrivers(fetchedDrivers);
            setAppliedStateFilter(query.state);
            setAppliedDistrictFilter(query.district);

        } catch (err) {
            toast.error("Failed to fetch drivers.");
            setDrivers([]);
            setAppliedStateFilter("");
            setAppliedDistrictFilter("");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDrivers(); // Initial fetch on component mount
    }, []);

    const getLocationText = (driver) => {
        if (appliedStateFilter && appliedStateFilter !== "" && !appliedDistrictFilter) {
            return `${driver.city}, ${driver.district}`;
        } else if (appliedStateFilter && appliedStateFilter !== "" && appliedDistrictFilter && appliedDistrictFilter !== "") {
            return `${driver.city}`;
        } else {
            return `${driver.city}, ${driver.district}, ${driver.state}`;
        }
    };

    return (
        <>
            <Helmet>
                <title>RentEasee | Drivers</title>
            </Helmet>

            <div className="container mt-4">
                <DriverFilter
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                    selectedDistrict={selectedDistrict}
                    setSelectedDistrict={setSelectedDistrict}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    fetchDrivers={fetchDrivers}
                />

                <div className="mt-4" style={{ padding: '10px', borderRadius: '5px' }}> {/* Added slight gray background */}
                    {loading ? (
                        <MDBRow className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {Array(6).fill(0).map((_, i) => (
                                <MDBCol key={i}>
                                    <DriverCardSkeleton />
                                </MDBCol>
                            ))}
                        </MDBRow>
                    ) : drivers.length ? (
                        <MDBRow className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {drivers.map((driver, index) => (
                                <MDBCol key={index}>
                                    <MDBCard
                                        className="h-100 shadow-sm cursor-pointer driver-card"
                                        style={{ borderRadius: '10px', border: '1px solid #e0e0e0' }}
                                        onClick={() => navigate(`/renteasee/driver-profile/${driver._id}`)}
                                    >
                                        <div className="d-flex align-items-center" style={{ padding: '15px' }}>
                                            <div style={{ flexShrink: 0, marginRight: '15px', width: '120px', height: '120px', overflow: 'hidden', borderRadius: '10px' }}>
                                                <MDBCardImage
                                                    src={driver.driverPhoto}
                                                    alt={driver.name}
                                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                                />
                                            </div>
                                            <MDBCardBody className="p-0">
                                                <MDBCardTitle className="fw-bold text-uppercase mb-1" style={{ color: '#ad1fff', fontSize: '1.1rem' }}>{driver.name}</MDBCardTitle>
                                                <p className="mb-0" style={{ fontSize: '0.9rem' }}><strong className="me-1">Age:</strong> {driver.age}</p>
                                                <p className="mb-0" style={{ fontSize: '0.9rem' }}><strong className="me-1">Gender:</strong> {driver.gender}</p>
                                                <p className="mb-2" style={{ fontSize: '0.9rem' }}><strong className="me-1">Location:</strong> {getLocationText(driver)}</p>
                                            </MDBCardBody>
                                        </div>
                                    </MDBCard>
                                </MDBCol>
                            ))}
                        </MDBRow>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center vh-50">
                            <div className="text-muted" style={{ fontSize: '1.5rem' }}>No drivers matched your search.</div>
                        </div>
                    )}
                </div>
            </div>

            <style type="text/css">
                {`
                    .driver-card {
                        transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
                        background-color: white; /* Default background */
                        transition:.3s;
                        }
                        
                        .driver-card:hover {
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                            background-color: #f0f0f0; /* Slightly gray on hover */
                            transition:.3s;
                            border-color:rgba(0,0,0,0.3) !important;
                    }
                `}
            </style>
        </>
    );
}