import React, { useState } from 'react';
import { courses } from '../data/adminData';
import Navbar from '../components/Navbar';
import { BookOpen, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminCourses = () => {
    // UI only state to simulate approval/rejection
    const [mockCourses, setMockCourses] = useState(courses);

    const handleAction = (id, newStatus) => {
        setMockCourses(mockCourses.map(c => c.id === id ? { ...c, status: newStatus } : c));
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto">
                <div className="mb-8">
                    <Link to="/admin" className="flex items-center text-brand-primary font-medium mb-2 hover:underline">
                        <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center">
                        <BookOpen className="mr-3 text-brand-primary" /> Manage Courses
                    </h1>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-bottom border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Course</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Instructor</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Category</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-center">Students</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockCourses.map((course) => (
                                <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 text-slate-900 font-bold">{course.title}</td>
                                    <td className="px-6 py-4 text-slate-600">{course.instructor}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                            {course.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-slate-600 font-medium">{course.students}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${course.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {course.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleAction(course.id, 'Approved')}
                                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-100"
                                                title="Approve"
                                            >
                                                <CheckCircle size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleAction(course.id, 'Rejected')}
                                                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-rose-100"
                                                title="Reject"
                                            >
                                                <XCircle size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCourses;
