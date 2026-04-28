import React, { useState, useEffect } from 'react';
import API from "../api/api";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FileText, Clock, CheckCircle, AlertCircle, Send, ChevronRight, Calendar, BarChart2, PlusCircle, X, CheckSquare, ListTodo, Upload } from 'lucide-react';
import { getAssignments, addAssignment, markAssignmentCompleted, submitAssignmentWork, getSubmissions } from '../data/assignments';

const Assignments = () => {
    const [user, setUser] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState({});
    const [newAssignment, setNewAssignment] = useState({
        title: '',
        course: 'General',
        dueDate: new Date().toISOString().split('T')[0]
    });



    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                setUser(JSON.parse(userStr));
            } catch (e) {
                setUser(null);
            }
        }
        setAssignments(getAssignments());
    }, []);

    const handleCreateAssignment = (e) => {
        e.preventDefault();
        addAssignment(newAssignment);
        setAssignments(getAssignments());
        setIsAdding(false);
        setNewAssignment({ title: '', course: 'General', dueDate: new Date().toISOString().split('T')[0] });
        alert('Assignment published successully!');
    };

    const handleFileChange = (assignmentId, file) => {
        if (file) {
            setSelectedFiles(prev => ({
                ...prev,
                [assignmentId]: file
            }));
        }
    };

    const handleClearFile = (assignmentId) => {
        setSelectedFiles(prev => {
            const next = { ...prev };
            delete next[assignmentId];
            return next;
        });
    };

    // ... rest of the status/overdue helpers remain same ...
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
        if (!dateStr) return false;
        const dueDate = new Date(dateStr);
        const today = new Date();
        const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 2;
    };

    const isOverdue = (dateStr) => {
        if (!dateStr) return false;
        const dueDate = new Date(dateStr);
        const today = new Date();
        return dueDate < today;
    };

    const handleCompleteAssignment = (id) => {
        const file = selectedFiles[id];
        submitAssignmentWork(id, user?.name, file?.name);
        markAssignmentCompleted(id);
        setAssignments(getAssignments());
        alert('Assignment successfully archived as COMPLETED!');
    };

    const handleReset = () => {
        localStorage.removeItem('assignments');
        setAssignments(getAssignments());
        setSelectedFiles({});
        alert('Academic records reset to baseline protocols.');
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

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={handleReset}
                            className="btn-secondary px-6 py-4 flex items-center gap-2 border-2 border-slate-200 text-slate-500 hover:border-rose-500 hover:text-rose-500 transition-all rounded-2xl font-black text-xs uppercase tracking-widest"
                        >
                            Reset Protocol
                        </button>
                        {user?.role === 'instructor' && (
                            <button
                                onClick={() => setIsAdding(!isAdding)}
                                className={`btn-primary flex items-center gap-2 px-8 py-4 shadow-xl transition-all ${isAdding ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/20' : 'shadow-brand-primary/20'}`}
                            >
                                {isAdding ? <X size={20} /> : <PlusCircle size={20} />}
                                {isAdding ? 'Cancel Action' : 'Deploy Assignment'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Create Assignment Form ... code ... */}
                {isAdding && (
                    <div className="bg-white p-10 rounded-[45px] border-2 border-brand-primary/20 shadow-2xl shadow-brand-primary/5 mb-12 animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16" />
                        <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
                            <ListTodo className="text-brand-primary" size={28} /> Configuration
                        </h3>
                        <form onSubmit={handleCreateAssignment} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 font-sans">Task Identifier</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-900 font-bold focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all outline-none"
                                    placeholder="e.g., Kernel Debugging Lab"
                                    value={newAssignment.title}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 font-sans">Curriculum Unit</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-900 font-bold focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all outline-none"
                                    placeholder="e.g., Advanced OS"
                                    value={newAssignment.course}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 font-sans">Registry Deadline</label>
                                <input
                                    type="date"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-900 font-bold focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all outline-none"
                                    value={newAssignment.dueDate}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="md:col-span-3">
                                <button type="submit" className="btn-primary w-full py-5 rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-brand-primary/30 active:scale-[0.98] transition-transform">
                                    Finalize Deliverable
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="space-y-6">
                    {assignments.map((assignment) => {
                        const submissionCount = getSubmissions(assignment.id).length;
                        const dueSoon = isDueSoon(assignment.dueDate) && assignment.status !== 'Submitted' && assignment.status !== 'Graded' && assignment.status !== 'Completed';
                        const overdue = (isOverdue(assignment.dueDate) || assignment.status === 'Overdue') && assignment.status !== 'Submitted' && assignment.status !== 'Graded' && assignment.status !== 'Completed';

                        return (
                            <div
                                key={assignment.id}
                                className={`bg-white p-7 rounded-[35px] border ${dueSoon ? 'border-amber-200' : overdue ? 'border-rose-200' : 'border-slate-200'} hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-sm relative overflow-hidden group`}
                            >
                                {dueSoon && <div className="absolute top-0 left-0 w-1 h-full bg-amber-400 group-hover:w-2 transition-all" />}
                                {overdue && <div className="absolute top-0 left-0 w-1 h-full bg-rose-500 group-hover:w-2 transition-all" />}

                                <div className="flex items-start gap-6 relative z-10 w-full">
                                    <div className={`w-16 h-16 shrink-0 rounded-[22px] ${dueSoon ? 'bg-amber-50 text-amber-600 border-amber-100' : overdue ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-50 text-brand-primary border-slate-100'} flex items-center justify-center border shadow-inner transition-colors duration-500 group-hover:bg-brand-primary group-hover:text-white`}>
                                        <FileText size={32} />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{assignment.title}</h3>
                                            {assignment.isNew && (
                                                <span className="px-2.5 py-1 bg-brand-accent text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-accent/20">
                                                    Newly Added
                                                </span>
                                            )}
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
                                                    {submissionCount} Evidence Modules
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 relative z-10 shrink-0">
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm ${getStatusStyle(assignment.status)}`}>
                                            {assignment.status}
                                        </span>

                                        {user?.role === 'student' && assignment.status !== 'Submitted' && assignment.status !== 'Graded' && assignment.status !== 'Completed' && (
                                            <div className="flex flex-col items-end gap-3">
                                                {!selectedFiles[assignment.id] ? (
                                                    <label className="cursor-pointer bg-slate-50 hover:bg-slate-100 hover:text-brand-primary text-slate-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 transition-all flex items-center gap-2 shadow-sm">
                                                        <Upload size={14} /> Attach Evidence
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) => handleFileChange(assignment.id, e.target.files[0])}
                                                        />
                                                    </label>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 pl-3 pr-1.5 py-1.5 rounded-xl border border-emerald-100 animate-in fade-in zoom-in-95 duration-300">
                                                        <CheckSquare size={12} /> {selectedFiles[assignment.id].name}
                                                        <button 
                                                            onClick={() => handleClearFile(assignment.id)}
                                                            className="ml-1 p-1 hover:bg-emerald-100 rounded-lg transition-colors text-emerald-600"
                                                            title="Remove file"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </div>
                                                )}
                                                <button
                                                    disabled={!selectedFiles[assignment.id]}
                                                    onClick={() => handleCompleteAssignment(assignment.id)}
                                                    className={`btn-primary py-3 px-8 text-xs font-black uppercase tracking-widest flex items-center gap-3 rounded-2xl shadow-xl transition-all ${!selectedFiles[assignment.id] ? 'opacity-50 grayscale cursor-not-allowed shadow-none' : overdue ? 'bg-slate-900 border-slate-900 shadow-slate-900/20' : 'shadow-brand-primary/30'}`}
                                                >
                                                    {overdue ? 'Finalize Evidence' : 'Mark as Completed'} <Send size={16} />
                                                </button>
                                            </div>
                                        )}

                                        {user?.role === 'instructor' && (
                                            <Link
                                                to={`/instructor/grade-assignments?id=${assignment.id}`}
                                                className="btn-secondary py-3 px-8 text-xs font-black uppercase tracking-widest flex items-center gap-3 border-2 border-slate-200 rounded-2xl hover:border-brand-primary hover:text-brand-primary transition-all"
                                            >
                                                Assess Evidence <ChevronRight size={18} />
                                            </Link>
                                        )}
                                    </div>
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
