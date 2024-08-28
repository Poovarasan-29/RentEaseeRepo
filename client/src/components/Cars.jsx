import React from "react"
import { Link } from "react-router-dom"
import CarCardSkeleton from "../skeleton/CarCardSkeleton";

export default function Cars({ cars, loading }) {

    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center p-2">
                <div className=" container-lg">
                    <div className="row m-0 h-auto row-cols-lg-3 row-cols-md-2 row-cols-1 gy-sm-4">
                        {
                            loading ?
                                Array(6).fill(0).map((_, index) => <div className="col" key={index}>
                                    <CarCardSkeleton />
                                </div>)
                                :
                                cars.length !== 0 ?
                                    cars.map((car, index) =>
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
                                                            <Link to={`/renteasee/rent-cars/details/${car._id}`} className="outer">
                                                                <button className="form-control w-50 mt-2 anim_btn" style={{ fontWeight: "500" }} >VIEW DETAILS 🡢</button>
                                                            </Link>
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    )
                                    :
                                    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',fontSize:'25px' }}>No Cars matched your search</div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}