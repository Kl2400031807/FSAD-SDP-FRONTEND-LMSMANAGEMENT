import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, Search, PieChart, Star } from 'lucide-react';
<<<<<<< HEAD
import { Link, useNavigate } from 'react-router-dom';
=======
import { Link } from 'react-router-dom';
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import { enrollInCourse as enrollInCourseApi, fetchCourses as fetchCoursesApi } from '../api/api';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('student');
    const [courses, setCourses] = useState([]);
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);

    const menuItems = [
        { title: 'Enrolled Courses', icon: BookOpen, desc: 'Pick up where you left off', iconColor: 'text-violet-600', bgColor: 'bg-violet-50', path: '/my-courses' },
        { title: 'Browse Catalog', icon: Search, desc: 'Explore new skills to master', iconColor: 'text-pink-600', bgColor: 'bg-pink-50', path: '/courses' },
        { title: 'Progress Assessment', icon: PieChart, desc: 'View your learning statistics', iconColor: 'text-teal-600', bgColor: 'bg-teal-50', path: '/student/progress' },
        { title: 'Official Credentials', icon: Star, desc: 'Your earned certificates', iconColor: 'text-amber-600', bgColor: 'bg-amber-50', path: '/student/certificates' },
    ];

    useEffect(() => {
        const load = async () => {
            setIsLoadingCourses(true);
            const userStr = localStorage.getItem('user');
            const userEmail = userStr ? (() => { try { return JSON.parse(userStr).email; } catch { return null; } })() : null;
            const userRole = userStr ? (() => { try { return JSON.parse(userStr).role; } catch { return null; } })() : null;
            if (userRole) setRole(userRole);

            try {
                const data = await fetchCoursesApi(userEmail);
                setCourses(Array.isArray(data) ? data : []);
            } catch (e) {
                setCourses([]);
            } finally {
                setIsLoadingCourses(false);
            }
        };
        load();
    }, []);

    const recommendedCourses = useMemo(() => {
        // Show a few non-enrolled courses first, fall back to any.
        const notEnrolled = courses.filter(c => !c?.studentEnrolled);
        return (notEnrolled.length ? notEnrolled : courses).slice(0, 3);
    }, [courses]);

    const handleCourseAction = async (action, courseId) => {
        if (action === 'view') {
            navigate('/courses');
            return;
        }

        const userStr = localStorage.getItem('user');
        if (!userStr) {
            alert('Please log in to enroll.');
            return;
        }
        const user = JSON.parse(userStr);

        try {
            if (action === 'enroll') {
                const result = await enrollInCourseApi(courseId, user.email);
                if (result?.message && result.message.includes('Successfully')) {
                    // After enrolling, show the course in My Courses.
                    navigate('/my-courses');
                    return;
                }
                alert(result?.message || 'Failed to enroll in course.');
            }
        } catch (e) {
            alert('Failed to enroll in course. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Student Workspace</h1>
                    <p className="text-slate-500 font-medium">Your personalized hub for learning and growth.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {menuItems.map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path || '#'}
                            className="block bg-white p-8 rounded-3xl border border-slate-200 hover:border-brand-primary hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer shadow-sm"
                        >
                            <div className={`w-14 h-14 ${item.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                                <item.icon className={item.iconColor} size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.desc}</p>
                        </Link>
                    ))}
                </div>

                {/* Recommended courses + enroll */}
                <div className="mt-14">
                    <div className="flex items-end justify-between gap-6 mb-8">
                        <div>
                            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Recommended Courses</h2>
                            <p className="text-slate-500 font-medium text-sm mt-1">Enroll in a few picks right from your dashboard.</p>
                        </div>
                        <Link to="/courses" className="text-sm font-extrabold text-brand-primary hover:underline">
                            View full catalog
                        </Link>
                    </div>

                    {isLoadingCourses ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-white p-4 rounded-[32px] border border-slate-100 animate-pulse">
                                    <div className="aspect-[16/10] rounded-[24px] bg-slate-100 mb-5" />
                                    <div className="h-6 bg-slate-100 rounded-lg w-3/4 mb-3" />
                                    <div className="h-4 bg-slate-50 rounded-lg w-full mb-2" />
                                    <div className="h-4 bg-slate-50 rounded-lg w-2/3 mb-6" />
                                    <div className="h-12 bg-slate-100 rounded-2xl w-full mt-6" />
                                </div>
                            ))}
                        </div>
                    ) : recommendedCourses.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendedCourses.map(course => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    role={role}
                                    onAction={handleCourseAction}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center">
                            <p className="text-slate-600 font-medium">No courses available right now. Please check the catalog.</p>
                            <div className="mt-6">
                                <Link to="/courses" className="btn-primary inline-flex items-center gap-2 px-6 py-3">
                                    Browse Catalog
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
