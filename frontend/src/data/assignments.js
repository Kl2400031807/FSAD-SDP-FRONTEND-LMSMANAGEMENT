const DEFAULT_ASSIGNMENTS = [
    { id: 1, title: 'SQL Query Optimization', course: 'Database Management Systems (DBMS)', dueDate: '2026-03-01', status: 'Pending', role: 'student', progress: 0 },
    { id: 2, title: 'Cloud Deployment Lab', course: 'Cloud Computing', dueDate: '2026-02-28', status: 'Submitted', role: 'student', progress: 100 },
    { id: 3, title: 'TCP/IP Routing Table', course: 'Computer Networks', dueDate: '2026-02-25', status: 'Graded', grade: 'A', role: 'student', progress: 100 },
    { id: 4, title: 'Neural Network Model', course: 'Artificial Intelligence', dueDate: '2026-02-20', status: 'Overdue', role: 'student', progress: 20 },
    { id: 5, title: 'React Component Architecture', course: 'Frontend Development', dueDate: '2026-03-05', status: 'Pending', role: 'instructor', submissions: 12 },
    { id: 6, title: 'CI/CD Pipeline Setup', course: 'DevOps Engineering', dueDate: '2026-03-10', status: 'In Progress', role: 'instructor', submissions: 5 },
];

export const getAssignments = () => {
    const assignmentsStr = localStorage.getItem('assignments');
    if (!assignmentsStr) {
        localStorage.setItem('assignments', JSON.stringify(DEFAULT_ASSIGNMENTS));
        return DEFAULT_ASSIGNMENTS;
    }
    return JSON.parse(assignmentsStr);
};

export const addAssignment = (assignmentData) => {
    const assignments = getAssignments();
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : { role: 'instructor' };

    const newAssignment = {
        ...assignmentData,
        id: Date.now(),
        role: 'instructor', // Creator role
        status: 'In Progress',
        submissions: 0,
        progress: 0,
        isNew: true, // NEW: added flag
        instructorId: user.email || 'admin@edu-flow.com'
    };

    const updatedAssignments = [newAssignment, ...assignments];
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
    return newAssignment;
};

export const markAssignmentCompleted = (id) => {
    const assignments = getAssignments();
    const updated = assignments.map(a => {
        if (a.id === id) {
            return {
                ...a,
                status: 'Completed',
                progress: 100,
                submissions: (a.submissions || 0) + 1 // Increment submissions for instructor
            };
        }
        return a;
    });
    localStorage.setItem('assignments', JSON.stringify(updated));
};

export const gradeAssignment = (id, grade) => {
    const assignments = getAssignments();
    const updated = assignments.map(a => {
        // Convert both to string for consistent comparison if needed
        if (String(a.id) === String(id)) {
            return {
                ...a,
                status: 'Graded',
                grade: grade,
                progress: 100
            };
        }
        return a;
    });
    localStorage.setItem('assignments', JSON.stringify(updated));
};

export const getSubmissions = (assignmentId) => {
    const submissionsStr = localStorage.getItem('submissions');
    const allSubmissions = submissionsStr ? JSON.parse(submissionsStr) : [];

    // Default mock submissions
    const initialSubmissions = [
        { id: 'm1', assignmentId: 1, student: 'Alex Johnson', date: '2026-02-22', file: 'hooks_homework.pdf', status: 'Pending', size: '1.2MB' },
        { id: 'm2', assignmentId: 2, student: 'Maria Garcia', date: '2026-02-23', file: 'refactor_demo.zip', status: 'Pending', size: '4.5MB' },
    ];

    if (!submissionsStr) {
        localStorage.setItem('submissions', JSON.stringify(initialSubmissions));
        return assignmentId ? initialSubmissions.filter(s => String(s.assignmentId) === String(assignmentId)) : initialSubmissions;
    }

    if (assignmentId) {
        return allSubmissions.filter(s => String(s.assignmentId) === String(assignmentId));
    }
    return allSubmissions;
};

export const submitAssignmentWork = (assignmentId, studentName, fileName) => {
    const submissionsStr = localStorage.getItem('submissions');
    const submissions = submissionsStr ? JSON.parse(submissionsStr) : [];
    const newSubmission = {
        id: Date.now(),
        assignmentId,
        student: studentName || 'Anonymous Student',
        date: new Date().toISOString().split('T')[0],
        file: fileName || 'evidence_artifact.pdf',
        status: 'Pending',
        size: '1.5MB'
    };

    const updatedSubmissions = [newSubmission, ...submissions];
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
    return newSubmission;
};

export const updateSubmissionStatus = (submissionId, status) => {
    const submissionsStr = localStorage.getItem('submissions');
    const submissions = submissionsStr ? JSON.parse(submissionsStr) : [];
    const updated = submissions.map(s => {
        if (String(s.id) === String(submissionId)) {
            return { ...s, status: status };
        }
        return s;
    });
    localStorage.setItem('submissions', JSON.stringify(updated));

    /////////
<<<<<<< HEAD


=======
>>>>>>> 910be0addb9479a3d9f6beebb731e206757f0ba9
};
