import React from 'react';
import { Users, BookOpen, BarChart3, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
    const stats = [
        { title: 'Manage Users', icon: Users, desc: 'Add, edit or remove platform users', color: 'bg-blue-600', iconColor: 'text-blue-600', bgColor: 'bg-blue-50' },
        { title: 'Manage Courses', icon: BookOpen, desc: 'Approve and monitor course content', color: 'bg-emerald-600', iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50' },
        { title: 'Platform Reports', icon: BarChart3, desc: 'Financial and activity analytics', color: 'bg-amber-600', iconColor: 'text-amber-600', bgColor: 'bg-amber-50' },
        { title: 'System Settings', icon: ShieldCheck, desc: 'Configure platform parameters', color: 'bg-slate-600', iconColor: 'text-slate-600', bgColor: 'bg-slate-50' },
    ];

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Admin Console</h1>
                    <p className="text-slate-500 font-medium">Oversee platform operations and user management.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((item, idx) => (
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

export default AdminDashboard;
