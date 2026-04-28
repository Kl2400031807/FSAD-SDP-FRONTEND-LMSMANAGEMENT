import React from 'react';
import { BookOpen, User, CheckCircle, Edit, PlayCircle, Clock, Users, Signal, RotateCcw } from 'lucide-react';

const CourseCard = ({ course, role, onAction }) => {
    // Helper for difficulty colors
    const getDifficultyColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'beginner': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'intermediate': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'advanced': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const getRoleActions = () => {
        switch (role) {
            case 'student':
                if (course.isCompleted) {
                    return (
                        <div className="w-full py-3 text-sm font-black text-brand-primary bg-brand-primary/5 rounded-xl border border-brand-primary/20 flex items-center justify-center gap-2 shadow-sm">
                            <CheckCircle size={18} />
                            Curriculum Mastered
                        </div>
                    );
                }
                return course.studentEnrolled ? (
                    <button
                        onClick={() => onAction('complete', course.id)}
                        className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all bg-brand-accent border-brand-accent"
                    >
                        <CheckCircle size={18} />
                        Finalize Course
                    </button>
                ) : (
                    <button
                        onClick={() => onAction('enroll', course.id)}
                        className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <CheckCircle size={18} />
                        Enroll Now
                    </button>
                );
            case 'instructor':
                return (
                    <button
                        onClick={() => onAction('manage', course.id)}
                        className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <Edit size={18} />
                        Manage Course
                    </button>
                );
            case 'admin':
                if (course.isDeleted) {
                    return (
                        <button
                            onClick={() => onAction('restore', course.id)}
                            className="w-full py-3 text-sm font-black rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={18} />
                            Restore Curriculum
                        </button>
                    );
                }
                return (
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex gap-3">
                            {course.status === 'Approved' ? (
                                <button
                                    onClick={() => onAction('revert', course.id)}
                                    className="flex-1 py-3 text-sm font-black rounded-xl bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-600 hover:text-white transition-all shadow-sm active:scale-95"
                                >
                                    Revert
                                </button>
                            ) : (
                                <button
                                    onClick={() => onAction('approve', course.id)}
                                    className="flex-1 py-3 text-sm font-black rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95"
                                >
                                    Approve
                                </button>
                            )}
                            <button
                                onClick={() => onAction('delete', course.id)}
                                className="flex-1 py-3 text-sm font-black rounded-xl bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            case 'creator':
                return (
                    <button
                        onClick={() => onAction('edit', course.id)}
                        className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <Edit size={18} />
                        Edit Content
                    </button>
                );
            default:
                return (
                    <button
                        className="btn-secondary w-full py-3 text-sm flex items-center justify-center gap-2 border-slate-200 hover:border-brand-primary hover:text-brand-primary transition-all active:scale-95"
                    >
                        View Details
                    </button>
                );
        }
    };

    return (
        <div className="bg-white p-4 rounded-[32px] border border-slate-200 hover:border-brand-primary hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full overflow-hidden relative">
            {/* Thumbnail Area */}
            <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden mb-5 bg-gradient-to-br from-slate-50 to-slate-200">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 via-transparent to-brand-secondary/10 group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                    {course.image ? (
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <BookOpen size={56} className="text-slate-300 group-hover:scale-110 group-hover:text-brand-primary/40 transition-all duration-500" />
                    )}
                </div>

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {course.status && (
                        <div className={`px-2.5 py-1 rounded-lg backdrop-blur-md border text-[10px] font-black uppercase tracking-widest ${
                            course.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30' : 
                            course.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border-amber-400/30' : 
                            'bg-rose-500/20 text-rose-400 border-rose-400/30'
                        }`}>
                            {course.status}
                        </div>
                    )}
                    <div className={`px-2.5 py-1 rounded-lg backdrop-blur-md border text-[10px] font-black uppercase tracking-widest ${getDifficultyColor(course.difficulty || 'Beginner')}`}>
                        {course.difficulty || 'Beginner'}
                    </div>
                    {course.isNew && (
                        <div className="px-2.5 py-1 bg-brand-accent text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-accent/20">
                            New
                        </div>
                    )}
                </div>

                <div className="absolute bottom-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-slate-700 border border-slate-200 flex items-center gap-1.5">
                    <Clock size={12} className="text-brand-primary" />
                    {course.duration || '4 Weeks'}
                </div>
            </div>

            {/* Content Area */}
            <div className="px-1 flex-grow flex flex-col">
                <h3 className="text-xl font-black mb-2 line-clamp-1 text-slate-900 group-hover:text-brand-primary transition-colors">{course.title}</h3>
                <p className="text-slate-500 text-sm mb-5 line-clamp-2 leading-relaxed font-medium">
                    {course.description}
                </p>

                <div className="flex items-center justify-between mb-6 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
                            <User size={14} className="text-slate-500" />
                        </div>
                        <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                        <Users size={14} className="text-brand-secondary" />
                        <span className="text-xs font-bold">{course.enrollments || '1.2k'}</span>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="space-y-3 mt-auto">
                    <button
                        onClick={() => onAction('view', course.id)}
                        className="w-full py-2 text-xs font-black text-slate-400 hover:text-brand-primary flex items-center justify-center gap-2 transition-colors rounded-xl hover:bg-brand-primary/5"
                    >
                        <PlayCircle size={14} />
                        EXPLORE CURRICULUM
                    </button>
                    {getRoleActions()}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
