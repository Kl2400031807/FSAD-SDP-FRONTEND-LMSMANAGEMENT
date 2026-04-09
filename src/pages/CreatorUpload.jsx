import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Upload, ArrowLeft, FileVideo, FileText, Music, Link as LinkIcon, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreatorUpload = () => {
    const [fileType, setFileType] = useState('video');

    const handleUpload = (e) => {
        e.preventDefault();
        alert('File uploaded to Content Studio! (UI Mock Only)');
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto max-w-3xl">
                <div className="mb-8">
                    <Link to="/creator" className="flex items-center text-brand-primary font-medium mb-2 hover:underline">
                        <ArrowLeft size={16} className="mr-1" /> Back to Studio
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center">
                        <Upload className="mr-3 text-cyan-600" /> Upload Content
                    </h1>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <form onSubmit={handleUpload} className="p-8 space-y-8">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-4">Select Content Type</label>
                            <div className="grid grid-cols-4 gap-4">
                                {[
                                    { id: 'video', label: 'Video', icon: FileVideo, color: 'text-rose-500' },
                                    { id: 'audio', label: 'Audio', icon: Music, color: 'text-amber-500' },
                                    { id: 'document', label: 'Reading', icon: FileText, color: 'text-indigo-500' },
                                    { id: 'external', label: 'Link', icon: LinkIcon, color: 'text-emerald-500' }
                                ].map((type) => (
                                    <button
                                        key={type.id}
                                        type="button"
                                        onClick={() => setFileType(type.id)}
                                        className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${fileType === type.id ? 'border-brand-primary bg-blue-50/50' : 'border-slate-100 hover:border-slate-200'
                                            }`}
                                    >
                                        <type.icon size={24} className={type.color} />
                                        <span className="text-xs font-bold mt-2 text-slate-600">{type.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Content Title</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-medium"
                                placeholder="e.g. Module 1: Introduction"
                                required
                            />
                        </div>

                        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center hover:border-cyan-500 transition-colors cursor-pointer group bg-slate-50/30">
                            <Upload className="mx-auto text-slate-400 group-hover:text-cyan-600 mb-4" size={40} />
                            <p className="text-slate-600 font-bold">Drag and drop your files here</p>
                            <p className="text-slate-400 text-sm mt-1">Maximum file size: 500MB</p>
                            <button type="button" className="mt-6 bg-cyan-600 text-white px-6 py-2 rounded-xl font-bold text-sm">Browse Files</button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center"
                        >
                            <Save className="mr-2" size={20} /> Publish to Library
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatorUpload;
