import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, LogOut, Layout, BookOpen, FileText, BarChart3 } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
                    <Link to="/courses" className="font-semibold text-slate-700 hover:text-brand-primary transition-colors flex items-center gap-2">
                        <BookOpen size={18} />
                        Courses
                    </Link>

                    {user && (
                        <Link to="/assignments" className="font-semibold text-slate-700 hover:text-brand-primary transition-colors flex items-center gap-2">
                            <FileText size={18} />
                            Assignments
                        </Link>
                    )}

                    {user?.role === 'student' && (
                        <Link to="/progress" className="font-semibold text-slate-700 hover:text-brand-primary transition-colors flex items-center gap-2">
                            <BarChart3 size={18} />
                            Progress
                        </Link>
                    )}

                    <div className="flex items-center gap-4 ml-4">
                        {user ? (
                            <>
                                <Link to="/my-courses" className="font-semibold text-slate-700 hover:text-brand-primary transition-colors">My Courses</Link>
                                <Link to={`/${user.role}`} className="flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-primary/80 transition-colors">
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
                    <Link to="/courses" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                        <BookOpen size={20} /> Courses
                    </Link>
                    {user && (
                        <Link to="/assignments" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                            <FileText size={20} /> Assignments
                        </Link>
                    )}
                    {user?.role === 'student' && (
                        <Link to="/progress" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                            <BarChart3 size={20} /> Progress
                        </Link>
                    )}
                    <hr className="border-slate-200" />
                    <div className="flex flex-col gap-4">
                        {user ? (
                            <>
                                <Link to="/my-courses" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-slate-700">My Courses</Link>
                                <Link to={`/${user.role}`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-brand-primary py-3 glass rounded-xl text-center flex items-center justify-center gap-2 border-slate-200">
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
