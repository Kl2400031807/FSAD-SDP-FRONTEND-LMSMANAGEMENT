import React, { useState, useEffect } from 'react';
import { getRegisteredStudents } from '../data/users';
import { Layout, PlusCircle, PenTool, CheckCircle, Users, Mail, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const InstructorDashboard = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        setStudents(getRegisteredStudents());
    }, []);

    const actions = [
        { title: 'My Courses', icon: Layout, desc: 'Manage your existing courses', iconColor: 'text-indigo-600', bgColor: 'bg-indigo-50', path: '/instructor/my-courses' },
        { title: 'Create Course', icon: PlusCircle, desc: 'Upload a new curriculum', iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50', path: '/instructor/create-course' },
        { title: 'Grade Assignments', icon: CheckCircle, desc: 'Review student submissions', iconColor: 'text-orange-600', bgColor: 'bg-orange-50', path: '/instructor/grade-assignments' },
        { title: 'Instructor Tools', icon: PenTool, desc: 'Resources for effective teaching', iconColor: 'text-sky-600', bgColor: 'bg-sky-50', path: '/instructor/tools' },
    ];

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Instructor Dashboard</h1>
                    <p className="text-slate-500 font-medium">Control center for course management and student evaluation.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {actions.map((item, idx) => (
                        <Link to={item.path} key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-brand-primary hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer shadow-sm">
                            <div className={`w-14 h-14 ${item.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                                <item.icon className={item.iconColor} size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.desc}</p>
                        </Link>
                    ))}
                </div>

                {/* Student Management Roster */}
                <div className="bg-white rounded-[40px] border border-slate-200 p-10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                    
                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                <Users className="text-brand-primary" size={28} /> Student Roster
                            </h2>
                            <p className="text-slate-500 font-bold text-sm mt-1">Real-time ledger of all registered participants</p>
                        </div>
                        <div className="bg-slate-50 px-5 py-2 rounded-2xl border border-slate-100">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Active: </span>
                            <span className="text-brand-primary font-black ml-1">{students.length}</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto relative z-10">
                        <table className="w-full text-left border-separate border-spacing-y-4">
                            <thead>
                                <tr className="text-slate-400">
                                    <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Enrollee</th>
                                    <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Registry Identifier</th>
                                    <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Activity Signal</th>
                                    <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id} className="group hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-5 bg-white border-y border-l border-slate-100 rounded-l-[25px]">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold overflow-hidden shadow-inner">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <span className="font-black text-slate-800">{student.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 bg-white border-y border-slate-100">
                                            <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                                <Mail size={14} className="text-brand-primary" />
                                                {student.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 bg-white border-y border-slate-100">
                                            <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                                                <Circle size={8} fill="currentColor" className="animate-pulse" /> Direct Connection
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 bg-white border-y border-r border-slate-100 rounded-r-[25px]">
                                            <button className="text-brand-primary font-black text-xs uppercase tracking-widest cursor-pointer hover:underline underline-offset-4">
                                                Audit Performance
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboard;
