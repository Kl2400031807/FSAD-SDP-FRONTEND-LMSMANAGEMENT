import React from 'react';
import { Layout, PlusCircle, PenTool, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

const InstructorDashboard = () => {
    const actions = [
        { title: 'My Courses', icon: Layout, desc: 'Manage your existing courses', iconColor: 'text-indigo-600', bgColor: 'bg-indigo-50' },
        { title: 'Create Course', icon: PlusCircle, desc: 'Upload a new curriculum', iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50' },
        { title: 'Grade Assignments', icon: CheckCircle, desc: 'Review student submissions', iconColor: 'text-orange-600', bgColor: 'bg-orange-50' },
        { title: 'Instructor Tools', icon: PenTool, desc: 'Resources for effective teaching', iconColor: 'text-sky-600', bgColor: 'bg-sky-50' },
    ];

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Instructor Dashboard</h1>
                    <p className="text-slate-500 font-medium">Control center for course management and student evaluation.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {actions.map((item, idx) => (
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

export default InstructorDashboard;
