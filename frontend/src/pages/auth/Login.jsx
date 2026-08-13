import React, { useState } from "react";
import apiClient from "../../api/apiClient";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async function (event) {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await apiClient.post("/login", formData);

            toast.success(res.data.message);
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        }
        finally {
            setLoading(false);
        }
    };

    // Very simple email pattern, good enough for this static form.
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isFormValid = isEmailValid && formData.password.length > 0;

    // Placeholder for the future login/authentication logic.
    const handleLoginClick = () => {
        // TODO: Connect this to the authentication logic later.
        console.log("Login clicked with:", formData);
    };

    // Placeholder for the future Google OAuth integration.
    const handleGoogleLoginClick = () => {
        // TODO: Connect this to Google sign-in later.
        console.log("Continue with Google clicked");
    };

    return (
        <div className="ko-login-page">
            <div className="ko-login-overlay">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-7">
                            <div className="ko-login-card">
                                <div className="text-center mb-4">
                                    <Link to="/" className="ko-login-brand">
                                        KenyaOpinion
                                    </Link>
                                    <h1 className="ko-login-title">Welcome back</h1>
                                    <p className="ko-login-subtitle">
                                        Login to view and take part in presidential opinion
                                        polls.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
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

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>

                                        <div className="ko-password-field">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />

                                            <button
                                                type="button"
                                                className="ko-password-toggle"
                                                onClick={() => setShowPassword(prev => !prev)}
                                            >
                                                {showPassword ? "Hide" : "Show"}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn ko-btn-vote w-100"
                                        disabled={!isFormValid}
                                    >
                                        {loading ? "Loading..." : "Login"}
                                    </button>

                                </form>

                                <div className="ko-divider">
                                    <span>or</span>
                                </div>

                                <button
                                    type="button"
                                    className="btn ko-btn-google w-100"
                                    onClick={handleGoogleLoginClick}
                                >
                                    Continue with Google
                                </button>

                                <p className="ko-register-hint text-center mt-3">
                                    Don&apos;t have an account?{" "}
                                    <Link to="/register" className="ko-register-link">
                                        Register
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

export default Login;