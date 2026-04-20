import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './components/common/MainLayout';
import Students from './pages/Students';
import Courses from './pages/Courses'
import Sections from './pages/Sections'
import Records from './pages/Records'
import Enrollments from './pages/Enrollments';
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
        
        {/* Administration Module */}
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

        {/* Transactional Module */}
        <Route path="/enrollments" element={
          <ProtectedPage>
            <Enrollments />
          </ProtectedPage>
        } />

        <Route path="/records" element={
          <ProtectedPage>
            <Records />
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