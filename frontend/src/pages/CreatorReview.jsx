import React from 'react';
import Navbar from '../components/Navbar';
import { qualityChecks } from '../data/creatorData';
import { ShieldAlert, ArrowLeft, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreatorReview = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto max-w-4xl">
                <div className="mb-8">
                    <Link to="/creator" className="flex items-center text-brand-primary font-medium mb-2 hover:underline">
                        <ArrowLeft size={16} className="mr-1" /> Back to Studio
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center">
                        <ShieldAlert className="mr-3 text-fuchsia-600" /> Quality Review
                    </h1>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Pending Reviews</h2>
                            <p className="text-slate-500 text-sm">Review these items to maintain platform standards.</p>
                        </div>
                        <span className="bg-fuchsia-50 text-fuchsia-600 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-fuchsia-100">
                            {qualityChecks.length} Items Flagged
                        </span>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {qualityChecks.map((item) => (
                            <div key={item.id} className="p-8 hover:bg-slate-50/50 transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.priority === 'High' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'
                                            }`}>
                                            <AlertTriangle size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                                            <p className="text-slate-500 text-sm font-medium mb-3">Issue: {item.issue}</p>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${item.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                    {item.priority} Priority
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-slate-400 hover:text-brand-primary transition-colors hover:bg-white rounded-lg border border-transparent hover:border-slate-100">
                                            <Eye size={20} />
                                        </button>
                                        <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all">
                                            Resolve
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {qualityChecks.length === 0 && (
                        <div className="py-24 text-center">
                            <CheckCircle2 className="mx-auto text-emerald-100 mb-4" size={64} />
                            <h3 className="text-slate-400 font-bold">Workspace pristine. No pending flags.</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatorReview;
