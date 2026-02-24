import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import CreatorDashboard from './pages/CreatorDashboard';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';
import Assignments from './pages/Assignments';
import SubmitAssignment from './pages/SubmitAssignment';
import GradeAssignments from './pages/GradeAssignments';
import Progress from './pages/Progress';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />

          {/* Protected Routes */}
          <Route path="/my-courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
          <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
          <Route path="/submit-assignment" element={<ProtectedRoute allowedRoles={['student']}><SubmitAssignment /></ProtectedRoute>} />
          <Route path="/grade-assignments" element={<ProtectedRoute allowedRoles={['instructor']}><GradeAssignments /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute allowedRoles={['student']}><Progress /></ProtectedRoute>} />

          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/instructor" element={<ProtectedRoute allowedRoles={['instructor']}><InstructorDashboard /></ProtectedRoute>} />
          <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/creator" element={<ProtectedRoute allowedRoles={['creator']}><CreatorDashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
