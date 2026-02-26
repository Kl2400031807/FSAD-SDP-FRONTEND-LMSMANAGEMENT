import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { PlusCircle, ArrowLeft, Upload, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreateCourse = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        category: 'Core CS',
        description: '',
        price: '0'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Course submitted for review! (UI Mock Only)');
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto max-w-3xl">
                <div className="mb-8">
                    <Link to="/instructor" className="flex items-center text-brand-primary font-medium mb-2 hover:underline">
                        <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center">
                        <PlusCircle className="mr-3 text-brand-primary" /> Create New Course
                    </h1>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Course Title</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-medium"
                                    placeholder="e.g. Advanced React Patterns"
                                    value={courseData.title}
                                    onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-medium bg-white"
                                    value={courseData.category}
                                    onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                                >
                                    <option>Core CS</option>
                                    <option>Advanced CS</option>
                                    <option>Industry</option>
                                    <option>Security</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-medium"
                                    value={courseData.price}
                                    onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Course Description</label>
                            <textarea
                                rows="4"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-medium"
                                placeholder="What will students learn?"
                                value={courseData.description}
                                onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-brand-primary transition-colors cursor-pointer group">
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary/10">
                                <Upload className="text-slate-400 group-hover:text-brand-primary" size={24} />
                            </div>
                            <p className="text-slate-600 font-medium">Click to upload course thumbnail</p>
                            <p className="text-slate-400 text-xs mt-1">PNG, JPG up to 5MB</p>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 border border-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center shadow-lg shadow-emerald-100"
                        >
                            <Save className="mr-2" size={20} /> Submit for Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;
