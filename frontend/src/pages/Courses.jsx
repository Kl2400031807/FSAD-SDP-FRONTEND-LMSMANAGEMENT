import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import { Search, ChevronDown, Rocket, LayoutGrid } from 'lucide-react';

<<<<<<< HEAD
import { fetchCourses as fetchCoursesApi, enrollInCourse as enrollInCourseApi, completeCourse as completeCourseApi } from '../api/api';
=======
import { getCourses, enrollInCourse } from '../data/courses';
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
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
    const [error, setError] = useState(null);
    const [learningResources, setLearningResources] = useState([]);
    const [recentlyEnrolledCourse, setRecentlyEnrolledCourse] = useState(null);

    useEffect(() => {
<<<<<<< HEAD
        const loadCourses = async () => {
            setIsLoading(true);
            try {
                const userStr = localStorage.getItem('user');
                const userEmail = userStr ? JSON.parse(userStr).email : null;
                const data = await fetchCoursesApi(userEmail);
                setCourses(data);
            } catch (err) {
                console.error("Failed to fetch courses:", err);
                setError("Failed to load courses from workspace.");
            } finally {
                setIsLoading(false);
            }
        };
        loadCourses();
=======
        const fetchCourses = () => {
            const data = getCourses();
            setCourses(data);
            setIsLoading(false);
        };
        fetchCourses();
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9

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

<<<<<<< HEAD
    const getLearningResources = (course) => {
        const pathLink = '/student/my-courses';
        const baseResources = [
            {
                title: 'Open your course roadmap',
                description: 'Visit My Courses to start the first lessons and track your progress.',
                href: pathLink,
            },
            {
                title: 'Follow the recommended learning path',
                description: 'Complete the modules in order for the best learning experience.',
                href: pathLink,
            },
            {
                title: 'Apply new skills in a mini-project',
                description: 'Practice with hands-on exercises to build confidence faster.',
                href: 'https://www.freecodecamp.org/',
            },
        ];

        if (!course) return baseResources;

        switch (course.category) {
            case 'Design':
                return [
                    {
                        title: 'Explore case study examples',
                        description: 'Review real product design workflows to understand best practices.',
                        href: 'https://www.behance.net/',
                    },
                    {
                        title: 'Review your curriculum',
                        description: 'Start with the course outline and focus on the design fundamentals.',
                        href: pathLink,
                    },
                    {
                        title: 'Build your portfolio piece',
                        description: 'Create a small UX/UI project as you learn new concepts.',
                        href: 'https://www.figma.com/',
                    },
                ];
            case 'Development':
            default:
                return [
                    {
                        title: 'Review the course roadmap',
                        description: 'Open your enrolled course and start with the first learning module.',
                        href: pathLink,
                    },
                    {
                        title: 'Practice foundational concepts',
                        description: 'Use reference guides to reinforce key development skills.',
                        href: 'https://developer.mozilla.org/',
                    },
                    {
                        title: 'Build a quick practice project',
                        description: 'Try a hands-on project to make the new topics stick.',
                        href: 'https://www.freecodecamp.org/',
                    },
                ];
        }
    };

    const handleAction = async (action, courseId) => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            alert('Please log in to perform this action.');
            return;
        }

        const user = JSON.parse(userStr);

        try {
            if (action === 'enroll') {
                const result = await enrollInCourseApi(courseId, user.email);
                if (result.message && result.message.toLowerCase().includes('success')) {
                    alert('Success! You have enrolled in this course.');
                    const data = await fetchCoursesApi(user.email);
                    setCourses(data);
                    const course = data.find(item => item.id === courseId);
                    setRecentlyEnrolledCourse(course || null);
                    setLearningResources(getLearningResources(course));
                } else {
                    alert(result.message || 'Failed to enroll in course.');
                }
            } else if (action === 'complete') {
                const result = await completeCourseApi(courseId, user.email);
                if (result.message && result.message.toLowerCase().includes('completed')) {
                    alert('Success! Course marked as completed.');
                    const data = await fetchCoursesApi(user.email);
                    setCourses(data);
                } else {
                    alert(result.message || 'Failed to complete course.');
                }
            }
        } catch (err) {
            console.error('Action failed:', err);
            alert('Failed to perform action. Please try again.');
        }
    };

=======
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

>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
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

                {learningResources.length > 0 && (
                    <div className="mb-12 rounded-[32px] bg-white border border-slate-200 shadow-lg shadow-slate-100 p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <p className="text-sm uppercase tracking-[0.35em] text-brand-primary font-black mb-2">Next steps</p>
                                <h2 className="text-3xl font-black text-slate-900">Start your learning path for {recentlyEnrolledCourse?.title || 'your new course'}</h2>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                <button
                                    onClick={() => navigate('/student/my-courses')}
                                    className="btn-primary px-6 py-3"
                                >
                                    Go to My Courses
                                </button>
                                <button
                                    onClick={() => setLearningResources([])}
                                    className="btn-secondary px-6 py-3"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {learningResources.map((resource, index) => (
                                <div key={index} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brand-primary transition-all">
                                    <h3 className="text-xl font-black text-slate-900 mb-3">{resource.title}</h3>
                                    <p className="text-slate-500 leading-relaxed mb-5">{resource.description}</p>
                                    <a
                                        href={resource.href}
                                        target={resource.href.startsWith('http') ? '_blank' : '_self'}
                                        rel={resource.href.startsWith('http') ? 'noreferrer' : undefined}
                                        className="text-sm font-bold text-brand-primary hover:underline"
                                    >
                                        {resource.href.startsWith('http') ? 'Open resource' : 'Open course'}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

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
