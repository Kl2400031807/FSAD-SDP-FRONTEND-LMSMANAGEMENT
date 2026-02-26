import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import { Layout, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_COURSES = [
    { id: 1, title: 'Database Management Systems (DBMS)', description: 'Learn relational databases, SQL, normalization, indexing, and transactions.', instructor: 'Prof. Anil Kumar', studentEnrolled: true, instructorCreated: true, image: '/dbms.jpg' },
    { id: 2, title: 'Cloud Computing', description: 'Understand cloud models, virtualization, AWS basics, and scalable systems.', instructor: 'Dr. Radhika Sharma', studentEnrolled: true, instructorCreated: false, image: '/cloud.jpg' },
    { id: 3, title: 'Full Stack Web Development', description: 'Build complete web applications using frontend, backend, and databases.', instructor: 'Mr. Suresh Naidu', studentEnrolled: false, instructorCreated: true, image: '/fullstack.png' },
    { id: 4, title: 'Frontend Development', description: 'Learn HTML, CSS, JavaScript, and modern UI frameworks.', instructor: 'Ms. Priya Verma', studentEnrolled: true, instructorCreated: false, image: '/Frontend.png' },
    { id: 5, title: 'Computer Networks', description: 'Learn OSI model, TCP/IP, routing, switching, and network security.', instructor: 'Prof. Ravi Teja', studentEnrolled: false, instructorCreated: true, image: '/cn.jpg' },
    { id: 6, title: 'DevOps Engineering', description: 'Learn CI/CD, Docker, Kubernetes, monitoring, and automation.', instructor: 'Mr. Karthik Reddy', studentEnrolled: true, instructorCreated: true, image: '/devops.png' },
];

const MyCourses = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                setUser(JSON.parse(userStr));
            } catch (e) {
                setUser(null);
            }
        }
    }, []);

    const handleAction = (action, courseId) => {
        console.log(`Action: ${action} on Course ID: ${courseId}`);
    };

    const myCourses = MOCK_COURSES.filter(course => {
        if (!user) return false;
        if (user.role === 'student') return course.studentEnrolled;
        if (user.role === 'instructor') return course.instructorCreated;
        return true;
    });

    return (
        <div className="min-h-screen bg-surface-50 pt-32 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Your Learning Space</h1>
                        <p className="text-slate-500 font-medium">
                            {user?.role === 'instructor' ? 'Manage and monitor your curriculum content.' : 'Continue where you left off in your professional development.'}
                        </p>
                    </div>
                    {user?.role === 'instructor' && (
                        <Link to="/instructor/create-course" className="btn-primary flex items-center gap-2 px-6 py-3 shadow-lg shadow-brand-primary/20">
                            <PlusCircle size={20} />
                            Create Course
                        </Link>
                    )}
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
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No Active Enrollments</h3>
                        <p className="text-slate-500 font-medium mb-8">You haven't {user?.role === 'instructor' ? 'published' : 'enrolled in'} any courses yet.</p>
                        <a href="/courses" className="btn-primary inline-flex items-center gap-2">Explore Catalog</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCourses;
