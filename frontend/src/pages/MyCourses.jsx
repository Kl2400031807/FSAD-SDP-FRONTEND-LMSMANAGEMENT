import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import { Layout, PlusCircle } from 'lucide-react';
<<<<<<< HEAD
import { useNavigate, Link } from 'react-router-dom';

import { fetchMyCourses } from '../api/api';
=======
import { Link, useNavigate } from 'react-router-dom';

import { getCourses, markCourseCompleted, enrollInCourse, deleteCourse, updateCourseStatus, restoreCourse } from '../data/courses';
import { Trash2, RotateCcw } from 'lucide-react';
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9

const MyCourses = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
<<<<<<< HEAD
    const [isLoading, setIsLoading] = useState(true);
=======
    const [showDeleted, setShowDeleted] = useState(false);
    const navigate = useNavigate();
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        let currentUser = null;
        if (userStr) {
            try {
                currentUser = JSON.parse(userStr);
                setUser(currentUser);
            } catch (e) {
                setUser(null);
            }
        }
<<<<<<< HEAD

        const loadCourses = async () => {
            setIsLoading(true);
            try {
                if (currentUser?.email) {
                    const data = await fetchMyCourses(currentUser.email);
                    setCourses(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                console.error("Failed to load courses:", err);
                setCourses([]);
            } finally {
                setIsLoading(false);
            }
        };
        loadCourses();
=======
        setCourses(getCourses(true)); // Always get all for the toggle logic
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
    }, []);

    const handleAction = (action, courseId) => {
        if (action === 'complete') {
<<<<<<< HEAD
            alert('Congratulations! You have successfully mastered this curriculum.');
        } else if (action === 'manage') {
            navigate('/instructor/assignments');
        }
        console.log(`Action: ${action} on Course ID: ${courseId}`);
    };

    const myCourses = user?.role === 'student'
        ? courses.filter(course => course.studentEnrolled)
        : courses.filter(course => course.ownerEmail === user?.email);
=======
            markCourseCompleted(courseId);
            setCourses(getCourses(true));
            alert('Congratulations! You have successfully mastered this curriculum.');
        } else if (action === 'manage') {
            navigate(`/instructor/manage-course/${courseId}`);
        } else if (action === 'approve') {
            updateCourseStatus(courseId, 'Approved');
            setCourses(getCourses(true));
            alert('Course successfully validated and published to the public registry.');
        } else if (action === 'delete') {
            if (window.confirm('Are you sure you want to move this curriculum to the Archive?')) {
                deleteCourse(courseId);
                setCourses(getCourses(true));
                alert('Curriculum moved to Archive.');
            }
        } else if (action === 'revert') {
            updateCourseStatus(courseId, 'Pending');
            setCourses(getCourses(true));
            alert('Course status reverted to PENDING for re-evaluation.');
        } else if (action === 'restore') {
            restoreCourse(courseId);
            setCourses(getCourses(true));
            alert('Curriculum successfully restored to the active registry.');
        } else if (action === 'enroll') {
            enrollInCourse(courseId);
            setCourses(getCourses(true));
            alert('Successfully enrolled in the curriculum.');
        }
    };

    const myCourses = courses.filter(course => {
        if (!user) return false;
        
        // Filter by deletion status based on toggle
        if (showDeleted) {
            if (!course.isDeleted) return false;
        } else {
            if (course.isDeleted) return false;
        }

        if (user.role === 'student') return course.studentEnrolled;
        if (user.role === 'instructor') return course.instructorCreated;
        return true;
    });
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
                            {showDeleted ? 'Recycle Bin' : 'Your Learning Space'}
                        </h1>
                        <p className="text-slate-500 font-medium">
                            {showDeleted 
                                ? 'Review and restore previously removed curriculum entities.' 
                                : (user?.role === 'instructor' ? 'Manage and monitor your curriculum content.' : 'Continue where you left off in your professional development.')}
                        </p>
                    </div>
<<<<<<< HEAD
                    {user?.role === 'instructor' && (
                        <Link to="/instructor/create-course" className="btn-primary flex items-center gap-2 px-6 py-3 shadow-lg shadow-brand-primary/20">
                            <PlusCircle size={20} />
                            Create Course
                        </Link>
                    )}
=======
                    <div className="flex items-center gap-4">
                        {user?.role === 'admin' && (
                            <button 
                                onClick={() => setShowDeleted(!showDeleted)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border transition-all ${showDeleted ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-primary'}`}
                            >
                                {showDeleted ? <RotateCcw size={18} /> : <Trash2 size={18} />}
                                {showDeleted ? 'Active Workspace' : 'Recycle Bin'}
                            </button>
                        )}
                        {user?.role === 'instructor' && (
                            <Link to="/instructor/create-course" className="btn-primary flex items-center gap-2 px-6 py-3 shadow-lg shadow-brand-primary/20">
                                <PlusCircle size={20} />
                                Create Course
                            </Link>
                        )}
                    </div>
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {myCourses.map(course => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            role={user?.role}
                            onAction={handleAction}
                        />
                    ))}
                </div>

                {myCourses.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Layout className="text-slate-300" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                            {showDeleted ? 'Recycle Bin Empty' : 'No Active Enrollments'}
                        </h3>
                        <p className="text-slate-500 font-medium mb-8">
                            {showDeleted 
                                ? 'No deleted curricula found in the archive.' 
                                : `You haven't ${user?.role === 'instructor' ? 'published' : 'enrolled in'} any courses yet.`}
                        </p>
                        {!showDeleted && <a href="/courses" className="btn-primary inline-flex items-center gap-2">Explore Catalog</a>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCourses;
