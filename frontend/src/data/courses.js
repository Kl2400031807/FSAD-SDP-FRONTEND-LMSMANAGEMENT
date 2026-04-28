const DEFAULT_COURSES = [
    { 
        id: 1, 
        title: 'Database Management Systems (DBMS)', 
        description: 'Learn relational databases, SQL, normalization, indexing, and transactions.', 
        instructor: 'Prof. Anil Kumar', 
        difficulty: 'Beginner', 
        duration: '6 Weeks', 
        enrollments: '2.8k', 
        category: 'Development', 
        isNew: true, 
        image: '/dbms.jpg' 
    },
    { 
        id: 2, 
        title: 'Cloud Computing', 
        description: 'Understand cloud models, virtualization, AWS basics, and scalable systems.', 
        instructor: 'Dr. Radhika Sharma', 
        difficulty: 'Intermediate', 
        duration: '5 Weeks', 
        enrollments: '3.5k', 
        category: 'Development', 
        isNew: true, 
        image: '/cloud.jpg' 
    },
    { 
        id: 3, 
        title: 'Full Stack Web Development', 
        description: 'Build complete web applications using frontend, backend, and databases.', 
        instructor: 'Mr. Suresh Naidu', 
        difficulty: 'Intermediate', 
        duration: '8 Weeks', 
        enrollments: '4.2k', 
        category: 'Development', 
        image: '/fullstack.png' 
    },
    { 
        id: 4, 
        title: 'Frontend Development', 
        description: 'Learn HTML, CSS, JavaScript, and modern UI frameworks.', 
        instructor: 'Ms. Priya Verma', 
        difficulty: 'Beginner', 
        duration: '6 Weeks', 
        enrollments: '5.0k', 
        category: 'Development', 
        image: '/Frontend.png' 
    },
    { 
        id: 5, 
        title: 'Computer Networks', 
        description: 'Learn OSI model, TCP/IP, routing, switching, and network security.', 
        instructor: 'Prof. Ravi Teja', 
        difficulty: 'Intermediate', 
        duration: '5 Weeks', 
        enrollments: '1.9k', 
        category: 'Development', 
        image: '/cn.jpg' 
    },
    { 
        id: 6, 
        title: 'DevOps Engineering', 
        description: 'Learn CI/CD, Docker, Kubernetes, monitoring, and automation.', 
        instructor: 'Mr. Karthik Reddy', 
        difficulty: 'Advanced', 
        duration: '7 Weeks', 
        enrollments: '2.3k', 
        category: 'Development', 
        image: '/devops.png' 
    },
    { 
        id: 7, 
        title: 'Artificial Intelligence', 
        description: 'Introduction to AI concepts, machine learning basics, and real-world applications.', 
        instructor: 'Dr. Neha Agarwal', 
        difficulty: 'Advanced', 
        duration: '8 Weeks', 
        enrollments: '3.1k', 
        category: 'Development', 
<<<<<<< HEAD
        image: '/ai.jpg' 
    },
];

export const getCourses = () => {
    const coursesStr = localStorage.getItem('courses');
    if (!coursesStr) {
        localStorage.setItem('courses', JSON.stringify(DEFAULT_COURSES));
        return DEFAULT_COURSES;
    }
    return JSON.parse(coursesStr);
=======
        image: '/ai.jpg',
        status: 'Approved'
    },
];

export const getCourses = (includeDeleted = false) => {
    const coursesStr = localStorage.getItem('courses');
    let courses = [];
    if (!coursesStr) {
        // Initialize with default status/deletion for all
        courses = DEFAULT_COURSES.map(c => ({ 
            ...c, 
            status: c.status || 'Approved', 
            isDeleted: false 
        }));
        localStorage.setItem('courses', JSON.stringify(courses));
    } else {
        courses = JSON.parse(coursesStr);
    }
    
    if (includeDeleted) return courses;
    return courses.filter(c => !c.isDeleted);
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
};

export const addCourse = (courseData) => {
    const courses = getCourses();
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : { role: 'instructor' };

    const newCourse = {
        ...courseData,
        id: Date.now(),
        instructor: user.name || 'Current Professor', 
        enrollments: '0',
        isNew: true,
        image: '/dbms.jpg', // Using an existing one for demo
        instructorCreated: true,
<<<<<<< HEAD
        ownerId: user.email || 'admin@edu-flow.com'
=======
        ownerId: user.email || 'admin@edu-flow.com',
        status: 'Pending',
        isDeleted: false
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
    };
    const updatedCourses = [newCourse, ...courses];
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    return newCourse;
};

<<<<<<< HEAD
=======
export const updateCourse = (courseId, updatedData) => {
    const courses = getCourses();
    const updatedCourses = courses.map(course => {
        if (course.id === parseInt(courseId)) {
            return { ...course, ...updatedData };
        }
        return course;
    });
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    return updatedCourses;
};

export const deleteCourse = (courseId) => {
    const courses = getCourses(true);
    const updatedCourses = courses.map(course => {
        if (course.id === parseInt(courseId)) {
            return { ...course, isDeleted: true };
        }
        return course;
    });
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    return updatedCourses.filter(c => !c.isDeleted);
};

export const restoreCourse = (courseId) => {
    const courses = getCourses(true);
    const updatedCourses = courses.map(course => {
        if (course.id === parseInt(courseId)) {
            return { ...course, isDeleted: false };
        }
        return course;
    });
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    return updatedCourses.filter(c => !c.isDeleted);
};

export const updateCourseStatus = (courseId, status) => {
    const courses = getCourses();
    const updatedCourses = courses.map(course => {
        if (course.id === parseInt(courseId)) {
            return { ...course, status };
        }
        return course;
    });
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    return updatedCourses;
};

>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
export const enrollInCourse = (courseId) => {
    const courses = getCourses();
    const updatedCourses = courses.map(course => {
        if (course.id === courseId) {
            return { ...course, studentEnrolled: true };
        }
        return course;
    });
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
};

export const markCourseCompleted = (courseId) => {
    const courses = getCourses();
    const updatedCourses = courses.map(course => {
        if (course.id === courseId) {
            return { 
                ...course, 
                isCompleted: true,
                enrollments: (parseInt(course.enrollments) + 0.1).toFixed(1) + 'k' // Mock increment
            };
        }
        return course;
    });
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
};
