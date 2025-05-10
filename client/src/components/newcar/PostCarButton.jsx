// import React from 'react';
// import { TailSpin } from 'react-loader-spinner';
// function PostCarButton({ loading, handleUpload }) {
//     return (
//         <div className="col-12 w-100 d-flex flex-column align-items-end justify-content-end pe-5">
//             <button className="btn btn-success p-2 w-25 form-control me-5" disabled={loading} onClick={handleUpload}>
//                 {loading ? <TailSpin color="#fff" height={20} width={20} /> : 'POST'}
//             </button>
//         </div>
//     );
// }
// export default PostCarButton;


import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function PostCarButton({ loading, handleUpload }) {
    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={loading}
            startIcon={<AddCircleIcon />}
        >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'List Vehicle'}
        </Button>
    );
}

export default PostCarButton;