import React, { useState } from "react";
import CarDisplay from '../components/CarDisplay';
import Cars from '../components/Cars';
import '../css/displaycars.css'

export default function DisplayCars() {
    const [cars, setCars] = useState([]);

    return <>
        <CarDisplay setCars={setCars} />
        <Cars cars={cars} />
    </>
}