// import React, { useEffect, useState } from "react";
// import regionsData from '../data/regions.json';
// import DriverApplyDropDowns from "../components/DriverApplyDropDowns";
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { storage } from '../firebase';
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { TailSpin } from 'react-loader-spinner';
// import { Helmet } from "react-helmet-async";
// import { useSelector } from "react-redux";


// export default function ApplyDriver() {

//     const { userID } = useSelector(state => state.checkUserLoginSlice);
//     const [selectedState, setSelectedState] = useState(null);
//     const [selectedDistrict, setSelectedDistrict] = useState(null);
//     const [selectedCity, setSelectedCity] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const [inputs, setInputs] = useState({
//         name: "",
//         dob: "",
//         address: "",
//         aadharNo: "",
//         gender: "",
//         licenceNo: "",
//         phoneNo: "",
//         alternateNumber: "",
//         experience: "",
//         email: "",
//         comfortWith: ""
//     });
//     const [inputsValidation, setInputsValidation] = useState({
//         dob: "",
//         address: "",
//         aadharNo: "",
//         licenceNo: "",
//         phoneNo: "",
//         alternateNumber: "",
//         email: ""
//     });

//     const [files, setFiles] = useState({
//         aadherCardDoc: null,
//         licenceCardDoc: null,
//         expiranceDoc: null,
//         driverPhoto: null
//     });


//     const handleFileChange = (e) => {
//         const { name, files: selectedFiles } = e.target;
//         setFiles((prevFiles) => ({
//             ...prevFiles,
//             [name]: selectedFiles[0], // Single file for other fields
//         }));

//     };



//     const handleUpload = (e) => {
//         if (!userID) {
//             toast.warning("Login first", { autoClose: 750 });
//             setTimeout(() => {
//                 navigate('/renteasee/login');
//             }, 1000)
//         }
//         else {
//             e.preventDefault()
//             const uploadPromises = [];
//             const uploadResults = {};
//             setLoading(true);
//             // Function to upload a single file and save its download URL
//             const uploadFile = (file, path) => {
//                 const storageRef = ref(storage, path);
//                 const uploadTask = uploadBytesResumable(storageRef, file);

//                 return new Promise((resolve, reject) => {
//                     uploadTask.on(
//                         'state_changed',
//                         (snapshot) => {
//                             // Progress function (optional)
//                         },
//                         (error) => {
//                             console.error('Upload error:', error);
//                             reject(error);
//                         },
//                         () => {
//                             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                                 resolve(downloadURL);
//                             });
//                         }
//                     );
//                 });
//             };

//             // Upload each file and store the result
//             for (const [key, file] of Object.entries(files)) {
//                 if (file) {
//                     // For single file fields
//                     uploadPromises.push(
//                         uploadFile(file, `${key}/${file.name}`).then((url) => {
//                             uploadResults[key] = url;
//                         })
//                     );
//                     // }
//                 } else if (key === 'expiranceDoc') {
//                     // Handle optional expiranceDoc
//                     uploadResults[key] = ''; // Set an empty string if not uploaded
//                 }
//             }

//             // Once all uploads are complete
//             Promise.all(uploadPromises)
//                 .then(() => {
//                     // setUrls(uploadResults);
//                     saveToMongoDB(uploadResults);
//                 })
//                 .catch((error) => {
//                     console.error('Failed to upload all files:', error);
//                 });
//         }
//     };

//     const saveToMongoDB = async (uploadResults) => {
//         try {
//             const response = await fetch(process.env.REACT_APP_BASE_URL + 'new-driver', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ imageUrls: uploadResults, inputs,selectedState, selectedDistrict, selectedCity })
//             });

//             if (response.ok) {
//                 toast.success("Successfully Applied", { autoClose: 1200 });
//                 setLoading(false);
//                 navigate("/renteasee");
//             } else {
//                 toast.error("Server Error", { autoClose: 1200 });
//                 setLoading(false);
//                 console.error('Failed to save document paths');
//             }
//         } catch (error) {
//             toast.error("Server Error", { autoClose: 1200 });
//             setLoading(false);
//             console.error('Error saving document paths:', error);
//         }
//     };


//     useEffect(() => {
//         const states = []
//         for (let region of regionsData.regions) {
//             states.push({ label: region.state, value: region.state })
//         }
//     }, []);

//     function handleInputs(e) {
//         if (!userID) {
//             toast.warning("Login first", { autoClose: 750 });
//             setTimeout(() => {
//                 navigate('/renteasee/login');
//             }, 1000)
//         }
//         else {
//             const name = e.target.name;
//             let value = e.target.value;

//             if (name === 'aadharNo') {
//                 if (!isNaN(value.split(' ').join(''))) {
//                     if (value.length === 0) {
//                         setInputsValidation({ ...inputs, [name]: '' })
//                     } else if (value.length === 14) {
//                         setInputsValidation({ ...inputs, [name]: true })
//                     } else if (value.length < 15) {
//                         if (inputs.aadharNo.length < value.length && (value.length === 4 || value.length === 9))
//                             value += " ";
//                         else if (inputs.aadharNo.length > value.length && (value.length === 5 || value.length === 10)) {
//                             value = value.slice(0, value.length - 1);
//                         }
//                         setInputsValidation({ ...inputs, [name]: false })
//                     } else {
//                         value = inputs.aadharNo;
//                     }
//                 } else {
//                     value = inputs.aadharNo;
//                 }
//             }
//             else if (name === "phoneNo" && value.length > 10) {
//                 value = inputs.phoneNo;
//             }
//             else if (name === "alternateNumber" && value.length > 10) {
//                 value = inputs.alternateNumber;
//             }
//             else if (name === "email") {
//                 // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//                 // const isValid = emailPattern.test(value);
//             }
//             else if (name === "licenceNo") {
//                 if (value.length > 16)
//                     value = inputs.licenceNo;
//                 // let drivingLicencePattern = new RegExp(/^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/);
//                 // const licenceValid = drivingLicencePattern.test(value);
//             }

//             setInputs({ ...inputs, [name]: value })
//         }
//     }

//     return <>
//         <Helmet>
//             <title>RentEasee | Apply for Driver</title>
//         </Helmet>
//         <div className="container-sm" style={{ marginTop: '120px' }}>
//             {
//                 loading && <div className="bg-dark p-2 d-flex flex-column align-items-center" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
//                     <TailSpin />
//                 </div>

//             }
//             <h2 className="text-center text-dark text-uppercase fw-bold">Become a Driver with Us</h2>
//             <form
//                 className="row my-3 row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
//                 onSubmit={handleUpload}
//                 encType="multipart/form-data"
//             >

//                 <div className="col d-flex flex-column align-items-center">
//                     <label className="w-75" htmlFor="name">Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         id="name"
//                         value={inputs.name}
//                         onChange={handleInputs}
//                         required
//                         className="form-control w-75"
//                     />
//                 </div>

//                 <div className="col d-flex flex-column align-items-center">
//                     <label className="w-75" htmlFor="gender">Gender</label>
//                     <select
//                         name="gender"
//                         id="gender"
//                         required
//                         onChange={handleInputs}
//                         value={inputs.gender}
//                         className="form-control w-75"
//                     >
//                         <option></option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Others">Others</option>
//                     </select>
//                 </div>

//                 <div className="col d-flex flex-column align-items-center">
//                     <label className="w-75" htmlFor="dob">DOB</label>
//                     <input
//                         type="date"
//                         name="dob"
//                         id="dob"
//                         value={inputs.dob}
//                         onChange={handleInputs}
//                         required
//                         className="form-control w-75"
//                     />
//                 </div>

//                 <div className="col d-flex flex-column align-items-center">
//                     <label htmlFor="aadharNo" className={inputsValidation.aadharNo.length === 0 ? 'text-dark w-75' : inputsValidation.aadharNo ? 'text-success w-75' : 'text-danger w-75'}>Aadhar No</label>
//                     <input
//                         type="text"
//                         name="aadharNo"
//                         id="aadharNo"
//                         value={inputs.aadharNo}
//                         onChange={handleInputs}
//                         required
//                         className="form-control w-75"
//                     />
//                 </div>

//                 <div className="col d-flex flex-column align-items-center">
//                     <label className="w-75" htmlFor="licenceNo">Licence No</label>
//                     <input
//                         type="text"
//                         name="licenceNo"
//                         id="licenceNo"
//                         value={inputs.licenceNo}
//                         onChange={handleInputs}
//                         required
//                         className="form-control w-75"
//                     />
//                 </div>

//                 <div className="col d-flex flex-column align-items-center">
//                     <label className="w-75" htmlFor="phoneNo">Phone No</label>
//                     <input
//                         type="number"
//                         name="phoneNo"
//                         id="phoneNo"
//                         value={inputs.phoneNo}
//                         onChange={handleInputs}
//                         required
//                         className="form-control w-75"
//                     />
//                 </div>

//                 <div className="col d-flex flex-column align-items-center">
//                     <label className="w-75" htmlFor="alternateNumber">Alternate No</label>
//                     <input
//                         type="number"
//                         name="alternateNumber"
//                         id="alternateNumber"
//                         value={inputs.alternateNumber}
//                         onChange={handleInputs}
//                         className="form-control w-75"
//                     />
//                 </div>

//                 <div className="col d-flex flex-column align-items-center">
//                     <label className="w-75" htmlFor="comfortWith">Comfort with </label>
//                     <select
//                         name="comfortWith"
//                         id="comfortWith"
//                         required
//                         onChange={handleInputs}
//                         value={inputs.comfortWith}
//                         className="form-control w-75"
//                     >
//                         <option></option>
//                         <option value="Automatic">Automatic</option>
//                         <option value="Manual">Manual</option>
//                         <option value="Both">Both</option>
//                     </select>
//                 </div>

//                 <div className="col d-flex flex-column align-items-center">
//                     <label className="w-75" htmlFor="experience">Experience/year if</label>
//                     <input
//                         type="number"
//                         name="experience"
//                         id="experience"
//                         value={inputs.experience}
//                         onChange={handleInputs}
//                         className="form-control w-75"
//                     />
//                 </div>

//                 <DriverApplyDropDowns
//                     selectedState={selectedState}
//                     setSelectedState={setSelectedState}
//                     selectedDistrict={selectedDistrict}
//                     setSelectedDistrict={setSelectedDistrict}
//                     selectedCity={selectedCity}
//                     setSelectedCity={setSelectedCity}
//                 />

//                 <div className="col d-flex flex-column align-items-center">
//                     <label className="w-75" htmlFor="email">Email Id</label>
//                     <input
//                         type="email"
//                         name="email"
//                         id="email"
//                         value={inputs.email}
//                         onChange={handleInputs}
//                         className="form-control w-75"
//                     />
//                 </div>

//                 <div className="col d-flex flex-column align-items-center">
//                     <label className="w-75" htmlFor="driverPhoto">Driver Photo</label>
//                     <input
//                         type="file"
//                         name="driverPhoto"
//                         id="driverPhoto"
//                         onChange={handleFileChange}
//                         required
//                         className="form-control w-75"
//                     />
//                 </div>

//                 <div className="col d-flex flex-column align-items-center">
//                     <label className="w-75" htmlFor="aadherCardDoc">Aadhar Card</label>
//                     <input
//                         type="file"
//                         name="aadherCardDoc"
//                         id="aadherCardDoc"
//                         onChange={handleFileChange}
//                         required
//                         className="form-control w-75"
//                     />
//                 </div>

//                 <div className="col d-flex flex-column align-items-center">
//                     <label className="w-75" htmlFor="licenceCardDoc">Licence Photo</label>
//                     <input
//                         type="file"
//                         name="licenceCardDoc"
//                         id="licenceCardDoc"
//                         onChange={handleFileChange}
//                         required
//                         className="form-control w-75"
//                     />
//                 </div>

//                 <div className="col d-flex flex-column align-items-center">
//                     <label className="w-75" htmlFor="expiranceDoc">Experiance Certificate if</label>
//                     <input
//                         type="file"
//                         name="expiranceDoc"
//                         id="expiranceDoc"
//                         onChange={handleFileChange}
//                         className="form-control w-75"
//                     />
//                 </div>

//                 <div className="col d-flex flex-column align-items-center">
//                     <label className="w-75" htmlFor="address">Address </label>
//                     <textarea
//                         name="address"
//                         id="address"
//                         className="form-control w-75"
//                         required
//                         onChange={handleInputs}
//                         value={inputs.address}
//                         rows={"3"}
//                         style={{ resize: "none", fontSize: "13px" }}
//                     ></textarea>
//                 </div>

//                 <div className=" w-100 d-flex justify-content-end  pe-5">
//                     <button className="btn btn-success p-2 w-25 form-control me-5">SUBMIT</button>
//                 </div>
//             </form>
//         </div>
//     </>
// }


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { storage } from '../firebase';
// import { toast } from 'react-toastify';
// import { TailSpin } from 'react-loader-spinner';
// import { Helmet } from 'react-helmet-async';
// import { useSelector } from 'react-redux';
// import {
//     TextField,
//     Button,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     FormHelperText,
//     Grid,
//     Card,
//     Typography,
//     Box,
//     InputAdornment
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { Input } from '@mui/material';
// import ReactSelect from 'react-select';
// import regionsData from '../data/regions.json';
// import {
//     User,
//     VenusAndMars,
//     Phone,
//     LocationOn,
//     File,
//     Car,
//     IdCard,
//     Home,
//     FilePlus
// } from 'lucide-react';

// // Styled Components for enhanced UI
// const FormCard = styled(Card)(({ theme }) => ({
//     marginTop: theme.spacing(8),
//     padding: theme.spacing(4),
//     borderRadius: '12px',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//     backgroundColor: 'white',
// }));

// const FormTitle = styled(Typography)({
//     textAlign: 'center',
//     marginBottom: '2rem',
//     fontWeight: 'bold',
//     color: '#2c3e50',
// });

// const InputField = styled(TextField)(({ theme }) => ({
//     marginBottom: '1.5rem',
//     '& .MuiInputBase-root': {
//         borderRadius: '8px',
//     },
//     '& .MuiInputLabel-root': {
//         color: '#555', // Label color
//     },
//     '& .MuiInputBase-input': {
//         padding: '10px 14px',
//         fontSize: '1rem',
//     },
//     '& .MuiOutlinedInput-root': {
//         '& fieldset': {
//             borderColor: '#ddd', // Border color
//         },
//         '&:hover fieldset': {
//             borderColor: '#3498db', // Hover border
//         },
//         '&.Mui-focused fieldset': {
//             borderColor: '#3498db', // Focused border
//             boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)', // Focus shadow
//         },
//     },
//     '& .MuiFormHelperText-root': {
//         marginTop: '4px',
//         color: theme.palette.error.main,
//     },
// }));

// const SelectField = styled(FormControl)(({ theme }) => ({
//     marginBottom: '1.5rem',
//     '& .MuiInputBase-root': {
//         borderRadius: '8px',
//     },
//     '& .MuiInputLabel-root': {
//         color: '#555', // Label color
//     },
//     '& .MuiInputBase-input': {
//         padding: '10px 14px',
//         fontSize: '1rem',
//     },
//     '& .MuiOutlinedInput-root': {
//         '& fieldset': {
//             borderColor: '#ddd', // Border color
//         },
//         '&:hover fieldset': {
//             borderColor: '#3498db', // Hover border
//         },
//         '&.Mui-focused fieldset': {
//             borderColor: '#3498db', // Focused border
//             boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)', // Focus shadow
//         },
//     },
//     '& .MuiFormHelperText-root': {
//         marginTop: '4px',
//         color: theme.palette.error.main,
//     },
// }));

// const SubmitButton = styled(Button)({
//     marginTop: '1rem',
//     padding: '0.75rem 2rem',
//     borderRadius: '8px',
//     fontWeight: 'semibold',
//     backgroundColor: '#3498db',
//     color: 'white',
//     '&:hover': {
//         backgroundColor: '#217dbb',
//     },
// });

// const FileInput = styled(Input)({
//     display: 'none',
// });

// const FileLabel = styled(Button)(({ theme }) => ({
//     marginTop: '1rem',
//     padding: '0.75rem 1rem',
//     borderRadius: '8px',
//     fontWeight: 'semibold',
//     backgroundColor: '#e0e0e0',
//     color: '#333',
//     '&:hover': {
//         backgroundColor: '#d0d0d0',
//     },
//     display: 'inline-flex',
//     alignItems: 'center',
//     cursor: 'pointer',
//     '& span': {
//         marginRight: '0.5rem',
//     }
// }));

// const FlexBox = styled(Box)({
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '1.5rem'
// });

// // ===============================
// // Driver Apply Dropdowns Component
// // ===============================
// const DriverApplyDropDowns = ({
//     selectedState,
//     setSelectedState,
//     selectedDistrict,
//     setSelectedDistrict,
//     selectedCity,
//     setSelectedCity,
//     error,
// }) => {
//     const [allStates] = useState(regionsData.regions);
//     const [allDistricts, setAllDistricts] = useState([]);
//     const [allCities, setAllCities] = useState([]);

//     useEffect(() => {
//         if (selectedState) {
//             const districtsData = regionsData.regions.find(region => region.state === selectedState)?.districts || [];
//             setAllDistricts(districtsData);
//         } else {
//             setAllDistricts([]);
//             setSelectedDistrict(null); // Reset district when state changes
//         }
//     }, [selectedState, setSelectedState]);

//     useEffect(() => {
//         if (selectedDistrict) {
//             const cityData = selectedDistrict[0]?.city.map(city => ({ value: city, label: city })) || [];
//             setAllCities(cityData);
//         } else {
//             setAllCities([]);
//             setSelectedCity(null);
//         }
//     }, [selectedDistrict, setSelectedCity]);

//     const handleStateChange = (selectedOptions) => {
//         setSelectedState(selectedOptions ? selectedOptions.value : null);
//     };

//     const handleDistrictChange = (selectedOptions) => {
//         setSelectedDistrict(selectedOptions);
//     };

//     const handleCityChange = (selectedOptions) => {
//         setSelectedCity(selectedOptions ? selectedOptions.value : null);
//     };

//     const stateOptions = allStates.map(state => ({ value: state.state, label: state.state }));
//     const districtOptions = allDistricts.map(district => ({ value: district, label: district.district }));
//     const cityOptions = allCities.map(city => ({ value: city.value, label: city.label }));

//     return (
//         <>
//             <Grid item xs={12} md={4}>
//                 <InputLabel htmlFor="state-select">State</InputLabel>
//                 <ReactSelect
//                     options={stateOptions}
//                     onChange={handleStateChange}
//                     placeholder="Select State"
//                     isClearable
//                     value={selectedState ? { value: selectedState, label: selectedState } : null}
//                     styles={{
//                         control: (baseStyles, state) => ({
//                             ...baseStyles,
//                             borderRadius: '8px',
//                             borderColor: error ? 'red' : state.isFocused ? '#3498db' : '#ddd',
//                             boxShadow: state.isFocused ? '0 0 0 2px rgba(52, 152, 219, 0.2)' : null,
//                             '&:hover': {
//                                 borderColor: state.isFocused ? '#3498db' : '#3498db',
//                             },
//                             padding: '8px',
//                             fontSize: '1rem'
//                         }),
//                         option: (baseStyles, state) => ({
//                             ...baseStyles,
//                             backgroundColor: state.isFocused ? '#e0e0e0' : 'white',
//                             color: '#333',
//                             '&:active': {
//                                 backgroundColor: '#d0d0d0',
//                             }
//                         }),
//                         placeholder: (baseStyles) => ({
//                             ...baseStyles,
//                             color: '#555'
//                         }),
//                         singleValue: (baseStyles) => ({
//                             ...baseStyles,
//                             color: '#333'
//                         })
//                     }}
//                 />
//             </Grid>

//             <Grid item xs={12} md={4}>
//                 <InputLabel htmlFor="district-select">District</InputLabel>
//                 <ReactSelect
//                     options={districtOptions}
//                     onChange={handleDistrictChange}
//                     placeholder="Select District"
//                     isClearable
//                     isDisabled={!selectedState}
//                     value={selectedDistrict || null}
//                     styles={{
//                         control: (baseStyles, state) => ({
//                             ...baseStyles,
//                             borderRadius: '8px',
//                             borderColor: error ? 'red' : state.isFocused ? '#3498db' : '#ddd',
//                             boxShadow: state.isFocused ? '0 0 0 2px rgba(52, 152, 219, 0.2)' : null,
//                             '&:hover': {
//                                 borderColor: state.isFocused ? '#3498db' : '#3498db',
//                             },
//                             padding: '8px',
//                             fontSize: '1rem'
//                         }),
//                         option: (baseStyles, state) => ({
//                             ...baseStyles,
//                             backgroundColor: state.isFocused ? '#e0e0e0' : 'white',
//                             color: '#333',
//                             '&:active': {
//                                 backgroundColor: '#d0d0d0',
//                             }
//                         }),
//                         placeholder: (baseStyles) => ({
//                             ...baseStyles,
//                             color: '#555'
//                         }),
//                         singleValue: (baseStyles) => ({
//                             ...baseStyles,
//                             color: '#333'
//                         })
//                     }}
//                 />
//             </Grid>
//             <Grid item xs={12} md={4}>
//                 <InputLabel htmlFor="city-select">City</InputLabel>
//                 <ReactSelect
//                     options={cityOptions}
//                     onChange={handleCityChange}
//                     placeholder="Select City"
//                     isClearable
//                     isDisabled={!selectedDistrict}
//                     value={selectedCity ? { value: selectedCity, label: selectedCity } : null}
//                     styles={{
//                         control: (baseStyles, state) => ({
//                             ...baseStyles,
//                             borderRadius: '8px',
//                             borderColor: error ? 'red' : state.isFocused ? '#3498db' : '#ddd',
//                             boxShadow: state.isFocused ? '0 0 0 2px rgba(52, 152, 219, 0.2)' : null,
//                             '&:hover': {
//                                 borderColor: state.isFocused ? '#3498db' : '#3498db',
//                             },
//                             padding: '8px',
//                             fontSize: '1rem'
//                         }),
//                         option: (baseStyles, state) => ({
//                             ...baseStyles,
//                             backgroundColor: state.isFocused ? '#e0e0e0' : 'white',
//                             color: '#333',
//                             '&:active': {
//                                 backgroundColor: '#d0d0d0',
//                             }
//                         }),
//                         placeholder: (baseStyles) => ({
//                             ...baseStyles,
//                             color: '#555'
//                         }),
//                         singleValue: (baseStyles) => ({
//                             ...baseStyles,
//                             color: '#333'
//                         })
//                     }}
//                 />
//             </Grid>
//         </>
//     );
// };

// // ===============================
// // Main Apply Driver Component
// // ===============================
// export default function ApplyDriver() {
//     const { userID } = useSelector(state => state.checkUserLoginSlice);
//     const [selectedState, setSelectedState] = useState(null);
//     const [selectedDistrict, setSelectedDistrict] = useState(null);
//     const [selectedCity, setSelectedCity] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const [inputs, setInputs] = useState({
//         name: "",
//         address: "",
//         aadharNo: "",
//         gender: "",
//         phoneNo: "",
//         alternateNumber: "",
//         comfortWith: ""
//     });
//     const [inputsValidation, setInputsValidation] = useState({
//         aadharNo: "",
//         phoneNo: "",
//         alternateNumber: "",
//     });

//     const [files, setFiles] = useState({
//         aadherCardDoc: null,
//     });

//     const [error, setError] = useState(false);


//     const handleFileChange = (e) => {
//         const { name, files: selectedFiles } = e.target;
//         setFiles((prevFiles) => ({
//             ...prevFiles,
//             [name]: selectedFiles[0], // Single file for other fields
//         }));
//     };

//     const handleUpload = (e) => {
//         e.preventDefault();

//         if (!userID) {
//             toast.warning("Login first", { autoClose: 750 });
//             setTimeout(() => {
//                 navigate('/renteasee/login');
//             }, 1000);
//             return;
//         }

//         const requiredFields = [
//             'name',
//             'address',
//             'aadharNo',
//             'gender',
//             'phoneNo',
//             'comfortWith',
//         ];

//         const isAllRequiredFilled = requiredFields.every(field => inputs[field]);

//         if (!isAllRequiredFilled || !selectedState || !selectedDistrict || !selectedCity) {
//             toast.error("Please fill in all required fields and location information.");
//             setError(true);
//             return;
//         }
//         setError(false);

//         const uploadPromises = [];
//         const uploadResults = {};
//         setLoading(true);

//         // Function to upload a single file and save its download URL
//         const uploadFile = (file, path) => {
//             const storageRef = ref(storage, path);
//             const uploadTask = uploadBytesResumable(storageRef, file);

//             return new Promise((resolve, reject) => {
//                 uploadTask.on(
//                     'state_changed',
//                     (snapshot) => {
//                         // Progress function (optional)
//                     },
//                     (error) => {
//                         console.error('Upload error:', error);
//                         reject(error);
//                     },
//                     () => {
//                         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                             resolve(downloadURL);
//                         });
//                     }
//                 );
//             });
//         };

//         // Upload each file and store the result
//         for (const [key, file] of Object.entries(files)) {
//             if (file) {
//                 uploadPromises.push(
//                     uploadFile(file, `${key}/${file.name}`).then((url) => {
//                         uploadResults[key] = url;
//                     })
//                 );
//             }
//         }

//         // Once all uploads are complete
//         Promise.all(uploadPromises)
//             .then(() => {
//                 saveToMongoDB(uploadResults);
//             })
//             .catch((error) => {
//                 console.error('Failed to upload all files:', error);
//                 setLoading(false);
//                 toast.error("Failed to upload files.");
//             });
//     };

//     const saveToMongoDB = async (uploadResults) => {
//         try {
//             const response = await fetch(process.env.REACT_APP_BASE_URL + 'new-driver', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     imageUrls: uploadResults,
//                     inputs,
//                     selectedState,
//                     selectedDistrict: selectedDistrict[0]?.district,
//                     selectedCity
//                 })
//             });

//             if (response.ok) {
//                 toast.success("Successfully Applied", { autoClose: 1200 });
//                 setLoading(false);
//                 navigate("/renteasee");
//             } else {
//                 toast.error("Server Error", { autoClose: 1200 });
//                 setLoading(false);
//                 console.error('Failed to save document paths');
//             }
//         } catch (error) {
//             toast.error("Server Error", { autoClose: 1200 });
//             setLoading(false);
//             console.error('Error saving document paths:', error);
//         }
//     };

//     useEffect(() => {
//     }, []);

//     function handleInputs(e) {
//         const name = e.target.name;
//         let value = e.target.value;

//         if (name === 'aadharNo') {
//             if (!isNaN(value.split(' ').join(''))) {
//                 if (value.length === 0) {
//                     setInputsValidation({ ...inputsValidation, [name]: '' });
//                 } else if (value.length === 14) {
//                     setInputsValidation({ ...inputsValidation, [name]: true });
//                 } else if (value.length < 15) {
//                     if (inputs.aadharNo.length < value.length && (value.length === 4 || value.length === 9)) {
//                         value += " ";
//                     } else if (inputs.aadharNo.length > value.length && (value.length === 5 || value.length === 10)) {
//                         value = value.slice(0, value.length - 1);
//                     }
//                     setInputsValidation({ ...inputsValidation, [name]: false });
//                 } else {
//                     value = inputs.aadharNo;
//                 }
//             } else {
//                 value = inputs.aadharNo;
//             }
//         } else if (name === "phoneNo" && value.length > 10) {
//             value = inputs.phoneNo;
//         } else if (name === "alternateNumber" && value.length > 10) {
//             value = inputs.alternateNumber;
//         }

//         setInputs({ ...inputs, [name]: value });
//     }

//     return (
//         <>
//             <Helmet>
//                 <title>RentEasee | Apply for Driver</title>
//             </Helmet>
//             {loading && (
//                 <div className="bg-dark p-2 d-flex flex-column align-items-center" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
//                     <TailSpin />
//                 </div>
//             )}
//             <FormCard>
//                 <FormTitle variant="h4">Become a Driver with Us</FormTitle>
//                 <form onSubmit={handleUpload} encType="multipart/form-data">
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} md={4}>
//                             <InputLabel htmlFor="name">Name</InputLabel>
//                             <InputField
//                                 type="text"
//                                 name="name"
//                                 id="name"
//                                 value={inputs.name}
//                                 onChange={handleInputs}
//                                 required
//                                 fullWidth
//                                 error={error && !inputs.name}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <User size={20} color="#777" />
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                             {error && !inputs.name && (
//                                 <FormHelperText error>Please enter your name</FormHelperText>
//                             )}
//                         </Grid>

//                         <Grid item xs={12} md={4}>
//                             <InputLabel htmlFor="gender">Gender</InputLabel>
//                             <SelectField fullWidth required error={error && !inputs.gender}>
//                                 <Select
//                                     name="gender"
//                                     id="gender"
//                                     onChange={handleInputs}
//                                     value={inputs.gender}
//                                     startAdornment={
//                                         <InputAdornment position="start">
//                                             <VenusAndMars size={20} color="#777" />
//                                         </InputAdornment>
//                                     }
//                                 >
//                                     <MenuItem value="">Select</MenuItem>
//                                     <MenuItem value="Male">Male</MenuItem>
//                                     <MenuItem value="Female">Female</MenuItem>
//                                     <MenuItem value="Others">Others</MenuItem>
//                                 </Select>
//                                 {error && !inputs.gender && (
//                                     <FormHelperText error>Please select your gender</FormHelperText>
//                                 )}
//                             </SelectField>
//                         </Grid>

//                         <Grid item xs={12} md={4}>
//                             <InputLabel htmlFor="phoneNo">Phone No</InputLabel>
//                             <InputField
//                                 type="number"
//                                 name="phoneNo"
//                                 id="phoneNo"
//                                 value={inputs.phoneNo}
//                                 onChange={handleInputs}
//                                 required
//                                 fullWidth
//                                 error={error && !inputs.phoneNo}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <Phone size={20} color="#777" />
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                             {error && !inputs.phoneNo && (
//                                 <FormHelperText error>Please enter your phone number</FormHelperText>
//                             )}
//                         </Grid>

//                         <Grid item xs={12} md={4}>
//                             <InputLabel htmlFor="alternateNumber">Alternate No</InputLabel>
//                             <InputField
//                                 type="number"
//                                 name="alternateNumber"
//                                 id="alternateNumber"
//                                 value={inputs.alternateNumber}
//                                 onChange={handleInputs}
//                                 fullWidth
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <Phone size={20} color="#777" />
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                         </Grid>

//                         <Grid item xs={12} md={4}>
//                             <InputLabel htmlFor="comfortWith">Comfort with</InputLabel>
//                             <SelectField fullWidth required error={error && !inputs.comfortWith}>
//                                 <Select
//                                     name="comfortWith"
//                                     id="comfortWith"
//                                     onChange={handleInputs}
//                                     value={inputs.comfortWith}
//                                     startAdornment={
//                                         <InputAdornment position="start">
//                                             <Car size={20} color="#777" />
//                                         </InputAdornment>
//                                     }
//                                 >
//                                     <MenuItem value="">Select</MenuItem>
//                                     <MenuItem value="Automatic">Automatic</MenuItem>
//                                     <MenuItem value="Manual">Manual</MenuItem>
//                                     <MenuItem value="Both">Both</MenuItem>
//                                 </Select>
//                                 {error && !inputs.comfortWith && (
//                                     <FormHelperText error>Please select your comfort level</FormHelperText>
//                                 )}
//                             </SelectField>
//                         </Grid>

//                         <Grid item xs={12} md={4}>
//                             <InputLabel htmlFor="aadharNo">Aadhar No</InputLabel>
//                             <InputField
//                                 type="text"
//                                 name="aadharNo"
//                                 id="aadharNo"
//                                 value={inputs.aadharNo}
//                                 onChange={handleInputs}
//                                 required
//                                 fullWidth
//                                 error={error && !inputs.aadharNo}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <IdCard size={20} color="#777" />
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                             {error && !inputs.aadharNo && (
//                                 <FormHelperText error>Please enter your Aadhar number</FormHelperText>
//                             )}
//                         </Grid>

//                         <DriverApplyDropDowns
//                             selectedState={selectedState}
//                             setSelectedState={setSelectedState}
//                             selectedDistrict={selectedDistrict}
//                             setSelectedDistrict={setSelectedDistrict}
//                             selectedCity={selectedCity}
//                             setSelectedCity={setSelectedCity}
//                             error={error && (!selectedState || !selectedDistrict || !selectedCity)}
//                         />
//                         {error && (!selectedState || !selectedDistrict || !selectedCity) && (
//                             <Grid item xs={12}>
//                                 <FormHelperText error>Please select State, District, and City</FormHelperText>
//                             </Grid>
//                         )}

//                         <Grid item xs={12} md={12}>
//                             <InputLabel htmlFor="address">Address</InputLabel>
//                             <InputField
//                                 multiline
//                                 rows={3}
//                                 name="address"
//                                 id="address"
//                                 value={inputs.address}
//                                 onChange={handleInputs}
//                                 required
//                                 fullWidth
//                                 error={error && !inputs.address}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <Home size={20} color="#777" />
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                             {error && !inputs.address && (
//                                 <FormHelperText error>Please enter your address</FormHelperText>
//                             )}
//                         </Grid>

//                         <Grid item xs={12} md={6}>
//                             <label className="w-75" htmlFor="aadherCardDoc">Aadhar Card</label>
//                             <FlexBox>
//                                 <FileInput
//                                     type="file"
//                                     name="aadherCardDoc"
//                                     id="aadherCardDoc"
//                                     onChange={handleFileChange}
//                                     required
//                                     className="form-control w-75"
//                                 />
//                                 <FileLabel htmlFor="aadherCardDoc">
//                                     <span>
//                                         <FilePlus size={20} />
//                                     </span>
//                                     Choose File
//                                     {files.aadherCardDoc && (
//                                         <span style={{ marginLeft: '8px', color: 'green' }}>
//                                             &#10004;
//                                         </span>
//                                     )}
//                                 </FileLabel>
//                             </FlexBox>
//                             {error && !files.aadherCardDoc && (
//                                 <FormHelperText error>Please upload your Aadhar Card</FormHelperText>
//                             )}
//                         </Grid>
//                     </Grid>

//                     <SubmitButton type="submit" fullWidth>
//                         {loading ? (
//                             <>
//                                 <TailSpin width={20} height={20} color="white" />
//                                 <span style={{ marginLeft: '8px' }}>Submitting...</span>
//                             </>
//                         ) : (
//                             'SUBMIT'
//                         )}
//                     </SubmitButton>
//                 </form>
//             </FormCard>
//         </>
//     );
// }

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Grid,
    Card,
    Typography,
    Box,
    InputAdornment,
    Paper,
    Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Input } from '@mui/material';
import ReactSelect from 'react-select';
import regionsData from '../data/regions.json';
import {
    User,
    VenusAndMars,
    Phone,
    MapPin,
    File,
    Car,
    IdCard,
    Home,
    FilePlus
} from 'lucide-react';
import FlagIcon from '@mui/icons-material/Flag';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';


const StyledFileLabel = styled('label')({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1rem',
    marginTop: '1rem',
    backgroundColor: '#f5f5f5',
    border: '2px dashed #ccc',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    color: '#444',
    transition: 'background-color 0.2s ease-in-out',
    '&:hover': {
        backgroundColor: '#e0e0e0',
    },
});

const FilePluss = styled('span')({
    display: 'inline-block',
    fontSize: '1rem',
});

// Styled Components for enhanced UI
const FormCard = styled(Card)(({ theme }) => ({
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    backgroundColor: 'white',
}));

const FormTitle = styled(Typography)({
    textAlign: 'center',
    marginBottom: '2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
});

const InputField = styled(TextField)(({ theme }) => ({
    marginBottom: '1.5rem',
    '& .MuiInputBase-root': {
        borderRadius: '8px',
    },
    '& .MuiInputLabel-root': {
        color: '#555', // Label color
    },
    '& .MuiInputBase-input': {
        padding: '10px 14px',
        fontSize: '1rem',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ddd', // Border color
        },
        '&:hover fieldset': {
            borderColor: '#3498db', // Hover border
        },
        '&.Mui-focused fieldset': {
            borderColor: '#3498db', // Focused border
            boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)', // Focus shadow
        },
    },
    '& .MuiFormHelperText-root': {
        marginTop: '4px',
        color: theme.palette.error.main,
    },
}));

const SelectField = styled(FormControl)(({ theme }) => ({
    marginBottom: '1.5rem',
    '& .MuiInputBase-root': {
        borderRadius: '8px',
    },
    '& .MuiInputLabel-root': {
        color: '#555', // Label color
    },
    '& .MuiInputBase-input': {
        padding: '10px 14px',
        fontSize: '1rem',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ddd', // Border color
        },
        '&:hover fieldset': {
            borderColor: '#3498db', // Hover border
        },
        '&.Mui-focused fieldset': {
            borderColor: '#3498db', // Focused border
            boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)', // Focus shadow
        },
    },
    '& .MuiFormHelperText-root': {
        marginTop: '4px',
        color: theme.palette.error.main,
    },
}));

const SubmitButton = styled(Button)({
    marginTop: '1rem',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    fontWeight: 'semibold',
    backgroundColor: '#3498db',
    color: 'white',
    '&:hover': {
        backgroundColor: '#217dbb',
    },
});

const FileInput = styled(Input)({
    display: 'none',
});

const FileLabel = styled(Button)(({ theme, hasfile }) => ({ // Added hasfile prop
    marginTop: '1rem',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontWeight: 'semibold',
    backgroundColor: hasfile ? '#e0e0e0' : '#e0e0e0', // Changed based on hasfile
    color: '#333',
    '&:hover': {
        backgroundColor: hasfile ? '#d0d0d0' : '#d0d0d0', // Changed based on hasfile
    },
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& span': {
        marginRight: '0.5rem',
    },
    ...(hasfile && { // Added styles for when a file is selected.
        backgroundColor: '#e0e0e0', // Keep background the same
        color: '#333',
        '&:hover': {
            backgroundColor: '#d0d0d0'
        }
    })
}));

const FlexBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem'
});

// ===============================
// Driver Apply Dropdowns Component
// ===============================  

const DriverApplyDropDowns = ({
    selectedState,
    setSelectedState,
    selectedDistrict,
    setSelectedDistrict,
    selectedCity,
    setSelectedCity,
    error,
}) => {
    const [allStates] = useState(regionsData.regions);
    const [allDistricts, setAllDistricts] = useState([]);
    const [allCities, setAllCities] = useState([]);

    useEffect(() => {
        if (selectedState) {
            const stateData = allStates.find(region => region.state === selectedState);
            setAllDistricts(stateData?.districts || []);
            setSelectedDistrict(null); // reset district and city when state changes
            setSelectedCity(null);
        } else {
            setAllDistricts([]);
            setSelectedDistrict(null);
            setSelectedCity(null);
        }
    }, [selectedState]);

    useEffect(() => {
        if (selectedDistrict) {
            const cityData = selectedDistrict.city?.map(city => ({ value: city, label: city })) || [];
            setAllCities(cityData);
            setSelectedCity(null); // reset city when district changes
        } else {
            setAllCities([]);
            setSelectedCity(null);
        }
    }, [selectedDistrict]);

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
    };

    const handleDistrictChange = (e) => {
        const districtObj = allDistricts.find(d => d.district === e.target.value);
        setSelectedDistrict(districtObj || null);
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    return (
        <>
        
            <Grid item xs={12} md={4}>
                <FormControl fullWidth error={error && !selectedState}>
                    <InputLabel id="state-label">
                        <div className='d-flex align-items-center gap-1'>
                            <FlagIcon sx={{ width: 18 }} /> State
                        </div>
                    </InputLabel>
                    <Select
                        labelId="state-label"
                        id="state"
                        value={selectedState || ''}
                        onChange={handleStateChange}
                        label="State"
                        sx={{ height: 56, width: selectedState ? "100%" : 110 }}
                    >
                        {allStates.map((state) => (
                            <MenuItem key={state.state} value={state.state}>
                                {state.state}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && !selectedState && (
                        <FormHelperText>Please select a state</FormHelperText>
                    )}
                </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
                <FormControl fullWidth error={error && !selectedDistrict}>
                    <InputLabel id="district-label">
                        <div className='d-flex align-items-center gap-1'>
                            <MapIcon sx={{ width: 18 }} /> District
                        </div>
                    </InputLabel>
                    <Select
                        labelId="district-label"
                        id="district"
                        value={selectedDistrict?.district || ''}
                        onChange={handleDistrictChange}
                        label="District"
                        disabled={!selectedState}
                        sx={{ height: 56, width: selectedDistrict ? "100%" : 130 }}
                    >
                        {allDistricts.map((district) => (
                            <MenuItem key={district.district} value={district.district}>
                                {district.district}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && !selectedDistrict && (
                        <FormHelperText>Please select a district</FormHelperText>
                    )}
                </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
                <FormControl fullWidth error={error && !selectedCity}>
                    <InputLabel id="city-label">
                        <div className='d-flex align-items-center gap-1'>
                            <HomeIcon sx={{ width: 18 }} /> City
                        </div>
                    </InputLabel>
                    <Select
                        labelId="city-label"
                        id="city"
                        value={selectedCity || ''}
                        onChange={handleCityChange}
                        label="City"
                        disabled={!selectedDistrict}
                        sx={{ height: 56, width: selectedCity ? "100%" : 100 }}
                    >
                        {allCities.map((city) => (
                            <MenuItem key={city.value} value={city.value}>
                                {city.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && !selectedCity && (
                        <FormHelperText>Please select a city</FormHelperText>
                    )}
                </FormControl>
            </Grid>
        </>
    );
};




// ===============================
// Main Apply Driver Component
// ===============================
export default function ApplyDriver() {
    const { userID } = useSelector(state => state.checkUserLoginSlice);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        address: "",
        aadharNo: "",
        gender: "",
        phoneNo: "",
        alternateNumber: "",
        comfortWith: ""
    });
    const [inputsValidation, setInputsValidation] = useState({
        aadharNo: "",
        phoneNo: "",
        alternateNumber: "",
    });

    const [files, setFiles] = useState({
        aadherCardDoc: null,
        aadherCardPreview: null
    });


    const [error, setError] = useState(false);


    // const handleFileChange = (e) => {
    //     const { name, files: selectedFiles } = e.target;
    //     setFiles((prevFiles) => ({
    //         ...prevFiles,
    //         [name]: selectedFiles[0], // Single file for other fields
    //     }));
    // };
    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        const file = selectedFiles[0];

        if (file && file.type.startsWith('image/')) {
            const previewUrl = URL.createObjectURL(file);
            setFiles((prev) => ({
                ...prev,
                [name]: file,
                aadherCardPreview: previewUrl,
            }));
        } else {
            setFiles((prev) => ({
                ...prev,
                [name]: file,
                aadherCardPreview: null,
            }));
        }
    };


    const handleUpload = (e) => {
        e.preventDefault();

        if (!userID) {
            toast.warning("Login first", { autoClose: 750 });
            setTimeout(() => {
                navigate('/renteasee/login');
            }, 1000);
            return;
        }

        const requiredFields = [
            'name',
            'address',
            'aadharNo',
            'gender',
            'phoneNo',
            'comfortWith',
        ];

        const isAllRequiredFilled = requiredFields.every(field => inputs[field]);

        if (!isAllRequiredFilled || !selectedState || !selectedDistrict || !selectedCity || !files.aadherCardDoc) {
            toast.error("Please fill in all required fields and location information, and upload the required documents.");
            setError(true);
            return;
        }
        setError(false);

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
                uploadPromises.push(
                    uploadFile(file, `${key}/${file.name}`).then((url) => {
                        uploadResults[key] = url;
                    })
                );
            }
        }

        // Once all uploads are complete
        Promise.all(uploadPromises)
            .then(() => {
                saveToMongoDB(uploadResults);
            })
            .catch((error) => {
                console.error('Failed to upload all files:', error);
                setLoading(false);
                toast.error("Failed to upload files.");
            });
    };

    const saveToMongoDB = async (uploadResults) => {
        try {
            const response = await fetch(process.env.REACT_APP_BASE_URL + 'new-driver', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageUrls: uploadResults,
                    inputs,
                    selectedState,
                    selectedDistrict: selectedDistrict[0]?.district,
                    selectedCity
                })
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
    }, []);

    function handleInputs(e) {
        const name = e.target.name;
        let value = e.target.value;

        if (name === 'aadharNo') {
            if (!isNaN(value.split(' ').join(''))) {
                if (value.length === 0) {
                    setInputsValidation({ ...inputsValidation, [name]: '' });
                } else if (value.length === 14) {
                    setInputsValidation({ ...inputsValidation, [name]: true });
                } else if (value.length < 15) {
                    if (inputs.aadharNo.length < value.length && (value.length === 4 || value.length === 9)) {
                        value += " ";
                    } else if (inputs.aadharNo.length > value.length && (value.length === 5 || value.length === 10)) {
                        value = value.slice(0, value.length - 1);
                    }
                    setInputsValidation({ ...inputsValidation, [name]: false });
                } else {
                    value = inputs.aadharNo;
                }
            } else {
                value = inputs.aadharNo;
            }
        } else if (name === "phoneNo" && value.length > 10) {
            value = inputs.phoneNo;
        } else if (name === "alternateNumber" && value.length > 10) {
            value = inputs.alternateNumber;
        }

        setInputs({ ...inputs, [name]: value });
    }

    return (
        <>
            <Helmet>
                <title>RentEasee | Apply for Driver</title>
            </Helmet>
            {loading && (
                <div className="bg-dark p-2 d-flex flex-column align-items-center" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                    <TailSpin />
                </div>
            )}
            {/* <div style={{marginTop:"100px",padding:'10px'}}> */}
            <Container maxWidth="md" sx={{ mt: 16, mb: 6 }}>
                <FormTitle variant="h4">Become a Driver with Us</FormTitle>
                <Paper elevation={3} sx={{ p: 3, boxShadow: '1px 1px 10px 0px rgba(0,0,0,.1)' }}>

                    <form onSubmit={handleUpload} encType="multipart/form-data">
                        <Grid container spacing={2} alignItems="stretch">
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={<div className='d-flex align-items-center gap-1'><User size={18} />Name</div>}
                                    name="name"
                                    id="name"
                                    value={inputs.name}
                                    onChange={handleInputs}
                                    error={error && !inputs.name}
                                    sx={{ height: 56 }}
                                />
                                {error && !inputs.name && (
                                    <FormHelperText error>Please enter your name</FormHelperText>
                                )}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={error && !inputs.gender}>
                                    <InputLabel id="gender-label" className='d-flex align-items-center gap-1' ><VenusAndMars size={18} sx={{ mr: 1 }} />Gender</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        name="gender"
                                        id="gender"
                                        onChange={handleInputs}
                                        value={inputs.gender}
                                        sx={{ height: 56, width: inputs.gender.length == 0 ? 130 : "100%" }}
                                        label="Gender"
                                        required
                                    >
                                        {/* <MenuItem value="">Select</MenuItem> */}
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Others">Others</MenuItem>
                                    </Select>
                                    {error && !inputs.gender && (
                                        <FormHelperText error>Please select your gender</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={<div className='d-flex align-items-center gap-1'><Phone size={18} />Phone No</div>}
                                    type="number"
                                    name="phoneNo"
                                    id="phoneNo"
                                    value={inputs.phoneNo}
                                    onChange={handleInputs}
                                    error={error && !inputs.phoneNo}
                                    sx={{ height: 56 }}
                                />
                                {error && !inputs.phoneNo && (
                                    <FormHelperText error>Please enter your phone number</FormHelperText>
                                )}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={<div className='d-flex align-items-center gap-1'><Phone size={18} />Alternate No</div>}
                                    type="number"
                                    name="alternateNumber"
                                    id="alternateNumber"
                                    value={inputs.alternateNumber}
                                    onChange={handleInputs}
                                    sx={{ height: 56 }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={error && !inputs.comfortWith}>
                                    <InputLabel id="comfortWith-label" className='d-flex align-items-center gap-1'><Car size={18} />Comfort</InputLabel>
                                    <Select
                                        labelId="comfortWith-label"
                                        name="comfortWith"
                                        id="comfortWith"
                                        onChange={handleInputs}
                                        value={inputs.comfortWith}
                                        sx={{ height: 56, width: inputs.comfortWith.length == 0 ? 130 : "100%" }}
                                        label="Comfort With"
                                        required
                                    >
                                        {/* <MenuItem value="">Select</MenuItem> */}
                                        <MenuItem value="Automatic">Automatic</MenuItem>
                                        <MenuItem value="Manual">Manual</MenuItem>
                                        <MenuItem value="Both">Both</MenuItem>
                                    </Select>
                                    {error && !inputs.comfortWith && (
                                        <FormHelperText error>Please select your comfort level</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={<div className='d-flex align-items-center gap-1'><IdCard size={18} />Aadhar No</div>}
                                    type="text"
                                    name="aadharNo"
                                    id="aadharNo"
                                    value={inputs.aadharNo}
                                    onChange={handleInputs}
                                    error={error && !inputs.aadharNo}
                                    sx={{ height: 56 }}

                                />
                                {error && !inputs.aadharNo && (
                                    <FormHelperText error>Please enter your Aadhar number</FormHelperText>
                                )}
                            </Grid>

                            <DriverApplyDropDowns
                                selectedState={selectedState}
                                setSelectedState={setSelectedState}
                                selectedDistrict={selectedDistrict}
                                setSelectedDistrict={setSelectedDistrict}
                                selectedCity={selectedCity}
                                setSelectedCity={setSelectedCity}
                                error={error && (!selectedState || !selectedDistrict || !selectedCity)}
                            />

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label={<div className='d-flex align-items-center gap-1'><Home size={18} />Address</div>}
                                    multiline
                                    rows={3}
                                    name="address"
                                    id="address"
                                    value={inputs.address}
                                    onChange={handleInputs}
                                    error={error && !inputs.address}
                                // sx={{ marginTop: '1.5rem' }}

                                />
                                {error && !inputs.address && (
                                    <FormHelperText error>Please enter your address</FormHelperText>
                                )}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FlexBox>

                                    <div>
                                        <label className="" htmlFor="aadherCardDoc" style={{ fontWeight: 'bold' }}>Aadhar Card</label>
                                        <FlexBox>
                                            {/* Hidden native file input */}
                                            <input
                                                type="file"
                                                name="aadherCardDoc"
                                                id="aadherCardDoc"
                                                onChange={handleFileChange}
                                                className="custom-file-input d-none"
                                                required
                                            />

                                            {/* Styled label acting as file upload button */}
                                            <StyledFileLabel htmlFor="aadherCardDoc">
                                                {/* <span><FilePluss size={20} /></span> */}
                                                {files.aadherCardDoc ? <span>File Selected <span className='text-success'>✔</span></span> : 'Choose File'}
                                            </StyledFileLabel>



                                        </FlexBox>
                                    </div>
                                    {files.aadherCardPreview && (
                                        <img
                                            src={files.aadherCardPreview}
                                            alt="Aadhar Preview"
                                            style={{ marginLeft: '20px', maxHeight: '100px', objectFit: 'fit', borderRadius: '8px', boxShadow: '1px 1px 20px 0px rgba(0,0,0,.3)' }}
                                        />
                                    )}

                                    {error && !files.aadherCardDoc && (
                                        <FormHelperText error>Please upload your Aadhar Card</FormHelperText>
                                    )}
                                </FlexBox>

                            </Grid>

                        </Grid>
                        <SubmitButton type="submit" fullWidth>
                            {loading ? (
                                <>
                                    <TailSpin width={20} height={20} color="white" />
                                    <span style={{ marginLeft: '8px' }}>Submitting...</span>
                                </>
                            ) : (
                                'SUBMIT'
                            )}
                        </SubmitButton>
                    </form>
                    {/* </div> */}
                </Paper>
            </Container>
        </>
    );
}

