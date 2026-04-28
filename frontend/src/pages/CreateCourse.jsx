<<<<<<< HEAD
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { PlusCircle, ArrowLeft, Upload, Save } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { createCourse } from '../api/api';

const CreateCourse = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
=======
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { PlusCircle, ArrowLeft, Upload, Save, Edit } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { addCourse, getCourses, updateCourse } from '../data/courses';

const CreateCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
    const [courseData, setCourseData] = useState({
        title: '',
        category: 'Core CS',
        description: '',
<<<<<<< HEAD
        price: '0',
        difficulty: 'Beginner',
        duration: '4 Weeks'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await createCourse(courseData);
            alert('Course published successfully to the global registry!');
            navigate('/instructor');
        } catch (err) {
            console.error("Failed to add course:", err);
            alert('Security Error: Failed to publish curriculum to the workspace.');
        } finally {
            setIsLoading(false);
=======
        difficulty: 'Beginner', 
        duration: '4 Weeks'   
    });

    useEffect(() => {
        if (isEditMode) {
            const allCourses = getCourses();
            const courseToEdit = allCourses.find(c => c.id === parseInt(id));
            if (courseToEdit) {
                setCourseData({
                    title: courseToEdit.title || '',
                    category: courseToEdit.category || 'Core CS',
                    description: courseToEdit.description || '',
                    difficulty: courseToEdit.difficulty || 'Beginner',
                    duration: courseToEdit.duration || '4 Weeks'
                });
            }
        }
    }, [id, isEditMode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            updateCourse(id, courseData);
            alert('Course updated successfully!');
            navigate(`/instructor/manage-course/${id}`);
        } else {
            addCourse(courseData);
            alert('Course added successfully!');
            navigate('/instructor');
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto max-w-3xl">
                <div className="mb-8">
<<<<<<< HEAD
                    <Link to="/instructor" className="flex items-center text-brand-primary font-medium mb-2 hover:underline">
                        <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center">
                        <PlusCircle className="mr-3 text-brand-primary" /> Create New Course
=======
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center text-brand-primary font-medium mb-2 hover:underline"
                    >
                        <ArrowLeft size={16} className="mr-1" /> Back
                    </button>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center">
                        {isEditMode ? (
                            <Edit className="mr-3 text-brand-primary" />
                        ) : (
                            <PlusCircle className="mr-3 text-brand-primary" />
                        )}
                        {isEditMode ? 'Modify Curriculum Detials' : 'Create New Course'}
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
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

<<<<<<< HEAD
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-medium"
                                    value={courseData.price}
                                    onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
=======

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Difficulty</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-medium bg-white"
                                    value={courseData.difficulty}
                                    onChange={(e) => setCourseData({ ...courseData, difficulty: e.target.value })}
                                >
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Duration</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-medium"
                                    placeholder="e.g. 6 Weeks"
                                    value={courseData.duration}
                                    onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
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
<<<<<<< HEAD
                            className="w-full bg-emerald-600 border border-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center shadow-lg shadow-emerald-100"
                        >
                            <Save className="mr-2" size={20} /> Add Course
=======
                            className="w-full bg-emerald-600 border border-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center shadow-lg shadow-emerald-100 uppercase tracking-widest text-sm"
                        >
                            <Save className="mr-2" size={20} /> 
                            {isEditMode ? 'Commit Changes' : 'Publish Course'}
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;
