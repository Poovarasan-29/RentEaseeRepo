import '../css/cardetails.css';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from 'react-helmet-async';
import DriverCardSkeleton from '../skeleton/DriverCardSkeleton';


export default function CarDetails() {

   const { id } = useParams();
   const [carDetails, setCarDetails] = useState([]);
   const [relatedCars, setRelatedCars] = useState([]);
   const [defaultFirstImage, setDefaultFirstImage] = useState();
   const [loading, setLoding] = useState(true);

   async function fetchCarDetails() {
      const response = await axios.get(process.env.REACT_APP_BASE_URL + "car-details/" + id);
      setCarDetails(response.data);

      const relatedCarsRes = await axios.get(process.env.REACT_APP_BASE_URL + "related-cars", { params: { model: response.data.model, brand: response.data.brand, fuelType: response.data.fuelType } });
      setRelatedCars(relatedCarsRes.data.filter(car => car._id !== id));
      setDefaultFirstImage(response.data.carPhotos[0]);
      setLoding(false);
   }


   function handleImageClicked(e) {
      setDefaultFirstImage(e.target.src);
      e.target.src = defaultFirstImage
   }


   useEffect(() => {
      setLoding(true);
      fetchCarDetails();
   }, [id])

   return (

      !loading ? <>
         <Helmet>
            <title>RentEasee | {carDetails.brand + " " + carDetails.model}</title>
         </Helmet>
         {
            carDetails.carPhotos ?
               <div className="container-lg" style={{ marginTop: '120px' }}>
                  {/* <p className="text-center p-2 fs-3 fw-bold">Car Details</p> */}
                  <div className="row row-cols-1 row-cols-md-2 m-4 p-3">
                     {/* Flex */}
                     <div className="col-md-7 col-12">
                        <div className="row row-cols-1 p-2">
                           {/* column Flex */}
                           <div id="Img">
                              <img src={defaultFirstImage} alt="" />
                           </div>
                           <div className="d-flex  align-items-center justify-content-between mt-2">
                              {
                                 carDetails.carPhotos.map((car, index) =>
                                    index !== 0 && <div id="S_img" className="p-2" key={index}>
                                       <img src={carDetails.carPhotos[index]} onClick={handleImageClicked} alt="" />
                                    </div>
                                 )
                              }
                           </div>
                        </div>
                     </div>
                     <div className="col-md-5 col-12 mt-4 mt-md-0">
                        <div className="row row-cols-1">
                           {/* column Flex */}
                           <div>
                              <span id="model" className="fs-1">{carDetails.brand + " " + carDetails.model + " " + carDetails.manufacturedYear}</span>
                              <br />
                              <span>₹{carDetails.rentAmountDay} /Day</span>
                              <br />
                              <span>₹{carDetails.rentAmountMonth}/Month</span>
                           </div>
                           <div className="col p-1">
                              <div className="d-flex flex-column justify-content-center border mt-2">
                                 <span className="p-lg-3 p-2 fs-5 fw-bold">General Information</span>
                                 <hr className="m-0" />
                                 <div className="p-3 pe-0">
                                    <table className="table table-sm table-borderless" id="tableWid">
                                       <tbody>
                                          <tr className="">
                                             <td>
                                                <th
                                                   className="d-block border-0 p-0 ps-lg-3"
                                                   id="Name"
                                                >
                                                   Fuel Type
                                                </th>
                                                <td
                                                   className="p-0 border-0 ps-lg-3 pb-2"
                                                   id="Caption"
                                                >
                                                   {carDetails.fuelType}
                                                </td>
                                             </td>
                                             <td>
                                                <th
                                                   className="d-block border-0 p-0 ps-lg-3"
                                                   id="Name"
                                                >
                                                   Fuel Capacity
                                                </th>
                                                <td
                                                   className="p-0 border-0 ps-lg-3 pb-2"
                                                   id="Caption"
                                                >
                                                   {carDetails.fuelCapacity} Litre
                                                </td>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <th
                                                   className="d-block border-0 p-0 ps-lg-3"
                                                   id="Name"
                                                >
                                                   AC
                                                </th>
                                                <td
                                                   className="p-0 border-0 ps-lg-3 pb-2"
                                                   id="Caption"
                                                >
                                                   {carDetails.ac}
                                                </td>
                                             </td>
                                             <td>
                                                <th
                                                   className="d-block border-0 p-0 ps-lg-3"
                                                   id="Name"
                                                >
                                                   Mileage
                                                </th>
                                                <td
                                                   className="p-0 border-0 ps-lg-3 pb-2"
                                                   id="Caption"
                                                >
                                                   {carDetails.milage} km
                                                </td>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <th
                                                   className="d-block border-0 p-0 ps-lg-3"
                                                   id="Name"
                                                >
                                                   Seats
                                                </th>
                                                <td
                                                   className="p-0 border-0 ps-lg-3 pb-2"
                                                   id="Caption"
                                                >
                                                   {carDetails.noOfSeats}
                                                </td>
                                             </td>
                                             <td>
                                                <th
                                                   className="d-block border-0 p-0 ps-lg-3"
                                                   id="Name"
                                                >
                                                   Status
                                                </th>
                                                <td
                                                   className="p-0 border-0 ps-lg-3 pb-2"
                                                   id="Caption"
                                                >
                                                   {carDetails.status}
                                                </td>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <th
                                                   className="d-block border-0 p-0 ps-lg-3"
                                                   id="Name"
                                                >
                                                   Gear
                                                </th>
                                                <td
                                                   className="p-0 border-0 ps-lg-3 pb-2"
                                                   id="Caption"
                                                >
                                                   {carDetails.transmission}
                                                </td>
                                             </td>
                                             <td>
                                                <th
                                                   className="d-block border-0 p-0 ps-lg-3 "
                                                   id="Name"
                                                >
                                                   KMdriven
                                                </th>
                                                <td
                                                   className="p-0 border-0 ps-lg-3 pb-2"
                                                   id="Caption"
                                                >
                                                   {carDetails.KMdriven} km
                                                </td>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                           {/* flex*/}
                           <div className="text-center pt-3">
                              <div className="row">
                                 <div className="col">
                                    <button className="p-2 rounded w-100 mt-2 text-white" style={{ fontWeight: "500", letterSpacing: "2px", backgroundColor: "rgba(22, 167, 22, 0.751)" }}>
                                       &#9743;Contact</button>
                                 </div>
                              </div>
                           </div>
                           <div></div>
                        </div>
                     </div>
                  </div>

                  <div className="p-2 p-md-3">
                     <div className="row gx-5 gy-2 row-cols-1 row-cols-md-2 ps-lg-5">
                        <div className="col-md-5 col-12">
                           <div className="p-3 border bg-light rounded">
                              <p>
                                 <b>More Details</b>
                              </p>
                              <table className="" id="More-Details">
                                 <tbody>
                                    <tr>
                                       <td className="p-1">Security Deposit : ₹{carDetails.depositAmountDay} Day </td>
                                    </tr>
                                    <tr>
                                       <td className="p-1">Security Deposit : ₹{carDetails.depositAmountMonth} Month </td>
                                    </tr>
                                    <tr>
                                       <td className="p-1">District : {carDetails.district}</td>
                                    </tr>
                                    <tr>
                                       <td className="p-1">City : {carDetails.city}</td>
                                    </tr>
                                    <tr>
                                       <td className="p-1">
                                          Owner : {carDetails.noOfOwners}{Number(carDetails.noOfOwners) === 1 ? <sup>st</sup> : Number(carDetails.noOfOwners) === 2 ? <sup>nd</sup> : Number(carDetails.noOfOwners) === 3 ? <sup>rd</sup> : <sup>th</sup>}
                                       </td>
                                    </tr>
                                    <tr>
                                       <td className="p-1">Posting Date : {new Date(carDetails.createdAt).getFullYear() + "-" + (new Date(carDetails.createdAt).getMonth() + 1) + "-" + new Date(carDetails.createdAt).getDate()}</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                        <div className="col-md-6 col-12">
                           <div className="p-3 ps-4 ms-lg-3 border bg-light rounded">
                              <p>
                                 <b>Description</b>
                              </p>
                              {carDetails.description}
                           </div>
                        </div>
                     </div>
                  </div>

                  <p className=" p-2 fs-2 fw-bold">SIMILAR CARS</p>

                  <div className="d-flex flex-column align-items-center justify-content-center p-2">
                     <div className=" container-lg">
                        <div className="row m-0 h-auto row-cols-lg-3 row-cols-md-2 row-cols-1 gy-sm-4">
                           {
                              relatedCars.map((car, index) =>
                                 <div className="col" key={index}>
                                    <div className="border p-1">
                                       <div className="w-100">
                                          <img src={car.carPhotos[0]} alt="car1-image" className="rounded" width={"400px"} height={"190px"} />
                                       </div>
                                       <div>
                                          <div>
                                             <p className=" pt-1 fs-5 " style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>{car.manufacturedYear + " " + car.brand + " " + car.model}</p>
                                             <p className="" style={{ fontFamily: "sans-serif", fontWeight: "bold", fontSize: "17px" }}>
                                                {car.rentAmountDay} /Day | {car.rentAmountMonth} /Month
                                             </p>
                                             <div>
                                                <div className="row row-cols-2 gy-4">
                                                   <div className="col">
                                                      <p className="m-0 text-uppercase" style={{ fontWeight: "bold", fontSize: "17px" }}>District</p>
                                                      <p className="m-0" >{car.district}</p>
                                                   </div>
                                                   <div className="col">
                                                      <p className=" m-0" style={{ fontWeight: "bold", fontSize: "17px" }}>MILEAGE(KM)</p>
                                                      <p className="m-0">{car.milage}</p>

                                                   </div>
                                                   <div className="col">
                                                      <p className="m-0 text-uppercase" style={{ fontWeight: "bold", fontSize: "17px" }}>fuel</p>
                                                      <p className="m-0">{car.fuelType}</p>

                                                   </div>
                                                   <div className="col">
                                                      <p className="m-0" style={{ fontWeight: "bold", fontSize: "17px" }}>STATUS</p>
                                                      <p className="m-0" >{car.status}</p>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="w-100 mt-4">
                                                <Link to={`/renteasee/rent-cars/details/${car._id}`}>
                                                   <button className="form-control w-50 mt-2" style={{ fontWeight: "500" }} >VIEW DETAILS 🡢</button>
                                                </Link>
                                             </div>

                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              )
                           }
                        </div>
                     </div>
                  </div>

               </div>
               :

               <div className="container-lg" style={{ marginTop: '200px' }}>
                  <DriverCardSkeleton />
                  <div style={{ margin: '100px 0px' }}></div>
                  <DriverCardSkeleton />
               </div>
         }
      </>
         :
         <div className="container-lg" style={{ marginTop: '200px' }}>
            <DriverCardSkeleton />
            <div style={{ margin: '100px 0px' }}></div>
            <DriverCardSkeleton />
         </div>
   );
}
