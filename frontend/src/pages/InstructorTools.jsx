import React from 'react';
import Navbar from '../components/Navbar';
import { tools } from '../data/instructorData';
import { PenTool, ArrowLeft, Download, ExternalLink, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstructorTools = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto max-w-4xl">
                <div className="mb-8">
                    <Link to="/instructor" className="flex items-center text-brand-primary font-medium mb-2 hover:underline">
                        <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center">
                        <PenTool className="mr-3 text-brand-primary" /> Instructor Resources
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Primary Tools */}
                    <div className="md:col-span-2 bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-3xl text-white shadow-xl flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2 flex items-center">
                                <Zap className="text-amber-400 mr-2" size={24} /> AI Quiz Assistant
                            </h2>
                            <p className="text-slate-300 max-w-md">Generate high-quality multiple choice questions instantly from your course transcripts.</p>
                            <button className="mt-6 bg-white text-slate-900 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                                Launch Tool
                            </button>
                        </div>
                        <div className="hidden lg:block">
                            <PenTool size={120} className="text-white/10 rotate-12" />
                        </div>
                    </div>

                    {/* Resource List */}
                    {tools.map((tool, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-brand-primary transition-all group">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-brand-primary/10">
                                    {tool.type === 'Video' ? <ExternalLink className="text-brand-primary" size={20} /> : <Download className="text-slate-400 group-hover:text-brand-primary" size={20} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{tool.title}</h3>
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                                        {tool.type} {tool.size || tool.duration || tool.status}
                                    </p>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-brand-primary transition-colors">
                                <Download size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-amber-50 border border-amber-100 p-6 rounded-2xl flex items-start">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-4 shrink-0">
                        <PenTool className="text-amber-600" size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-amber-900 mb-1">Teaching Tip of the Week</h4>
                        <p className="text-amber-800 text-sm leading-relaxed">
                            Interspersing 5-minute practical exercises every 20 minutes of lecture can increase material retention by up to 40%.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorTools;
