import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import regionsData from '../../data/regions.json'
import { MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";


export default function Step2({ step, setStep, selectedState, selectedCity, selectedDistrict, setSelectedCity, setSelectedDistrict, setSelectedState, address, setAddress }) {


    const [error, setError] = useState(false);

    const [allStates] = useState(regionsData.regions);
    const [allDistricts, setAllDistricts] = useState([]);
    const [allCities, setAllCities] = useState([]);

    useEffect(() => {
        if (selectedState) {
            const stateData = allStates.find(region => region.state === selectedState);
            setAllDistricts(stateData?.districts || []);
            setSelectedDistrict(null); // reset district and city when state changes
            setSelectedCity(null);
        } else {
            setAllDistricts([]);
            setSelectedDistrict(null);
            setSelectedCity(null);
        }
    }, [selectedState]);

    useEffect(() => {
        if (selectedDistrict) {
            const cityData = selectedDistrict.city?.map(city => ({ value: city, label: city })) || [];
            setAllCities(cityData);
            setSelectedCity(null); // reset city when district changes
        } else {
            setAllCities([]);
            setSelectedCity(null);
        }
    }, [selectedDistrict]);

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
    };

    const handleDistrictChange = (e) => {
        const districtObj = allDistricts.find(d => d.district === e.target.value);
        setSelectedDistrict(districtObj || null);
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };


    const submitBtn = async (e) => {
        e.preventDefault();
        setError(false)


        if (
            selectedState, selectedDistrict, selectedCity, address.length !== 0
        ) {
            setStep(3)
            setSelectedDistrict(selectedDistrict.district)
        } else {
            setError(true)
        }
    }





    return <>
        <MDBRow >
            <MDBCol>
                <FormControl fullWidth error={error && !selectedState}>
                    <InputLabel id="state-label">
                        <div className='d-flex align-items-center gap-1'>
                            State
                        </div>
                    </InputLabel>
                    <Select
                        labelId="state-label"
                        id="state"
                        value={selectedState || ''}
                        onChange={handleStateChange}
                        label="State"
                        sx={{ height: 56, width: '100%' }}
                    >
                        {allStates.map((state) => (
                            <MenuItem key={state.state} value={state.state}>
                                {state.state}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && !selectedState && (
                        <FormHelperText>Please select a state</FormHelperText>
                    )}
                </FormControl>
            </MDBCol>
            <MDBCol>
                <FormControl fullWidth error={error && !selectedDistrict}>
                    <InputLabel id="district-label">
                        <div className='d-flex align-items-center gap-1'>
                            District
                        </div>
                    </InputLabel>
                    <Select
                        labelId="district-label"
                        id="district"
                        value={selectedDistrict?.district || ''}
                        onChange={handleDistrictChange}
                        label="District"
                        disabled={!selectedState}
                        sx={{ height: 56, width: "100%" }}
                    >
                        {allDistricts.map((district) => (
                            <MenuItem key={district.district} value={district.district}>
                                {district.district}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && !selectedDistrict && (
                        <FormHelperText>Please select a district</FormHelperText>
                    )}
                </FormControl>
            </MDBCol>
            <MDBCol>
                <FormControl fullWidth error={error && !selectedCity}>
                    <InputLabel id="city-label">
                        <div className='d-flex align-items-center gap-1'>
                            City
                        </div>
                    </InputLabel>
                    <Select
                        labelId="city-label"
                        id="city"
                        value={selectedCity || ''}
                        onChange={handleCityChange}
                        label="City"
                        disabled={!selectedDistrict}
                        sx={{ height: 56, width: "100%" }}
                    >
                        {allCities.map((city) => (
                            <MenuItem key={city.value} value={city.value}>
                                {city.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && !selectedCity && (
                        <FormHelperText>Please select a city</FormHelperText>
                    )}
                </FormControl>
            </MDBCol>
        </MDBRow>

        <MDBRow className="my-4">
            <MDBCol>

                <TextField
                    fullWidth
                    label={<div className='d-flex align-items-center gap-1'>Address</div>}
                    multiline
                    rows={3}
                    name="address"
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    error={error && !address}
                />
                {error && !address && (
                    <FormHelperText error>Please enter your address</FormHelperText>
                )}
            </MDBCol>
        </MDBRow>

        <MDBBtn
            className="w-100 mb-4"
            style={{
                letterSpacing: "1px",
                fontSize: "18px",
                background: "#ad1fff",
            }}
            size="md"
            onClick={submitBtn}
        >
            Step {step + 1}
        </MDBBtn>

    </>
}