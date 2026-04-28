import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, LogOut, Layout, BookOpen, FileText, BarChart3, User } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to check if route is active
    const isActive = (path, exact = false) => {
        if (exact) return location.pathname === path;
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('user');
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const getRolePath = (suffix) => {
        if (!user) return `/${suffix}`;
<<<<<<< HEAD
        const normalizedRole = user.role?.toLowerCase();
        return `/${normalizedRole}/${suffix}`;
=======
        return `/${user.role}/${suffix}`;
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass border-b shadow-sm' : 'py-6 bg-transparent'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center text-slate-900">
                <Link to="/" className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-brand-primary/20">
                        <GraduationCap className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-slate-900">Edu<span className="text-brand-primary">Flow</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to={getRolePath('courses')} className={`font-semibold transition-colors flex items-center gap-2 ${isActive(getRolePath('courses')) ? 'text-brand-primary underline decoration-2 underline-offset-4' : 'text-slate-700 hover:text-brand-primary'}`}>
                        <BookOpen size={18} />
                        Courses
                    </Link>

                    {user && (
                        <Link to={getRolePath('assignments')} className={`font-semibold transition-colors flex items-center gap-2 ${isActive(getRolePath('assignments')) ? 'text-brand-primary underline decoration-2 underline-offset-4' : 'text-slate-700 hover:text-brand-primary'}`}>
                            <FileText size={18} />
                            Assignments
                        </Link>
                    )}

                    {user?.role === 'student' && (
                        <Link to="/student/progress" className={`font-semibold transition-colors flex items-center gap-2 ${isActive('/student/progress') ? 'text-brand-primary underline decoration-2 underline-offset-4' : 'text-slate-700 hover:text-brand-primary'}`}>
                            <BarChart3 size={18} />
                            Progress
                        </Link>
                    )}

                    <div className="flex items-center gap-4 ml-4">
                        {user ? (
                            <>
                                <Link to={getRolePath('my-courses')} className={`font-semibold transition-colors ${isActive(getRolePath('my-courses')) ? 'text-brand-primary' : 'text-slate-700 hover:text-brand-primary'}`}>My Courses</Link>
                                <Link 
<<<<<<< HEAD
                                    to={getRolePath('profile')} 
                                    className={`font-semibold transition-colors flex items-center gap-2 ${isActive(getRolePath('profile')) ? 'text-brand-primary' : 'text-slate-700 hover:text-brand-primary'}`}
                                >
                                    <User size={18} /> Profile
                                </Link>
                                <Link 
                                    to={`/${user.role?.toLowerCase()}`} 
                                    className={`flex items-center gap-2 text-sm font-bold transition-colors ${isActive(`/${user.role?.toLowerCase()}`, true) ? 'text-white bg-brand-primary px-4 py-2 rounded-xl shadow-lg shadow-brand-primary/20' : 'text-slate-700 hover:text-brand-primary bg-slate-50 px-4 py-2 rounded-xl border border-slate-200'}`}
=======
                                    to={`/${user.role}`} 
                                    className={`flex items-center gap-2 text-sm font-bold transition-colors ${isActive(`/${user.role}`, true) ? 'text-white bg-brand-primary px-4 py-2 rounded-xl shadow-lg shadow-brand-primary/20' : 'text-slate-700 hover:text-brand-primary bg-slate-50 px-4 py-2 rounded-xl border border-slate-200'}`}
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
                                >
                                    <Layout size={18} />
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="btn-secondary py-2 px-5 text-sm flex items-center gap-2 border-slate-200">
                                    <LogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-bold text-slate-700 hover:text-brand-primary transition-colors">Sign In</Link>
                                <Link to="/register" className="btn-primary py-2 px-5 text-sm">Join Now</Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-slate-200 p-6 flex flex-col gap-6 animate-in slide-in-from-top-10 duration-300 shadow-xl">
                    <Link to={getRolePath('courses')} onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-semibold flex items-center gap-2 ${isActive(getRolePath('courses')) ? 'text-brand-primary' : 'text-slate-700'}`}>
                        <BookOpen size={20} /> Courses
                    </Link>
                    {user && (
                        <Link to={getRolePath('assignments')} onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-semibold flex items-center gap-2 ${isActive(getRolePath('assignments')) ? 'text-brand-primary' : 'text-slate-700'}`}>
                            <FileText size={20} /> Assignments
                        </Link>
                    )}
                    {user?.role === 'student' && (
                        <Link to="/student/progress" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-semibold flex items-center gap-2 ${isActive('/student/progress') ? 'text-brand-primary' : 'text-slate-700'}`}>
                            <BarChart3 size={20} /> Progress
                        </Link>
                    )}
                    <hr className="border-slate-200" />
                    <div className="flex flex-col gap-4">
                        {user ? (
                            <>
                                <Link to={getRolePath('my-courses')} onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-semibold ${isActive(getRolePath('my-courses')) ? 'text-brand-primary' : 'text-slate-700'}`}>My Courses</Link>
<<<<<<< HEAD
                                <Link to={getRolePath('profile')} onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-semibold flex items-center gap-2 ${isActive(getRolePath('profile')) ? 'text-brand-primary' : 'text-slate-700'}`}>
                                    <User size={20} /> Profile
                                </Link>
                                <Link 
                                    to={`/${user.role?.toLowerCase()}`} 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className={`text-lg font-bold py-3 rounded-xl text-center flex items-center justify-center gap-2 border ${isActive(`/${user.role?.toLowerCase()}`, true) ? 'text-white bg-brand-primary border-brand-primary shadow-lg shadow-brand-primary/20' : 'text-slate-700 border-slate-200 bg-white'}`}
=======
                                <Link 
                                    to={`/${user.role}`} 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className={`text-lg font-bold py-3 rounded-xl text-center flex items-center justify-center gap-2 border ${isActive(`/${user.role}`, true) ? 'text-white bg-brand-primary border-brand-primary shadow-lg shadow-brand-primary/20' : 'text-slate-700 border-slate-200 bg-white'}`}
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
                                >
                                    <Layout size={20} /> Dashboard
                                </Link>
                                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="btn-primary w-full py-3 text-lg flex items-center justify-center gap-2">
                                    <LogOut size={20} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-slate-700 py-3 glass rounded-xl text-center border-slate-200">Sign In</Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full py-3 text-lg text-center font-bold">Join Now</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
