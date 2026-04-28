import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { platformAssets } from '../data/creatorData';
import { Image as ImageIcon, ArrowLeft, Search, Filter, Grid, List, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreatorAssetLibrary = () => {
    const [viewMode, setViewMode] = useState('grid');

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <Link to="/creator" className="flex items-center text-brand-primary font-medium mb-2 hover:underline">
                            <ArrowLeft size={16} className="mr-1" /> Back to Studio
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center">
                            <ImageIcon className="mr-3 text-orange-600" /> Asset Library
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 bg-white min-w-[280px] font-medium"
                                placeholder="Search library..."
                            />
                        </div>
                        <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600">
                            <Filter size={20} />
                        </button>
                        <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-white">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2.5 ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <Grid size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2.5 ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <List size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' : 'grid-cols-1'} gap-4`}>
                    {platformAssets.map((asset) => (
                        <div key={asset.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-brand-primary transition-all group shadow-sm">
                            <div className="aspect-square bg-slate-50 flex items-center justify-center border-b border-slate-100 relative overflow-hidden">
                                {asset.type === 'Image' ? (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center font-bold text-slate-300">PREVIEW</div>
                                ) : (
                                    <ImageIcon size={48} className="text-slate-200" />
                                )}
                                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="bg-white p-2 rounded-lg text-slate-900">
                                        <Download size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-sm font-bold text-slate-800 truncate mb-1">{asset.title}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{asset.type} • {asset.size}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreatorAssetLibrary;
