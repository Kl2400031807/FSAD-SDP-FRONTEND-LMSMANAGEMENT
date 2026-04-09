import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Users, Trophy } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 -left-20 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 -right-20 w-80 h-80 bg-brand-secondary/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-slate-200 mb-8 animate-bounce">
                        <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                        <span className="text-sm font-medium tracking-wide uppercase text-slate-600">The Future of Online Learning</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight text-slate-900">
                        Master New Skills with <br />
                        <span className="text-gradient">Unlimited Possibilities</span>
                    </h1>

                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join 10,000+ students learning from the world's best instructors.
                        Interactive courses designed to help you build the career you've always wanted.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <Link to="/login" className="btn-primary flex items-center gap-2 group">
                            Get Started Today
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Trust stats */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto px-6 py-10 rounded-3xl glass border-slate-200 shadow-sm">
                        <div className="flex flex-col items-center">
                            <div className="text-3xl font-bold mb-1 text-slate-900">10k+</div>
                            <div className="text-slate-500 text-sm font-medium">Active Students</div>
                        </div>
                        <div className="flex flex-col items-center border-x border-slate-200 px-8">
                            <div className="text-3xl font-bold mb-1 text-slate-900">500+</div>
                            <div className="text-slate-500 text-sm font-medium">Expert Mentors</div>
                        </div>
                        <div className="flex flex-col items-center col-span-2 md:col-span-1">
                            <div className="text-3xl font-bold mb-1 text-slate-900">98%</div>
                            <div className="text-slate-500 text-sm font-medium">Success Rate</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
