export const TEST_USERS = {
    student: {
        email: 'student@gmail.com',
        password: 'student123',
        name: 'Alex Johnson',
        role: 'student'
    },
    instructor: {
        email: 'instructor@eduflow.com',
        password: 'instructor123',
        name: 'Prof. Sarah Smith',
        role: 'instructor'
    },
    admin: {
        email: 'admin@edu-flow.com',
        password: 'admin123',
        name: 'Lead Administrator',
        role: 'admin'
    },
    creator: {
        email: 'creator@eduflow.com',
        password: 'creator123',
        name: 'James Wilson',
        role: 'creator'
    }
};

export const getStoredUsers = () => {
    const usersStr = localStorage.getItem('app_users');
    let users = usersStr ? JSON.parse(usersStr) : [];
    
    // Ensure all test users are present
    const testUsers = Object.values(TEST_USERS);
    testUsers.forEach(testUser => {
        if (!users.find(u => u.email === testUser.email)) {
            users.push(testUser);
        }
    });

    localStorage.setItem('app_users', JSON.stringify(users));
    return users;
};

export const authenticateUser = (email, password) => {
    const users = getStoredUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Exclude password from stored user session
        const { password: _, ...userData } = user;
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, user: userData };
    }
    
    return { success: false, message: 'Invalid credentials. Please use test accounts or register.' };
};

export const registerUser = (userData) => {
    const users = getStoredUsers();
    if (users.find(u => u.email === userData.email)) {
        return { success: false, message: 'This identifier is already registered.' };
    }

    const newUser = {
        ...userData,
        id: Date.now(),
        role: userData.role || 'student'
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('app_users', JSON.stringify(updatedUsers));
    return { success: true, user: newUser };
};

export const getRegisteredStudents = () => {
    return getStoredUsers().filter(u => u.role === 'student');
};
