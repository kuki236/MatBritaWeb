import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './components/common/MainLayout';
import Students from './pages/Students';
import Courses from './pages/Courses'
import Sections from './pages/Sections'
const ProtectedPage = ({ children }) => (
  <MainLayout>
    {children}
  </MainLayout>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Login Route (Does NOT use MainLayout) */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (Wrapped in MainLayout) */}
        
        {/* Dev 1: Administration Module */}
        <Route path="/students" element={
          <ProtectedPage>
            <Students />
          </ProtectedPage>
        } />

        <Route path="/academic-levels" element={
          <ProtectedPage>
            <Courses />
          </ProtectedPage>
        } />

        <Route path="/sections" element={
          <ProtectedPage>
            <Sections/>
          </ProtectedPage>
        } />

        {/* Dev 2: Transactional Module */}
        <Route path="/enrollments" element={
          <ProtectedPage>
            <h2>Enrollments</h2>
            <p>RF06/RF05/RF07: Register student enrollments with capacity and prerequisite validation.</p>
          </ProtectedPage>
        } />

        <Route path="/records" element={
          <ProtectedPage>
            <h2>Academic Records</h2>
            <p>RF02: View student history and approved levels.</p>
          </ProtectedPage>
        } />

        {/* Fallback for legacy routes or unknown paths */}
        <Route path="/admin" element={<Navigate to="/students" replace />} />
        <Route path="/recepcion" element={<Navigate to="/enrollments" replace />} />
        
        {/* 404 - Not Found */}
        <Route path="*" element={
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>404 - Page Not Found</h2>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;