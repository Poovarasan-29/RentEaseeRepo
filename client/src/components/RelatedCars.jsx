import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function RelatedCars({ brand, model, fuelType, id }) {

    const [getCars, setGetCars] = useState([]);
    const navigate = useNavigate()

    async function fetchCars() {
        const response = await axios.get(process.env.REACT_APP_API_URL+"related-cars", { params: { brand, model, fuelType } });
        const temp = response.data.filter(car => car._id !== id);
        if (temp.length > 6)
            setGetCars(temp.slice(0, 5))
        else
            setGetCars(temp)
    }

    useEffect(() => {
        fetchCars()
    }, [id])

    function showCarDetails(carId) {
        navigate(`/car-details/${carId}`)
    }

    return <div className="px-1 px-sm-4 px-md-5 mt-3" >
        <div className="row row-cols-md-2 g-3">
            {
                getCars && getCars.map((car, index) =>
                    <div className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 p-2" style={{ cursor: 'pointer' }} key={index} onClick={() => showCarDetails(car._id)}>
                        <div className="border rounded">
                            <div className="popularCityImgContainer" >
                                <img src={`${car.carPhotos[0].image}`} className="rounded popularCityImg" alt={car.brand + " " + car.model} />
                            </div>
                            <div className="p-3">
                                <h6>{car.brand} | {car.model}</h6>
                                <h6>{car.rentAmountDay}/Day</h6>
                                <p className="m-0">{car.district}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    </div>
}