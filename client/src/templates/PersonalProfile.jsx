import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import axios from 'axios';
import DriverCardSkeleton from '../skeleton/DriverCardSkeleton';
import { Link } from 'react-router-dom';
import { setLogout } from '../slice/checkUserLoginSlice';
import { useDispatch } from 'react-redux';

export default function PersonalProfile() {

    const queryParams = new URLSearchParams(window.location.search);
    const [userDetails, setUserDetails] = useState(null);
    const dispatch = useDispatch();

    async function fetchUserProfile(userid) {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + 'user-profile', { params: { userid } });
        if (response.data.length !== 0) {
            setUserDetails(response.data[0])
        }

    }

    function handleLogoutBtn() {
        localStorage.clear();
        dispatch(setLogout());
    }

    useState(() => {
        const userid = queryParams.get('userid');
        fetchUserProfile(userid);
    }, []);

    return (
        userDetails ? <div className="gradient-custom-2">
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="9" xl="7">
                        <MDBCard>
                            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                        alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                                    <MDBBtn outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                                        Edit profile
                                    </MDBBtn>
                                </div>
                                <div className="ms-3" style={{ marginTop: '140px' }}>
                                    <MDBTypography tag="h2">{userDetails.fullName}</MDBTypography>
                                </div>
                            </div>
                            <MDBCardBody className="text-black p-4" style={{ marginTop: '100px' }}>
                                <MDBTypography tag="h6">Information</MDBTypography>
                                <hr className="mt-0 mb-4" />
                                <MDBRow className="pt-1">
                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h6">Email</MDBTypography>
                                        <MDBCardText className="text-muted">{userDetails.email}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h6">Phone</MDBTypography>
                                        <MDBCardText className="text-muted">{userDetails.phoneNumber}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h6">Date of Birth</MDBTypography>
                                        <MDBCardText className="text-muted">{userDetails.dob}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h6">Address</MDBTypography>
                                        <MDBCardText className="text-muted">{userDetails.address}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                        <Link to={'/renteasee/login'} className='btn anim_btn border border-secondary' onClick={handleLogoutBtn} style={{ marginTop: '200px' }}>Logout <i className="bi bi-box-arrow-right"></i></Link>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
            :
            <div >
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="9" xl="7">
                            <DriverCardSkeleton />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
    );
}