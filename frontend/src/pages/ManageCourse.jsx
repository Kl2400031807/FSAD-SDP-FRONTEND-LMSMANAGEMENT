import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCourses } from '../data/courses';
import { getRegisteredStudents } from '../data/users';
import { 
    ArrowLeft, 
    Settings, 
    Users, 
    BarChart3, 
    BookOpen, 
    MoreVertical, 
    Mail, 
    Trash2, 
    Edit, 
    CheckCircle,
    Activity
} from 'lucide-react';

const ManageCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [activeTab, setActiveTab] = useState('students');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        const allCourses = getCourses();
        const foundCourse = allCourses.find(c => c.id === parseInt(id));
        setCourse(foundCourse);
        
        setStudents(getRegisteredStudents());
    }, [id]);

    const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-12 px-6 relative overflow-hidden">
            <Navbar />
            
            {/* Settings Overlay/Drawer */}
            <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isSettingsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={toggleSettings} />
                <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl transition-transform duration-500 transform ${isSettingsOpen ? 'translate-x-0' : 'translate-x-full'} p-10 flex flex-col`}>
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                            <Settings className="text-brand-primary" size={24} /> Configuration
                        </h2>
                        <button onClick={toggleSettings} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                            <ArrowLeft size={20} className="rotate-180" />
                        </button>
                    </div>

                    <div className="space-y-8 flex-grow">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Enrollment Protocol</label>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <span className="text-sm font-bold text-slate-700">Auto-Approve Students</span>
                                    <div className="w-12 h-6 bg-brand-primary rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <span className="text-sm font-bold text-slate-700">Allow Global Search</span>
                                    <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Curriculum Visibility</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="p-4 rounded-2xl border-2 border-brand-primary bg-brand-primary/5 text-brand-primary font-black text-xs uppercase text-center">Public</button>
                                <button className="p-4 rounded-2xl border border-slate-200 text-slate-400 font-black text-xs uppercase text-center hover:border-slate-300">Private</button>
                            </div>
                        </div>

                        <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100">
                            <h4 className="font-bold text-amber-900 text-sm mb-2">Cautionary Archive</h4>
                            <p className="text-xs text-amber-700 leading-relaxed mb-4">Archiving will remove the course from the public registry but retain all student progress data.</p>
                            <button className="w-full py-3 bg-white border border-amber-200 text-amber-600 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-100 transition-colors">Archive Course</button>
                        </div>
                    </div>

                    <button 
                        onClick={() => {
                            alert('Configurations synchronized successfully.');
                            toggleSettings();
                        }}
                        className="w-full py-4 bg-brand-primary text-white font-black text-sm uppercase tracking-widest rounded-[20px] shadow-xl shadow-brand-primary/20 mt-10 active:scale-95 transition-all"
                    >
                        Save Preferences
                    </button>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-10">
                    <button 
                        onClick={() => navigate('/instructor/my-courses')}
                        className="flex items-center gap-2 text-slate-400 hover:text-brand-primary mb-6 transition-colors font-black text-[10px] uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} /> Back to My Courses
                    </button>
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex items-start gap-6">
                            <div className="w-24 h-24 bg-brand-primary rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-brand-primary/20 shrink-0 overflow-hidden">
                                {course.image ? (
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                ) : (
                                    <BookOpen size={40} />
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                                        Active Curriculum
                                    </span>
                                    <span className="text-slate-400 font-bold text-xs uppercase tracking-tighter">
                                        ID: #{course.id}
                                    </span>
                                </div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight">{course.title}</h1>
                                <p className="text-slate-500 font-medium mt-2 max-w-2xl">{course.description}</p>
                            </div>
                        </div>
                        
                        <div className="flex gap-4">
                            <button 
                                onClick={() => navigate(`/instructor/edit-course/${course.id}`)}
                                className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-600 hover:border-brand-primary hover:text-brand-primary transition-all flex items-center gap-2 shadow-sm"
                            >
                                <Edit size={16} /> Edit Details
                            </button>
                            <button 
                                onClick={toggleSettings}
                                className="px-6 py-3 bg-brand-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-primary/90 transition-all flex items-center gap-2 shadow-xl shadow-brand-primary/20"
                            >
                                <Settings size={16} /> Configure
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: 'Total Enrollees', value: course.enrollments || '0', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        { label: 'Completion Rate', value: '42%', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Market Velocity', value: 'High', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-200 flex items-center gap-6 shadow-sm">
                            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-slate-100">
                        <button 
                            onClick={() => setActiveTab('students')}
                            className={`px-10 py-6 font-black text-xs uppercase tracking-[0.2em] transition-all relative ${activeTab === 'students' ? 'text-brand-primary' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Student Roster
                            {activeTab === 'students' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-full mx-10" />}
                        </button>
                        <button 
                            onClick={() => setActiveTab('analytics')}
                            className={`px-10 py-6 font-black text-xs uppercase tracking-[0.2em] transition-all relative ${activeTab === 'analytics' ? 'text-brand-primary' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Performance Data
                            {activeTab === 'analytics' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-full mx-10" />}
                        </button>
                    </div>

                    <div className="p-10">
                        {activeTab === 'students' ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-separate border-spacing-y-4">
                                    <thead>
                                        <tr className="text-slate-400">
                                            <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Enrollee</th>
                                            <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Identifier</th>
                                            <th className="px-6 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">Progress</th>
                                            <th className="px-6 pb-4 text-right text-[10px] font-black uppercase tracking-[0.2em]">Protocol</th>
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
                                                        <div className="flex flex-col">
                                                            <span className="font-black text-slate-900 uppercase text-xs tracking-tight">{student.name}</span>
                                                            <span className="text-[10px] font-black text-slate-400">Student</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 bg-white border-y border-slate-100">
                                                    <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                                        <Mail size={14} className="text-brand-primary" />
                                                        {student.email}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 bg-white border-y border-slate-100">
                                                    <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                                                        <div className="bg-brand-primary h-full rounded-full" style={{ width: `${Math.floor(Math.random() * 100)}%` }} />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 bg-white border-y border-r border-slate-100 rounded-r-[25px] text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 text-slate-400 hover:text-brand-primary transition-colors">
                                                            <Mail size={18} />
                                                        </button>
                                                        <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                                                            <Trash2 size={18} />
                                                        </button>
                                                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                                            <MoreVertical size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                    <BarChart3 className="text-slate-200" size={40} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Analytics Aggregation</h3>
                                <p className="text-slate-500 max-w-sm font-medium">Insufficient interaction data to generate scientific performance visualizations for this curriculum period.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageCourse;
