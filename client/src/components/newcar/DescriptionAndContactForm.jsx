// import React from 'react';
// function DescriptionAndContactForm({ inputs, setInputs, handleInputs }) {
//     return (
//         <>
//             <div className="col">
//                 <label htmlFor="description">Description</label>
//                 <textarea name="description" id="description" placeholder="Not mandatory || Use for writing other Features" className="form-control w-75" onChange={handleInputs} value={inputs.description} rows={'4'} style={{ resize: 'none', fontSize: '13px' }}></textarea>
//             </div>
//             <div className="col">
//                 <label htmlFor="phoneNo">Phone No</label>
//                 <input type="number" name="phoneNo" id="phoneNo" onChange={handleInputs} value={inputs.phoneNo} required className="form-control w-75" />
//             </div>
//         </>
//     );
// }
// export default DescriptionAndContactForm;


import React from 'react';
import {
    TextField,
    Typography,
    Grid,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PhoneIcon from '@mui/icons-material/Phone';

function DescriptionAndContactForm({ inputs, setInputs, handleInputs }) {
    return (
        <div>
            <Typography variant="h6" gutterBottom>
                <DescriptionIcon sx={{ mr: 1 }} /> Description & Contact
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label={<><DescriptionIcon sx={{ mr: 1 }} />Description (Optional)</>}
                        name="description"
                        value={inputs.description}
                        onChange={handleInputs}
                        multiline
                        rows={4}
                        placeholder="Optional: Add any additional features or details about your car."
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label={<><PhoneIcon sx={{ mr: 1 }} />Phone Number</>}
                        name="phoneNo"
                        value={inputs.phoneNo}
                        onChange={handleInputs}
                        type="number"
                        inputProps={{ maxLength: 10 }}
                        helperText="Enter your 10-digit phone number"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default DescriptionAndContactForm;