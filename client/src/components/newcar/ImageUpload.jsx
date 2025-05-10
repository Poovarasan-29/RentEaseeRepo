import React, { useRef } from 'react';
import {
    Typography,
    Button,
    Grid,
    IconButton,
    Box,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

function ImageUpload({ files, setFiles, displayImages, setDisplayImages, handleFileChange, check }) {
    const fileInputRef = useRef(null);

    // const handleImageRemove = (index) => {
    //     const newDisplayImages = [...displayImages];
    //     newDisplayImages.splice(index, 1);
    //     setDisplayImages(newDisplayImages);

    //     const newCarPhotos = [...files.carPhotos];
    //     newCarPhotos.splice(index, 1);
    //     setFiles(prev => ({ ...prev, carPhotos: newCarPhotos }));
    // };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                <PhotoCameraIcon sx={{ mr: 1 }} /> Upload Images
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        onClick={handleButtonClick}
                    >
                        Upload Car Photos (5 Required)
                    </Button>
                    <input
                        type="file"
                        name="carPhotos"
                        multiple
                        required
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                    {check && <Typography color="error" variant="caption">Please upload exactly 5 car photos.</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                        {displayImages.map((img, index) => (
                            <Box key={index} sx={{ position: 'relative', display: 'inline-block' }}>
                                <img src={img} alt={`preview-${index}`} style={{ width: 100, height: 100, objectFit: 'cover', border: '1px solid #ccc', borderRadius: '4px' }} />
                                {/* <IconButton
                                    size="small"
                                    sx={{ position: 'absolute', top: -8, right: -8, backgroundColor: 'white', '&:hover': { backgroundColor: '#f0f0f0' } }}
                                    onClick={() => handleImageRemove(index)}
                                >
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton> */}
                            </Box>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Insurance Document
                        <input
                            type="file"
                            name="insuranceDocument"
                            onChange={handleFileChange}
                            required
                            style={{ display: 'none' }}
                            accept="application/pdf,image/*"
                        />
                    </Button>
                    {files.insuranceDocument && (
                        <Typography variant="caption" sx={{ ml: 1 }}>
                            {files.insuranceDocument.name}
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

export default ImageUpload;