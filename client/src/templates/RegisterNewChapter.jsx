import { useState } from "react";
import "../css/register.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Step1 from "../components/Register/Step1";
import Step2 from "../components/Register/Step2";

function Register() {
  const [step, setStep] = useState(1)

  // STEP 1 
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  // Step 2
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [address, setAddress] = useState("")

  const navigate = useNavigate();


  console.log("STEP : ", step);
  console.log(fullName);
  console.log(email);
  console.log(phoneNumber);
  console.log(password);
  console.log(selectedState);
  console.log(selectedDistrict);
  console.log(selectedCity);
  console.log(address);



  return (
    <>
      <Helmet>
        <title>RentEasee | Register</title>
      </Helmet>
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient d-flex align-items-center overflow-hidden"
        style={{ height: "100vh" }}
      >

        <MDBRow className="mt-5">
          <MDBCol
            md="5"
            lg="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1
              className="my-3 display-4 heading fw-bold ls-tight px-3"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              Effortless <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                Car Rentals for All
              </span>
            </h1>

            <p
              className="px-3 heading-body"
              style={{ color: "hsl(218, 81%, 85%)" }}
            >
              Join RentEasee today and enjoy hassle-free car rentals at your
              fingertips. Whether you're looking to rent or list a vehicle, our
              platform offers the best deals and a seamless experience tailored
              to your needs.
            </p>
          </MDBCol>

          <MDBCol md="7" lg="6" className="position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>
            <div id="radius-shape-3" className="shadow-5-strong"></div>

            <form>
              <MDBCard className="my-5 bg-glass">
                <MDBCardBody className="p-5 pt-4">
                  <h1
                    className="mb-3 display-5 fw-bold text-center form-heading"
                    style={{
                      background: "radial-gradient(#44006b, #ad1fff)",
                      backgroundClip: "text",
                      color: "rgb(0 0 0 / 20%)",
                    }}
                  >
                    Create an account

                  </h1>
                  <p className="text-secondary ms-1">Step {step}</p>

                  {/* STEPS */}
                  <MDBRow className="my-3 px-3" style={{ gap: '15px' }}>
                    <MDBCol style={{ height: '4px', backgroundColor: step == 1 ? '#ad1fff' : 'green' }} title="Step 1">
                    </MDBCol>
                    <MDBCol style={{ height: '4px', backgroundColor: step == 2 ? '#ad1fff' : step > 2 ? 'green' : 'black' }} title="Step 2"></MDBCol>
                    <MDBCol style={{ height: '4px', backgroundColor: step == 3 ? '#ad1fff' : step > 3 ? 'green' : 'black' }} title="Step 3"></MDBCol>
                    <MDBCol style={{ height: '4px', backgroundColor: step == 4 ? '#ad1fff' : step > 4 ? 'green' : 'black' }} title="Step 4"></MDBCol>
                  </MDBRow>

                  {
                    step == 1 ? <Step1 setEmail={setEmail} setStep={setStep} setPassword={setPassword} setPhoneNumber={setPhoneNumber} setFullName={setFullName} email={email} step={step} password={password} phoneNumber={phoneNumber} fullName={fullName} /> : step == 2 ? <Step2 selectedCity={selectedCity} selectedDistrict={selectedDistrict} selectedState={selectedState} setSelectedCity={setSelectedCity} setSelectedDistrict={setSelectedDistrict} setSelectedState={setSelectedState} setStep={setStep} step={step} address={address} setAddress={setAddress} /> : <p>Hello</p>
                  }

                  <p className="text-center mb-0">
                    Have already an account?{" "}
                    <Link to={"/renteasee/login"}>Login</Link>
                  </p>
                </MDBCardBody>
              </MDBCard>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Register;
