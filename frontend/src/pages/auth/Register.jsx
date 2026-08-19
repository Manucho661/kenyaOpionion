import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";

// Dummy region options.
// Kept as an array so more regions can be added later without
// touching the JSX.
const regionOptions = ["Western", "Nairobi"];

const TOTAL_STEPS = 2;

function Register() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // regions
    const [regions, setRegions] = useState([]);
    const [regionsLoading, setRegionsLoading] = useState(false);
    const [regionsError, setRegionsError] = useState(false);
    useEffect(() => {
        const fetchRegions = async () => {
            setRegionsLoading(true);
            try {
                const response = await apiClient.get('/regions');
                setRegions(response.data);
            }
            catch (error) {
                setRegionsError(true);
                console.log(error);
            }
            finally {
                setRegionsLoading(false);
            }
        }

        fetchRegions();
    }, []);

    const role = 'voter';
    const [formData, setFormData] = useState({
        name: "",
        national_id: "",
        region_id: "",
        role,
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    };



    // ---- Password rule checks ----
    const hasMinLength = formData.password.length >= 8;
    const hasUppercase = /[A-Z]/.test(formData.password);
    const hasLowercase = /[a-z]/.test(formData.password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(formData.password);

    const isPasswordValid =
        hasMinLength && hasUppercase && hasLowercase && hasSpecialChar;

    const passwordsMatch =
        formData.password_confirmation.length > 0 &&
        formData.password === formData.password_confirmation;

    // Very simple email pattern, good enough for this static form.
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    // ---- Section validity ----
    const isSection1Valid =
        formData.name.trim() !== "" &&
        formData.national_id.trim() !== "" &&
        formData.region_id !== "";

    const isSection2Valid =
        isEmailValid && isPasswordValid && passwordsMatch;

    const isFormValid = isSection1Valid && isSection2Valid;

    const goNext = () => {
        if (isSection1Valid) {
            setStep(2);
        }
    };

    const goPrevious = () => {
        setStep(1);
    };

    // Placeholder for the future registration API call.
    // const handleRegisterClick = () => {
    //     // TODO: Connect this to the registration/authentication logic later.
    //     console.log("Register clicked with:", formData);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/users', formData);
            toast.success(response.data.message);
            navigate('/')
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        }
        console.log('registration form clicked');
    }

    const progressPercentage = (step / TOTAL_STEPS) * 100;

    return (
        <div className="ko-register-page">
            <div className="ko-register-overlay">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            <div className="ko-register-card">
                                <div className="text-center mb-4">
                                    <Link to="/" className="ko-register-brand">
                                        KenyaOpinion
                                    </Link>
                                    <h1 className="ko-register-title">Create your account</h1>
                                    <p className="ko-register-subtitle">
                                        Register to take part in presidential opinion polls.
                                    </p>
                                </div>

                                {/* Section 1: Basic Details */}
                                <form onSubmit={handleSubmit}>

                                    {step === 1 && (
                                        <div>
                                            <h2 className="ko-step-heading">Basic Details</h2>

                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="e.g. Jane Wanjiru"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="national_id" className="form-label">
                                                    Your National ID
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="national_id"
                                                    name="national_id"
                                                    placeholder="e.g. 12345678"
                                                    value={formData.national_id}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="region" className="form-label">
                                                    Region
                                                </label>

                                                <select
                                                    className="form-select"
                                                    id="region"
                                                    name="region_id"
                                                    value={formData.region_id}
                                                    onChange={handleChange}
                                                    disabled={regionsLoading || regionsError || regions.length === 0}
                                                >
                                                    <option value="">
                                                        {regionsLoading
                                                            ? "Loading regions..."
                                                            : regionsError
                                                                ? "Unable to load regions"
                                                                : regions.length === 0
                                                                    ? "No regions available"
                                                                    : "Select your region"}
                                                    </option>

                                                    {!regionsLoading &&
                                                        !regionsError &&
                                                        regions.map((region) => (
                                                            <option key={region.id} value={region.id}>
                                                                {region.region_name}
                                                            </option>
                                                        ))}
                                                </select>

                                                {regionsError && (
                                                    <small className="text-danger">
                                                        Failed to load regions. Please try again.
                                                    </small>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Section 2: Email & Password */}
                                    {step === 2 && (
                                        <div>
                                            <h2 className="ko-step-heading">Account Details</h2>

                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">
                                                    Your Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    placeholder="e.g. jane@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label htmlFor="password" className="form-label">
                                                    Password
                                                </label>
                                                <div className="ko-password-field">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        className="form-control"
                                                        id="password"
                                                        name="password"
                                                        placeholder="Enter a strong password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="ko-password-toggle"
                                                        onClick={() => setShowPassword((prev) => !prev)}
                                                        aria-label={
                                                            showPassword ? "Hide password" : "Show password"
                                                        }
                                                    >
                                                        {showPassword ? "Hide" : "Show"}
                                                    </button>
                                                </div>
                                            </div>

                                            <ul className="ko-password-checklist mb-3">
                                                <div className="d-flex">
                                                    <li className={hasMinLength ? "ko-check-met" : ""}>
                                                        <span className="ko-check-icon">
                                                            {hasMinLength ? "✓" : "○"}
                                                        </span>
                                                        At least 8 characters
                                                    </li>
                                                    <li className={hasUppercase ? "ko-check-met" : ""}>
                                                        <span className="ko-check-icon">
                                                            {hasUppercase ? "✓" : "○"}
                                                        </span>
                                                        One uppercase letter
                                                    </li>
                                                </div>
                                                <div className="d-flex">
                                                    <li className={hasLowercase ? "ko-check-met" : ""}>
                                                        <span className="ko-check-icon">
                                                            {hasLowercase ? "✓" : "○"}
                                                        </span>
                                                        One lowercase letter
                                                    </li>
                                                    <li className={hasSpecialChar ? "ko-check-met" : ""}>
                                                        <span className="ko-check-icon">
                                                            {hasSpecialChar ? "✓" : "○"}
                                                        </span>
                                                        One special character
                                                    </li>
                                                </div>


                                            </ul>

                                            <div className="mb-1">
                                                <label htmlFor="password_confirmation" className="form-label">
                                                    Confirm Password
                                                </label>
                                                <div className="ko-password-field">
                                                    <input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        className="form-control"
                                                        id="password_confirmation"
                                                        name="password_confirmation"
                                                        placeholder="Re-enter your password"
                                                        value={formData.password_confirmation}
                                                        onChange={handleChange}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="ko-password-toggle"
                                                        onClick={() =>
                                                            setShowConfirmPassword((prev) => !prev)
                                                        }
                                                        aria-label={
                                                            showConfirmPassword
                                                                ? "Hide password"
                                                                : "Show password"
                                                        }
                                                    >
                                                        {showConfirmPassword ? "Hide" : "Show"}
                                                    </button>
                                                </div>
                                            </div>

                                            {formData.password_confirmation.length > 0 && (
                                                <p
                                                    className={
                                                        passwordsMatch
                                                            ? "ko-match-text ko-match-success"
                                                            : "ko-match-text ko-match-error"
                                                    }
                                                >
                                                    {passwordsMatch
                                                        ? "Passwords match"
                                                        : "Passwords do not match"}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Navigation buttons */}
                                    <div className="d-flex justify-content-between mt-4">
                                        {step === 2 ? (
                                            <button
                                                type="button"
                                                className="btn ko-btn-outline"
                                                onClick={goPrevious}
                                            >
                                                Previous
                                            </button>
                                        ) : (
                                            <span></span>
                                        )}

                                        {step === 1 && (
                                            <button
                                                type="button"
                                                className="btn ko-btn-primary"
                                                onClick={goNext}
                                                disabled={!isSection1Valid}
                                            >
                                                Next
                                            </button>
                                        )}

                                        {step === 2 && (
                                            <button
                                                type="submit"
                                                className="btn ko-btn-vote"
                                                // onClick={handleRegisterClick}
                                                disabled={!isFormValid}
                                            >
                                                Register
                                            </button>
                                        )}
                                    </div>
                                </form>
                                {/* Progress bar showing which section we are on */}
                                <div className="mt-3">
                                    <div className="progress ko-progress">
                                        <div
                                            className="progress-bar ko-progress-bar"
                                            style={{ width: `${progressPercentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="ko-step-label">
                                        Step {step} of {TOTAL_STEPS}
                                    </p>
                                </div>

                                <p className="ko-login-hint text-center mt-3">
                                    Already have an account?{" "}
                                    <Link to="/login" className="ko-login-link">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;