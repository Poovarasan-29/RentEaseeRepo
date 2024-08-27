import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import regionsData from '../data/regions.json';


export default function DriverApplyDropDowns({ selectedState, selectedDistrict, setSelectedState, setSelectedDistrict, setSelectedCity }) {

    const [allStates, setAllStates] = useState(regionsData.regions);
    const [allDistricts, setAllDistricts] = useState(null);
    const [allCities, setAllCities] = useState(null);

    useEffect(() => {
        if (selectedState)
            setAllDistricts(regionsData.regions.filter(region => region.state === selectedState)[0].districts)
    }, []);


    function handleStateRegion(val) {
        if (val[0] !== undefined && selectedState !== val[0].state) {
            setAllDistricts(regionsData.regions.filter(region => region.state === val[0].state)[0].districts);
            setSelectedState(val[0].state);
        } else {
            setSelectedState(null);
        }
    }

    function handleDistrict(val) {
        setSelectedDistrict(val);
        setAllCities(val[0].city.map(item => { return { city: item } }))
    }

    function handleCity(val) {
        setSelectedCity(val);
    }



    return <>
        <div className="col d-flex flex-column align-items-center">
            <label className="w-75" htmlFor="">State </label>
            <div className="w-75">
                <Select options={allStates} labelField="state" valueField="state" placeholder="Select State" required={true} closeOnClickInput={true} dropdownHandle={false} clearable={true} onChange={handleStateRegion} className="p-2" dropdownHeight="140px" style={{ borderColor: 'rgba(45,45,45,.2)' }} />
            </div>
        </div>

        <div className="col d-flex flex-column align-items-center">
            <label className="w-75" htmlFor="">District </label>
            <div className="w-75">
                <Select options={allDistricts} disabled={selectedState ? false : true} labelField={"district"} valueField={"district"} dropdownHandle={false} clearable={true} placeholder="Select District" required={true} onChange={handleDistrict} closeOnClickInput={true} className="p-2" dropdownHeight="140px" style={{ borderColor: 'rgba(45,45,45,.2)' }} />
            </div>
        </div>
        <div className="col d-flex flex-column align-items-center">
            <label className="w-75" htmlFor="">City </label>
            <div className="w-75">
                <Select options={allCities} labelField="city" valueField="city" placeholder="Select City" disabled={selectedDistrict ? false : true} required={true} closeOnClickInput={true} dropdownHandle={false} clearable={true} className="p-2" dropdownHeight="140px" onChange={handleCity} style={{ borderColor: 'rgba(45,45,45,.2)' }} />
            </div>
        </div>
    </>
}

