import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom bg-dark text-light'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Get connected with us on social networks</span>
                </div>

                <div>
                    <Link to={''} className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='facebook-f' />
                    </Link>
                    <Link to={''} className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='twitter' />
                    </Link>
                    <Link to={''} className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='google' />
                    </Link>
                    <Link to={''} className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='instagram' />
                    </Link>
                    <Link to={''} className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='linkedin' />
                    </Link>
                    <Link to={''} className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='github' />
                    </Link>
                </div>
            </section>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon color='secondary' icon='gem' className='me-3' />
                                Rent Easee
                            </h6>
                            <p className=''>
                                Renting Cars and Freelance Drivers
                            </p>
                        </MDBCol>

                        <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                            <p>
                                <Link to={'/renteasee/rent-cars?brand=&model=&year=&state='} className='text-reset'>
                                    Cars for rent
                                </Link>
                            </p>
                            <p>
                                <Link to={'/renteasee/hire-drivers'} className='text-reset'>
                                    Hire Drivers
                                </Link>
                            </p>
                            <p>
                                <Link to={'/renteasee/new-rent-car'} className='text-reset'>
                                    Rent my car
                                </Link>
                            </p>
                            <p>
                                <Link to={'/renteasee/new-driver'} className='text-reset'>
                                    Apply for a driver
                                </Link>
                            </p>
                        </MDBCol>

                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <MDBIcon color='secondary' icon='home' className='me-2' />
                                Hindusthan College of Engineering and Technology, Coimbatore
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                                renteasee.help@gmail.com
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4 bg-dark text-light' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2024 Copyright renteasee.com
            </div>
        </MDBFooter>
    );
}