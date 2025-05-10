

import React from 'react';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Grid,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';

function LocationDetailsForm({ inputs, setInputs, allStates, allDistricts, allCities, handleInputs }) {
    return (
        <div>
            <Typography variant="h6" gutterBottom>
                <LocationOnIcon sx={{ mr: 1 }} /> Location Details
            </Typography>
            <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label={<><HomeIcon sx={{ mr: 1 }} />Car Location</>}
                        name="carLocation"
                        value={inputs.carLocation}
                        onChange={handleInputs}
                        multiline
                        rows={2}
                        placeholder="Enter the specific location of the car (e.g., near a landmark)."
                        sx={{ height: 88 }} // Adjusted for multiline
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="state-label"><FlagIcon sx={{ mr: 1 }} />State</InputLabel>
                        <Select
                            labelId="state-label"
                            id="state"
                            name="state"
                            value={inputs.state}
                            onChange={handleInputs}
                            label="State"
                            sx={{ height: 56, width: inputs.state.length == 0 ? 120 : "100%" }}
                        >
                            {/* <MenuItem value="">Select State</MenuItem> */}
                            {allStates.map((state, index) => (
                                <MenuItem key={index} value={state}>{state}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="district-label"><MapIcon sx={{ mr: 1 }} />District</InputLabel>
                        <Select
                            labelId="district-label"
                            id="district"
                            name="district"
                            value={inputs.district}
                            onChange={handleInputs}
                            
                            label="District"
                            disabled={!inputs.state}
                            sx={{ height: 56, width: inputs.district.length == 0 ? 140 : "100%" }}
                        >
                            {/* <MenuItem value="">Select District</MenuItem> */}
                            {allDistricts.map((dist, index) => (
                                <MenuItem key={index} value={dist.district}>{dist.district}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="city-label"><LocationOnIcon sx={{ mr: 1 }} />City</InputLabel>
                        <Select
                            labelId="city-label"
                            id="city"
                            name="city"
                            value={inputs.city}
                            onChange={handleInputs}
                            
                            label="City"
                            disabled={!inputs.district}
                            sx={{ height: 56, width: inputs.city.length == 0 ? 110 : "100%" }}
                        >
                            {/* <MenuItem value="">Select City</MenuItem> */}
                            {allCities.map((city, index) => (
                                <MenuItem key={index} value={city}>{city}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
}

export default LocationDetailsForm;