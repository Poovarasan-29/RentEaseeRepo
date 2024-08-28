import React, { useEffect, useState } from "react";
import carsData from '../data/cars.json';
import '../css/newcarpost.css';
import regionData from '../data/regions.json';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";



export default function NewCar() {
    const { userID } = useSelector(state => state.checkUserLoginSlice);

    const [inputs, setInputs] = useState({ brand: '', model: '', manufacturedYear: '', fuelType: '', fuelCapacity: '', noOfOwners: '', transmission: '', ac: '', vechileNo: '', depositAmountDay: '', depositAmountMonth: '', rentAmountDay: '', rentAmountMonth: '', carLocation: '', address: '', milage: '', KMdriven: '', noOfSeats: '', status: '', state: '', district: '', city: '', description: '', phoneNo: '' })
    const [displayImages, setDisplayImages] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [allStates, setAllStates] = useState(regionData.regions.map(region => region.state));
    const [allDistricts, setAllDistricts] = useState([]);
    const [allCities, setAllCities] = useState([]);
    const [check, setCheck] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function getBrands() {
        let values = []
        for (let car of carsData.cars) {
            values.push(car.brand);
        }
        return values.sort();
    }

    const [files, setFiles] = useState({
        carPhotos: [], // Array to store multiple car photos
        insuranceDocument: null,
    });

    const handleFileChange = (e) => {
        if (!userID) {
            toast.warning("Login first", { autoClose: 750 });
            setTimeout(() => {
                navigate('/renteasee/login');
            }, 1000)
        }
        else {
            const { name, files: selectedFiles } = e.target;
            if (name === 'carPhotos') {
                if (selectedFiles.length !== 5) {
                    alert('Please upload exactly 5 car photos.');
                    return;
                }
                setFiles((prevFiles) => ({
                    ...prevFiles,
                    [name]: Array.from(selectedFiles),
                }));
                const combineImagesForDisplay = []
                for (let i = 0; i < selectedFiles.length; i++) {
                    combineImagesForDisplay.push(URL.createObjectURL(selectedFiles[i]))
                }
                setDisplayImages(preImgs => [...preImgs, ...combineImagesForDisplay]);
            } else {
                setFiles((prevFiles) => ({
                    ...prevFiles,
                    [name]: selectedFiles[0], // Single file for other fields
                }));
            }
        }
    };

    const handleUpload = (e) => {
        e.preventDefault()
        setLoading(true);
        const uploadPromises = [];
        const uploadResults = {};

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
                if (Array.isArray(file)) {
                    // For car photos (multiple files)
                    const carPhotoUploads = file.map((photo, index) =>
                        uploadFile(photo, `carPhotos/${index + 1}_${photo.name}`)
                    );
                    uploadPromises.push(
                        Promise.all(carPhotoUploads).then((urls) => {
                            uploadResults[key] = urls;
                        })
                    );
                } else {
                    // For single file fields
                    uploadPromises.push(
                        uploadFile(file, `${key}/${file.name}`).then((url) => {
                            uploadResults[key] = url;
                        })
                    );
                }
            }
        }

        // Once all uploads are complete
        Promise.all(uploadPromises)
            .then(() => {
                saveToMongoDB(uploadResults);
            })
            .catch((error) => {
                console.error('Failed to upload all files:', error);
            });
    };

    const saveToMongoDB = async (uploadResults) => {
        try {
            const response = await fetch(process.env.REACT_APP_BASE_URL + 'new-car', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrls: uploadResults, inputs })
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
        setBrands(getBrands())
    }, [])

    function handleInputs(e) {
        if (!userID) {
            toast.warning("Login first", { autoClose: 750 });
            setTimeout(() => {
                navigate('/renteasee/login');
            }, 1000)
        }
        else {
            setCheck(false)
            const name = e.target.name;
            const value = e.target.value;

            if (name === "phoneNo" && value.length < 11) {
                setInputs((previousValue) => { return { ...previousValue, [name]: value } });
            }
            else if (name !== 'phoneNo') {
                setInputs((previousValue) => { return { ...previousValue, [name]: value } });
            }
            if (name === "brand") {
                const foundBrand = carsData.cars.filter(car => car.brand === value)
                setModels(foundBrand[0].models)
            } else if (name === "state") {
                const districtsWithCity = regionData.regions.filter(state => state.state === value)[0].districts;
                setInputs((previousValue) => { return { ...previousValue, [name]: value, district: '', city: '' } });
                setAllDistricts(districtsWithCity);
            } else if (name === "district") {
                const citiesWithDistrict = allDistricts.filter(dist => dist.district === value)[0].city;
                setInputs((previousValue) => { return { ...previousValue, [name]: value, city: '' } });
                setAllCities(citiesWithDistrict);
            }
        }

    }


    // function removeImage(e) {
    //     const imgIndex = e.target.getAttribute('dataindex');
    //     const imgSrc = e.target.getAttribute('datasrc');
    //     setDisplayImages(displayImages.filter(img => img !== imgSrc))
    //     setStoreImages(storeImages.filter((img, index) => index !== Number(imgIndex)))
    // }


    return <>
        <Helmet>
            <title>RentEasee | Rent my Car</title>
        </Helmet>
        <div className="container-sm" style={{ marginTop: '120px' }}>
            <h2 className="text-center text-dark text-uppercase fw-bold">Add Your Vehicle to Our Rental Service</h2>
            {
                loading && <div className="bg-dark p-2 d-flex flex-column align-items-center" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                    <TailSpin />
                </div>

            }
            <form className="row my-3 mb-5 row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" onSubmit={handleUpload}>
                <div className="col">
                    <label htmlFor="brand">Brand</label>
                    <select name="brand" id="brand" required onChange={handleInputs} value={inputs.brand} className="form-control w-75">
                        <option></option>
                        {brands.map((brand, index) =>
                            <option value={brand} key={index}>{brand}</option>
                        )}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="model">Model</label>
                    <select name="model" id="" disabled={models.length !== 0 ? false : true} required onChange={handleInputs} value={inputs.model} className="form-control w-75">
                        <option></option>
                        {models.map((model, index) =>
                            <option value={model} key={index}>{model}</option>
                        )}
                    </select>
                </div>

                <div className="col">
                    <label htmlFor="manufacturedYear">Manufactured Year</label>
                    <input type="number" name="manufacturedYear" id="manufacturedYear" value={inputs.manufacturedYear} onChange={handleInputs} required className="form-control w-75" />
                </div>

                <div className="col">
                    <label htmlFor="fuelType">Fuel Type</label>
                    <select name="fuelType" id="fuelType" required onChange={handleInputs} value={inputs.fuelType} className="form-control w-75">
                        <option></option>
                        <option value="Diesal">Diesal</option>
                        <option value="Petrol">Petrol</option>
                        <option value="EV">EV</option>
                    </select>
                </div>

                <div className="col">
                    <label htmlFor="fuelCapacity">Fuel Capacity</label>
                    <input type="number" name="fuelCapacity" id="fuelCapacity" onChange={handleInputs} value={inputs.fuelCapacity} required className="form-control w-75" />
                </div>

                <div className="col">
                    <label htmlFor="noOfOwners">No of Owners</label>
                    <select name="noOfOwners" id="noOfOwners" required onChange={handleInputs} value={inputs.noOfOwners} className="form-control w-75">
                        <option></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4+">4+</option>
                    </select>
                </div>

                <div className="col">
                    <label htmlFor="transmission">Transmission</label>
                    <select name="transmission" id="transmission" required onChange={handleInputs} value={inputs.transmission} className="form-control w-75">
                        <option></option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                    </select>
                </div>

                <div className="col">
                    <label htmlFor="ac">A/C</label>
                    <select name="ac" id="ac" required onChange={handleInputs} value={inputs.ac} className="form-control w-75">
                        <option></option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className="col">
                    <label htmlFor="vechileNo">Vechile No</label>
                    <input type="text" name="vechileNo" id="vechileNo" onChange={handleInputs} value={inputs.vechileNo} required className="form-control w-75" />
                </div>

                <div className="col">
                    <label htmlFor="depositAmountDay">Deposit Amount/Day</label>
                    <input type="number" name="depositAmountDay" id="depositAmountDay" onChange={handleInputs} value={inputs.depositAmountDay} required className="form-control w-75" />
                </div>

                <div className="col">
                    <label htmlFor="depositAmountMonth">Deposit Amount/Month</label>
                    <input type="number" name="depositAmountMonth" id="depositAmountMonth" onChange={handleInputs} value={inputs.depositAmountMonth} required className="form-control w-75" />
                </div>

                <div className="col">
                    <label htmlFor="rentAmountDay">Rent Amount/Day</label>
                    <input type="number" name="rentAmountDay" id="rentAmountDay" onChange={handleInputs} value={inputs.rentAmountDay} required className="form-control w-75" />
                </div>

                <div className="col">
                    <label htmlFor="rentAmountMonth">Rent Amount/Month</label>
                    <input type="number" name="rentAmountMonth" id="rentAmountMonth" onChange={handleInputs} value={inputs.rentAmountMonth} required className="form-control w-75" />
                </div>

                <div className="col">
                    <label htmlFor="address">Address</label>
                    <textarea name="address" id="address" className="form-control w-75" required onChange={handleInputs} value={inputs.address} rows={'2'} style={{ resize: 'none', fontSize: '13px' }}></textarea>
                </div>

                <div className="col">
                    <label htmlFor="carLocation">Car Location</label>
                    <textarea name="carLocation" id="carLocation" className="form-control w-75" required onChange={handleInputs} rows={'2'} value={inputs.carLocation} style={{ resize: 'none', fontSize: '13px' }}></textarea>
                </div>

                <div className="col">
                    <label htmlFor="milage">Milage/Litre</label>
                    <input type="number" name="milage" id="milage" onChange={handleInputs} value={inputs.milage} required className="form-control w-75" />
                </div>
                <div className="col">
                    <label htmlFor="KMdriven">KM Driven</label>
                    <input type="number" name="KMdriven" id="KMdriven" onChange={handleInputs} value={inputs.KMdriven} required className="form-control w-75" />
                </div>
                <div className="col">
                    <label htmlFor="noOfSeats">No of Seats</label>
                    <input type="number" name="noOfSeats" id="noOfSeats" onChange={handleInputs} value={inputs.noOfSeats} required className="form-control w-75" />
                </div>

                <div className="col">
                    <label htmlFor="status">Status</label>
                    <select name="status" id="status" required onChange={handleInputs} value={inputs.status} className="form-control w-75">
                        <option></option>
                        <option value="Immediately">Immediately</option>
                        <option value="Need Service">Need Service</option>
                    </select>

                </div>



                <div className="col">
                    <label htmlFor="state">State</label>
                    <select name="state" id="state" required onChange={handleInputs} value={inputs.state} className="form-control w-75">
                        <option></option>
                        {allStates.map((state, index) =>
                            <option value={state} key={index}>{state}</option>
                        )}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="district">District</label>
                    <select name="district" id="district" required onChange={handleInputs} disabled={inputs.state ? false : true} value={inputs.district} className="form-control w-75">
                        <option></option>
                        {allDistricts.map((dist, index) =>
                            <option value={dist.district} key={index}>{dist.district}</option>
                        )}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="city">City</label>
                    <select name="city" id="city" required onChange={handleInputs} disabled={inputs.district && inputs.state ? false : true} value={inputs.city} className="form-control w-75">
                        <option></option>
                        {allCities.map((city, index) =>
                            <option value={city} key={index}>{city}</option>
                        )}
                    </select>
                </div>

                {/* <div className="col">
                    <label htmlFor="district">District</label>
                    <input type="text" name="district" id="district" onChange={handleInputs} value={inputs.district} required className="form-control w-75" />
                </div> */}



                <div className="col">
                    <label htmlFor="insuranceDocument">Insurance Document</label>
                    <input type="file" name="insuranceDocument" id="insuranceDocument" onChange={handleFileChange} required className="form-control w-75" />
                </div>

                <div className="col">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" placeholder="Not mandatory || Use for writing other Features" className="form-control w-75" onChange={handleInputs} value={inputs.description} rows={'4'} style={{ resize: 'none', fontSize: '13px' }}></textarea>
                </div>

                <div className="col">
                    <label htmlFor="phoneNo">Phone No</label>
                    <input type="number" name="phoneNo" id="phoneNo" onChange={handleInputs} value={inputs.phoneNo} required className="form-control w-75" />
                </div>


                <div className="col">
                    <div className="col-12 col-lg-6">
                        <div className="input-group flex-column">
                            <label className="pb-1">Add Images</label>
                            <input type="file" name="carPhotos" required multiple
                                onChange={handleFileChange} />
                            {check && <p style={{ fontSize: '11px' }} className="me-5 pe-3 text-danger">5 Images Mandatory</p>}

                        </div>
                    </div>
                </div>
                {/* <div></div> */}
                <div className="col-12 d-flex g-5 row-cols-lg-6 row-cols-sm-3 row-cols-3 flex-wrap" style={{ width: '100%' }}>
                    {/* {
                        displayImages.map((img, index) =>
                            <div className="mt-2 position-relative hoverToDeleteImgContainer" dataindex={index} datasrc={img} key={index} onClick={removeImage}>
                                <img src={img} alt={img} title={img} className="img-fluid border p-1 hoverToDeleteImg " style={{ height: "120px" }} />
                            </div>
                        )
                    } */}
                    {
                        displayImages.map((img, index) =>
                            <div className="mt-2 position-relative" dataindex={index} datasrc={img} key={index}>
                                <img src={img} alt={img} title={img} className="img-fluid border p-1 " style={{ height: "120px" }} />
                            </div>
                        )
                    }
                </div>

                <div className=" w-100 d-flex  flex-column align-items-end justify-content-end  pe-5">
                    <button className="btn btn-success p-2 w-25  form-control me-5">POST</button>
                </div>

            </form>
        </div>
    </>
}