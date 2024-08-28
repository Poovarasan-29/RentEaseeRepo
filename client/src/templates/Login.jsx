import React, { useState } from "react";
import '../css/register.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBTextArea } from 'mdb-react-ui-kit';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export default function Login() {
    const [password, setPassword] = useState("");
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [passwordEye, setPasswordEye] = useState('password');
    const [checkEmail, setCheckEmail] = useState(false);
    const navigate = useNavigate();


    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handlePasswordEye = () => {
        setPasswordEye(pre => pre === 'password' ? 'text' : 'password');
    }

    const handleEmailOrPhone = (e) => {
        setEmailOrPhone(e.target.value);
    }

    const loginBtn = async (e) => {
        e.preventDefault();
        if ((isNaN(emailOrPhone) && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(emailOrPhone)) || (!isNaN(emailOrPhone) && emailOrPhone.length !== 10)) {
            e.preventDefault();
            setCheckEmail(true);
        } else {
            try {
                const res = await axios.post(process.env.REACT_APP_BASE_URL + 'login', { emailOrPhone, password });
                if (res.data.success) {
                    toast.success(res.data.message);
                    setTimeout(() => {
                        navigate(`/renteasee?userid=${res.data.userID}`)
                    }, 1800)
                }
                else {
                    toast.error(res.data.message);
                    console.log("asdfas");

                }
            } catch (error) {

            }
        }
    }

    return <>
        <MDBContainer fluid className='p-5 background-radial-gradient overflow-hidden' style={{ height: '100vh' }}>
            <img src={'https://firebasestorage.googleapis.com/v0/b/renteasee-29.appspot.com/o/AppImages%2FRentEaseeLogo.png?alt=media&token=2d3aa269-d5ac-464d-add4-6d85860db2f8'} alt="logo" className='img-logo' />
            <MDBRow className='mt-5 d-flex flex-column align-items-center text-center'>
                <MDBCol md='5' lg='6' className='text-center text-md-start d-flex flex-column  align-items-center justify-content-center'>
                    <h1 className="my-3 display-4 heading fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                        " Welcome back " <br />
                        <span style={{ color: 'hsl(218, 81%, 75%)', paddingLeft: '15px' }}>to RentEasee</span>
                    </h1>

                    <p className='px-3 heading-body' style={{ color: 'hsl(218, 81%, 85%)' }}>
                        Access your account and continue exploring hassle-free car rentals.
                    </p>

                </MDBCol>

                <MDBCol md='7' lg='5' className='position-relative'>

                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                    <div id="radius-shape-3" className="shadow-5-strong" ></div>

                    <form onSubmit={loginBtn}>
                        <MDBCard className='my-5 bg-glass'>
                            <MDBCardBody className='p-5 pt-4'>
                                <h1 className='mb-3 display-5 fw-bold text-center form-heading' style={{ background: 'radial-gradient(#44006b, #ad1fff)', backgroundClip: "text", color: 'rgb(0 0 0 / 20%)' }}>Login your account</h1>
                                <MDBRow className='mb-2'>
                                    <MDBCol col='6' className='position-relative'>
                                        <MDBInput wrapperClass='mb-4' className='py-3' label='Email or Phone' required onChange={handleEmailOrPhone} name='email' value={emailOrPhone} id='email' type='text' />
                                        <p className='m-0 text-danger' style={{ fontSize: '12px', position: 'absolute', bottom: '4px', left: '15px', visibility: checkEmail ? "visible" : "hidden" }}>Enter Valid Email or Phone</p>
                                    </MDBCol>
                                </MDBRow>


                                <MDBRow className='mb-2'>
                                    <MDBCol col='6' className='position-relative'>
                                        <MDBInput wrapperClass='mb-4' className='py-3 pe-5' label='Password' id='password' required onChange={handlePassword} name='password' value={password} type={passwordEye} />
                                        {
                                            password.length !== 0 &&
                                            <i className={passwordEye !== "password" ? "bi bi-eye fs-4" : "bi bi-eye-slash fs-4"} title={passwordEye === "password" ? "show" : "hide"} onClick={handlePasswordEye} style={{ position: 'absolute', top: '10px', right: '22px', cursor: 'pointer' }}></i>
                                        }
                                    </MDBCol>
                                </MDBRow>

                                <MDBBtn className='w-100 mb-4' style={{ letterSpacing: '1px', fontSize: '18px', background: '#ad1fff' }} size='md'>login</MDBBtn>
                                <p className='text-center mb-0'>Don't have an account? <Link to={'/'}>Register</Link></p>

                            </MDBCardBody>
                        </MDBCard>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer >
    </>
}