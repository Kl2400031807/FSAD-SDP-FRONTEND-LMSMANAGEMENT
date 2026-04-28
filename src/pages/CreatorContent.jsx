import React from 'react';
import Navbar from '../components/Navbar';
import { platformAssets } from '../data/creatorData';
import { Edit3, ArrowLeft, MoreVertical, FileVideo, FileText, Music, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreatorContent = () => {
    const getIcon = (type) => {
        switch (type) {
            case 'Video': return <FileVideo className="text-rose-500" />;
            case 'Document': return <FileText className="text-indigo-500" />;
            case 'Audio': return <Music className="text-amber-500" />;
            default: return <ImageIcon className="text-cyan-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto">
                <div className="mb-8">
                    <Link to="/creator" className="flex items-center text-brand-primary font-medium mb-2 hover:underline">
                        <ArrowLeft size={16} className="mr-1" /> Back to Studio
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center">
                        <Edit3 className="mr-3 text-lime-600" /> Edit Content
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {platformAssets.map((asset) => (
                        <div key={asset.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-50 rounded-xl">
                                    {getIcon(asset.type)}
                                </div>
                                <button className="text-slate-400 hover:text-slate-600">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                            <h3 className="font-bold text-slate-900 mb-1 truncate">{asset.title}</h3>
                            <div className="flex items-center text-xs text-slate-400 font-medium mb-4">
                                <span>{asset.type}</span>
                                <span className="mx-2">•</span>
                                <span>{asset.size}</span>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${asset.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                    }`}>
                                    {asset.status}
                                </span>
                                <button className="text-brand-primary font-bold text-sm hover:underline flex items-center">
                                    Edit Metadata <Edit3 size={14} className="ml-1" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreatorContent;
