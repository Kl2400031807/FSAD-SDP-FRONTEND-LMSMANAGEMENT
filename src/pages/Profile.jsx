import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { User, Mail, Shield, Calendar, Edit3, Camera, MapPin, Phone } from 'lucide-react';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-24 px-6">
            <Navbar />
            <div className="container mx-auto max-w-4xl">
                {/* Profile Header */}
                <div className="bg-white rounded-[45px] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50 mb-10 relative">
                    <div className="h-48 bg-linear-to-r from-brand-primary to-brand-secondary opacity-90" />
                    <div className="px-10 pb-10 -mt-20 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="flex items-end gap-6">
                                <div className="w-40 h-40 rounded-[35px] bg-slate-50 border-8 border-white shadow-2xl flex items-center justify-center text-slate-300 relative group">
                                    <User size={80} strokeWidth={1} />
                                    <button className="absolute bottom-4 right-4 p-3 bg-brand-primary text-white rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                                        <Camera size={18} />
                                    </button>
                                </div>
                                <div className="mb-4">
                                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">{user.name || 'Anonymous User'}</h1>
                                    <p className="text-slate-500 font-bold flex items-center gap-2 uppercase tracking-widest text-xs mt-1">
                                        <Shield size={14} className="text-brand-primary" />
                                        Platform {user.role}
                                    </p>
                                </div>
                            </div>
                            <button className="hidden md:flex items-center gap-2 btn-secondary px-8 py-4 mb-4 border-2 border-slate-200 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary transition-all shadow-sm">
                                <Edit3 size={18} /> Edit Ledger
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Sidebar Stats */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Vital Statistics</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase">Registry Date</p>
                                        <p className="text-slate-900 font-bold tracking-tight">Jan 2026</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase">Geographic Hub</p>
                                        <p className="text-slate-900 font-bold tracking-tight">Digital Workspace</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase">Direct Protocol</p>
                                        <p className="text-slate-900 font-bold tracking-tight">+1 (555) EDU-FLOW</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Identity Manifest */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="bg-white p-10 rounded-[45px] border border-slate-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16" />
                            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Identity <span className="text-gradient">Manifest</span></h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-1.5">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Display Alias</p>
                                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-center gap-3 text-slate-900 font-bold">
                                        <User size={18} className="text-brand-primary" />
                                        {user.name}
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Digital Identifier</p>
                                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-center gap-3 text-slate-900 font-bold">
                                        <Mail size={18} className="text-brand-primary" />
                                        {user.email}
                                    </div>
                                </div>
                                <div className="space-y-1.5 md:col-span-2">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">System Privilege Level</p>
                                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-center gap-3 text-slate-900 font-bold">
                                        <Shield size={18} className="text-brand-primary" />
                                        Verified {user.role} Status
                                    </div>
                                </div>
                            </div>

                            <button className="md:hidden w-full mt-10 btn-primary py-4 font-black uppercase text-sm tracking-widest">
                                Update Manifest
                            </button>
                        </div>

                        <div className="bg-brand-primary/5 p-10 rounded-[45px] border border-brand-primary/10 relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="text-brand-primary font-black uppercase tracking-widest text-sm mb-2">Security Notice</h4>
                                <p className="text-slate-600 font-bold leading-relaxed">
                                    Your profile data is stored exclusively in your local workspace. To synchronize this data with our global servers, please finalize your Spring Boot backend integration.
                                </p>
                            </div>
                            <div className="absolute top-1/2 -right-10 -translate-y-1/2 opacity-10">
                                <Shield size={160} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
