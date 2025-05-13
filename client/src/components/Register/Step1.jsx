import { useState } from "react";
import {
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
} from "mdb-react-ui-kit";
export default function Step1({ setStep, setPassword, setPhoneNumber, setFullName, setEmail, fullName, phoneNumber, password, step, email }) {
    const [passwordEye, setPasswordEye] = useState("password");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [inputsValidation, setInputsValidation] = useState({
        email: false,
        phoneNumber: false,
        password: false,
        confirmPassword: false,
    });
    const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false)

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneNumber = (e) => {
        if (
            e.target.value.length < 11 &&
            (!isNaN(e.target.value.at(-1)) || e.target.value === "")
        )
            setPhoneNumber(e.target.value);
    };


    const submitBtn = async (e) => {
        e.preventDefault();
        const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setInputsValidation({
            email: false,
            phoneNumber: false,
            password: false,
            confirmPassword: false,
        })
        if (
            emailValidation &&
            fullName &&
            phoneNumber.length === 10 &&
            password.length > 5 &&
            password.length < 13 &&
            password === confirmPassword &&
            isCheckBoxChecked
        ) {
            setStep(2)
        } else {
            if (!emailValidation)
                setInputsValidation((pre) => {
                    return { ...pre, email: true };
                });
            if (phoneNumber.length !== 10)
                setInputsValidation((pre) => {
                    return { ...pre, phoneNumber: true };
                });
            if (password.length < 6 || password.length > 12)
                setInputsValidation((pre) => {
                    return { ...pre, password: true };
                });
            if (password !== confirmPassword)
                setInputsValidation((pre) => {
                    return { ...pre, confirmPassword: true };
                });
        }
    };


    return <>
        {/* NAME and PASSWORD */}
        <MDBRow className="mb-2">
            <MDBCol col="6" className="position-relative">
                <MDBInput
                    wrapperClass="mb-1"
                    className="py-3 custom-input shadow-0 border"
                    required
                    onChange={(e) => setFullName(e.target.value)}
                    name="fullName"
                    value={fullName}
                    label="Full Name"
                    id="fullname"
                    type="text"
                />
            </MDBCol>


            <MDBCol col="6" className="position-relative">
                <MDBInput
                    className="py-3 phonenumber"
                    label="Phone Number"
                    required
                    onChange={handlePhoneNumber}
                    name="phoneNumber"
                    id="phonenumber"
                    value={phoneNumber}
                    type="text"
                />
                <p
                    className="m-0 ps-1 text-danger"
                    style={{
                        fontSize: "10px",
                        visibility: inputsValidation.phoneNumber
                            ? "visible"
                            : "hidden",
                    }}
                >
                    Enter Valid Mobile Number
                </p>
            </MDBCol>
        </MDBRow>

        {/* EMAIL and VERIFICATION */}
        <MDBRow className="mb-2">
            <MDBCol col="6" className="position-relative">
                <MDBInput
                    className="py-3"
                    label="Email"
                    required
                    onChange={handleEmail}
                    name="email"
                    value={email}
                    id="email"
                    type="text"
                />
                <p
                    className="m-0 ps-1 text-danger"
                    style={{
                        fontSize: "10px",
                        visibility: inputsValidation.email
                            ? "visible"
                            : "hidden",
                    }}
                >
                    Enter Valid Email
                </p>
            </MDBCol>
        </MDBRow>

        {/* PASSWORD and CONFIRM PASSWORD  */}
        <MDBRow className="mb-2">
            <MDBCol col="6" className="position-relative">
                <MDBInput
                    className="py-3 pe-5"
                    label="Password"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    value={password}
                    type={passwordEye}
                />

                {password.length !== 0 && (
                    <i
                        className={
                            passwordEye !== "password"
                                ? "bi bi-eye fs-4"
                                : "bi bi-eye-slash fs-4"
                        }
                        title={passwordEye === "password" ? "show" : "hide"}
                        onClick={() => setPasswordEye((pre) => (pre === "password" ? "text" : "password"))}
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "22px",
                            cursor: "pointer",
                        }}
                    ></i>
                )}
                <p
                    className={`m-0 ps-1 ${inputsValidation.password ? 'text-danger' : 'text-dark'}`}
                    style={{
                        fontSize: "10px",
                    }}
                >
                    Password length 6 - 12 (characters)
                </p>
            </MDBCol>

            <MDBCol col="6" className="position-relative">
                <MDBInput
                    className="py-3"
                    label="Confirm Password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="confirmPassword"
                    value={confirmPassword}
                    id="confirmpassword"
                    type="password"
                />
                <p
                    className="m-0 ps-1 text-danger"
                    style={{
                        fontSize: "10px",
                        visibility: inputsValidation.confirmPassword
                            ? "visible"
                            : "hidden",
                    }}
                >
                    Password Doesn't match
                </p>
            </MDBCol>
        </MDBRow>

        {/* CHECKBOX -- Terms and Conditions */}
        <div className="d-flex my-4">
            <MDBCheckbox
                name="flexCheck"
                required
                id="flexCheckDefault"
                label={
                    <span>
                        I agree all statements in{" "}
                        <a
                            href="/terms-of-service"
                            className="terms-link text-decoration-underline"
                        >
                            Terms of Service
                        </a>
                    </span>
                }
                onChange={(e) => setIsCheckBoxChecked(e.target.checked)}
            />
        </div>

        <MDBBtn
            className="w-100 mb-4"
            style={{
                letterSpacing: "1px",
                fontSize: "18px",
                background: "#ad1fff",
            }}
            size="md"
            onClick={submitBtn}
        >
            Step {step + 1}
        </MDBBtn>
    </>
}