import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Target, Award, BookOpen, Clock, TrendingUp } from 'lucide-react';
import { getAssignments } from '../data/assignments';

const Progress = () => {
    const [user, setUser] = useState(null);
    const [assignments, setAssignments] = useState([]);
 
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
 
    // Dynamically calculate progress data from assignments
    const coursesMap = assignments.reduce((acc, a) => {
        if (!acc[a.course]) {
            acc[a.course] = { title: a.course, total: 0, completed: 0, grades: [] };
        }
        acc[a.course].total += 1;
        if (a.status === 'Completed' || a.status === 'Submitted' || a.status === 'Graded') {
            acc[a.course].completed += 1;
        }
        if (a.grade) {
            const numericGrade = parseFloat(a.grade.replace('%', ''));
            if (!isNaN(numericGrade)) acc[a.course].grades.push(numericGrade);
        }
        return acc;
    }, {});

    const progressData = Object.values(coursesMap).map(c => ({
        course: c.title,
        completion: Math.round((c.completed / c.total) * 100),
        assignments: `${c.completed}/${c.total}`,
        grade: c.grades.length > 0 ? `${Math.round(c.grades.reduce((s, g) => s + g, 0) / c.grades.length)}%` : 'N/A'
    }));

    const avgGPA = progressData.length > 0 ? Math.round(progressData.reduce((s, d) => s + (d.grade !== 'N/A' ? parseInt(d.grade) : 0), 0) / (progressData.filter(d => d.grade !== 'N/A').length || 1)) : 0;
    const graduatedCount = progressData.filter(d => d.completion === 100).length;

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-10 tracking-tight">Academic Analytics</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-8 rounded-[35px] border border-slate-200 flex items-center gap-6 shadow-sm">
                        <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/5">
                            <Target size={32} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Graduation Rate</p>
                            <h3 className="text-3xl font-black text-slate-900">{graduatedCount} / {progressData.length || 0}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[35px] border border-slate-200 flex items-center gap-6 shadow-sm">
                        <div className="w-16 h-16 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary border border-brand-secondary/5">
                            <Clock size={32} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Time Invested</p>
                            <h3 className="text-3xl font-black text-slate-900">42.5h</h3>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[35px] border border-slate-200 flex items-center gap-6 shadow-sm">
                        <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent border border-brand-accent/5">
                            <Award size={32} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Portfolio GPA</p>
                            <h3 className="text-3xl font-black text-slate-900">{avgGPA}%</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[45px] border border-slate-200 overflow-hidden px-10 py-12 shadow-xl shadow-slate-200/40 relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32" />
                    <h2 className="text-2xl font-black text-slate-900 mb-12 flex items-center gap-3 relative z-10">
                        <TrendingUp className="text-brand-primary" size={28} /> Performance Matrix
                    </h2>

                    <div className="space-y-12 relative z-10">
                        {progressData.map((course, idx) => (
                            <div key={idx} className="space-y-5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-xl font-extrabold text-slate-900 tracking-tight">{course.course}</h4>
                                        <div className="flex items-center gap-6 mt-2">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                                <BookOpen size={14} className="text-brand-primary" /> {course.assignments} Modules
                                            </span>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">Status: {course.grade} GPA</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-2xl font-black text-brand-primary tracking-tighter">{course.completion}%</span>
                                        <span className="text-[10px] font-black uppercase text-slate-400">Completion</span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-50 h-4 rounded-full overflow-hidden shadow-inner border border-slate-100 p-1">
                                    <div
                                        className="h-full bg-brand-primary rounded-full transition-all duration-1000 ease-out shadow-lg shadow-brand-primary/20"
                                        style={{ width: `${course.completion}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Progress;
