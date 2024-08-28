import React, { useState } from "react";
import CarDisplay from '../components/CarDisplay';
import Cars from '../components/Cars';
import '../css/displaycars.css'
import { Helmet } from "react-helmet-async";

export default function DisplayCars() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    return <>
        <Helmet>
            <title>RentEasee | Rent Cars</title>
        </Helmet>
        <CarDisplay setCars={setCars} setLoading={setLoading} />
        <Cars cars={cars} loading={loading} />
    </>
}