// import '../css/cardetails.css';
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { Helmet } from 'react-helmet-async';
// import DriverCardSkeleton from '../skeleton/DriverCardSkeleton';


// export default function CarDetails() {

//    const { id } = useParams();
//    const [carDetails, setCarDetails] = useState([]);
//    const [relatedCars, setRelatedCars] = useState([]);
//    const [defaultFirstImage, setDefaultFirstImage] = useState();
//    const [loading, setLoding] = useState(true);

//    async function fetchCarDetails() {
//       const response = await axios.get(process.env.REACT_APP_BASE_URL + "car-details/" + id);
//       setCarDetails(response.data);

//       const relatedCarsRes = await axios.get(process.env.REACT_APP_BASE_URL + "related-cars", { params: { model: response.data.model, brand: response.data.brand, fuelType: response.data.fuelType } });
//       setRelatedCars(relatedCarsRes.data.filter(car => car._id !== id));
//       setDefaultFirstImage(response.data.carPhotos[0]);
//       setLoding(false);
//    }

//    function handleImageClicked(e) {
//       setDefaultFirstImage(e.target.src);
//       e.target.src = defaultFirstImage
//    }


//    useEffect(() => {
//       setLoding(true);
//       fetchCarDetails();
//    }, [id])

//    return (

//       !loading ? <>
//          <Helmet>
//             <title>RentEasee | {carDetails.brand + " " + carDetails.model}</title>
//          </Helmet>
//          {
//             carDetails.carPhotos ?
//                <div className="container-lg" style={{ marginTop: '120px' }}>
//                   {/* <p className="text-center p-2 fs-3 fw-bold">Car Details</p> */}
//                   <div className="row row-cols-1 row-cols-md-2 m-4 p-3">
//                      {/* Flex */}
//                      <div className="col-md-7 col-12">
//                         <div className="row row-cols-1 p-2">
//                            {/* column Flex */}
//                            <div id="Img">
//                               <img src={defaultFirstImage} alt="" />
//                            </div>
//                            <div className="d-flex  align-items-center justify-content-between mt-2">
//                               {
//                                  carDetails.carPhotos.map((car, index) =>
//                                     index !== 0 && <div id="S_img" className="p-2" key={index}>
//                                        <img src={carDetails.carPhotos[index]} onClick={handleImageClicked} alt="" />
//                                     </div>
//                                  )
//                               }
//                            </div>
//                         </div>
//                      </div>
//                      <div className="col-md-5 col-12 mt-4 mt-md-0">
//                         <div className="row row-cols-1">
//                            {/* column Flex */}
//                            <div>
//                               <span id="model" className="fs-1">{carDetails.brand + " " + carDetails.model + " " + carDetails.manufacturedYear}</span>
//                               <br />
//                               <span>₹{carDetails.rentAmountDay} /Day</span>
//                               <br />
//                               <span>₹{carDetails.rentAmountMonth}/Month</span>
//                            </div>
//                            <div className="col p-1">
//                               <div className="d-flex flex-column justify-content-center border mt-2">
//                                  <span className="p-lg-3 p-2 fs-5 fw-bold">General Information</span>
//                                  <hr className="m-0" />
//                                  <div className="p-3 pe-0">
//                                     <table className="table table-sm table-borderless" id="tableWid">
//                                        <tbody>
//                                           <tr className="">
//                                              <td>
//                                                 <th
//                                                    className="d-block border-0 p-0 ps-lg-3"
//                                                    id="Name"
//                                                 >
//                                                    Fuel Type
//                                                 </th>
//                                                 <td
//                                                    className="p-0 border-0 ps-lg-3 pb-2"
//                                                    id="Caption"
//                                                 >
//                                                    {carDetails.fuelType}
//                                                 </td>
//                                              </td>
//                                              <td>
//                                                 <th
//                                                    className="d-block border-0 p-0 ps-lg-3"
//                                                    id="Name"
//                                                 >
//                                                    Fuel Capacity
//                                                 </th>
//                                                 <td
//                                                    className="p-0 border-0 ps-lg-3 pb-2"
//                                                    id="Caption"
//                                                 >
//                                                    {carDetails.fuelCapacity} Litre
//                                                 </td>
//                                              </td>
//                                           </tr>
//                                           <tr>
//                                              <td>
//                                                 <th
//                                                    className="d-block border-0 p-0 ps-lg-3"
//                                                    id="Name"
//                                                 >
//                                                    AC
//                                                 </th>
//                                                 <td
//                                                    className="p-0 border-0 ps-lg-3 pb-2"
//                                                    id="Caption"
//                                                 >
//                                                    {carDetails.ac}
//                                                 </td>
//                                              </td>
//                                              <td>
//                                                 <th
//                                                    className="d-block border-0 p-0 ps-lg-3"
//                                                    id="Name"
//                                                 >
//                                                    Mileage
//                                                 </th>
//                                                 <td
//                                                    className="p-0 border-0 ps-lg-3 pb-2"
//                                                    id="Caption"
//                                                 >
//                                                    {carDetails.milage} km
//                                                 </td>
//                                              </td>
//                                           </tr>
//                                           <tr>
//                                              <td>
//                                                 <th
//                                                    className="d-block border-0 p-0 ps-lg-3"
//                                                    id="Name"
//                                                 >
//                                                    Seats
//                                                 </th>
//                                                 <td
//                                                    className="p-0 border-0 ps-lg-3 pb-2"
//                                                    id="Caption"
//                                                 >
//                                                    {carDetails.noOfSeats}
//                                                 </td>
//                                              </td>
//                                              <td>
//                                                 <th
//                                                    className="d-block border-0 p-0 ps-lg-3"
//                                                    id="Name"
//                                                 >
//                                                    Status
//                                                 </th>
//                                                 <td
//                                                    className="p-0 border-0 ps-lg-3 pb-2"
//                                                    id="Caption"
//                                                 >
//                                                    {carDetails.status}
//                                                 </td>
//                                              </td>
//                                           </tr>
//                                           <tr>
//                                              <td>
//                                                 <th
//                                                    className="d-block border-0 p-0 ps-lg-3"
//                                                    id="Name"
//                                                 >
//                                                    Gear
//                                                 </th>
//                                                 <td
//                                                    className="p-0 border-0 ps-lg-3 pb-2"
//                                                    id="Caption"
//                                                 >
//                                                    {carDetails.transmission}
//                                                 </td>
//                                              </td>
//                                              <td>
//                                                 <th
//                                                    className="d-block border-0 p-0 ps-lg-3 "
//                                                    id="Name"
//                                                 >
//                                                    KMdriven
//                                                 </th>
//                                                 <td
//                                                    className="p-0 border-0 ps-lg-3 pb-2"
//                                                    id="Caption"
//                                                 >
//                                                    {carDetails.KMdriven} km
//                                                 </td>
//                                              </td>
//                                           </tr>
//                                        </tbody>
//                                     </table>
//                                  </div>
//                               </div>
//                            </div>
//                            {/* flex*/}
//                            <div className="text-center pt-3">
//                               <div className="row">
//                                  <div className="col">
//                                     <button className="p-2 rounded w-100 mt-2 text-white" style={{ fontWeight: "500", letterSpacing: "2px", backgroundColor: "rgba(22, 167, 22, 0.751)" }}>
//                                        &#9743;Contact</button>
//                                  </div>
//                               </div>
//                            </div>
//                            <div></div>
//                         </div>
//                      </div>
//                   </div>

//                   <div className="p-2 p-md-3">
//                      <div className="row gx-5 gy-2 row-cols-1 row-cols-md-2 ps-lg-5">
//                         <div className="col-md-5 col-12">
//                            <div className="p-3 border bg-light rounded">
//                               <p>
//                                  <b>More Details</b>
//                               </p>
//                               <table className="" id="More-Details">
//                                  <tbody>
//                                     <tr>
//                                        <td className="p-1">Security Deposit : ₹{carDetails.depositAmountDay} Day </td>
//                                     </tr>
//                                     <tr>
//                                        <td className="p-1">Security Deposit : ₹{carDetails.depositAmountMonth} Month </td>
//                                     </tr>
//                                     <tr>
//                                        <td className="p-1">District : {carDetails.district}</td>
//                                     </tr>
//                                     <tr>
//                                        <td className="p-1">City : {carDetails.city}</td>
//                                     </tr>
//                                     <tr>
//                                        <td className="p-1">
//                                           Owner : {carDetails.noOfOwners}{Number(carDetails.noOfOwners) === 1 ? <sup>st</sup> : Number(carDetails.noOfOwners) === 2 ? <sup>nd</sup> : Number(carDetails.noOfOwners) === 3 ? <sup>rd</sup> : <sup>th</sup>}
//                                        </td>
//                                     </tr>
//                                     <tr>
//                                        <td className="p-1">Posting Date : {new Date(carDetails.createdAt).getFullYear() + "-" + (new Date(carDetails.createdAt).getMonth() + 1) + "-" + new Date(carDetails.createdAt).getDate()}</td>
//                                     </tr>
//                                  </tbody>
//                               </table>
//                            </div>
//                         </div>
//                         <div className="col-md-6 col-12">
//                            <div className="p-3 ps-4 ms-lg-3 border bg-light rounded">
//                               <p>
//                                  <b>Description</b>
//                               </p>
//                               {carDetails.description}
//                            </div>
//                         </div>
//                      </div>
//                   </div>

//                   <p className=" p-2 fs-2 fw-bold">SIMILAR CARS</p>

//                   <div className="d-flex flex-column align-items-center justify-content-center p-2">
//                      <div className=" container-lg">
//                         <div className="row m-0 h-auto row-cols-lg-3 row-cols-md-2 row-cols-1 gy-sm-4">
//                            {
//                               relatedCars.map((car, index) =>
//                                  <div className="col" key={index}>
//                                     <div className="border p-1">
//                                        <div className="w-100">
//                                           <img src={car.carPhotos[0]} alt="car1-image" className="rounded" width={"400px"} height={"190px"} />
//                                        </div>
//                                        <div>
//                                           <div>
//                                              <p className=" pt-1 fs-5 " style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>{car.manufacturedYear + " " + car.brand + " " + car.model}</p>
//                                              <p className="" style={{ fontFamily: "sans-serif", fontWeight: "bold", fontSize: "17px" }}>
//                                                 {car.rentAmountDay} /Day | {car.rentAmountMonth} /Month
//                                              </p>
//                                              <div>
//                                                 <div className="row row-cols-2 gy-4">
//                                                    <div className="col">
//                                                       <p className="m-0 text-uppercase" style={{ fontWeight: "bold", fontSize: "17px" }}>District</p>
//                                                       <p className="m-0" >{car.district}</p>
//                                                    </div>
//                                                    <div className="col">
//                                                       <p className=" m-0" style={{ fontWeight: "bold", fontSize: "17px" }}>MILEAGE(KM)</p>
//                                                       <p className="m-0">{car.milage}</p>

//                                                    </div>
//                                                    <div className="col">
//                                                       <p className="m-0 text-uppercase" style={{ fontWeight: "bold", fontSize: "17px" }}>fuel</p>
//                                                       <p className="m-0">{car.fuelType}</p>

//                                                    </div>
//                                                    <div className="col">
//                                                       <p className="m-0" style={{ fontWeight: "bold", fontSize: "17px" }}>STATUS</p>
//                                                       <p className="m-0" >{car.status}</p>
//                                                    </div>
//                                                 </div>
//                                              </div>
//                                              <div className="w-100 mt-4">
//                                                 <Link to={`/renteasee/rent-cars/details/${car._id}`}>
//                                                    <button className="form-control w-50 mt-2" style={{ fontWeight: "500" }} >VIEW DETAILS 🡢</button>
//                                                 </Link>
//                                              </div>

//                                           </div>
//                                        </div>
//                                     </div>
//                                  </div>
//                               )
//                            }
//                         </div>
//                      </div>
//                   </div>

//                </div>
//                :

//                <div className="container-lg" style={{ marginTop: '200px' }}>
//                   <DriverCardSkeleton />
//                   <div style={{ margin: '100px 0px' }}></div>
//                   <DriverCardSkeleton />
//                </div>
//          }
//       </>
//          :
//          <div className="container-lg" style={{ marginTop: '200px' }}>
//             <DriverCardSkeleton />
//             <div style={{ margin: '100px 0px' }}></div>
//             <DriverCardSkeleton />
//          </div>
//    );
// }





// import '../css/cardetails.css';
// import { useEffect, useState, useRef } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { Helmet } from 'react-helmet-async';
// import DriverCardSkeleton from '../skeleton/DriverCardSkeleton';
// import {
//     Circle,
//     Fuel,
//     Droplet,
//     Snowflake,
//     Gauge,
//     Users,
//     CheckCircle,
//     Settings,
//     Navigation,
//     List,
//     Coins,
//     MapPin,
//     Building2,
//     User,
//     Calendar,
//     FileText,
//     Car,
//     ArrowRight,
//     Phone,
// } from 'lucide-react';

// export default function CarDetails() {
//     const { id } = useParams();
//     const [carDetails, setCarDetails] = useState(null);
//     const [relatedCars, setRelatedCars] = useState([]);
//     const [defaultFirstImage, setDefaultFirstImage] = useState('');
//     const [loading, setLoading] = useState(true);
//     const imageRefs = useRef([]); // Ref for thumbnail images


//     async function fetchCarDetails() {
//         try {
//             const response = await axios.get(process.env.REACT_APP_BASE_URL + "car-details/" + id);
//             setCarDetails(response.data);
//             setDefaultFirstImage(response.data.carPhotos?.[0] || '');

//             const relatedCarsRes = await axios.get(process.env.REACT_APP_BASE_URL + "related-cars", {
//                 params: {
//                     model: response.data.model,
//                     brand: response.data.brand,
//                     fuelType: response.data.fuelType,
//                 },
//             });
//             setRelatedCars(relatedCarsRes.data.filter((car) => car._id !== id));
//         } catch (error) {
//             console.error("Error fetching car details:", error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     const handleImageClicked = (clickedImageSrc, index) => {
//         setDefaultFirstImage(clickedImageSrc);

//         // Reset all thumbnail styles
//         imageRefs.current.forEach((imgRef) => {
//             if (imgRef) {
//                 imgRef.classList.remove('active'); // Remove active class
//             }
//         });

//         // Add active class to the clicked thumbnail
//         if (imageRefs.current[index]) {
//             imageRefs.current[index].classList.add('active');
//         }
//     };

//     useEffect(() => {
//         setLoading(true);
//         fetchCarDetails();
//     }, [id]);

//     if (loading) {
//         return (
//             <div className="container-lg py-4" style={{ marginTop: '80px' }}>
//                 <DriverCardSkeleton />
//                 <div className="my-3"></div>
//                 <DriverCardSkeleton />
//             </div>
//         );
//     }

//     if (!carDetails) {
//         return (
//             <div className="container-lg py-4" style={{ marginTop: '80px' }}>
//                 <p className="text-center fs-5 text-muted">Car details not found.</p>
//             </div>
//         );
//     }

//     const {
//         brand,
//         model,
//         manufacturedYear,
//         rentAmountDay,
//         rentAmountMonth,
//         fuelType,
//         fuelCapacity,
//         ac,
//         milage,
//         noOfSeats,
//         status,
//         transmission,
//         KMdriven,
//         depositAmountDay,
//         depositAmountMonth,
//         district,
//         city,
//         noOfOwners,
//         createdAt,
//         description,
//         carPhotos
//     } = carDetails;

//     const getOwnerSuffix = (num) => {
//         const suffixes = ["th", "st", "nd", "rd"];
//         const v = num % 100;
//         return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
//     };

//     const formatDate = (dateStr) => {
//         const date = new Date(dateStr);
//         return date.toLocaleDateString();
//     };

//     return (
//         <div className="container-lg py-4" style={{ marginTop: '80px' }}>
//             <Helmet>
//                 <title>RentEasee | {brand} {model}</title>
//             </Helmet>

//             <div className="row row-cols-1 row-cols-md-2 g-4 mb-4">
//                 <div className="col-md-7 d-flex">
//                     {carPhotos && carPhotos.length > 1 && (
//                         <div className="thumbnail-images d-flex flex-column me-2 overflow-auto" style={{ gap: '10px', maxHeight: '350px' }}>
//                             {carPhotos.map((photo, index) => {
//                                 if (index === 0) return null; // Exclude the first image
//                                 return (
//                                     <div
//                                         key={index}
//                                         className={`rounded-md overflow-hidden thumbnail-item ${defaultFirstImage === photo ? 'active' : ''}`}
//                                         style={{ width: '80px', height: '80px', minWidth: '80px', cursor: 'pointer' }}
//                                         onClick={() => handleImageClicked(photo, index)}
//                                         ref={(el) => { imageRefs.current[index] = el; }} // Store refs
//                                     >
//                                         <img
//                                             src={photo}
//                                             alt={`${brand} ${model} - ${index + 1}`}
//                                             className="img-fluid w-100 h-100 rounded"
//                                             style={{ objectFit: 'fill' }}
//                                         />
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                     <div className="main-image rounded-lg overflow-hidden" style={{ height: '350px', flexGrow: 1 }}>
//                         <img
//                             src={defaultFirstImage}
//                             alt={`${brand} ${model}`}
//                             className="img-fluid w-100 h-100 rounded-lg"
//                             style={{ objectFit: 'cover' }}
//                         />
//                     </div>
//                 </div>
//                 <div className="col-md-5">
//                     <h1 className="fs-3 fw-bold mb-2">{brand} {model} ({manufacturedYear})</h1>
//                     <p className="fs-4 mb-1">₹{rentAmountDay} / Day</p>
//                     <p className="fs-6 text-muted">₹{rentAmountMonth} / Month</p>

//                     <div className="mt-3">
//                         <h2 className="fs-6 fw-bold mb-2"><Circle className="me-2" size={18} /> Key Details</h2>
//                         <ul className="list-unstyled small">
//                             <li className="mb-1"><Fuel className="me-2" size={16} /> Fuel: {fuelType}</li>
//                             <li className="mb-1"><Droplet className="me-2" size={16} /> Capacity: {fuelCapacity} L</li>
//                             <li className="mb-1"><Gauge className="me-2" size={16} /> Mileage: {milage} km</li>
//                             <li className="mb-1"><Users className="me-2" size={16} /> Seats: {noOfSeats}</li>
//                             <li className="mb-1"><Settings className="me-2" size={16} /> Gear: {transmission}</li>
//                             <li className="mb-1"><Navigation className="me-2" size={16} /> Driven: {KMdriven} km</li>
//                             <li className="mb-1"><CheckCircle className="me-2" size={16} /> Status: {status}</li>
//                             <li className="mb-1"><Snowflake className="me-2" size={16} /> AC: {ac}</li>
//                         </ul>
//                     </div>

//                     <div className="mt-3">
//                         <div className="d-grid gap-2">
//                             <button className="btn btn-success btn-lg" type="button">
//                                 <Phone className="me-2" size={18} /> Contact for Booking
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="row mt-4">
//                 <div className="col-md-6">
//                     <div className="border rounded-md p-3 bg-light">
//                         <h2 className="fs-6 fw-bold mb-2"><List className="me-2" size={18} /> More Details</h2>
//                         <ul className="list-unstyled small">
//                             <li className="mb-1"><Coins className="me-2" size={16} /> Deposit (Day): ₹{depositAmountDay}</li>
//                             <li className="mb-1"><Coins className="me-2" size={16} /> Deposit (Month): ₹{depositAmountMonth}</li>
//                             <li className="mb-1"><MapPin className="me-2" size={16} /> District: {district}</li>
//                             <li className="mb-1"><Building2 className="me-2" size={16} /> City: {city}</li>
//                             <li className="mb-1">
//                                 <User className="me-2" size={16} /> Owner: {noOfOwners}
//                                 {getOwnerSuffix(Number(noOfOwners))}
//                             </li>
//                             <li className="mb-1"><Calendar className="me-2" size={16} /> Posted: {formatDate(createdAt)}</li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="col-md-6">
//                     {description && (
//                         <div className="p-3">
//                             <h2 className="fs-6 fw-bold mb-2"><FileText className="me-2" size={18} /> Description</h2>
//                             <p className="small">{description}</p>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {relatedCars.length > 0 && (
//                 <div className="mt-4">
//                     <h2 className="fs-5 fw-bold mb-3"><Car className="me-2" size={20} /> Similar Cars</h2>
//                     <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
//                         {relatedCars.map((car) => (
//                             <div className="col" key={car._id}>
//                                 <div className="card h-100 shadow-sm">
//                                     <Link to={`/renteasee/rent-cars/details/${car._id}`} className="text-decoration-none text-dark">
//                                         <div className="overflow-hidden" style={{ height: '180px' }}>
//                                             <img
//                                                 src={car.carPhotos[0]}
//                                                 className="card-img-top img-fluid w-100 h-100"
//                                                 alt={`${car.brand} ${car.model}`}
//                                                 style={{ objectFit: 'cover' }}
//                                             />
//                                         </div>
//                                         <div className="card-body">
//                                             <h6 className="card-title fw-bold mb-1">{car.manufacturedYear} {car.brand} {car.model}</h6>
//                                             <p className="card-text small mb-2">
//                                                 ₹{car.rentAmountDay} / Day | ₹{car.rentAmountMonth} / Month
//                                             </p>
//                                             <div className="row row-cols-2 small text-muted">
//                                                 <div><MapPin className="me-1" size={14} /> {car.district}</div>
//                                                 <div><Gauge className="me-1" size={14} /> {car.milage} km</div>
//                                                 <div><Fuel className="me-1" size={14} /> {car.fuelType}</div>
//                                                 <div><CheckCircle className="me-1" size={14} /> {car.status}</div>
//                                             </div>
//                                         </div>
//                                         <div className="card-footer bg-white border-top-0 p-2">
//                                             <button className="btn btn-outline-primary btn-sm w-100">View Details <ArrowRight className="ms-2" size={16} /></button>
//                                         </div>
//                                     </Link>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }



// import '../css/cardetails.css';
// import { useEffect, useState, useRef } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { Helmet } from 'react-helmet-async';
// import DriverCardSkeleton from '../skeleton/DriverCardSkeleton';
// import {
//     Circle,
//     Fuel,
//     Droplet,
//     Snowflake,
//     Gauge,
//     Users,
//     CheckCircle,
//     Settings,
//     Navigation,
//     List,
//     Coins,
//     MapPin,
//     Building2,
//     User,
//     Calendar,
//     FileText,
//     Car,
//     ArrowRight,
//     Phone,
// } from 'lucide-react';

// export default function CarDetails() {
//     const { id } = useParams();
//     const [carDetails, setCarDetails] = useState(null);
//     const [relatedCars, setRelatedCars] = useState([]);
//     const [defaultFirstImage, setDefaultFirstImage] = useState('');
//     const [loading, setLoading] = useState(true);
//     const imageRefs = useRef([]); // Ref for thumbnail images


//     async function fetchCarDetails() {
//         try {
//             const response = await axios.get(process.env.REACT_APP_BASE_URL + "car-details/" + id);
//             setCarDetails(response.data);
//             setDefaultFirstImage(response.data.carPhotos?.[0] || '');

//             const relatedCarsRes = await axios.get(process.env.REACT_APP_BASE_URL + "related-cars", {
//                 params: {
//                     model: response.data.model,
//                     brand: response.data.brand,
//                     fuelType: response.data.fuelType,
//                 },
//             });
//             setRelatedCars(relatedCarsRes.data.filter((car) => car._id !== id));
//         } catch (error) {
//             console.error("Error fetching car details:", error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     const handleImageClicked = (clickedImageSrc, index) => {
//         setDefaultFirstImage(clickedImageSrc);

//         // Reset all thumbnail styles
//         imageRefs.current.forEach((imgRef) => {
//             if (imgRef) {
//                 imgRef.classList.remove('active'); // Remove active class
//             }
//         });

//         // Add active class to the clicked thumbnail
//         if (imageRefs.current[index]) {
//             imageRefs.current[index].classList.add('active');
//         }
//     };

//     useEffect(() => {
//         setLoading(true);
//         fetchCarDetails();
//     }, [id]);

//     if (loading) {
//         return (
//             <div className="container-lg py-4" style={{ marginTop: '80px' }}>
//                 <DriverCardSkeleton />
//                 <div className="my-3"></div>
//                 <DriverCardSkeleton />
//             </div>
//         );
//     }

//     if (!carDetails) {
//         return (
//             <div className="container-lg py-4" style={{ marginTop: '80px' }}>
//                 <p className="text-center fs-5 text-muted">Car details not found.</p>
//             </div>
//         );
//     }

//     const {
//         brand,
//         model,
//         manufacturedYear,
//         rentAmountDay,
//         rentAmountMonth,
//         fuelType,
//         fuelCapacity,
//         ac,
//         milage,
//         noOfSeats,
//         status,
//         transmission,
//         KMdriven,
//         depositAmountDay,
//         depositAmountMonth,
//         district,
//         city,
//         noOfOwners,
//         createdAt,
//         description,
//         carPhotos
//     } = carDetails;

//     const getOwnerSuffix = (num) => {
//         const suffixes = ["th", "st", "nd", "rd"];
//         const v = num % 100;
//         return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
//     };

//     const formatDate = (dateStr) => {
//         const date = new Date(dateStr);
//         return date.toLocaleDateString();
//     };

//     return (
//         <div className="container-lg py-4" style={{ marginTop: '80px' }}>
//             <Helmet>
//                 <title>RentEasee | {brand} {model}</title>
//             </Helmet>

//             <div className="row row-cols-1 row-cols-md-2 g-4 mb-4">
//                 <div className="col-md-7 d-flex">
//                     {carPhotos && carPhotos.length > 1 && (
//                         <div className="thumbnail-images d-flex flex-column me-2" style={{ gap: '10px', maxHeight: '350px', flexShrink: 0, width: '80px' }}>
//                             {carPhotos.map((photo, index) => {
//                                 if (index === 0) return null; // Exclude the first image
//                                 return (
//                                     <div
//                                         key={index}
//                                         className={`rounded-md overflow-hidden thumbnail-item ${defaultFirstImage === photo ? 'active' : ''}`}
//                                         style={{ width: '80px', height: '80px', minWidth: '80px', cursor: 'pointer' }}
//                                         onClick={() => handleImageClicked(photo, index)}
//                                         ref={(el) => { imageRefs.current[index] = el; }} // Store refs
//                                     >
//                                         <img
//                                             src={photo}
//                                             alt={`${brand} ${model} - ${index + 1}`}
//                                             className="img-fluid w-100 h-100"
//                                             style={{ objectFit: 'cover' }}
//                                         />
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                     <div className="main-image rounded-lg overflow-hidden" style={{ height: '350px', flexGrow: 1, maxWidth: 'calc(100% - 90px)' }}>
//                         <img
//                             src={defaultFirstImage}
//                             alt={`${brand} ${model}`}
//                             className="img-fluid w-100 h-100 rounded-lg"
//                             style={{ objectFit: 'contain' }}
//                         />
//                     </div>
//                 </div>
//                 <div className="col-md-5">
//                     <h1 className="fs-3 fw-bold mb-2">{brand} {model} ({manufacturedYear})</h1>
//                     <p className="fs-4 mb-1">₹{rentAmountDay} / Day</p>
//                     <p className="fs-6 text-muted">₹{rentAmountMonth} / Month</p>

//                     <div className="mt-3">
//                         <h2 className="fs-6 fw-bold mb-2"><Circle className="me-2" size={18} /> Key Details</h2>
//                         <ul className="list-unstyled small">
//                             <li className="mb-1"><Fuel className="me-2" size={16} /> Fuel: {fuelType}</li>
//                             <li className="mb-1"><Droplet className="me-2" size={16} /> Capacity: {fuelCapacity} L</li>
//                             <li className="mb-1"><Gauge className="me-2" size={16} /> Mileage: {milage} km</li>
//                             <li className="mb-1"><Users className="me-2" size={16} /> Seats: {noOfSeats}</li>
//                             <li className="mb-1"><Settings className="me-2" size={16} /> Gear: {transmission}</li>
//                             <li className="mb-1"><Navigation className="me-2" size={16} /> Driven: {KMdriven} km</li>
//                             <li className="mb-1"><CheckCircle className="me-2" size={16} /> Status: {status}</li>
//                             <li className="mb-1"><Snowflake className="me-2" size={16} /> AC: {ac}</li>
//                         </ul>
//                     </div>

//                     <div className="mt-3">
//                         <div className="d-grid gap-2">
//                             <button className="btn btn-success btn-lg" type="button">
//                                 <Phone className="me-2" size={18} /> Contact for Booking
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="row mt-4">
//                 <div className="col-md-6">
//                     <div className="border rounded-md p-3 bg-light">
//                         <h2 className="fs-6 fw-bold mb-2"><List className="me-2" size={18} /> More Details</h2>
//                         <ul className="list-unstyled small">
//                             <li className="mb-1"><Coins className="me-2" size={16} /> Deposit (Day): ₹{depositAmountDay}</li>
//                             <li className="mb-1"><Coins className="me-2" size={16} /> Deposit (Month): ₹{depositAmountMonth}</li>
//                             <li className="mb-1"><MapPin className="me-2" size={16} /> District: {district}</li>
//                             <li className="mb-1"><Building2 className="me-2" size={16} /> City: {city}</li>
//                             <li className="mb-1">
//                                 <User className="me-2" size={16} /> Owner: {noOfOwners}
//                                 {getOwnerSuffix(Number(noOfOwners))}
//                             </li>
//                             <li className="mb-1"><Calendar className="me-2" size={16} /> Posted: {formatDate(createdAt)}</li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="col-md-6">
//                     {description && (
//                         <div className="p-3">
//                             <h2 className="fs-6 fw-bold mb-2"><FileText className="me-2" size={18} /> Description</h2>
//                             <p className="small">{description}</p>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {relatedCars.length > 0 && (
//                 <div className="mt-4">
//                     <h2 className="fs-5 fw-bold mb-3"><Car className="me-2" size={20} /> Similar Cars</h2>
//                     <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
//                         {relatedCars.map((car) => (
//                             <div className="col" key={car._id}>
//                                 <div className="card h-100 shadow-sm">
//                                     <Link to={`/renteasee/rent-cars/details/${car._id}`} className="text-decoration-none text-dark">
//                                         <div className="overflow-hidden" style={{ height: '180px' }}>
//                                             <img
//                                                 src={car.carPhotos[0]}
//                                                 className="card-img-top img-fluid w-100 h-100"
//                                                 alt={`${car.brand} ${car.model}`}
//                                                 style={{ objectFit: 'cover' }}
//                                             />
//                                         </div>
//                                         <div className="card-body">
//                                             <h6 className="card-title fw-bold mb-1">{car.manufacturedYear} {car.brand} {car.model}</h6>
//                                             <p className="card-text small mb-2">
//                                                 ₹{car.rentAmountDay} / Day | ₹{car.rentAmountMonth} / Month
//                                             </p>
//                                             <div className="row row-cols-2 small text-muted">
//                                                 <div><MapPin className="me-1" size={14} /> {car.district}</div>
//                                                 <div><Gauge className="me-1" size={14} /> {car.milage} km</div>
//                                                 <div><Fuel className="me-1" size={14} /> {car.fuelType}</div>
//                                                 <div><CheckCircle className="me-1" size={14} /> {car.status}</div>
//                                             </div>
//                                         </div>
//                                         <div className="card-footer bg-white border-top-0 p-2">
//                                             <button className="btn btn-outline-primary btn-sm w-100">View Details <ArrowRight className="ms-2" size={16} /></button>
//                                         </div>
//                                     </Link>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


// import '../css/cardetails.css';
// import { useEffect, useState, useRef } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { Helmet } from 'react-helmet-async';
// import DriverCardSkeleton from '../skeleton/DriverCardSkeleton';
// import {
//    Circle,
//    Fuel,
//    Droplet,
//    Snowflake,
//    Gauge,
//    Users,
//    CheckCircle,
//    Settings,
//    Navigation,
//    List,
//    Coins,
//    MapPin,
//    Building2,
//    User,
//    Calendar,
//    FileText,
//    Car,
//    ArrowRight,
//    Phone,
// } from 'lucide-react';

// export default function CarDetails() {
//    const { id } = useParams();
//    const [carDetails, setCarDetails] = useState(null);
//    const [relatedCars, setRelatedCars] = useState([]);
//    const [defaultFirstImage, setDefaultFirstImage] = useState('');
//    const [loading, setLoading] = useState(true);
//    const imageRefs = useRef([]); // Ref for thumbnail images
//    const [selectedImageIndex, setSelectedImageIndex] = useState(0);


//    async function fetchCarDetails() {
//       try {
//          const response = await axios.get(process.env.REACT_APP_BASE_URL + "car-details/" + id);
//          setCarDetails(response.data);
//          setDefaultFirstImage(response.data.carPhotos?.[0] || '');

//          const relatedCarsRes = await axios.get(process.env.REACT_APP_BASE_URL + "related-cars", {
//             params: {
//                model: response.data.model,
//                brand: response.data.brand,
//                fuelType: response.data.fuelType,
//             },
//          });
//          setRelatedCars(relatedCarsRes.data.filter((car) => car._id !== id));
//       } catch (error) {
//          console.error("Error fetching car details:", error);
//       } finally {
//          setLoading(false);
//       }
//    }

//    const handleImageClicked = (clickedImageSrc, index) => {
//       setDefaultFirstImage(clickedImageSrc);
//       setSelectedImageIndex(index);

//       // Reset all thumbnail styles
//       imageRefs.current.forEach((imgRef) => {
//          if (imgRef) {
//             imgRef.classList.remove('active'); // Remove active class
//          }
//       });

//       // Add active class to the clicked thumbnail
//       if (imageRefs.current[index]) {
//          imageRefs.current[index].classList.add('active');
//       }
//    };

//    useEffect(() => {
//       setLoading(true);
//       fetchCarDetails();
//    }, [id]);

//    if (loading) {
//       return (
//          <div className="container-lg py-4" style={{ marginTop: '80px' }}>
//             <DriverCardSkeleton />
//             <div className="my-3"></div>
//             <DriverCardSkeleton />
//          </div>
//       );
//    }

//    if (!carDetails) {
//       return (
//          <div className="container-lg py-4" style={{ marginTop: '80px' }}>
//             <p className="text-center fs-5 text-muted">Car details not found.</p>
//          </div>
//       );
//    }

//    const {
//       brand,
//       model,
//       manufacturedYear,
//       rentAmountDay,
//       rentAmountMonth,
//       fuelType,
//       fuelCapacity,
//       ac,
//       milage,
//       noOfSeats,
//       status,
//       transmission,
//       KMdriven,
//       depositAmountDay,
//       depositAmountMonth,
//       district,
//       city,
//       noOfOwners,
//       createdAt,
//       description,
//       carPhotos
//    } = carDetails;

//    const getOwnerSuffix = (num) => {
//       const suffixes = ["th", "st", "nd", "rd"];
//       const v = num % 100;
//       return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
//    };

//    const formatDate = (dateStr) => {
//       const date = new Date(dateStr);
//       return date.toLocaleDateString();
//    };

//    return (
//       <div className="container-lg py-4" style={{ marginTop: '80px' }}>
//          <Helmet>
//             <title>RentEasee | {brand} {model}</title>
//          </Helmet>

//          <div className="row row-cols-1 row-cols-md-2 g-4 mb-4">
//             <div className="col-md-7 d-flex">
//                {carPhotos && carPhotos.length > 1 && (
//                   <div className="thumbnail-images d-flex flex-column me-2" style={{ gap: '10px', maxHeight: '350px', flexShrink: 0, width: '80px' }}>
//                      {carPhotos.map((photo, index) => {
//                         if (index === 0) return null;
//                         return (
//                            <div
//                               key={index}
//                               className={`rounded-md overflow-hidden thumbnail-item ${selectedImageIndex === index ? 'active' : ''}`}
//                               style={{ width: '80px', height: '80px', minWidth: '80px', cursor: 'pointer' }}
//                               onClick={() => handleImageClicked(photo, index)}
//                               ref={(el) => { imageRefs.current[index] = el; }}
//                            >
//                               <img
//                                  src={photo}
//                                  alt={`${brand} ${model} - ${index + 1}`}
//                                  className="img-fluid w-100 h-100"
//                                  style={{ objectFit: 'cover' }}
//                               />
//                            </div>
//                         );
//                      })}
//                   </div>
//                )}
//                <div className="main-image rounded-lg overflow-hidden" style={{ height: '350px', flexGrow: 1, maxWidth: 'calc(100% - 90px)' }}>
//                   <img
//                      src={defaultFirstImage}
//                      alt={`${brand} ${model}`}
//                      className="img-fluid w-100 h-100 rounded-lg"
//                      style={{ objectFit: 'contain' }}
//                   />
//                </div>
//             </div>
//             <div className="col-md-5">
//                <h1 className="fs-3 fw-bold mb-2">{brand} {model} ({manufacturedYear})</h1>
//                <p className="fs-4 mb-1">₹{rentAmountDay} / Day</p>
//                <p className="fs-6 text-muted">₹{rentAmountMonth} / Month</p>

//                <div className="mt-3">
//                   <h2 className="fs-6 fw-bold mb-2"><Circle className="me-2" size={18} /> Key Details</h2>
//                   <ul className="list-unstyled small">
//                      <li className="mb-1"><Fuel className="me-2" size={16} /> Fuel: {fuelType}</li>
//                      <li className="mb-1"><Droplet className="me-2" size={16} /> Capacity: {fuelCapacity} L</li>
//                      <li className="mb-1"><Gauge className="me-2" size={16} /> Mileage: {milage} km</li>
//                      <li className="mb-1"><Users className="me-2" size={16} /> Seats: {noOfSeats}</li>
//                      <li className="mb-1"><Settings className="me-2" size={16} /> Gear: {transmission}</li>
//                      <li className="mb-1"><Navigation className="me-2" size={16} /> Driven: {KMdriven} km</li>
//                      <li className="mb-1"><CheckCircle className="me-2" size={16} /> Status: {status}</li>
//                      <li className="mb-1"><Snowflake className="me-2" size={16} /> AC: {ac}</li>
//                   </ul>
//                </div>

//                <div className="mt-3">
//                   <div className="d-grid gap-2">
//                      <button className="btn btn-success btn-lg" type="button">
//                         <Phone className="me-2" size={18} /> Contact for Booking
//                      </button>
//                   </div>
//                </div>
//             </div>
//          </div>

//          <div className="row mt-4">
//             <div className="col-md-6">
//                <div className="border rounded-md p-3 bg-light">
//                   <h2 className="fs-6 fw-bold mb-2"><List className="me-2" size={18} /> More Details</h2>
//                   <ul className="list-unstyled small">
//                      <li className="mb-1"><Coins className="me-2" size={16} /> Deposit (Day): ₹{depositAmountDay}</li>
//                      <li className="mb-1"><Coins className="me-2" size={16} /> Deposit (Month): ₹{depositAmountMonth}</li>
//                      <li className="mb-1"><MapPin className="me-2" size={16} /> District: {district}</li>
//                      <li className="mb-1"><Building2 className="me-2" size={16} /> City: {city}</li>
//                      <li className="mb-1">
//                         <User className="me-2" size={16} /> Owner: {noOfOwners}
//                         {getOwnerSuffix(Number(noOfOwners))}
//                      </li>
//                      <li className="mb-1"><Calendar className="me-2" size={16} /> Posted: {formatDate(createdAt)}</li>
//                   </ul>
//                </div>
//             </div>
//             <div className="col-md-6">
//                {description && (
//                   <div className="p-3">
//                      <h2 className="fs-6 fw-bold mb-2"><FileText className="me-2" size={18} /> Description</h2>
//                      <p className="small">{description}</p>
//                   </div>
//                )}
//             </div>
//          </div>

//          {relatedCars.length > 0 && (
//             <div className="mt-4">
//                <h2 className="fs-5 fw-bold mb-3"><Car className="me-2" size={20} /> Similar Cars</h2>
//                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
//                   {relatedCars.map((car) => (
//                      <div className="col" key={car._id}>
//                         <div className="card h-100 shadow-sm">
//                            <Link to={`/renteasee/rent-cars/details/${car._id}`} className="text-decoration-none text-dark">
//                               <div className="overflow-hidden" style={{ height: '180px' }}>
//                                  <img
//                                     src={car.carPhotos[0]}
//                                     className="card-img-top img-fluid w-100 h-100"
//                                     alt={`${car.brand} ${car.model}`}
//                                     style={{ objectFit: 'cover' }}
//                                  />
//                               </div>
//                               <div className="card-body">
//                                  <h6 className="card-title fw-bold mb-1">{car.manufacturedYear} {car.brand} {car.model}</h6>
//                                  <p className="card-text small mb-2">
//                                     ₹{car.rentAmountDay} / Day | ₹{car.rentAmountMonth} / Month
//                                  </p>
//                                  <div className="row row-cols-2 small text-muted">
//                                     <div><MapPin className="me-1" size={14} /> {car.district}</div>
//                                     <div><Gauge className="me-1" size={14} /> {car.milage} km</div>
//                                     <div><Fuel className="me-1" size={14} /> {car.fuelType}</div>
//                                     <div><CheckCircle className="me-1" size={14} /> {car.status}</div>
//                                  </div>
//                               </div>
//                               <div className="card-footer bg-white border-top-0 p-2">
//                                  <button className="btn btn-outline-primary btn-sm w-100">View Details <ArrowRight className="ms-2" size={16} /></button>
//                               </div>
//                            </Link>
//                         </div>
//                      </div>
//                   ))}
//                </div>
//             </div>
//          )}
//       </div>
//    );
// }



import '../css/cardetails.css';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import DriverCardSkeleton from '../skeleton/DriverCardSkeleton';
import {
   Circle,
   Fuel,
   Droplet,
   Snowflake,
   Gauge,
   Users,
   CheckCircle,
   Settings,
   Navigation,
   List,
   Coins,
   MapPin,
   Building2,
   User,
   Calendar,
   FileText,
   Car,
   ArrowRight,
   Phone,
} from 'lucide-react';

export default function CarDetails() {
   const { id } = useParams();
   const [carDetails, setCarDetails] = useState(null);
   const [relatedCars, setRelatedCars] = useState([]);
   const [images, setImages] = useState([]);        // holds [mainImage, ...thumbnails]
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchCarDetails();
   }, [id]);

   async function fetchCarDetails() {
      try {
         setLoading(true);
         const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}car-details/${id}`);
         setCarDetails(data);
         setImages(data.carPhotos || []);
         const relatedRes = await axios.get(`${process.env.REACT_APP_BASE_URL}related-cars`, {
            params: { model: data.model, brand: data.brand, fuelType: data.fuelType },
         });
         setRelatedCars(relatedRes.data.filter((c) => c._id !== id));
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
      }
   }

   // Swap the clicked thumbnail with the main image
   const handleImageClick = (index) => {
      setImages((prev) => {
         const copy = [...prev];
         [copy[0], copy[index]] = [copy[index], copy[0]];
         return copy;
      });
   };

   if (loading) {
      return (
         <div className="container-lg py-4" style={{ marginTop: '80px' }}>
            <DriverCardSkeleton />
            <div className="my-3" />
            <DriverCardSkeleton />
         </div>
      );
   }

   if (!carDetails) {
      return (
         <div className="container-lg py-4" style={{ marginTop: '80px' }}>
            <p className="text-center fs-5 text-muted">Car details not found.</p>
         </div>
      );
   }

   const {
      brand,
      model,
      manufacturedYear,
      rentAmountDay,
      rentAmountMonth,
      fuelType,
      fuelCapacity,
      ac,
      milage,
      noOfSeats,
      status,
      transmission,
      KMdriven,
      depositAmountDay,
      depositAmountMonth,
      district,
      city,
      noOfOwners,
      createdAt,
      description,
   } = carDetails;

   const mainImage = images[0] || '';
   const thumbnails = images.slice(1);

   const getOwnerSuffix = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
   };
   const formatDate = (d) => new Date(d).toLocaleDateString();

   return (
      <div className="container-lg py-4" style={{ marginTop: '80px' }}>
         <Helmet>
            <title>RentEasee | {brand} {model}</title>
         </Helmet>

         <div className="row row-cols-1 row-cols-md-2 g-4 mb-4">
            {/* Image Gallery */}
            <div className="col-md-7 d-flex">
               {thumbnails.length > 0 && (
                  <div className="d-flex flex-column me-2" style={{ gap: '10px', maxHeight: '350px', flexShrink: 0, width: '80px' }}>
                     {thumbnails.map((src, i) => (
                        <div
                           key={i + 1}
                           onClick={() => handleImageClick(i + 1)}
                           className="rounded overflow-hidden"
                           style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                        >
                           <img
                              src={src}
                              alt={`Thumbnail ${i + 1}`}
                              className="img-fluid w-100 h-100"
                              style={{ objectFit: 'cover' }}
                           />
                        </div>
                     ))}
                  </div>
               )}
               <div className="rounded overflow-hidden" style={{ height: '350px', flexGrow: 1 }}>
                  <img
                     src={mainImage}
                     alt={`${brand} ${model}`}
                     className="img-fluid w-100 h-100"
                     style={{ objectFit: 'contain' }}
                  />
               </div>
            </div>

            {/* Details */}
            <div className="col-md-5">
               <h1 className="fs-3 fw-bold mb-2">{brand} {model} ({manufacturedYear})</h1>
               <p className="fs-4 mb-1">₹{rentAmountDay} / Day</p>
               <p className="fs-6 text-muted">₹{rentAmountMonth} / Month</p>

               <div className="mt-3">
                  <h2 className="fs-6 fw-bold mb-2"><Circle className="me-2" size={18} /> Key Details</h2>
                  <ul className="list-unstyled small">
                     <li className="mb-1"><Fuel className="me-2" size={16} /> Fuel: {fuelType}</li>
                     <li className="mb-1"><Droplet className="me-2" size={16} /> Capacity: {fuelCapacity} L</li>
                     <li className="mb-1"><Gauge className="me-2" size={16} /> Mileage: {milage} km</li>
                     <li className="mb-1"><Users className="me-2" size={16} /> Seats: {noOfSeats}</li>
                     <li className="mb-1"><Settings className="me-2" size={16} /> Gear: {transmission}</li>
                     <li className="mb-1"><Navigation className="me-2" size={16} /> Driven: {KMdriven} km</li>
                     <li className="mb-1"><CheckCircle className="me-2" size={16} /> Status: {status}</li>
                     <li className="mb-1"><Snowflake className="me-2" size={16} /> AC: {ac}</li>
                  </ul>
               </div>

               <div className="mt-3 d-grid gap-2">
                  <button className="btn btn-success btn-lg">
                     <Phone className="me-2" size={18} /> Contact for Booking
                  </button>
               </div>
            </div>
         </div>

         {/* More Details & Description */}
         <div className="row mt-4">
            <div className="col-md-6">
               <div className="border rounded p-3 bg-light">
                  <h2 className="fs-6 fw-bold mb-2"><List className="me-2" size={18} /> More Details</h2>
                  <ul className="list-unstyled small">
                     <li className="mb-1"><Coins className="me-2" size={16} /> Deposit (Day): ₹{depositAmountDay}</li>
                     <li className="mb-1"><Coins className="me-2" size={16} /> Deposit (Month): ₹{depositAmountMonth}</li>
                     <li className="mb-1"><MapPin className="me-2" size={16} /> District: {district}</li>
                     <li className="mb-1"><Building2 className="me-2" size={16} /> City: {city}</li>
                     <li className="mb-1"><User className="me-2" size={16} /> Owner: {noOfOwners}{getOwnerSuffix(noOfOwners)}</li>
                     <li className="mb-1"><Calendar className="me-2" size={16} /> Posted: {formatDate(createdAt)}</li>
                  </ul>
               </div>
            </div>
            {description && (
               <div className="col-md-6">
                  <div className="p-3">
                     <h2 className="fs-6 fw-bold mb-2"><FileText className="me-2" size={18} /> Description</h2>
                     <p className="small">{description}</p>
                  </div>
               </div>
            )}
         </div>

         {/* Similar Cars */}
         {relatedCars.length > 0 && (
            <div className="mt-4">
               <h2 className="fs-5 fw-bold mb-3"><Car className="me-2" size={20} /> Similar Cars</h2>
               <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                  {relatedCars.map((c) => (
                     <div className="col" key={c._id}>
                        <div className="card h-100 shadow-sm">
                           <Link to={`/renteasee/rent-cars/details/${c._id}`} className="text-decoration-none text-dark">
                              <div className="overflow-hidden" style={{ height: '180px' }}>
                                 <img
                                    src={c.carPhotos[0]}
                                    className="card-img-top img-fluid w-100 h-100"
                                    alt={`${c.brand} ${c.model}`}
                                    style={{ objectFit: 'cover' }}
                                 />
                              </div>
                              <div className="card-body">
                                 <h6 className="card-title fw-bold mb-1">{c.manufacturedYear} {c.brand} {c.model}</h6>
                                 <p className="card-text small mb-2">
                                    ₹{c.rentAmountDay} / Day | ₹{c.rentAmountMonth} / Month
                                 </p>
                                 <div className="row row-cols-2 small text-muted">
                                    <div><MapPin className="me-1" size={14} /> {c.district}</div>
                                    <div><Gauge className="me-1" size={14} /> {c.milage} km</div>
                                    <div><Fuel className="me-1" size={14} /> {c.fuelType}</div>
                                    <div><CheckCircle className="me-1" size={14} /> {c.status}</div>
                                 </div>
                              </div>
                              <div className="card-footer bg-white border-top-0 p-2">
                                 <button className="btn btn-outline-primary btn-sm w-100">
                                    View Details <ArrowRight className="ms-2" size={16} />
                                 </button>
                              </div>
                           </Link>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
}
