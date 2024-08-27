const multer = require('multer');
const carpost = require('../models/carPostModel');


let imgPaths = []
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'images')
            cb(null, '../frontend/public/Images/Car Uploaded Files');
        if (file.fieldname === 'insuranceDocument')
            cb(null, '../frontend/public/Images/Insurance Files');

    },
    filename: (req, file, cb) => {
        let path;
        if (file.fieldname === 'images')
            path = { image: '/Images/Car Uploaded Files/' + Date.now() + file.originalname }
        if (file.fieldname === 'insuranceDocument')
            path = { image: '/Images/Insurance Files/' + Date.now() + file.originalname }

        imgPaths.push(path);
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: (6 * 1000 * 1000)
    }
});

// const uploadHandler = upload.array('file');
const uploadHandler = upload.fields([{ name: 'images', maxCount: 5 }, { name: 'insuranceDocument', maxCount: 1 }])

exports.addNewCar = (req, res) => {

    
    uploadHandler(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code == 'LIMIT_FILE_SIZE') {
                res.status(400).json({ message: "Maximum size 2MB" })
            }
            return;
        }
        else {
            const values = req.body;
            values.carPhotos = imgPaths.slice(0, imgPaths.length - 1);
            values.insuranceDocument = imgPaths.at(-1).image;
            values.createdAt = new Date();

            const newCarPost = new carpost(values);
            const savedPost = await newCarPost.save();
            res.status(201).json({ message: 'Uploaded to The Server !!' })
        }
    });
}
