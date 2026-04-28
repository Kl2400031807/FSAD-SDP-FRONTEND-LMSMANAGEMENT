import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import { Search, Filter, ChevronDown, Rocket, LayoutGrid } from 'lucide-react';

import { getCourses, enrollInCourse } from '../data/courses';
import { useNavigate } from 'react-router-dom';

const SkeletonCard = () => (
    <div className="bg-white p-4 rounded-[32px] border border-slate-100 animate-pulse">
        <div className="aspect-[16/10] rounded-[24px] bg-slate-100 mb-5" />
        <div className="h-6 bg-slate-100 rounded-lg w-3/4 mb-3" />
        <div className="h-4 bg-slate-50 rounded-lg w-full mb-2" />
        <div className="h-4 bg-slate-50 rounded-lg w-2/3 mb-6" />
        <div className="flex justify-between items-center pt-4 border-t border-slate-50 mt-auto">
            <div className="h-8 w-24 bg-slate-50 rounded-xl" />
            <div className="h-4 w-12 bg-slate-50 rounded-lg" />
        </div>
        <div className="h-12 bg-slate-100 rounded-2xl w-full mt-6" />
    </div>
);

const Courses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [role, setRole] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [difficultyFilter, setDifficultyFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = () => {
            const data = getCourses();
            setCourses(data);
            setIsLoading(false);
        };
        fetchCourses();

        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setRole(user.role);
            } catch (e) {
                setRole(null);
            }
        }
    }, []);

    const handleAction = (action, courseId) => {
        if (action === 'enroll') {
            enrollInCourse(courseId);
            setCourses(getCourses());
            alert('Success! You have enrolled in this course.');
            navigate('/my-courses');
        } else if (action === 'complete') {
            markCourseCompleted(courseId);
            setCourses(getCourses());
            alert('Success! Course marked as completed.');
        }
        console.log(`Action: ${action} on Course ID: ${courseId}`);
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || course.category === categoryFilter;
        const matchesDifficulty = difficultyFilter === 'All' || course.difficulty === difficultyFilter;
        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-24 px-6">
            <Navbar />
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 rounded-full mb-4">
                            <Rocket size={14} className="text-brand-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Knowledge Hub</span>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight leading-none">Curated <span className="text-gradient">Excellence</span></h1>
                        <p className="text-slate-500 font-medium text-lg max-w-lg leading-relaxed">
                            Discover career-defining skills through our meticulously designed learning paths.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Global search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-white border-2 border-slate-100 rounded-[20px] py-4 pl-14 pr-6 text-sm w-full sm:w-80 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all font-bold text-slate-900 shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="flex flex-wrap items-center gap-6 mb-12 py-6 border-y border-slate-100">
                    <div className="flex items-center gap-3">
                        <LayoutGrid size={18} className="text-slate-400" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Filters:</span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {/* Category Filter */}
                        <div className="relative">
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="appearance-none bg-white border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 cursor-pointer hover:bg-slate-50 transition-all shadow-sm"
                            >
                                <option value="All">All Categories</option>
                                <option value="Development">Development</option>
                                <option value="Design">Design</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                        </div>

                        {/* Difficulty Filter */}
                        <div className="relative">
                            <select
                                value={difficultyFilter}
                                onChange={(e) => setDifficultyFilter(e.target.value)}
                                className="appearance-none bg-white border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 cursor-pointer hover:bg-slate-50 transition-all shadow-sm"
                            >
                                <option value="All">All Levels</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                        </div>
                    </div>

                    <div className="ml-auto text-xs font-bold text-slate-400">
                        Displaying <span className="text-slate-900">{filteredCourses.length}</span> results
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {isLoading ? (
                        [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                    ) : (
                        filteredCourses.map(course => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                role={role}
                                onAction={handleAction}
                            />
                        ))
                    )}
                </div>

                {/* Empty State */}
                {!isLoading && filteredCourses.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-slate-50 rounded-full -mt-32 opacity-50" />
                        <div className="relative z-10 scale-110">
                            <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-slate-100">
                                <Search size={48} className="text-slate-200" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">No results matched your criteria</h3>
                            <p className="text-slate-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
                                We couldn't find any courses matching your current filters. Try resetting or adjusting your search.
                            </p>
                            <button
                                onClick={() => { setSearchTerm(''); setCategoryFilter('All'); setDifficultyFilter('All'); }}
                                className="btn-secondary px-8 py-3 rounded-2xl border-2 border-slate-200 hover:border-brand-primary hover:text-brand-primary font-black uppercase text-xs tracking-widest transition-all"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
