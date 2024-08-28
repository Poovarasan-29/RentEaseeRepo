import React, { useState } from 'react';
import '../css/register.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBTextArea } from 'mdb-react-ui-kit';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


function Register() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [passwordEye, setPasswordEye] = useState('password');
    const [addressCount, setAddressCount] = useState(200);
    const navigate = useNavigate();


    const [inputsValidation, setInputsValidation] = useState({ email: false, phoneNumber: false, dob: false, password: false, confirmPassword: false, address: false });

    const handleFullName = (e) => {
        setFullName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePhoneNumber = (e) => {
        if (e.target.value.length < 11 && (!isNaN(e.target.value.at(-1)) || e.target.value === ''))
            setPhoneNumber(e.target.value);
    }

    const handleDob = (e) => {
        setDob(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleAddress = (e) => {
        if (e.target.value.length <= 200) {
            setAddressCount(200 - e.target.value.length)
            setAddress(e.target.value);
        }
    }

    const handlePasswordEye = () => {
        setPasswordEye(pre => pre === 'password' ? 'text' : 'password');
    }

    const signUpBtn = async (e) => {
        e.preventDefault();
        const emailValidation = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
        const dateOfBirth = new Date(dob);
        const month_diff = Date.now() - dateOfBirth.getTime();
        const age_dt = new Date(month_diff);
        const year = age_dt.getUTCFullYear();
        const age = Math.abs(year - 1970);


        if (emailValidation && fullName && phoneNumber.length === 10 && age > 17 && password.length > 5 && password.length < 13 && password === confirmPassword && address.length >= 50) {
            const values = { fullName, email, phoneNumber, dob, password, address };
            try {
                const res = await axios.post(process.env.REACT_APP_BASE_URL + "register", values);

                if (res.data.message === 'Mobile Number Already Exists') {
                    toast.error(res.data.message);
                } else if (res.status === 201) {
                    toast.success("Successfully Registered");
                    setTimeout(() => {
                        navigate('/renteasee/login');
                    }, 1500);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            if (!emailValidation)
                setInputsValidation(pre => { return { ...pre, email: true } });
            if (phoneNumber.length !== 10)
                setInputsValidation(pre => { return { ...pre, phoneNumber: true } });
            if (age < 18)
                setInputsValidation(pre => { return { ...pre, dob: true } });
            if (password.length < 6 || password.length > 12)
                setInputsValidation(pre => { return { ...pre, password: true } });
            if (password !== confirmPassword)
                setInputsValidation(pre => { return { ...pre, confirmPassword: true } });
            if (address.length < 50)
                setInputsValidation(pre => { return { ...pre, address: true } });
        }
    }


    return <>
        <Helmet>
            <title>RentEasee | Register</title>
        </Helmet>
        <MDBContainer fluid className='p-4 background-radial-gradient d-flex align-items-center overflow-hidden' style={{ height: '100vh' }}>
            <img src={'https://firebasestorage.googleapis.com/v0/b/renteasee-29.appspot.com/o/AppImages%2FRentEaseeLogo.png?alt=media&token=2d3aa269-d5ac-464d-add4-6d85860db2f8'} alt="logo" className='img-logo' />
            <MDBRow className='mt-5'>
                <MDBCol md='5' lg='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                    <h1 className="my-3 display-4 heading fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                        Effortless  <br />
                        <span style={{ color: 'hsl(218, 81%, 75%)' }}>Car Rentals for All</span>
                    </h1>

                    <p className='px-3 heading-body' style={{ color: 'hsl(218, 81%, 85%)' }}>
                        Join RentEasee today and enjoy hassle-free car rentals at your fingertips. Whether you're looking to rent or list a vehicle, our platform offers the best deals and a seamless experience tailored to your needs.
                    </p>

                </MDBCol>

                <MDBCol md='7' lg='6' className='position-relative'>

                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                    <div id="radius-shape-3" className="shadow-5-strong" ></div>

                    <form onSubmit={signUpBtn}>
                        <MDBCard className='my-5 bg-glass'>
                            <MDBCardBody className='p-5 pt-4'>
                                <h1 className='mb-3 display-5 fw-bold text-center form-heading' style={{ background: 'radial-gradient(#44006b, #ad1fff)', backgroundClip: "text", color: 'rgb(0 0 0 / 20%)' }}>Create an account</h1>
                                <MDBRow className='mb-2'>
                                    <MDBCol col='6' className='position-relative'>
                                        <MDBInput wrapperClass='mb-4' className='py-3 custom-input shadow-0 border' required onChange={handleFullName} name='fullName' value={fullName} label='Full Name' id='fullname' type='text' />
                                    </MDBCol>

                                    <MDBCol col='6' className='position-relative'>
                                        <MDBInput wrapperClass='mb-4' className='py-3' label='Email' required onChange={handleEmail} name='email' value={email} id='email' type='text' />
                                        <p className='m-0 text-danger' style={{ fontSize: '12px', position: 'absolute', bottom: '4px', left: '15px', visibility: inputsValidation.email ? "visible" : "hidden" }}>Enter Valid Email</p>
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow className='mb-2'>
                                    <MDBCol col='6' className='position-relative'>
                                        <MDBInput wrapperClass='mb-4' className='py-3 phonenumber' label='Phone Number' required onChange={handlePhoneNumber} name='phoneNumber' id='phonenumber' value={phoneNumber} type='text' />
                                        <p className='m-0 text-danger' style={{ fontSize: '12px', position: 'absolute', bottom: '4px', left: '15px', visibility: inputsValidation.phoneNumber ? "visible" : "hidden" }}>Enter Valid Mobile Number</p>
                                    </MDBCol>

                                    <MDBCol col='6' className='position-relative'>
                                        <MDBInput wrapperClass='mb-4' className='py-3' label='Date of Birth' id='dateobirth' required onChange={handleDob} name='dob' value={dob} type='date' />
                                        <p className='m-0 text-danger' style={{ fontSize: '12px', position: 'absolute', bottom: '4px', left: '15px', visibility: inputsValidation.dob ? "visible" : "hidden" }}>18+ only Allowed</p>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className='mb-2'>
                                    <MDBCol col='6' className='position-relative'>
                                        <MDBInput wrapperClass='mb-4' className='py-3 pe-5' label='Password' id='password' required onChange={handlePassword} name='password' value={password} type={passwordEye} />

                                        {
                                            password.length !== 0 &&
                                            <i className={passwordEye !== "password" ? "bi bi-eye fs-4" : "bi bi-eye-slash fs-4"} title={passwordEye === "password" ? "show" : "hide"} onClick={handlePasswordEye} style={{ position: 'absolute', top: '10px', right: '22px', cursor: 'pointer' }}></i>
                                        }
                                        <p className={inputsValidation.password ? 'm-0 text-danger' : 'm-0 text-dark'} style={{ fontSize: '12px', position: 'absolute', bottom: '4px', left: '15px' }}>Password length 6 - 12 (characters)</p>
                                    </MDBCol>

                                    <MDBCol col='6' className='position-relative'>
                                        <MDBInput wrapperClass='mb-4' className='py-3' label='Confirm Password' required onChange={handleConfirmPassword} name='confirmPassword' value={confirmPassword} id='confirmpassword' type='password' />
                                        <p className='m-0 text-danger' style={{ fontSize: '12px', position: 'absolute', bottom: '4px', left: '15px', visibility: inputsValidation.confirmPassword ? "visible" : "hidden" }}>Password Doesn't match</p>
                                    </MDBCol>
                                </MDBRow>

                                <div className='position-relative'>
                                    <MDBTextArea wrapperClass='pt-1' label="Address" required onChange={handleAddress} name='address' value={address} style={{ resize: 'none' }} rows={3} id='address' type="textarea" />
                                    <p className='m-0 text-danger' style={{ fontSize: '12px', position: 'absolute', bottom: '0px', left: '6px', visibility: inputsValidation.address ? "visible" : "hidden" }}>Mininum 50 Characters Required</p>
                                    <span className='m-0 text-end d-block pe-1' style={{ fontSize: '13px' }}>Remaining words : {addressCount}</span>
                                </div>

                                {/* <div style={{ display: 'flex', gap: '15px' }}>
                                <OtpInput numInputs={6} value={otp} inputStyle={{ width: '30px', height: '30px', border: '1px solid rgba(0,0,0,.4)' }} onChange={handleOTPinputs} renderSeparator={<span>&emsp;</span>} renderInput={(props) => <input {...props} />} />
                                <MDBBtn className='btn-success' size='md'>Send OTP</MDBBtn>
                                <div id="recaptcha-container"></div>
                                <MDBBtn className='btn-success' size='md' >Verify OTP</MDBBtn>
                            </div> */}

                                <div className='d-flex my-4'>
                                    <MDBCheckbox name='flexCheck' required id='flexCheckDefault' label={<span>I agree all statements in <a href="/terms-of-service" className="terms-link text-decoration-underline">Terms of Service</a></span>} />
                                </div>
                                <MDBBtn className='w-100 mb-4' style={{ letterSpacing: '1px', fontSize: '18px', background: '#ad1fff' }} size='md'>register</MDBBtn>
                                <p className='text-center mb-0'>Have already an account? <Link to={'/renteasee/login'}>Login</Link></p>

                            </MDBCardBody>
                        </MDBCard>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer >
    </>
}

export default Register;