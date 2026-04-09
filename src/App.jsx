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
import Certificates from './pages/Certificates';
import AdminUsers from './pages/AdminUsers';
import AdminCourses from './pages/AdminCourses';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';
import CreateCourse from './pages/CreateCourse';
import InstructorTools from './pages/InstructorTools';
import Profile from './pages/Profile';
import CreatorUpload from './pages/CreatorUpload';
import CreatorContent from './pages/CreatorContent';
import CreatorReview from './pages/CreatorReview';
import CreatorAssetLibrary from './pages/CreatorAssetLibrary';
import ManageCourse from './pages/ManageCourse';
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

          {/* Student Panel Routes */}
          <Route path="/student">
            <Route index element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
            <Route path="courses" element={<ProtectedRoute allowedRoles={['student']}><Courses /></ProtectedRoute>} />
            <Route path="my-courses" element={<ProtectedRoute allowedRoles={['student']}><MyCourses /></ProtectedRoute>} />
            <Route path="assignments" element={<ProtectedRoute allowedRoles={['student']}><Assignments /></ProtectedRoute>} />
            <Route path="submit-assignment" element={<ProtectedRoute allowedRoles={['student']}><SubmitAssignment /></ProtectedRoute>} />
            <Route path="progress" element={<ProtectedRoute allowedRoles={['student']}><Progress /></ProtectedRoute>} />
            <Route path="certificates" element={<ProtectedRoute allowedRoles={['student']}><Certificates /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute allowedRoles={['student']}><Profile /></ProtectedRoute>} />
          </Route>

          {/* Instructor Panel Routes */}
          <Route path="/instructor">
            <Route index element={<ProtectedRoute allowedRoles={['instructor']}><InstructorDashboard /></ProtectedRoute>} />
            <Route path="courses" element={<ProtectedRoute allowedRoles={['instructor']}><Courses /></ProtectedRoute>} />
            <Route path="my-courses" element={<ProtectedRoute allowedRoles={['instructor']}><MyCourses /></ProtectedRoute>} />
            <Route path="create-course" element={<ProtectedRoute allowedRoles={['instructor']}><CreateCourse /></ProtectedRoute>} />
            <Route path="grade-assignments" element={<ProtectedRoute allowedRoles={['instructor']}><GradeAssignments /></ProtectedRoute>} />
            <Route path="tools" element={<ProtectedRoute allowedRoles={['instructor']}><InstructorTools /></ProtectedRoute>} />
            <Route path="assignments" element={<ProtectedRoute allowedRoles={['instructor']}><Assignments /></ProtectedRoute>} />
            <Route path="manage-course/:id" element={<ProtectedRoute allowedRoles={['instructor']}><ManageCourse /></ProtectedRoute>} />
            <Route path="edit-course/:id" element={<ProtectedRoute allowedRoles={['instructor']}><CreateCourse /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute allowedRoles={['instructor']}><Profile /></ProtectedRoute>} />
          </Route>

          {/* Admin Panel Routes */}
          <Route path="/admin">
            <Route index element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
            <Route path="courses" element={<ProtectedRoute allowedRoles={['admin']}><AdminCourses /></ProtectedRoute>} />
            <Route path="my-courses" element={<ProtectedRoute allowedRoles={['admin']}><MyCourses /></ProtectedRoute>} />
            <Route path="assignments" element={<ProtectedRoute allowedRoles={['admin']}><Assignments /></ProtectedRoute>} />
            <Route path="reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />
          </Route>
          
          <Route path="/creator" element={<ProtectedRoute allowedRoles={['creator']}><CreatorDashboard /></ProtectedRoute>} />
          <Route path="/creator/upload" element={<ProtectedRoute allowedRoles={['creator']}><CreatorUpload /></ProtectedRoute>} />
          <Route path="/creator/content" element={<ProtectedRoute allowedRoles={['creator']}><CreatorContent /></ProtectedRoute>} />
          <Route path="/creator/review" element={<ProtectedRoute allowedRoles={['creator']}><CreatorReview /></ProtectedRoute>} />
          <Route path="/creator/assets" element={<ProtectedRoute allowedRoles={['creator']}><CreatorAssetLibrary /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
