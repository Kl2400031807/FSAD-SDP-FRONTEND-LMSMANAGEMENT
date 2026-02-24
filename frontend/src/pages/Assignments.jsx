import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FileText, Clock, CheckCircle, AlertCircle, Send, ChevronRight, Calendar, BarChart2 } from 'lucide-react';

const MOCK_ASSIGNMENTS = [
    { id: 1, title: 'SQL Query Optimization', course: 'Database Management Systems (DBMS)', dueDate: '2026-03-01', status: 'Pending', role: 'student', progress: 0 },
    { id: 2, title: 'Cloud Deployment Lab', course: 'Cloud Computing', dueDate: '2026-02-28', status: 'Submitted', role: 'student', progress: 100 },
    { id: 3, title: 'TCP/IP Routing Table', course: 'Computer Networks', dueDate: '2026-02-25', status: 'Graded', grade: 'A', role: 'student', progress: 100 },
    { id: 4, title: 'Neural Network Model', course: 'Artificial Intelligence', dueDate: '2026-02-20', status: 'Overdue', role: 'student', progress: 20 },
    { id: 5, title: 'React Component Architecture', course: 'Frontend Development', dueDate: '2026-03-05', status: 'Pending', role: 'instructor', submissions: 12 },
    { id: 6, title: 'CI/CD Pipeline Setup', course: 'DevOps Engineering', dueDate: '2026-03-10', status: 'In Progress', role: 'instructor', submissions: 5 },
];

const Assignments = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                setUser(JSON.parse(userStr));
            } catch (e) {
                setUser(null);
            }
        }
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Graded':
            case 'Submitted':
            case 'Completed':
                return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'In Progress':
                return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Pending':
                return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'Overdue':
                return 'bg-rose-50 text-rose-600 border-rose-100';
            default:
                return 'bg-slate-50 text-slate-500 border-slate-200';
        }
    };

    const isDueSoon = (dateStr) => {
        const dueDate = new Date(dateStr);
        const today = new Date();
        const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 2;
    };

    const isOverdue = (dateStr) => {
        const dueDate = new Date(dateStr);
        const today = new Date();
        return dueDate < today;
    };

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-24 px-6">
            <Navbar />
            <div className="container mx-auto max-w-5xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 rounded-full mb-4">
                            <BarChart2 size={14} className="text-brand-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Terminal</span>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 mb-2 tracking-tight">Assignment <span className="text-gradient">Board</span></h1>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">
                            {user?.role === 'instructor'
                                ? 'Monitor academic integrity and evaluate student submissions in real-time.'
                                : 'Track your academic milestones and submit deliverables for peer review.'}
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {MOCK_ASSIGNMENTS.filter(a => user?.role === 'student' ? true : a.role === 'instructor').map((assignment) => {
                        const dueSoon = isDueSoon(assignment.dueDate) && assignment.status !== 'Submitted' && assignment.status !== 'Graded';
                        const overdue = (isOverdue(assignment.dueDate) || assignment.status === 'Overdue') && assignment.status !== 'Submitted' && assignment.status !== 'Graded';

                        return (
                            <div
                                key={assignment.id}
                                className={`bg-white p-7 rounded-[35px] border ${dueSoon ? 'border-amber-200' : overdue ? 'border-rose-200' : 'border-slate-200'} hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-sm relative overflow-hidden group`}
                            >
                                {dueSoon && <div className="absolute top-0 left-0 w-1 h-full bg-amber-400 group-hover:w-2 transition-all" />}
                                {overdue && <div className="absolute top-0 left-0 w-1 h-full bg-rose-500 group-hover:w-2 transition-all" />}

                                <div className="flex items-start gap-6 relative z-10">
                                    <div className={`w-16 h-16 rounded-[22px] ${dueSoon ? 'bg-amber-50 text-amber-600 border-amber-100' : overdue ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-50 text-brand-primary border-slate-100'} flex items-center justify-center border shadow-inner transition-colors duration-500 group-hover:bg-brand-primary group-hover:text-white`}>
                                        <FileText size={32} />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{assignment.title}</h3>
                                            {dueSoon && (
                                                <span className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-400 text-white rounded-lg text-[10px] font-black uppercase tracking-widest animate-pulse shadow-sm">
                                                    <AlertCircle size={10} /> Urgency
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-slate-500 text-sm mb-4 font-bold flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                            {assignment.course}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4">
                                            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 text-xs font-black text-slate-500 uppercase tracking-tight">
                                                <Calendar size={14} className="text-brand-primary" />
                                                Registry: {assignment.dueDate}
                                            </div>

                                            {assignment.progress !== undefined && (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                                                        <div
                                                            className={`h-full transition-all duration-1000 ${assignment.status === 'Overdue' ? 'bg-rose-500' : 'bg-brand-primary'}`}
                                                            style={{ width: `${assignment.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-400">{assignment.progress}%</span>
                                                </div>
                                            )}

                                            {assignment.grade && (
                                                <div className="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-xs font-black uppercase tracking-widest">
                                                    Achievement: {assignment.grade}
                                                </div>
                                            )}

                                            {user?.role === 'instructor' && (
                                                <div className="px-3 py-1.5 bg-brand-primary/5 text-brand-primary rounded-xl text-xs font-black uppercase tracking-widest border border-brand-primary/10">
                                                    {assignment.submissions} Digital Submissions
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 relative z-10 shrink-0">
                                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm ${getStatusStyle(assignment.status)}`}>
                                        {assignment.status}
                                    </span>

                                    {user?.role === 'student' && assignment.status !== 'Submitted' && assignment.status !== 'Graded' && (
                                        <Link
                                            to={`/submit-assignment?id=${assignment.id}&title=${encodeURIComponent(assignment.title)}&deadline=${assignment.dueDate}`}
                                            className={`btn-primary py-3 px-8 text-xs font-black uppercase tracking-widest flex items-center gap-3 rounded-2xl shadow-xl transition-all ${overdue ? 'bg-slate-900 border-slate-900 shadow-slate-900/20' : 'shadow-brand-primary/30'}`}
                                        >
                                            {overdue ? 'Resolve Overdue' : 'Initialize Submission'} <Send size={16} />
                                        </Link>
                                    )}

                                    {user?.role === 'instructor' && (
                                        <Link
                                            to={`/grade-assignments?id=${assignment.id}`}
                                            className="btn-secondary py-3 px-8 text-xs font-black uppercase tracking-widest flex items-center gap-3 border-2 border-slate-200 rounded-2xl hover:border-brand-primary hover:text-brand-primary transition-all"
                                        >
                                            Assess Evidence <ChevronRight size={18} />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Assignments;
