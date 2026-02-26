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
import CreatorUpload from './pages/CreatorUpload';
import CreatorContent from './pages/CreatorContent';
import CreatorReview from './pages/CreatorReview';
import CreatorAssetLibrary from './pages/CreatorAssetLibrary';
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
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={['admin']}><AdminCourses /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />
          <Route path="/instructor" element={<ProtectedRoute allowedRoles={['instructor']}><InstructorDashboard /></ProtectedRoute>} />
          <Route path="/instructor/create-course" element={<ProtectedRoute allowedRoles={['instructor']}><CreateCourse /></ProtectedRoute>} />
          <Route path="/instructor/tools" element={<ProtectedRoute allowedRoles={['instructor']}><InstructorTools /></ProtectedRoute>} />
          <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/creator" element={<ProtectedRoute allowedRoles={['creator']}><CreatorDashboard /></ProtectedRoute>} />
          <Route path="/creator/upload" element={<ProtectedRoute allowedRoles={['creator']}><CreatorUpload /></ProtectedRoute>} />
          <Route path="/creator/content" element={<ProtectedRoute allowedRoles={['creator']}><CreatorContent /></ProtectedRoute>} />
          <Route path="/creator/review" element={<ProtectedRoute allowedRoles={['creator']}><CreatorReview /></ProtectedRoute>} />
          <Route path="/creator/assets" element={<ProtectedRoute allowedRoles={['creator']}><CreatorAssetLibrary /></ProtectedRoute>} />
          <Route path="/certificates" element={<ProtectedRoute allowedRoles={["student"]}><Certificates /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
