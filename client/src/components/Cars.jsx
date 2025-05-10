// import React from "react"
// import { Link } from "react-router-dom"
// import CarCardSkeleton from "../skeleton/CarCardSkeleton";
// import {
//     Fuel,
//     Gauge,
//     CheckCircle,
//     MapPin,
//     ArrowRight,
// } from 'lucide-react';

// export default function Cars({ cars, loading }) {
//     const defaultImage = "/Static_Images/default_car_image.jpg"; // Add default image path here

//     return (
//         <div className="container-lg px- px-md-5 py-4">
//             <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 gy-3 g-lg-3">
//                 {
//                     loading ? (
//                         Array(6).fill(0).map((_, index) => (
//                             <div className="col" key={index}>
//                                 <CarCardSkeleton />
//                             </div>
//                         ))
//                     ) : cars.length !== 0 ? (
//                         cars.map((car) => (
//                             <div className="col" key={car._id}>
//                                 <div className="card h-100 shadow-sm">
//                                     <div className="overflow-hidden" style={{ height: '180px' }}>
//                                         <img
//                                             src={car.carPhotos?.[0] || defaultImage}
//                                             className="card-img-top img-fluid w-100 h-100"
//                                             alt={`${car.brand} ${car.model}`}
//                                             style={{ objectFit: 'cover' }}
//                                         />
//                                     </div>
//                                     <div className="card-body">
//                                         <h6 className="card-title fw-bold mb-1">
//                                             {car.manufacturedYear} {car.brand} {car.model}
//                                         </h6>
//                                         <p className="card-text small mb-2">
//                                             ₹{car.rentAmountDay} / Day | ₹{car.rentAmountMonth} / Month
//                                         </p>
//                                         <div className="row row-cols-2 small text-muted">
//                                             <div className="d-flex align-items-center"><MapPin className="me-1" size={14} /> {car.district}</div>
//                                             <div className="d-flex align-items-center"><Gauge className="me-1" size={14} /> {car.milage} km</div>
//                                             <div className="d-flex align-items-center"><Fuel className="me-1" size={14} /> {car.fuelType}</div>
//                                             <div className="d-flex align-items-center"><CheckCircle className="me-1" size={14} /> {car.status}</div>
//                                         </div>
//                                     </div>
//                                     <div className="card-footer bg-white border-top-0 p-2">
//                                         <Link to={`/renteasee/rent-cars/details/${car._id}`} className="text-decoration-none text-dark">
//                                             <button className="btn rounded-0 btn-sm w-100 anim_btn">
//                                                 View Details <ArrowRight className="ms-2" size={22} />
//                                             </button>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="text-center w-100 py-5 fs-4">
//                             No Cars matched your search
//                         </div>
//                     )
//                 }
//             </div>
//         </div>
//     )
// }

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import CarCardSkeleton from "../skeleton/CarCardSkeleton";
// import {
//     Fuel,
//     Gauge,
//     CheckCircle,
//     MapPin,
//     ArrowRight,
// } from 'lucide-react';

// export default function Cars({ cars, loading }) {
//     const [displayedCars, setDisplayedCars] = useState([]);  // State to store the cars displayed
//     const [currentIndex, setCurrentIndex] = useState(20);  // Index to track how many cars to show
//     const [loadingMore, setLoadingMore] = useState(false);  // Track if the next set is being loaded

//     useEffect(() => {
//         // Display only the first 20 cars initially
//         if (!loading && cars.length > 0) {
//             setDisplayedCars(cars.slice(0, 20));  // Show first 20 cars
//         }
//     }, [cars, loading]);

//     const loadMoreCars = () => {
//         setLoadingMore(true);
//         const nextCars = cars.slice(currentIndex, currentIndex + 20); // Get next 20 cars
//         setDisplayedCars((prevCars) => [...prevCars, ...nextCars]); // Append them to the displayed cars
//         setCurrentIndex(currentIndex + 20);  // Update index for the next fetch
//         setLoadingMore(false);
//     };

//     const defaultImage = "path_to_default_image.jpg"; // Add default image path here

//     return (
//         <div className="container-lg px- px-md-5 py-4">
//             <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 gy-3 g-lg-3">
//                 {loading ? (
//                     Array(6).fill(0).map((_, index) => (
//                         <div className="col" key={index}>
//                             <CarCardSkeleton />
//                         </div>
//                     ))
//                 ) : displayedCars.length !== 0 ? (
//                     displayedCars.map((car) => (
//                         <div className="col" key={car._id}>
//                             <div className="card h-100 shadow-sm">
//                                 <div className="overflow-hidden" style={{ height: '180px' }}>
//                                     <img
//                                         src={car.carPhotos?.[0] || defaultImage}
//                                         className="card-img-top img-fluid w-100 h-100"
//                                         alt={`${car.brand} ${car.model}`}
//                                         style={{ objectFit: 'cover' }}
//                                     />
//                                 </div>
//                                 <div className="card-body">
//                                     <h6 className="card-title fw-bold mb-1">
//                                         {car.manufacturedYear} {car.brand} {car.model}
//                                     </h6>
//                                     <p className="card-text small mb-2">
//                                         ₹{car.rentAmountDay} / Day | ₹{car.rentAmountMonth} / Month
//                                     </p>
//                                     <div className="row row-cols-2 small text-muted">
//                                         <div className="d-flex align-items-center"><MapPin className="me-1" size={14} /> {car.district}</div>
//                                         <div className="d-flex align-items-center"><Gauge className="me-1" size={14} /> {car.milage} km</div>
//                                         <div className="d-flex align-items-center"><Fuel className="me-1" size={14} /> {car.fuelType}</div>
//                                         <div className="d-flex align-items-center"><CheckCircle className="me-1" size={14} /> {car.status}</div>
//                                     </div>
//                                 </div>
//                                 <div className="card-footer bg-white border-top-0 p-2">
//                                     <Link to={`/renteasee/rent-cars/details/${car._id}`} className="text-decoration-none text-dark">
//                                         <button className="btn rounded-0 btn-sm w-100 anim_btn">
//                                             View Details <ArrowRight className="ms-2" size={22} />
//                                         </button>
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="text-center w-100 py-5 fs-4">
//                         No Cars matched your search
//                     </div>
//                 )}
//             </div>
//             {cars.length > displayedCars.length && (
//                 <div className="text-center py-3">
//                     <button
//                         className="btn btn-outline-primary"
//                         onClick={loadMoreCars}
//                         disabled={loadingMore}
//                     >
//                         {loadingMore ? "Loading..." : "Show More"}
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarCardSkeleton from "../skeleton/CarCardSkeleton";
import {
    Fuel,
    Gauge,
    CheckCircle,
    MapPin,
    ArrowRight,
} from 'lucide-react';

export default function Cars({ cars = [], loading }) {  // Default to empty array if cars is undefined
    const [displayedCars, setDisplayedCars] = useState([]);  // State to store the cars displayed
    const [currentIndex, setCurrentIndex] = useState(20);  // Index to track how many cars to show
    const [loadingMore, setLoadingMore] = useState(false);  // Track if the next set is being loaded

    useEffect(() => {
        // Display the first 20 cars initially
        setDisplayedCars(cars.slice(0, 20));
    }, [cars]);  // Re-run this effect whenever the cars prop changes

    const loadMoreCars = () => {
        setLoadingMore(true);
        const nextCars = cars.slice(currentIndex, currentIndex + 20); // Get next 20 cars
        setDisplayedCars((prevCars) => [...prevCars, ...nextCars]); // Append them to the displayed cars
        setCurrentIndex(currentIndex + 20);  // Update index for the next fetch
        setLoadingMore(false);
    };

    const defaultImage = "path_to_default_image.jpg"; // Add default image path here

    return (
        <div className="container-lg px- px-md-5 py-4">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 gy-3 g-lg-3">
                {loading ? (
                    Array(6).fill(0).map((_, index) => (
                        <div className="col" key={index}>
                            <CarCardSkeleton />
                        </div>
                    ))
                ) : displayedCars.length !== 0 ? (
                    displayedCars.map((car) => (
                        <div className="col" key={car._id}>
                            <div className="card h-100 shadow-sm">
                                <div className="overflow-hidden" style={{ height: '180px' }}>
                                    <img
                                        src={car.carPhotos?.[0] || defaultImage}
                                        className="card-img-top img-fluid w-100 h-100"
                                        alt={`${car.brand} ${car.model}`}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="card-body">
                                    <h6 className="card-title fw-bold mb-1">
                                        {car.manufacturedYear} {car.brand} {car.model}
                                    </h6>
                                    <p className="card-text small mb-2">
                                        ₹{car.rentAmountDay} / Day | ₹{car.rentAmountMonth} / Month
                                    </p>
                                    <div className="row row-cols-2 small text-muted">
                                        <div className="d-flex align-items-center"><MapPin className="me-1" size={14} /> {car.district}</div>
                                        <div className="d-flex align-items-center"><Gauge className="me-1" size={14} /> {car.milage} km</div>
                                        <div className="d-flex align-items-center"><Fuel className="me-1" size={14} /> {car.fuelType}</div>
                                        <div className="d-flex align-items-center"><CheckCircle className="me-1" size={14} /> {car.status}</div>
                                    </div>
                                </div>
                                <div className="card-footer bg-white border-top-0 p-2">
                                    <Link to={`/renteasee/rent-cars/details/${car._id}`} className="text-decoration-none text-dark">
                                        <button className="btn rounded-0 btn-sm w-100 anim_btn">
                                            View Details <ArrowRight className="ms-2" size={22} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center w-100 py-5 fs-4">
                        No Cars matched your search
                    </div>
                )}
            </div>

            {cars.length > displayedCars.length && (
                <div className="text-center py-3">
                    <button
                        className="btn btn-outline-primary"
                        onClick={loadMoreCars}
                        disabled={loadingMore}
                    >
                        {loadingMore ? "Loading..." : "Show More"}
                    </button>
                </div>
            )}
        </div>
    );
}
