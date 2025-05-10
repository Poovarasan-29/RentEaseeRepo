import "./App.css";
import Home from "./templates/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

import Register from "./templates/Register";
import Login from "./templates/Login";
import DisplayCars from "./templates/DisplayCars";
import Drivers from "./templates/Drivers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarDetails from "./templates/CarDetails";
import ApplyDriver from "./templates/ApplyDriver";
import NewCar from "./templates/NewCar";
import Footer from "./components/Footer";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PersonalProfile from "./templates/PersonalProfile";
import Layout from "./Layout";
function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  // return <>
  //     <SkeletonTheme baseColor='#D3D3D3' highlightColor='#E8E8E8'>
  //         <BrowserRouter>
  //             <ToastContainer autoClose={1300} />
  //             <Routes>
  //                 <Route path='/renteasee' element={<Navbar />} />
  //                 <Route path='/renteasee/rent-cars' element={<Navbar />} />
  //                 <Route path='/renteasee/new-rent-car' element={<Navbar />} />
  //                 <Route path='/renteasee/new-driver' element={<Navbar />} />
  //                 <Route path='/renteasee/hire-drivers' element={<Navbar />} />
  //                 <Route path='/renteasee/rent-cars/details/:id' element={<Navbar />} />
  //             </Routes>
  //             <Routes>
  //                 <Route path='/' element={<Register />} />
  //                 <Route path='/renteasee/login' element={<Login />} />
  //                 <Route path='/renteasee' element={<Home />} />
  //                 <Route path='/renteasee/rent-cars' element={<DisplayCars />} />
  //                 <Route path='/renteasee/rent-cars/details/:id' element={<CarDetails />} />
  //                 <Route path='/renteasee/hire-drivers' element={<Drivers />} />
  //                 <Route path='/renteasee/new-rent-car' element={<NewCar />} />
  //                 <Route path='/renteasee/new-driver' element={<ApplyDriver />} />
  //                 <Route path='/renteasee/profile' element={<PersonalProfile />} />

  //             </Routes>
  //             <Routes>
  //                 <Route path='/renteasee' element={<Footer />} />
  //             </Routes>
  //         </BrowserRouter>
  //     </SkeletonTheme>
  // </>

  return (
    <BrowserRouter>
      <ToastContainer autoClose={1300} />
      <SkeletonTheme baseColor="#D3D3D3" highlightColor="#E8E8E8">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/renteasee/login" element={<Login />} />

          <Route path="/renteasee" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="rent-cars" element={<DisplayCars />} />
            <Route path="rent-cars/details/:id" element={<CarDetails />} />
            <Route path="hire-drivers" element={<Drivers />} />
            <Route path="new-rent-car" element={<NewCar />} />
            <Route path="new-driver" element={<ApplyDriver />} />
            <Route path="profile" element={<PersonalProfile />} />
          </Route>
        </Routes>
      </SkeletonTheme>
    </BrowserRouter>
  );
}

export default App;
