import React, { useState } from 'react';
import { 
    Users, 
    BookOpen, 
    ShieldCheck, 
    UserCheck, 
    ClipboardList, 
    CheckCircle, 
    Clock, 
    Mail,
    Palette
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { getStoredUsers } from '../data/users';
import { getCourses } from '../data/courses';
import { getAssignments } from '../data/assignments';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('students');
    
    const allUsers = getStoredUsers();
    const students = allUsers.filter(u => u.role === 'student');
    const instructors = allUsers.filter(u => u.role === 'instructor');
    const creators = allUsers.filter(u => u.role === 'creator');
    const courses = getCourses();
    const assignments = getAssignments();

    // Stats for the header
    const stats = [
        { label: 'Total Enrollees', count: students.length, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Expert Faculty', count: instructors.length, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Design Creators', count: creators.length, icon: Palette, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Live Curricula', count: courses.length, icon: BookOpen, color: 'text-sky-600', bg: 'bg-sky-50' },
    ];

    const tabs = [
        { id: 'students', label: 'Learners', icon: Users },
        { id: 'instructors', label: 'Faculty', icon: UserCheck },
        { id: 'creators', label: 'Creators', icon: Palette },
        { id: 'courses', label: 'Curricula', icon: BookOpen },
        { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    ];

    const renderTableContent = () => {
        switch (activeTab) {
            case 'students':
            case 'instructors':
            case 'creators':
                const list = activeTab === 'students' ? students : (activeTab === 'instructors' ? instructors : creators);
                const roleColors = {
                    students: { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-600', label: 'STUDENT' },
                    instructors: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', label: 'INSTRUCTOR' },
                    creators: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600', label: 'CREATOR' }
                };
                const theme = roleColors[activeTab];

                return (
                    <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-slate-400">
                                <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Credential</th>
                                <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Contact Node</th>
                                <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Verification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((user) => (
                                <tr key={user.email} className="group hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-5 bg-white border-y border-l border-slate-100 rounded-l-[25px]">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full ${theme.bg} border ${theme.border} flex items-center justify-center ${theme.text} font-bold overflow-hidden shadow-inner`}>
                                                {user.name?.charAt(0) || 'U'}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-800 uppercase text-xs tracking-tight">{user.name}</span>
                                                <span className={`text-[10px] font-bold ${theme.text}`}>{theme.label}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 bg-white border-y border-slate-100 text-slate-500 font-medium text-sm">
                                        <div className="flex items-center gap-2">
                                            <Mail size={14} className="text-brand-primary" />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 bg-white border-y border-r border-slate-100 rounded-r-[25px]">
                                        <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                                            <CheckCircle size={14} /> Active Entity
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'courses':
                return (
                    <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-slate-400">
                                <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Curriculum Title</th>
                                <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Subject Category</th>
                                <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Enrollee Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course.id} className="group hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-5 bg-white border-y border-l border-slate-100 rounded-l-[25px]">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 overflow-hidden shadow-inner font-black text-xs">
                                                {course.id}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-800 uppercase text-xs tracking-tight">{course.title}</span>
                                                <span className="text-[10px] font-bold text-slate-400">PUBLISHED VERSION</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 bg-white border-y border-slate-100">
                                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            {course.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 bg-white border-y border-r border-slate-100 rounded-r-[25px] text-slate-500 font-bold text-sm">
                                        {course.enrollments}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'assignments':
                return (
                    <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-slate-400">
                                <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Digital Task</th>
                                <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Origin Curriculum</th>
                                <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Temporal Deadline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment) => (
                                <tr key={assignment.id} className="group hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-5 bg-white border-y border-l border-slate-100 rounded-l-[25px]">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 overflow-hidden shadow-inner">
                                                <ClipboardList size={18} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-800 uppercase text-xs tracking-tight">{assignment.title}</span>
                                                <span className="text-[10px] font-bold text-slate-400">ASSIGNMENT PROP</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 bg-white border-y border-slate-100 text-slate-500 font-medium text-xs max-w-[200px] truncate">
                                        {assignment.course}
                                    </td>
                                    <td className="px-6 py-5 bg-white border-y border-r border-slate-100 rounded-r-[25px]">
                                        <div className="flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-widest">
                                            <Clock size={14} className="text-orange-500" /> {assignment.dueDate}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-24 px-6 relative overflow-hidden">
            <Navbar />
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-secondary/5 rounded-full blur-3xl -ml-32 -mb-32" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-xl shadow-slate-900/10">
                            <ShieldCheck size={12} className="text-brand-primary" /> Root Administrative Access
                        </div>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">Command <span className="text-brand-primary">Center</span></h1>
                    <p className="text-slate-500 font-medium max-w-xl">Comprehensive ledger of all cross-platform entities, curriculum artifacts, and academic protocols.</p>
                </header>

                {/* Performance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200 group transition-all">
                            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                                <stat.icon size={26} />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-slate-900">{stat.count}</p>
                        </div>
                    ))}
                </div>

                {/* Main Management Panel */}
                <div className="bg-white rounded-[50px] border border-slate-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col shadow-2xl shadow-slate-200/50">
                    <div className="flex flex-col lg:flex-row border-b border-slate-50 overflow-x-auto">
                        <div className="flex overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-8 py-8 flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] transition-all relative shrink-0 ${activeTab === tab.id ? 'text-brand-primary bg-slate-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50/50'}`}
                                >
                                    <tab.icon size={20} className={activeTab === tab.id ? 'text-brand-primary' : 'text-slate-300'} />
                                    {tab.label}
                                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary" />}
                                </button>
                            ))}
                        </div>
                        
                    </div>

                    <div className="p-10 flex-grow">
                        {renderTableContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
