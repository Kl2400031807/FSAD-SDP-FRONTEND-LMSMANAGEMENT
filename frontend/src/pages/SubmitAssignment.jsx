import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Upload, MessageSquare, CheckCircle, ArrowLeft, AlertTriangle, Loader2 } from 'lucide-react';

const SubmitAssignment = () => {
    const [searchParams] = useSearchParams();
    const assignmentId = searchParams.get('id');
    const assignmentTitle = searchParams.get('title') || 'Assessment Module';
    const deadline = searchParams.get('deadline');

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        comments: '',
        file: null,
    });
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isPastDeadline = (dateStr) => {
        if (!dateStr) return false;
        const dueDate = new Date(dateStr);
        const today = new Date();
        return dueDate < today;
    };

    const overdue = isPastDeadline(deadline);

    const handlePreSubmit = (e) => {
        e.preventDefault();
        if (!formData.file) {
            alert('Please select a file to upload.');
            return;
        }
        setIsConfirming(true);
    };

    const handleFinalSubmit = () => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Assignment Submitted:', { ...formData, assignmentId });
            setIsSubmitting(false);
            setIsConfirming(false);
            alert('Digital evidence submitted successfully.');
            navigate('/assignments');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-24 px-6 relative">
            <Navbar />

            {/* Confirmation Modal */}
            {isConfirming && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isSubmitting && setIsConfirming(false)} />
                    <div className="relative bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
                        <div className="w-20 h-20 rounded-3xl bg-amber-50 flex items-center justify-center text-amber-500 mb-8 border border-amber-100 shadow-inner mx-auto">
                            <AlertTriangle size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 text-center mb-4 tracking-tight">Verify Submission</h2>
                        <p className="text-slate-500 text-center mb-10 font-medium leading-relaxed">
                            You are about to submit your work for <span className="text-slate-900 font-black">{assignmentTitle}</span>. Once finalized, modifications may require instructor approval.
                        </p>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleFinalSubmit}
                                disabled={isSubmitting}
                                className="btn-primary w-full py-4 text-sm font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Transmitting...</> : 'CONFIRM & TRANSMIT'}
                            </button>
                            <button
                                onClick={() => setIsConfirming(false)}
                                disabled={isSubmitting}
                                className="w-full py-4 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto max-w-2xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-400 hover:text-brand-primary mb-10 transition-colors font-black text-[10px] uppercase tracking-widest"
                >
                    <ArrowLeft size={16} /> RETURN TO REGISTRY
                </button>

                <div className={`bg-white p-12 rounded-[45px] border ${overdue ? 'border-rose-100 bg-rose-50/10' : 'border-slate-200'} shadow-2xl shadow-slate-200/40 relative overflow-hidden transition-all`}>
                    {overdue && (
                        <div className="mb-10 p-5 bg-rose-50 border border-rose-100 rounded-3xl flex items-center gap-4 text-rose-600">
                            <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest mb-0.5">Deadline Breached</p>
                                <p className="text-sm font-bold opacity-80 leading-tight">The submission window for ID #{assignmentId} has closed. Please contact your instructor for a waiver.</p>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col items-center text-center">
                        <div className={`w-24 h-24 rounded-[30px] ${overdue ? 'bg-slate-100 text-slate-300' : 'bg-brand-primary/10 text-brand-primary'} flex items-center justify-center mb-8 border-2 ${overdue ? 'border-slate-200' : 'border-brand-primary/5'} shadow-inner`}>
                            <Upload size={48} />
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Transmission Hub</h1>
                        <p className="text-slate-500 mb-12 font-medium italic max-w-sm">
                            {assignmentTitle} | Target: {deadline || 'No Deadline Set'}
                        </p>
                    </div>

                    <form onSubmit={handlePreSubmit} className="space-y-12 text-left">
                        <div className="space-y-5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-2">Evidence Attachment</label>
                            <div className={`border-3 border-dashed ${overdue ? 'border-slate-200' : 'border-slate-200 hover:border-brand-primary hover:bg-slate-50'} rounded-[35px] p-16 text-center transition-all cursor-pointer relative overflow-hidden group shadow-sm bg-white`}>
                                <div className={`relative z-10 transition-all ${overdue ? 'opacity-30 grayscale' : 'group-hover:scale-105'}`}>
                                    <Upload className={`mx-auto ${overdue ? 'text-slate-300' : 'text-slate-200 group-hover:text-brand-primary'} transition-colors mb-6`} size={64} />
                                    <p className="text-slate-900 font-extrabold text-xl mb-1">{formData.file ? formData.file.name : 'Ingest Document'}</p>
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{formData.file ? `${(formData.file.size / 1024 / 1024).toFixed(2)} MB` : 'PDF • ZIP • DOCX (MAX 25MB)'}</p>
                                </div>
                                {!overdue && <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })} />}
                            </div>
                        </div>

                        <div className="space-y-5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-2 flex items-center gap-2">
                                <MessageSquare size={16} className="text-brand-primary" /> Contextual Remarks
                            </label>
                            <textarea
                                value={formData.comments}
                                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                                disabled={overdue}
                                placeholder="Provide technical context or methodology overview..."
                                rows={6}
                                className={`w-full bg-slate-50 border border-slate-200 rounded-[30px] py-6 px-8 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all resize-none shadow-inner font-medium text-sm leading-relaxed ${overdue ? 'opacity-50' : ''}`}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={overdue || !formData.file}
                            className={`w-full py-5 text-lg font-black flex items-center justify-center gap-4 rounded-[30px] shadow-2xl transition-all active:scale-95 ${overdue ? 'bg-slate-100 text-slate-300 cursor-not-allowed border-slate-200' : 'btn-primary shadow-brand-primary/30'}`}
                        >
                            <CheckCircle size={28} />
                            {overdue ? 'SUBMISSION BLOCKED' : 'INITIALIZE FINAL UPLOAD'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubmitAssignment;
