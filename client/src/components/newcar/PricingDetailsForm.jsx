// import React from 'react';
// function PricingDetailsForm({ inputs, setInputs, handleInputs }) {
//     return (
//         <>
//             <div className="col">
//                 <label htmlFor="depositAmountDay">Deposit Amount/Day</label>
//                 <input type="number" name="depositAmountDay" id="depositAmountDay" onChange={handleInputs} value={inputs.depositAmountDay}  className="form-control w-75" />
//             </div>
//             <div className="col">
//                 <label htmlFor="depositAmountMonth">Deposit Amount/Month</label>
//                 <input type="number" name="depositAmountMonth" id="depositAmountMonth" onChange={handleInputs} value={inputs.depositAmountMonth} required className="form-control w-75" />
//             </div>
//             <div className="col">
//                 <label htmlFor="rentAmountDay">Rent Amount/Day</label>
//                 <input type="number" name="rentAmountDay" id="rentAmountDay" onChange={handleInputs} value={inputs.rentAmountDay} required className="form-control w-75" />
//             </div>
//             <div className="col">
//                 <label htmlFor="rentAmountMonth">Rent Amount/Month</label>
//                 <input type="number" name="rentAmountMonth" id="rentAmountMonth" onChange={handleInputs} value={inputs.rentAmountMonth} required className="form-control w-75" />
//             </div>
//         </>
//     );
// }
// export default PricingDetailsForm;


import React from 'react';
import {
    TextField,
    Typography,
    Grid,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function PricingDetailsForm({ inputs, setInputs, handleInputs }) {
    return (
        <div>
            <Typography variant="h6" gutterBottom>
                <AttachMoneyIcon sx={{ mr: 1 }} /> Pricing
            </Typography>
            <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Deposit / Day (₹)"
                        name="depositAmountDay"
                        value={inputs.depositAmountDay}
                        onChange={handleInputs}
                        
                        type="number"
                        sx={{ height: 56 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Deposit / Month (₹)"
                        name="depositAmountMonth"
                        value={inputs.depositAmountMonth}
                        onChange={handleInputs}
                        
                        type="number"
                        sx={{ height: 56 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Rent / Day (₹)"
                        name="rentAmountDay"
                        value={inputs.rentAmountDay}
                        onChange={handleInputs}
                        
                        type="number"
                        sx={{ height: 56 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Rent / Month (₹)"
                        name="rentAmountMonth"
                        value={inputs.rentAmountMonth}
                        onChange={handleInputs}
                        
                        type="number"
                        sx={{ height: 56 }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default PricingDetailsForm;