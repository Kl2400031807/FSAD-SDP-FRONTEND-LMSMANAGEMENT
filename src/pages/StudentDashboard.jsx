import React from 'react';
import { BookOpen, Search, PieChart, Star } from 'lucide-react';
import Navbar from '../components/Navbar';

const StudentDashboard = () => {
    const menuItems = [
        { title: 'Enrolled Courses', icon: BookOpen, desc: 'Pick up where you left off', iconColor: 'text-violet-600', bgColor: 'bg-violet-50' },
        { title: 'Browse Catalog', icon: Search, desc: 'Explore new skills to master', iconColor: 'text-pink-600', bgColor: 'bg-pink-50' },
        { title: 'Progress Tracker', icon: PieChart, desc: 'View your learning statistics', iconColor: 'text-teal-600', bgColor: 'bg-teal-50' },
        { title: 'My Certificates', icon: Star, desc: 'Your earned achievements', iconColor: 'text-amber-600', bgColor: 'bg-amber-50' },
    ];

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Student Workspace</h1>
                    <p className="text-slate-500 font-medium">Your personalized hub for learning and growth.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {menuItems.map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-brand-primary hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer shadow-sm">
                            <div className={`w-14 h-14 ${item.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                                <item.icon className={item.iconColor} size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
