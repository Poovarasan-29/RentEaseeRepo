// import React from 'react';
// function CarDetailsForm({ inputs, setInputs, brands, models, handleInputs }) {
//     return (
//         <>
//             <div className="col">
//                 <label htmlFor="brand">Brand</label>
//                 <select name="brand" id="brand"  onChange={handleInputs} value={inputs.brand} className="form-control w-75">
//                     <option></option>
//                     {brands.map((brand, index) =>
//                         <option value={brand} key={index}>{brand}</option>
//                     )}
//                 </select>
//             </div>
//             <div className="col">
//                 <label htmlFor="model">Model</label>
//                 <select name="model" id="" disabled={models.length !== 0 ? false : true} required onChange={handleInputs} value={inputs.model} className="form-control w-75">
//                     <option></option>
//                     {models.map((model, index) =>
//                         <option value={model} key={index}>{model}</option>
//                     )}
//                 </select>
//             </div>
//             <div className="col">
//                 <label htmlFor="manufacturedYear">Manufactured Year</label>
//                 <input type="number" name="manufacturedYear" id="manufacturedYear" value={inputs.manufacturedYear} onChange={handleInputs} required className="form-control w-75" />
//             </div>
//             <div className="col">
//                 <label htmlFor="fuelType">Fuel Type</label>
//                 <select name="fuelType" id="fuelType" required onChange={handleInputs} value={inputs.fuelType} className="form-control w-75">
//                     <option></option>
//                     <option value="Diesal">Diesal</option>
//                     <option value="Petrol">Petrol</option>
//                     <option value="EV">EV</option>
//                 </select>
//             </div>
//             <div className="col">
//                 <label htmlFor="fuelCapacity">Fuel Capacity</label>
//                 <input type="number" name="fuelCapacity" id="fuelCapacity" onChange={handleInputs} value={inputs.fuelCapacity} required className="form-control w-75" />
//             </div>
//             <div className="col">
//                 <label htmlFor="noOfOwners">No of Owners</label>
//                 <select name="noOfOwners" id="noOfOwners" required onChange={handleInputs} value={inputs.noOfOwners} className="form-control w-75">
//                     <option></option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4+">4+</option>
//                 </select>
//             </div>
//             <div className="col">
//                 <label htmlFor="transmission">Transmission</label>
//                 <select name="transmission" id="transmission" required onChange={handleInputs} value={inputs.transmission} className="form-control w-75">
//                     <option></option>
//                     <option value="Automatic">Automatic</option>
//                     <option value="Manual">Manual</option>
//                 </select>
//             </div>
//             <div className="col">
//                 <label htmlFor="ac">A/C</label>
//                 <select name="ac" id="ac" required onChange={handleInputs} value={inputs.ac} className="form-control w-75">
//                     <option></option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                 </select>
//             </div>
//             <div className="col">
//                 <label htmlFor="vechileNo">Vechile No</label>
//                 <input type="text" name="vechileNo" id="vechileNo" onChange={handleInputs} value={inputs.vechileNo} required className="form-control w-75" />
//             </div>
//             <div className="col">
//                 <label htmlFor="milage">Milage/Litre</label>
//                 <input type="number" name="milage" id="milage" onChange={handleInputs} value={inputs.milage} required className="form-control w-75" />
//             </div>
//             <div className="col">
//                 <label htmlFor="KMdriven">KM Driven</label>
//                 <input type="number" name="KMdriven" id="KMdriven" onChange={handleInputs} value={inputs.KMdriven} required className="form-control w-75" />
//             </div>
//             <div className="col">
//                 <label htmlFor="noOfSeats">No of Seats</label>
//                 <input type="number" name="noOfSeats" id="noOfSeats" onChange={handleInputs} value={inputs.noOfSeats} required className="form-control w-75" />
//             </div>
//             <div className="col">
//                 <label htmlFor="status">Status</label>
//                 <select name="status" id="status" required onChange={handleInputs} value={inputs.status} className="form-control w-75">
//                     <option></option>
//                     <option value="Immediately">Immediately</option>
//                     <option value="Need Service">Need Service</option>
//                 </select>
//             </div>
//         </>
//     );
// }
// export default CarDetailsForm;


// import React from 'react';
// import {
//     TextField,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Typography,
//     Grid,
// } from '@mui/material';
// import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
// import SettingsIcon from '@mui/icons-material/Settings';
// import AcUnitIcon from '@mui/icons-material/AcUnit';
// import NumbersIcon from '@mui/icons-material/Numbers';
// import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
// import SpeedIcon from '@mui/icons-material/Speed';

// function CarDetailsForm({ inputs, setInputs, brands, models, handleInputs }) {
//     return (
//         <div>
//             <Typography variant="h6" gutterBottom>
//                 <DirectionsCarIcon sx={{ mr: 1 }} /> Vehicle Details
//             </Typography>
//             <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                     <FormControl fullWidth>
//                         <InputLabel id="brand-label">Brand</InputLabel>
//                         <Select
//                             labelId="brand-label"
//                             id="brand"
//                             name="brand"
//                             value={inputs.brand}
//                             onChange={handleInputs}
//                             required
//                             label="Brand"
//                         >
//                             <MenuItem value="">Select Brand</MenuItem>
//                             {brands.map((brand, index) => (
//                                 <MenuItem key={index} value={brand}>{brand}</MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <FormControl fullWidth>
//                         <InputLabel id="model-label">Model</InputLabel>
//                         <Select
//                             labelId="model-label"
//                             id="model"
//                             name="model"
//                             value={inputs.model}
//                             onChange={handleInputs}
//                             required
//                             label="Model"
//                             disabled={models.length === 0}
//                         >
//                             <MenuItem value="">Select Model</MenuItem>
//                             {models.map((model, index) => (
//                                 <MenuItem key={index} value={model}>{model}</MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         fullWidth
//                         label={<><CalendarMonthIcon sx={{ mr: 1 }} />Manufactured Year</>}
//                         name="manufacturedYear"
//                         value={inputs.manufacturedYear}
//                         onChange={handleInputs}
//                         required
//                         type="number"
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth>
//                         <InputLabel id="fuelType-label"><LocalGasStationIcon sx={{ mr: 1 }} />Fuel Type</InputLabel>
//                         <Select
//                             labelId="fuelType-label"
//                             id="fuelType"
//                             name="fuelType"
//                             value={inputs.fuelType}
//                             onChange={handleInputs}
//                             required
//                             label="Fuel Type"
//                         >
//                             <MenuItem value="">Select Fuel Type</MenuItem>
//                             <MenuItem value="Diesel">Diesel</MenuItem>
//                             <MenuItem value="Petrol">Petrol</MenuItem>
//                             <MenuItem value="EV">EV</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         fullWidth
//                         label={<><NumbersIcon sx={{ mr: 1 }} />Fuel Capacity (L)</>}
//                         name="fuelCapacity"
//                         value={inputs.fuelCapacity}
//                         onChange={handleInputs}
//                         required
//                         type="number"
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth>
//                         <InputLabel id="transmission-label"><SettingsIcon sx={{ mr: 1 }} />Transmission</InputLabel>
//                         <Select
//                             labelId="transmission-label"
//                             id="transmission"
//                             name="transmission"
//                             value={inputs.transmission}
//                             onChange={handleInputs}
//                             required
//                             label="Transmission"
//                         >
//                             <MenuItem value="">Select Transmission</MenuItem>
//                             <MenuItem value="Automatic">Automatic</MenuItem>
//                             <MenuItem value="Manual">Manual</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth>
//                         <InputLabel id="ac-label"><AcUnitIcon sx={{ mr: 1 }} />A/C</InputLabel>
//                         <Select
//                             labelId="ac-label"
//                             id="ac"
//                             name="ac"
//                             value={inputs.ac}
//                             onChange={handleInputs}
//                             required
//                             label="A/C"
//                         >
//                             <MenuItem value="">Select A/C</MenuItem>
//                             <MenuItem value="Yes">Yes</MenuItem>
//                             <MenuItem value="No">No</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         fullWidth
//                         label={<><NumbersIcon sx={{ mr: 1 }} />Vehicle Number</>}
//                         name="vechileNo"
//                         value={inputs.vechileNo}
//                         onChange={handleInputs}
//                         required
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         fullWidth
//                         label={<><SpeedIcon sx={{ mr: 1 }} />Mileage (KM/L)</>}
//                         name="milage"
//                         value={inputs.milage}
//                         onChange={handleInputs}
//                         required
//                         type="number"
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         fullWidth
//                         label={<><AirlineSeatReclineNormalIcon sx={{ mr: 1 }} />Number of Seats</>}
//                         name="noOfSeats"
//                         value={inputs.noOfSeats}
//                         onChange={handleInputs}
//                         required
//                         type="number"
//                     />
//                 </Grid>
//             </Grid>
//         </div>
//     );
// }

// export default CarDetailsForm;



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
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsIcon from '@mui/icons-material/Settings';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import NumbersIcon from '@mui/icons-material/Numbers';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import SpeedIcon from '@mui/icons-material/Speed';

function CarDetailsForm({ inputs, setInputs, brands, models, handleInputs }) {
    

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                <DirectionsCarIcon sx={{ mr: 1 }} /> Vehicle Details
            </Typography>
            <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="brand-label">Brand</InputLabel>
                        <Select

                            labelId="brand-label"
                            id="brand"
                            name="brand"
                            value={inputs.brand}
                            onChange={handleInputs}
                            required
                            label="Brand"
                            sx={{ height: 56, width: inputs.brand.length == 0 ? 100 : "100%" }}
                        >
                            {/* <MenuItem value="">Select Brand</MenuItem> */}
                            {brands.map((brand, index) => (
                                <MenuItem key={index} value={brand}>{brand}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="model-label">Model</InputLabel>
                        <Select
                            labelId="model-label"
                            name="model"
                            fullWidth
                            value={inputs.model}
                            onChange={handleInputs}
                            required
                            label="Model"
                            disabled={models.length === 0}
                            sx={{ height: 56, width: inputs.model.length == 0 ? 100 : "100%" }}
                        >
                            {/* <MenuItem value="">Select Model</MenuItem> */}
                            {models.map((model, index) => (
                                <MenuItem key={index} value={model}>{model}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label={<><CalendarMonthIcon sx={{ mr: 1 }} />Manufactured Year</>}
                        name="manufacturedYear"
                        value={inputs.manufacturedYear}
                        onChange={handleInputs}
                        type="number"
                        sx={{ height: 56 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="fuelType-label"><LocalGasStationIcon sx={{ mr: 1 }} />Fuel</InputLabel>
                        <Select
                            labelId="fuelType-label"
                            id="fuelType"
                            name="fuelType"
                            value={inputs.fuelType}
                            onChange={handleInputs}
                            
                            label="Fuel Type"
                            sx={{ height: 56, width: inputs.fuelType.length == 0 ? 120 : "100%" }}
                        >
                            {/* <MenuItem value="">Select Fuel Type</MenuItem> */}
                            <MenuItem value="Diesel">Diesel</MenuItem>
                            <MenuItem value="Petrol">Petrol</MenuItem>
                            <MenuItem value="EV">EV</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label={<><NumbersIcon sx={{ mr: 1 }} />Fuel Capacity (L)</>}
                        name="fuelCapacity"
                        value={inputs.fuelCapacity}
                        onChange={handleInputs}
                        
                        type="number"
                        sx={{ height: 56 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="transmission-label"><SettingsIcon sx={{ mr: 1 }} />Transmission</InputLabel>
                        <Select
                            labelId="transmission-label"
                            id="transmission"
                            name="transmission"
                            value={inputs.transmission}
                            onChange={handleInputs}
                            
                            label="Transmission"
                            sx={{ height: 56,width: inputs.transmission.length == 0 ? 180 : "100%" }}
                        >
                            {/* <MenuItem value="">Select Transmission</MenuItem> */}
                            <MenuItem value="Automatic">Automatic</MenuItem>
                            <MenuItem value="Manual">Manual</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="ac-label"><AcUnitIcon sx={{ mr: 1 }} />A/C</InputLabel>
                        <Select
                            labelId="ac-label"
                            id="ac"
                            name="ac"
                            value={inputs.ac}
                            onChange={handleInputs}
                            
                            label="A/C"
                            sx={{ height: 56,width: inputs.ac.length == 0 ? 110 : "100%" }}
                        >
                            {/* <MenuItem value="">Select A/C</MenuItem> */}
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label={<><NumbersIcon sx={{ mr: 1 }} />Vehicle Number</>}
                        name="vechileNo"
                        value={inputs.vechileNo}
                        onChange={handleInputs}
                        
                        sx={{ height: 56 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label={<><SpeedIcon sx={{ mr: 1 }} />Mileage (KM/L)</>}
                        name="milage"
                        value={inputs.milage}
                        onChange={handleInputs}
                        
                        type="number"
                        sx={{ height: 56 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label={<><AirlineSeatReclineNormalIcon sx={{ mr: 1 }} />Number of Seats</>}
                        name="noOfSeats"
                        value={inputs.noOfSeats}
                        onChange={handleInputs}
                        
                        type="number"
                        sx={{ height: 56 }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default CarDetailsForm;