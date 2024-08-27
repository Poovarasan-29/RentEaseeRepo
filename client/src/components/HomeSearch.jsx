import React, { useState } from "react";
import carsData from '../data/cars.json';
import { useNavigate } from "react-router-dom";


export default function HomeSearch() {

    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const navigate = useNavigate();

    function handleSelectedBrand(e) {
        setSelectedBrand(e.target.value);
        setSelectedModel("");
        const filterModels = carsData.cars.filter(item => item.brand === e.target.value);
        if (filterModels.length !== 0)
            setModels(carsData.cars.filter(item => item.brand === e.target.value)[0].models);
        else
            setModels([]);
    }

    function handleSelectedModel(e) {
        setSelectedModel(e.target.value);
    }

    function handleExploreBtn() {
        navigate(`/renteasee/rent-cars?brand=${selectedBrand}&model=${selectedModel}`);
    }

    return <>
        <div className="bg-dark text-white d-flex flex-column align-items-center py-4 justify-content-center" style={{ marginTop: '100px' }}>
            <div style={{ width: '80%' }}>
                <h2 className="search-title">EXPLORE THE FINEST SELECTION OF RENTAL VEHICLES</h2>

                <div className="row row-cols-lg-3 row-cols-1 row-cols-sm-2 g-2">
                    <div className="col">
                        <select name="brand" value={selectedBrand} className="select-new w-100" onChange={handleSelectedBrand} >
                            <option value="Select Brand" defaultValue >Select Brand</option>
                            {
                                carsData.cars.map((item, index) =>
                                    <option value={item.brand} key={index}>{item.brand}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="col">
                        <select name="model" value={selectedModel} onChange={handleSelectedModel} className="select-new w-100" >
                            <option value="Select Model" defaultValue >Select Model</option>
                            {
                                models.map((item, index) =>
                                    <option value={item} key={index}>{item}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="col">
                        <button className="text-uppercase btn text-light rounded-0 fs-5 w-100" onClick={handleExploreBtn} style={{ letterSpacing: '1px', background: '#ad1fff' }}>Explore</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}