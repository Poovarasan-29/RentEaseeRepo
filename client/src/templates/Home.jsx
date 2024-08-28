import React from 'react';
import HomeSearch from '../components/HomeSearch';
import '../css/home.css';
import { Link } from 'react-router-dom';

export default function Home() {
    return <>
        <section style={{ width: '100%', marginTop: '70px', maxHeight: '745px', overflow: 'hidden' }}>
            <video style={{ width: '100%', objectFit: 'cover' }} src="https://firebasestorage.googleapis.com/v0/b/renteasee-29.appspot.com/o/AppImages%2FRentEase.mp4?alt=media&token=71eba22f-789d-4fd4-a222-b1470c792381" muted autoPlay loop></video>
        </section>
        <HomeSearch />
        <section className='mt-5 pt-4 home-section position-relative' style={{ maxHeight: '845px', overflow: 'hidden' }} data-aos="fade-up" data-aos-offset="50" >
            <h2 className='text-uppercase display-4 container' style={{ color: "black", fontWeight: '400', letterSpacing: '-2px' }}>Cars for rent</h2>
            <Link to={'/renteasee/rent-cars?brand=&model=&year=&state='} className='text-uppercase text-white fs-2 py-3 px-5' id='home-link' style={{ position: 'absolute', bottom: '60px', fontWeight: '500', letterSpacing: '1px' }}>rental cars <i className="bi bi-arrow-right"></i></Link>
            <img src="https://www.irishtimes.com/resizer/v2/TNY2NA3OP5DKXQ6IRC4PTXMTCE.jpg?auth=33f4968d42e5f67eab2e52c460210308ac20d60a5592d8d552749f9761bf6a2c&smart=true&width=1024&height=556" alt="" className='img-fit' />
        </section>
        <section className='mt-5 pt-4 home-section position-relative' style={{ maxHeight: '845px', overflow: 'hidden' }} data-aos="fade-up" data-aos-offset="50">
            <h2 className='text-uppercase display-4 container' style={{ color: "black", fontWeight: '400', letterSpacing: '-2px' }}>Hire Drivers</h2>
            <Link to={'/renteasee/hire-drivers'} className='text-uppercase text-white fs-2 py-3 px-5' id='home-link' style={{ position: 'absolute', bottom: '60px', fontWeight: '500', letterSpacing: '1px' }}>hire driver <i className="bi bi-arrow-right"></i></Link>
            <img src="https://img.freepik.com/free-photo/driver-dressed-elegant-costume_23-2149184285.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1724112000&semt=ais_hybrid" alt="" className='img-fit' />
        </section>
        <section className='mt-5 pt-4 home-section position-relative' style={{ maxHeight: '845px', overflow: 'hidden' }} data-aos="fade-up" data-aos-offset="50">
            <h2 className='text-uppercase display-4 container' style={{ color: "black", fontWeight: '400', letterSpacing: '-2px' }}>Rent my car</h2>
            <Link to={'/renteasee/new-rent-car'} className='text-uppercase text-white fs-2 py-3 px-5' id='home-link' style={{ position: 'absolute', bottom: '60px', fontWeight: '500', letterSpacing: '1px' }}>give details <i className="bi bi-arrow-right"></i></Link>
            <img src="https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg?cs=srgb&dl=pexels-negativespace-97079.jpg&fm=jpg" alt="" className='img-fit' />
        </section>
        <section className='mt-5 pt-4 home-section position-relative' style={{ maxHeight: '845px', overflow: 'hidden' }} data-aos="fade-up" data-aos-offset="50">
            <h2 className='text-uppercase display-4 container' style={{ color: "black", fontWeight: '400', letterSpacing: '-2px' }}>apply for a driver</h2>
            <Link to={'/renteasee/new-driver'} className='text-uppercase text-white fs-2 py-3 px-5' id='home-link' style={{ position: 'absolute', bottom: '60px', fontWeight: '500', letterSpacing: '1px' }}>apply work <i className="bi bi-arrow-right"></i></Link>
            <img src="https://media.istockphoto.com/id/1163298132/photo/close-up-driver-woman-hand-holding-smartphone-for-using-gps-navigation-of-travel-destination.jpg?s=612x612&w=0&k=20&c=_R2nYQLM2385z9tFlj7SLJdsLRq9B3OH_SrtQ8AyUQk=" alt="" className='img-fit' />
        </section>

    </>
}
