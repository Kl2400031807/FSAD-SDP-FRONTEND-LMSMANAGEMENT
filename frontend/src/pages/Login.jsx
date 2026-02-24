import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, GraduationCap } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login Form Data:', formData);

        // Fake Authentication Logic
        let role = 'student';
        if (formData.email.includes('admin')) role = 'admin';
        else if (formData.email.includes('instructor')) role = 'instructor';
        else if (formData.email.includes('creator')) role = 'creator';

        localStorage.setItem('user', JSON.stringify({ role }));
        navigate(`/${role}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-50 px-6 py-12">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-[100px]" />

            <div className="w-full max-w-md relative z-10">
                <div className="glass p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-14 h-14 rounded-2xl bg-brand-primary flex items-center justify-center mb-4 shadow-lg shadow-brand-primary/20">
                            <GraduationCap className="text-white" size={32} />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
                        <p className="text-slate-500 mt-2 text-center font-medium">Professional Learning Management</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Work Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="admin@edu-flow.com"
                                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-sans"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-sans"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary/20" />
                                <span className="text-slate-500 font-medium group-hover:text-slate-700 transition-colors">Remember device</span>
                            </label>
                            <a href="#" className="text-brand-primary hover:text-brand-primary/80 transition-colors font-bold">Secure Reset</a>
                        </div>

                        <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg font-bold mt-4">
                            <LogIn size={20} />
                            Sign In
                        </button>
                    </form>

                    <p className="mt-10 text-center text-slate-500 font-medium">
                        New to the platform?{' '}
                        <Link to="/register" className="text-brand-primary hover:underline font-bold">
                            Join Workspace
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
