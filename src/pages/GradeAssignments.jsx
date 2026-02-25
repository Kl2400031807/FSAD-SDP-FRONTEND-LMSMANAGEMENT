import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Table, User, MessageCircle, Save, ArrowLeft, Star, FileText, CheckCircle2, AlertCircle, Loader2, ChevronRight } from 'lucide-react';

const MOCK_SUBMISSIONS = [
    { id: 1, student: 'Alex Johnson', date: '2026-02-22', file: 'hooks_homework.pdf', status: 'Pending', size: '1.2MB' },
    { id: 2, student: 'Maria Garcia', date: '2026-02-23', file: 'refactor_demo.zip', status: 'Pending', size: '4.5MB' },
    { id: 3, student: 'Sam Smith', date: '2026-02-20', file: 'final_submission.pdf', status: 'Graded', grade: '95', feedback: 'Excellent work!', size: '2.1MB' },
];

const GradeAssignments = () => {
    const [searchParams] = useSearchParams();
    const assignmentId = searchParams.get('id');
    const navigate = useNavigate();
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [gradeData, setGradeData] = useState({ grade: '', feedback: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [validationError, setValidationError] = useState('');

    const handleGradeChange = (e) => {
        const value = e.target.value;
        setGradeData({ ...gradeData, grade: value });
        if (value && (parseInt(value) < 0 || parseInt(value) > 100)) {
            setValidationError('Score must be between 0 and 100');
        } else {
            setValidationError('');
        }
    };

    const handleSaveGrade = (e) => {
        e.preventDefault();
        if (validationError) return;

        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Grade Saved:', { ...gradeData, submissionId: selectedSubmission.id });
            setIsSaving(false);
            alert(`Assessment finalized for ${selectedSubmission.student}`);
            setSelectedSubmission(null);
            setGradeData({ grade: '', feedback: '' });
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-24 px-6">
            <Navbar />
            <div className="container mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-400 hover:text-brand-primary mb-10 transition-colors font-black text-[10px] uppercase tracking-widest"
                >
                    <ArrowLeft size={16} /> RETURN TO REGISTRY
                </button>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Assessment Console</h1>
                        <p className="text-slate-500 font-medium">Evaluation Workspace for Assignment ID: #{assignmentId}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 opacity-50" />

                            <table className="w-full text-left relative z-10">
                                <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                                    <tr>
                                        <th className="px-10 py-6">Academic Entity</th>
                                        <th className="px-10 py-6">Timestamp</th>
                                        <th className="px-10 py-6">Digital Evidence</th>
                                        <th className="px-10 py-6 text-center">Status</th>
                                        <th className="px-10 py-6 text-right">Protocol</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {MOCK_SUBMISSIONS.map((sub) => (
                                        <tr
                                            key={sub.id}
                                            className={`hover:bg-slate-50/80 transition-all duration-300 group cursor-pointer ${selectedSubmission?.id === sub.id ? 'bg-brand-primary/[0.02]' : ''}`}
                                            onClick={() => setSelectedSubmission(sub)}
                                        >
                                            <td className="px-10 py-7">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl ${sub.status === 'Graded' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'} flex items-center justify-center border border-slate-200 shadow-inner group-hover:scale-110 transition-transform`}>
                                                        {sub.status === 'Graded' ? <CheckCircle2 size={24} /> : <User size={24} />}
                                                    </div>
                                                    <div>
                                                        <span className="font-black text-slate-900 uppercase text-sm tracking-tight block">{sub.student}</span>
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enrollment Verified</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-7 text-slate-600 text-sm font-bold">{sub.date}</td>
                                            <td className="px-10 py-7">
                                                <div className="flex flex-col">
                                                    <span className="text-brand-primary text-sm font-black hover:underline">{sub.file}</span>
                                                    <span className="text-[10px] font-bold text-slate-400">{sub.size}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-7 text-center">
                                                <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${sub.status === 'Graded' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td className="px-10 py-7 text-right">
                                                <button
                                                    className={`p-3 rounded-xl border transition-all ${selectedSubmission?.id === sub.id ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-slate-200 text-slate-400 group-hover:border-brand-primary group-hover:text-brand-primary'}`}
                                                >
                                                    <ChevronRight size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        {selectedSubmission ? (
                            <div className="bg-white p-10 rounded-[45px] border-2 border-brand-primary/10 shadow-2xl animate-in slide-in-from-bottom-10 duration-500 relative overflow-hidden flex flex-col h-full ring-8 ring-brand-primary/5">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/[0.03] rounded-full -mr-24 -mt-24 pointer-events-none" />

                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-primary/20">
                                        <Star size={28} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Grade Panel</h2>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scientific Review</p>
                                    </div>
                                </div>

                                <div className="mb-10 p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                                            <FileText size={20} className="text-brand-primary" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Assessing Individual</span>
                                            <span className="text-slate-900 font-black text-xl leading-none">{selectedSubmission.student}</span>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-500 leading-relaxed max-w-xs">
                                        Reviewing artifacts submitted on {selectedSubmission.date}. Verify file integrity before finalizing score.
                                    </div>
                                </div>

                                <form onSubmit={handleSaveGrade} className="space-y-8 flex-grow">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Formal Metric (0-100)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={gradeData.grade}
                                                onChange={handleGradeChange}
                                                placeholder="00"
                                                className={`w-full bg-slate-50 border ${validationError ? 'border-rose-400 ring-4 ring-rose-50' : 'border-slate-200 focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary'} rounded-3xl py-6 px-10 text-slate-900 text-4xl font-black transition-all outline-none`}
                                                required
                                            />
                                            <span className="absolute right-10 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-300">/ 100</span>
                                        </div>
                                        {validationError && (
                                            <p className="flex items-center gap-2 text-rose-500 text-[10px] font-black uppercase tracking-widest px-2 animate-bounce">
                                                <AlertCircle size={12} /> {validationError}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 flex items-center gap-2">
                                            <MessageCircle size={16} className="text-brand-primary" /> Qualitative Evaluation
                                        </label>
                                        <textarea
                                            value={gradeData.feedback}
                                            onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
                                            placeholder="Synthesize constructive feedback..."
                                            rows={8}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[35px] py-6 px-8 text-slate-900 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all resize-none font-medium text-sm leading-relaxed shadow-inner"
                                        />
                                    </div>

                                    <div className="pt-4 space-y-4">
                                        <button
                                            type="submit"
                                            disabled={isSaving || validationError || !gradeData.grade}
                                            className={`btn-primary w-full py-5 flex items-center justify-center gap-3 font-black text-lg rounded-[25px] shadow-2xl transition-all active:scale-95 ${isSaving ? 'opacity-70 grayscale' : 'shadow-brand-primary/30'}`}
                                        >
                                            {isSaving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                                            {isSaving ? 'VALIDATING...' : 'FINALIZE ASSESSMENT'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedSubmission(null)}
                                            className="w-full text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-slate-900 transition-colors py-2"
                                        >
                                            DISCARD PANEL
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="bg-white p-12 rounded-[50px] border border-dashed border-slate-200 text-center flex flex-col items-center py-48 shadow-sm">
                                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-10 border border-slate-100">
                                    <Star className="text-slate-100" size={56} />
                                </div>
                                <h3 className="text-xl font-black text-slate-300 uppercase tracking-widest">Dashboard Idle</h3>
                                <p className="text-slate-400 font-bold max-w-[200px] leading-relaxed mt-4 text-xs uppercase tracking-tighter">SELECT A CANDIDATE FROM THE REGISTRY TO START EVALUATION</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GradeAssignments;
