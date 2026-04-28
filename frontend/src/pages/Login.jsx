import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, GraduationCap } from 'lucide-react';
<<<<<<< HEAD
import { loginUser } from '../api/api';
=======
import { authenticateUser, TEST_USERS } from '../data/users';
import { loginUser } from '../api/userapi';
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
<<<<<<< HEAD
    const [loading, setLoading] = useState(false);
=======
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        setLoading(true);
        setError('');

        try {
            const result = await loginUser(formData);
            
            if (result.success) {
                const normalizedRole = result.user.role?.toLowerCase() || 'student';
                const userToStore = { ...result.user, role: normalizedRole };
                localStorage.setItem('user', JSON.stringify(userToStore));
                localStorage.setItem('token', result.user.id); // Using user ID as a simple token
                navigate(`/${normalizedRole}`);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err.message || 'Connecting to backend system failed.');
        } finally {
            setLoading(false);
=======
        const result = authenticateUser(formData.email, formData.password);
        
        if (result.success) {
            navigate(`/${result.user.role}`);
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
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">LMS Workspace</h2>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Login</h2>
                        <p className="text-slate-500 mt-2 text-center font-medium">Access your digital workspace</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                            <Lock size={16} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-widest text-[10px]">Username / Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your identifier"
                                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all shadow-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest text-[10px]">Password</label>
                                <button type="button" className="text-[10px] font-black text-brand-primary uppercase hover:underline">Forgot protocol?</button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all shadow-sm"
                                    required
                                />
                            </div>
                        </div>

<<<<<<< HEAD
                        <button type="submit" disabled={loading} className="btn-primary w-full py-5 flex items-center justify-center gap-2 text-lg font-bold mt-4 shadow-xl shadow-brand-primary/20 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <LogIn size={20} />
                            )}
                            {loading ? 'Authenticating...' : 'Log In'}
=======
                        <button type="submit" className="btn-primary w-full py-5 flex items-center justify-center gap-2 text-lg font-bold mt-4 shadow-xl shadow-brand-primary/20 hover:scale-[1.01] transition-all">
                            <LogIn size={20} />
                            Log In
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-slate-100 pt-8">
                        <p className="text-slate-500 font-medium text-sm">
                            New to the workspace?{' '}
                            <button onClick={() => navigate('/register')} className="text-brand-primary font-black hover:underline underline-offset-4 ml-1">
                                Create Identity
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
