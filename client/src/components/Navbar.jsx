import React from "react";
import { Link } from 'react-router-dom';


export default function Navbar() {

    return <>
        <nav className="navbar navbar-expand-sm fixed-top" style={{ background: 'rgb(34,34,34)', height: '100px' }} >
            <div className="container-fluid py-2 " style={{ background: 'rgb(34,34,34)' }}>
                <Link to={'/renteasee'}>
                    <img src={"https://firebasestorage.googleapis.com/v0/b/renteasee-29.appspot.com/o/AppImages%2FRentEaseeLogo.png?alt=media&token=2d3aa269-d5ac-464d-add4-6d85860db2f8"} className="ms-5" alt="" width="80px" style={{ transform: 'scale(1.6)' }} />
                </Link>
                <button className="navbar-toggler border btn me-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ background: 'rgb(34,34,34)', width: '100%' }}>
                    <ul className="navbar-nav ms-auto me-sm-5 me-sm-2 mt-3 mt-sm-0">

                        <li className="nav-item">
                            <Link to={'/renteasee/login'} className="nav-link text-light btn me-0 me-sm-2 mx-2 mx-sm-0 px-3 fw-bold" style={{ letterSpacing: '1px', fontSize: '18px', background: '#ad1fff' }} >Login</Link>
                        </li>

                        <li className="nav-item" id="help">
                            <Link to="/" className="nav-link fs-5 text-light mx-2" role="button">Contact Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}