import './App.css';
import Home from './templates/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import { SkeletonTheme } from 'react-loading-skeleton';

import Register from './templates/Register';
import Login from './templates/Login';
import DisplayCars from './templates/DisplayCars';
import Drivers from './templates/Drivers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CarDetails from './templates/CarDetails';
import ApplyDriver from './templates/ApplyDriver';
import NewCar from './templates/NewCar';

function App() {

    useEffect(() => {
        AOS.init();
    }, []);
    return <>
        {/* <SkeletonTheme baseColor='#313131' highlightColor='#525252'> */}
        <BrowserRouter>
            <ToastContainer autoClose={1300} />
            <Routes>
                <Route path='/renteasee' element={<Navbar />} />
                <Route path='/renteasee/rent-cars' element={<Navbar />} />
                <Route path='/renteasee/new-rent-car' element={<Navbar />} />
                <Route path='/renteasee/new-driver' element={<Navbar />} />
                <Route path='/renteasee/hire-drivers' element={<Navbar />} />
                <Route path='/renteasee/rent-cars/details/:id' element={<Navbar />} />
            </Routes>
            <Routes>
                <Route path='/temp' element={<CarDetails />} />
                <Route path='/' element={<Register />} />
                <Route path='/renteasee/login' element={<Login />} />
                <Route path='/renteasee' element={<Home />} />
                <Route path='/renteasee/rent-cars' element={<DisplayCars />} />
                <Route path='/renteasee/hire-drivers' element={<Drivers />} />
                <Route path='/renteasee/rent-cars/details/:id' element={<CarDetails />} />
                <Route path='/renteasee/new-rent-car' element={<NewCar />} />
                {/* <Route path='/renteasee/new-rent-car' element={<NewCarPost />} /> */}
                <Route path='/renteasee/new-driver' element={<ApplyDriver />} />

            </Routes>
        </BrowserRouter>
        {/* </SkeletonTheme> */}
    </>
}

export default App;
