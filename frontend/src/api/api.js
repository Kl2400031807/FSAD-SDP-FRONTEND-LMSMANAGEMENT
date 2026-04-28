const USERS_URL = "http://localhost:8080/api/users";
const COURSES_URL = "http://localhost:8080/api/courses";
const ASSIGNMENTS_URL = "http://localhost:8080/api/assignments";

// User actions
export const registerUser = async (data) => {
    const response = await fetch(`${USERS_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const loginUser = async (data) => {
    const response = await fetch(`${USERS_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const verifyOtp = async (email, otp) => {
    const response = await fetch(`${USERS_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
    });
    return response.json();
};

export const resendOtp = async (email) => {
    const response = await fetch(`${USERS_URL}/resend-otp?email=${encodeURIComponent(email)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    return response.json();
};

export const validatePassword = async (password) => {
    const response = await fetch(`${USERS_URL}/validate-password?password=${encodeURIComponent(password)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    return response.json();
};

export const login = loginUser; // Alias for backward compatibility

// Course actions
export const fetchCourses = async (userEmail = null) => {
    const url = userEmail ? `${COURSES_URL}?userEmail=${encodeURIComponent(userEmail)}` : COURSES_URL;
    const response = await fetch(url);
    return response.json();
};

export const createCourse = async (data) => {
    const response = await fetch(COURSES_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const enrollInCourse = async (courseId, userEmail) => {
    const response = await fetch(`${COURSES_URL}/${courseId}/enroll?userEmail=${encodeURIComponent(userEmail)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    return response.json();
};

export const completeCourse = async (courseId, userEmail) => {
    const response = await fetch(`${COURSES_URL}/${courseId}/complete?userEmail=${encodeURIComponent(userEmail)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    return response.json();
};

export const fetchMyCourses = async (userEmail) => {
    const response = await fetch(`${COURSES_URL}?userEmail=${encodeURIComponent(userEmail)}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.status}`);
    }
    return response.json();
};

// Assignment actions
export const fetchAssignments = async () => {
    const response = await fetch(ASSIGNMENTS_URL);
    return response.json();
};

export const createAssignment = async (data) => {
    const response = await fetch(ASSIGNMENTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();





};  