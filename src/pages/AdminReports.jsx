import React from 'react';
import { courses } from '../data/adminData';
import Navbar from '../components/Navbar';
import { BarChart3, ArrowLeft, BookOpen, CheckCircle, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminReports = () => {
    const stats = {
        totalCourses: courses.length,
        approvedCourses: courses.filter(c => c.status === 'Approved').length,
        pendingCourses: courses.filter(c => c.status === 'Pending').length,
        totalEnrollments: courses.reduce((sum, c) => sum + c.students, 0)
    };

    const cards = [
        { title: 'Total Courses', value: stats.totalCourses, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Approved', value: stats.approvedCourses, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Pending', value: stats.pendingCourses, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: 'Total Enrollments', value: stats.totalEnrollments.toLocaleString(), icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto">
                <div className="mb-8">
                    <Link to="/admin" className="flex items-center text-brand-primary font-medium mb-2 hover:underline">
                        <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center">
                        <BarChart3 className="mr-3 text-brand-primary" /> Platform Reports
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                            <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mb-6`}>
                                <card.icon className={card.color} size={24} />
                            </div>
                            <p className="text-slate-500 font-semibold mb-1 uppercase tracking-wider text-xs">{card.title}</p>
                            <p className="text-4xl font-black text-slate-900">{card.value}</p>
                        </div>
                    ))}
                </div>

                {/* Optional activity chart or additional breakdown can go here */}
                <div className="mt-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Course Performance Breakdown</h3>
                    <div className="space-y-6">
                        {courses.map(course => (
                            <div key={course.id}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-slate-700">{course.title}</span>
                                    <span className="text-slate-500 font-medium">{course.students} students</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2.5">
                                    <div
                                        className="bg-brand-primary h-2.5 rounded-full transition-all duration-1000"
                                        style={{ width: `${(course.students / 150) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
