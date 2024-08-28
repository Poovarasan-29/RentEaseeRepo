import React, { useEffect, useState } from "react";
import regionsData from '../data/regions.json';
import DriverApplyDropDowns from "../components/DriverApplyDropDowns";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner';
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";


export default function ApplyDriver() {

    const { userID } = useSelector(state => state.checkUserLoginSlice);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        dob: "",
        address: "",
        aadharNo: "",
        gender: "",
        licenceNo: "",
        phoneNo: "",
        alternateNumber: "",
        experience: "",
        email: "",
        comfortWith: ""
    });
    const [inputsValidation, setInputsValidation] = useState({
        dob: "",
        address: "",
        aadharNo: "",
        licenceNo: "",
        phoneNo: "",
        alternateNumber: "",
        email: ""
    });

    const [files, setFiles] = useState({
        aadherCardDoc: null,
        licenceCardDoc: null,
        expiranceDoc: null,
        driverPhoto: null
    });


    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        setFiles((prevFiles) => ({
            ...prevFiles,
            [name]: selectedFiles[0], // Single file for other fields
        }));

    };



    const handleUpload = (e) => {
        if (!userID) {
            toast.warning("Login first", { autoClose: 750 });
            setTimeout(() => {
                navigate('/renteasee/login');
            }, 1000)
        }
        else {
            e.preventDefault()
            const uploadPromises = [];
            const uploadResults = {};
            setLoading(true);
            // Function to upload a single file and save its download URL
            const uploadFile = (file, path) => {
                const storageRef = ref(storage, path);
                const uploadTask = uploadBytesResumable(storageRef, file);

                return new Promise((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            // Progress function (optional)
                        },
                        (error) => {
                            console.error('Upload error:', error);
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                resolve(downloadURL);
                            });
                        }
                    );
                });
            };

            // Upload each file and store the result
            for (const [key, file] of Object.entries(files)) {
                if (file) {
                    // For single file fields
                    uploadPromises.push(
                        uploadFile(file, `${key}/${file.name}`).then((url) => {
                            uploadResults[key] = url;
                        })
                    );
                    // }
                } else if (key === 'expiranceDoc') {
                    // Handle optional expiranceDoc
                    uploadResults[key] = ''; // Set an empty string if not uploaded
                }
            }

            // Once all uploads are complete
            Promise.all(uploadPromises)
                .then(() => {
                    // setUrls(uploadResults);
                    saveToMongoDB(uploadResults);
                })
                .catch((error) => {
                    console.error('Failed to upload all files:', error);
                });
        }
    };

    const saveToMongoDB = async (uploadResults) => {
        try {
            const response = await fetch(process.env.REACT_APP_BASE_URL + 'new-driver', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrls: uploadResults, inputs, selectedDistrict, selectedCity })
            });

            if (response.ok) {
                toast.success("Successfully Applied", { autoClose: 1200 });
                setLoading(false);
                navigate("/renteasee");
            } else {
                toast.error("Server Error", { autoClose: 1200 });
                setLoading(false);
                console.error('Failed to save document paths');
            }
        } catch (error) {
            toast.error("Server Error", { autoClose: 1200 });
            setLoading(false);
            console.error('Error saving document paths:', error);
        }
    };


    useEffect(() => {
        const states = []
        for (let region of regionsData.regions) {
            states.push({ label: region.state, value: region.state })
        }
    }, []);

    function handleInputs(e) {
        if (!userID) {
            toast.warning("Login first", { autoClose: 750 });
            setTimeout(() => {
                navigate('/renteasee/login');
            }, 1000)
        }
        else {
            const name = e.target.name;
            let value = e.target.value;

            if (name === 'aadharNo') {
                if (!isNaN(value.split(' ').join(''))) {
                    if (value.length === 0) {
                        setInputsValidation({ ...inputs, [name]: '' })
                    } else if (value.length === 14) {
                        setInputsValidation({ ...inputs, [name]: true })
                    } else if (value.length < 15) {
                        if (inputs.aadharNo.length < value.length && (value.length === 4 || value.length === 9))
                            value += " ";
                        else if (inputs.aadharNo.length > value.length && (value.length === 5 || value.length === 10)) {
                            value = value.slice(0, value.length - 1);
                        }
                        setInputsValidation({ ...inputs, [name]: false })
                    } else {
                        value = inputs.aadharNo;
                    }
                } else {
                    value = inputs.aadharNo;
                }
            }
            else if (name === "phoneNo" && value.length > 10) {
                value = inputs.phoneNo;
            }
            else if (name === "alternateNumber" && value.length > 10) {
                value = inputs.alternateNumber;
            }
            else if (name === "email") {
                // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                // const isValid = emailPattern.test(value);
            }
            else if (name === "licenceNo") {
                if (value.length > 16)
                    value = inputs.licenceNo;
                // let drivingLicencePattern = new RegExp(/^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/);
                // const licenceValid = drivingLicencePattern.test(value);
            }

            setInputs({ ...inputs, [name]: value })
        }
    }

    return <>
        <Helmet>
            <title>RentEasee | Apply for Driver</title>
        </Helmet>
        <div className="container-sm" style={{ marginTop: '120px' }}>
            {
                loading && <div className="bg-dark p-2 d-flex flex-column align-items-center" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                    <TailSpin />
                </div>

            }
            <h2 className="text-center text-dark text-uppercase fw-bold">Become a Driver with Us</h2>
            <form
                className="row my-3 row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
                onSubmit={handleUpload}
                encType="multipart/form-data"
            >

                <div className="col d-flex flex-column align-items-center">
                    <label className="w-75" htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={inputs.name}
                        onChange={handleInputs}
                        required
                        className="form-control w-75"
                    />
                </div>

                <div className="col d-flex flex-column align-items-center">
                    <label className="w-75" htmlFor="gender">Gender</label>
                    <select
                        name="gender"
                        id="gender"
                        required
                        onChange={handleInputs}
                        value={inputs.gender}
                        className="form-control w-75"
                    >
                        <option></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="col d-flex flex-column align-items-center">
                    <label className="w-75" htmlFor="dob">DOB</label>
                    <input
                        type="date"
                        name="dob"
                        id="dob"
                        value={inputs.dob}
                        onChange={handleInputs}
                        required
                        className="form-control w-75"
                    />
                </div>

                <div className="col d-flex flex-column align-items-center">
                    <label htmlFor="aadharNo" className={inputsValidation.aadharNo.length === 0 ? 'text-dark w-75' : inputsValidation.aadharNo ? 'text-success w-75' : 'text-danger w-75'}>Aadhar No</label>
                    <input
                        type="text"
                        name="aadharNo"
                        id="aadharNo"
                        value={inputs.aadharNo}
                        onChange={handleInputs}
                        required
                        className="form-control w-75"
                    />
                </div>

                <div className="col d-flex flex-column align-items-center">
                    <label className="w-75" htmlFor="licenceNo">Licence No</label>
                    <input
                        type="text"
                        name="licenceNo"
                        id="licenceNo"
                        value={inputs.licenceNo}
                        onChange={handleInputs}
                        required
                        className="form-control w-75"
                    />
                </div>

                <div className="col d-flex flex-column align-items-center">
                    <label className="w-75" htmlFor="phoneNo">Phone No</label>
                    <input
                        type="number"
                        name="phoneNo"
                        id="phoneNo"
                        value={inputs.phoneNo}
                        onChange={handleInputs}
                        required
                        className="form-control w-75"
                    />
                </div>

                <div className="col d-flex flex-column align-items-center">
                    <label className="w-75" htmlFor="alternateNumber">Alternate No</label>
                    <input
                        type="number"
                        name="alternateNumber"
                        id="alternateNumber"
                        value={inputs.alternateNumber}
                        onChange={handleInputs}
                        className="form-control w-75"
                    />
                </div>

                <div className="col d-flex flex-column align-items-center">
                    <label className="w-75" htmlFor="comfortWith">Comfort with </label>
                    <select
                        name="comfortWith"
                        id="comfortWith"
                        required
                        onChange={handleInputs}
                        value={inputs.comfortWith}
                        className="form-control w-75"
                    >
                        <option></option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="Both">Both</option>
                    </select>
                </div>

                <div className="col d-flex flex-column align-items-center">
                    <label className="w-75" htmlFor="experience">Experience/year if</label>
                    <input
                        type="number"
                        name="experience"
                        id="experience"
                        value={inputs.experience}
                        onChange={handleInputs}
                        className="form-control w-75"
                    />
                </div>

                <DriverApplyDropDowns
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                    selectedDistrict={selectedDistrict}
                    setSelectedDistrict={setSelectedDistrict}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                />

                <div className="col d-flex flex-column align-items-center">
                    <label className="w-75" htmlFor="email">Email Id</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={inputs.email}
                        onChange={handleInputs}
                        className="form-control w-75"
                    />
                </div>

                <div className="col d-flex flex-column align-items-center">
                    <label className="w-75" htmlFor="driverPhoto">Driver Photo</label>
                    <input
                        type="file"
                        name="driverPhoto"
                        id="driverPhoto"
                        onChange={handleFileChange}
                        required
                        className="form-control w-75"
                    />
                </div>

                <div className="col d-flex flex-column align-items-center">
                    <label className="w-75" htmlFor="aadherCardDoc">Aadhar Card</label>
                    <input
                        type="file"
                        name="aadherCardDoc"
                        id="aadherCardDoc"
                        onChange={handleFileChange}
                        required
                        className="form-control w-75"
                    />
                </div>

                <div className="col d-flex flex-column align-items-center">
                    <label className="w-75" htmlFor="licenceCardDoc">Licence Photo</label>
                    <input
                        type="file"
                        name="licenceCardDoc"
                        id="licenceCardDoc"
                        onChange={handleFileChange}
                        required
                        className="form-control w-75"
                    />
                </div>

                <div className="col d-flex flex-column align-items-center">
                    <label className="w-75" htmlFor="expiranceDoc">Experiance Certificate if</label>
                    <input
                        type="file"
                        name="expiranceDoc"
                        id="expiranceDoc"
                        onChange={handleFileChange}
                        className="form-control w-75"
                    />
                </div>

                <div className="col d-flex flex-column align-items-center">
                    <label className="w-75" htmlFor="address">Address </label>
                    <textarea
                        name="address"
                        id="address"
                        className="form-control w-75"
                        required
                        onChange={handleInputs}
                        value={inputs.address}
                        rows={"3"}
                        style={{ resize: "none", fontSize: "13px" }}
                    ></textarea>
                </div>

                <div className=" w-100 d-flex justify-content-end  pe-5">
                    <button className="btn btn-success p-2 w-25 form-control me-5">SUBMIT</button>
                </div>
            </form>
        </div>
    </>
}