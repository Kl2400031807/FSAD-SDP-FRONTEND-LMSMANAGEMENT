import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, verifyOtp, resendOtp, validatePassword } from "../api/api";
import { Mail, Lock, User, GraduationCap, CheckCircle, AlertCircle } from "lucide-react";

<<<<<<< HEAD
function Register() {
=======
import { registerUser } from '../data/users';

const Register = () => {
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
    const navigate = useNavigate();
    const [step, setStep] = useState("register"); // register, verify-otp
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student",
    });
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [passwordValidation, setPasswordValidation] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasDigit: false,
        hasSpecialChar: false,
        hasMinLength: false,
        isValid: false,
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
<<<<<<< HEAD
        setError("");
        
        if (name === "password") {
            validatePasswordField(value);
        }
    };

    const validatePasswordField = async (password) => {
        // Client-side validation (immediate feedback)
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[@$!%*?&#\-_+=/.]/.test(password);
        const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;

        setPasswordValidation({
            hasMinLength,
            hasUpperCase,
            hasLowerCase,
            hasDigit,
            hasSpecialChar,
            isValid,
        });

        // Also call backend for validation (optional, can be used for additional checks)
        try {
            const response = await validatePassword(password);
            if (response) {
                setPasswordValidation(response);
            }
        } catch (err) {
            console.error("Backend password validation failed, using client-side validation:", err);
            // Keep client-side validation result on error
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Client-side validation
        if (!formData.name || !formData.email || !formData.password) {
            setError("Please fill all fields");
            setLoading(false);
            return;
        }

        if (!passwordValidation.isValid) {
            setError("Password does not meet requirements");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const result = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            });

            if (result.success) {
                setStep("verify-otp");
                setSuccessMessage("Registration successful! Check your email for OTP.");
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!otp || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP");
            setLoading(false);
            return;
        }

        try {
            const result = await verifyOtp(formData.email, otp);
            if (result.success) {
                setSuccessMessage("Email verified successfully!");
                const normalizedRole = result.user.role?.toLowerCase() || 'student';
                const userToStore = { ...result.user, role: normalizedRole };
                localStorage.setItem('user', JSON.stringify(userToStore));
                localStorage.setItem('token', result.user.id);
                setTimeout(() => {
                    navigate(`/${normalizedRole}`);
                }, 1500);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err.message || "OTP verification failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        setError("");
        try {
            const result = await resendOtp(formData.email);
            if (result.success) {
                setSuccessMessage("OTP resent successfully!");
            } else {
                setError("Failed to resend OTP");
            }
        } catch (err) {
            setError(err.message || "Failed to resend OTP");
        } finally {
            setLoading(false);
=======
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = registerUser(formData);
        
        if (result.success) {
            alert('Your account has been securely provisioned! Please sign in with your credentials.');
            navigate('/login');
        } else {
            setError(result.message);
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-50 px-6 py-12">
            <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-[100px]" />

            <div className="w-full max-w-md relative z-10">
                <div className="glass p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-brand-primary flex items-center justify-center mb-4 shadow-lg shadow-brand-primary/20">
                            <GraduationCap className="text-white" size={32} />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                            LMS Platform
                        </h1>
                        <p className="text-slate-600 mt-2">
                            {step === "register" ? "Create your account" : "Verify your email"}
                        </p>
                    </div>

<<<<<<< HEAD
                    {/* Error message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                            <p className="text-red-700 text-sm">{error}</p>
=======
                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                             <Lock size={16} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-sans"
                                    required
                                />
                            </div>
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
                        </div>
                    )}

                    {/* Success message */}
                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                            <p className="text-green-700 text-sm">{successMessage}</p>
                        </div>
                    )}

                    {/* Registration Form */}
                    {step === "register" ? (
                        <form onSubmit={handleRegister} className="space-y-4">
                            {/* Name Input */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3.5 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 text-slate-400" size={20} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3.5 text-slate-400" size={20} />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                                    />
                                </div>
                                
                                {/* Password Requirements */}
                                {formData.password && (
                                    <div className="mt-3 space-y-2">
                                        <div className="text-xs font-semibold text-slate-600">Password Requirements:</div>
                                        
                                        <div className="flex items-center gap-2 text-xs">
                                            <div className={`w-4 h-4 rounded flex items-center justify-center ${passwordValidation.hasMinLength ? 'bg-green-100' : 'bg-slate-100'}`}>
                                                {passwordValidation.hasMinLength && <CheckCircle size={12} className="text-green-600" />}
                                            </div>
                                            <span className={passwordValidation.hasMinLength ? 'text-green-700' : 'text-slate-600'}>
                                                Minimum 8 characters
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs">
                                            <div className={`w-4 h-4 rounded flex items-center justify-center ${passwordValidation.hasUpperCase ? 'bg-green-100' : 'bg-slate-100'}`}>
                                                {passwordValidation.hasUpperCase && <CheckCircle size={12} className="text-green-600" />}
                                            </div>
                                            <span className={passwordValidation.hasUpperCase ? 'text-green-700' : 'text-slate-600'}>
                                                At least one uppercase letter
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs">
                                            <div className={`w-4 h-4 rounded flex items-center justify-center ${passwordValidation.hasLowerCase ? 'bg-green-100' : 'bg-slate-100'}`}>
                                                {passwordValidation.hasLowerCase && <CheckCircle size={12} className="text-green-600" />}
                                            </div>
                                            <span className={passwordValidation.hasLowerCase ? 'text-green-700' : 'text-slate-600'}>
                                                At least one lowercase letter
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs">
                                            <div className={`w-4 h-4 rounded flex items-center justify-center ${passwordValidation.hasDigit ? 'bg-green-100' : 'bg-slate-100'}`}>
                                                {passwordValidation.hasDigit && <CheckCircle size={12} className="text-green-600" />}
                                            </div>
                                            <span className={passwordValidation.hasDigit ? 'text-green-700' : 'text-slate-600'}>
                                                At least one digit (0-9)
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs">
                                            <div className={`w-4 h-4 rounded flex items-center justify-center ${passwordValidation.hasSpecialChar ? 'bg-green-100' : 'bg-slate-100'}`}>
                                                {passwordValidation.hasSpecialChar && <CheckCircle size={12} className="text-green-600" />}
                                            </div>
                                            <span className={passwordValidation.hasSpecialChar ? 'text-green-700' : 'text-slate-600'}>
                                                At least one special character (@$!%*?&)
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3.5 text-slate-400" size={20} />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                                    />
                                </div>
                                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                    <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
                                )}
                            </div>

                            {/* Role Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                                >
                                    <option value="student">Student</option>
                                    <option value="instructor">Instructor</option>
                                </select>
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                disabled={loading || !passwordValidation.isValid}
                                className="w-full py-3 px-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/25 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>

                            {/* Login Link */}
                            <p className="text-center text-slate-600 text-sm mt-4">
                                Already have an account?{" "}
                                <a href="/login" className="text-brand-primary font-semibold hover:underline">
                                    Login
                                </a>
                            </p>
                        </form>
                    ) : (
                        /* OTP Verification Form */
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div>
                                <p className="text-sm text-slate-600 mb-4">
                                    We've sent a 6-digit OTP to <strong>{formData.email}</strong>
                                </p>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Enter OTP
                                </label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => {
                                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                                        setError("");
                                    }}
                                    placeholder="000000"
                                    maxLength="6"
                                    className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/25 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>

                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={loading}
                                className="w-full py-2 px-4 text-brand-primary font-semibold text-sm border border-brand-primary rounded-lg hover:bg-brand-primary/5 transition disabled:opacity-50"
                            >
                                Didn't receive OTP? Resend
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Register;