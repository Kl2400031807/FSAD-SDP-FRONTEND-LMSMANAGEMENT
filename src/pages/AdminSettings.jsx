import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { ShieldCheck, ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        platformName: 'LMS Platform',
        defaultStatus: 'Pending',
        registrationEnabled: true
    });

    const handleSave = (e) => {
        e.preventDefault();
        alert('Settings saved successfully (UI Mock Only)');
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto max-w-2xl">
                <div className="mb-8">
                    <Link to="/admin" className="flex items-center text-brand-primary font-medium mb-2 hover:underline">
                        <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center">
                        <ShieldCheck className="mr-3 text-brand-primary" /> System Settings
                    </h1>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                        <h2 className="text-lg font-bold text-slate-800">Global Configuration</h2>
                        <p className="text-slate-500 text-sm">Control platform-wide behavior and appearance.</p>
                    </div>

                    <form onSubmit={handleSave} className="p-8 space-y-8">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3" htmlFor="platformName">
                                Platform Name
                            </label>
                            <input
                                id="platformName"
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium"
                                value={settings.platformName}
                                onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3" htmlFor="defaultStatus">
                                Default Course Status
                            </label>
                            <select
                                id="defaultStatus"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium bg-white"
                                value={settings.defaultStatus}
                                onChange={(e) => setSettings({ ...settings, defaultStatus: e.target.value })}
                            >
                                <option value="Pending">Pending Approval</option>
                                <option value="Approved">Auto-Approved</option>
                            </select>
                            <p className="mt-2 text-xs text-slate-400">Newly created courses will default to this status.</p>
                        </div>

                        <div className="flex items-center group cursor-pointer">
                            <div className="relative flex items-center h-6">
                                <input
                                    id="registration"
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-slate-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
                                    checked={settings.registrationEnabled}
                                    onChange={(e) => setSettings({ ...settings, registrationEnabled: e.target.checked })}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="registration" className="font-bold text-slate-700 cursor-pointer">
                                    Registration Enabled
                                </label>
                                <p className="text-slate-500">Allow new users to create accounts on the platform.</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-slate-900 border border-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center shadow-lg shadow-slate-200"
                            >
                                <Save className="mr-2" size={20} /> Save Configuration
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
