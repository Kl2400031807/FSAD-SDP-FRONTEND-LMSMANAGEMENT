import { Upload, Edit3, ShieldAlert, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CreatorDashboard = () => {
    const tasks = [
        { title: 'Upload Content', icon: Upload, desc: 'Add video, audio or reading material', iconColor: 'text-cyan-600', bgColor: 'bg-cyan-50', path: '/creator/upload' },
        { title: 'Edit Content', icon: Edit3, desc: 'Update existing platform assets', iconColor: 'text-lime-600', bgColor: 'bg-lime-50', path: '/creator/content' },
        { title: 'Quality Review', icon: ShieldAlert, desc: 'Ensure content meets standards', iconColor: 'text-fuchsia-600', bgColor: 'bg-fuchsia-50', path: '/creator/review' },
        { title: 'Asset Library', icon: Image, desc: 'Manage your uploaded media', iconColor: 'text-orange-600', bgColor: 'bg-orange-50', path: '/creator/assets' },
    ];

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Content Studio</h1>
                    <p className="text-slate-500 font-medium">Design and publish interactive learning materials.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tasks.map((item, idx) => (
                        <Link to={item.path} key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-brand-primary hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer shadow-sm">
                            <div className={`w-14 h-14 ${item.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                                <item.icon className={item.iconColor} size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreatorDashboard;
