import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { setLoginSuccess } from "../slice/checkUserLoginSlice";
import { HashLink } from 'react-router-hash-link';


export default function Navbar() {

    const { userID } = useSelector(state => state.checkUserLoginSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        const userID = JSON.parse(localStorage.getItem('userID'));

        if (userID) {
            dispatch(setLoginSuccess(userID))
        }
    }, []);

    return <>
        <nav className="navbar navbar-expand-sm fixed-top" style={{ background: 'rgb(34,34,34)', height: '100px' }} >
            <div className="container-fluid py-2 " style={{ background: 'rgb(34,34,34)' }}>
                <Link to={'/renteasee'}>
                    <img src={"https://firebasestorage.googleapis.com/v0/b/renteasee-29.appspot.com/o/AppImages%2Frenteasee3.png?alt=media&token=a42632b3-fc37-4b53-b484-31a2451f2a09"} className="ms-5" alt="RentEasee" width="100px" style={{ transform: 'scale(2.2)', filter: 'contrast(3) brightness(2.5)' }} />
                </Link>
                <button className="navbar-toggler border btn me-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ background: 'rgb(34,34,34)', width: '100%' }}>
                    <ul className="navbar-nav ms-auto me-sm-5 me-sm-2 mt-3 mt-sm-0 d-flex align-items-center">

                        {
                            userID ?
                                <li className="nav-item d-flex align-items-center justify-content-center rounded-circle" style={{ width: '60px', height: '60px' }} >
                                    <Link to={`/renteasee/profile?userid=${userID}`}><i className="bi bi-person-circle fs-1 text-light"></i></Link>
                                </li>
                                :
                                <li className="nav-item">
                                    <Link to={'/renteasee/login'} className="nav-link text-light btn me-0 me-sm-2 mx-2 mx-sm-0 px-3 fw-bold" style={{ letterSpacing: '1px', fontSize: '18px', background: '#ad1fff' }} >Login</Link>
                                </li>
                        }
                        <li className="nav-item" id="help">
                            <HashLink to="#footer" className="nav-link fs-5 text-light mx-4" role="button"><i className="bi bi-telephone fs-2"></i></HashLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}